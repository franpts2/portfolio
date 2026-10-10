/**
 * Contact form endpoint — POST /api/contact
 *
 * Runs as a Cloudflare Pages Function (or Worker). It validates the
 * submission and forwards it to Resend, which delivers it to the
 * portfolio owner's inbox. The Resend API key never reaches the browser.
 *
 * Required environment variable:
 *   RESEND_API_KEY       
 *
 * Optional environment variables:
 *   CONTACT_TO_EMAIL     — destination inbox (default: hello@franciscapt.dev)
 *   CONTACT_FROM_EMAIL   — verified sender (default: Portfolio <hello@franciscapt.dev>)
 *
 * For local development put them in a git-ignored `.dev.vars` file.
 */

const RESEND_ENDPOINT = "https://api.resend.com/emails";

const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minute
const RATE_LIMIT_MAX_REQUESTS = 5;
const MAX_FIELD_LENGTHS = { name: 100, email: 254, message: 5000 };
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Best-effort, in-memory rate limiting (per isolate — good enough to stop
// casual abuse; use Workers KV or a Durable Object for strict guarantees).
const requestLog = new Map();

function jsonResponse(body, status = 200) {
	return new Response(JSON.stringify(body), {
		status,
		headers: { "content-type": "application/json" },
	});
}

function escapeHtml(value) {
	return value
		.replace(/&/g, "&amp;")
		.replace(/</g, "&lt;")
		.replace(/>/g, "&gt;")
		.replace(/"/g, "&quot;")
		.replace(/'/g, "&#039;");
}

function isRateLimited(ip) {
	const now = Date.now();
	const windowStart = now - RATE_LIMIT_WINDOW_MS;
	const recent = (requestLog.get(ip) ?? []).filter((time) => time > windowStart);
	recent.push(now);
	requestLog.set(ip, recent);

	// Opportunistic cleanup so the map cannot grow forever.
	if (requestLog.size > 1000) {
		for (const [key, times] of requestLog) {
			if (times.every((time) => time <= windowStart)) {
				requestLog.delete(key);
			}
		}
	}

	return recent.length > RATE_LIMIT_MAX_REQUESTS;
}

async function sendEmail(env, { name, email, message }) {
	const to = env.CONTACT_TO_EMAIL || "hello@franciscapt.dev";
	const from = env.CONTACT_FROM_EMAIL || "Portfolio <hello@franciscapt.dev>";
	// Keep header injection out of the subject line.
	const safeName = name.replace(/[\r\n]+/g, " ");
	const emailLine = email
		? `<p><strong>Email:</strong> ${escapeHtml(email)}</p>`
		: "<p><strong>Email:</strong> (not provided)</p>";

	const body = {
		from,
		to: [to],
		subject: `New message from ${safeName} — franciscapt.dev`,
		text: `Name: ${name}\nEmail: ${email || "(not provided)"}\n\n${message}`,
		html: `
				<h2>New message from your portfolio</h2>
				<p><strong>Name:</strong> ${escapeHtml(name)}</p>
				${emailLine}
				<p><strong>Message:</strong></p>
				<p>${escapeHtml(message).replace(/\n/g, "<br />")}</p>
			`,
	};

	// Only set reply_to when the visitor actually left an email address.
	if (email) {
		body.reply_to = email;
	}

	const response = await fetch(RESEND_ENDPOINT, {
		method: "POST",
		headers: {
			authorization: `Bearer ${env.RESEND_API_KEY}`,
			"content-type": "application/json",
		},
		body: JSON.stringify(body),
		signal: AbortSignal.timeout(10_000),
	});

	if (!response.ok) {
		console.error(`Resend request failed with status ${response.status}`);
		return false;
	}
	return true;
}

export async function onRequestPost(context) {
	const { request, env } = context;

	if (!env.RESEND_API_KEY) {
		console.error("RESEND_API_KEY is not configured");
		return jsonResponse(
			{ error: "The contact form is not configured yet. Please email me directly." },
			500,
		);
	}

	const ip = request.headers.get("cf-connecting-ip") ?? "unknown";
	if (isRateLimited(ip)) {
		return jsonResponse(
			{ error: "Too many messages. Please try again in a minute." },
			429,
		);
	}

	let payload;
	try {
		payload = await request.json();
	} catch {
		return jsonResponse({ error: "Invalid request body." }, 400);
	}

	// Honeypot field: bots fill it in, humans never see it. Drop silently.
	if (payload.honeypot) {
		return jsonResponse({ ok: true });
	}

	const name = typeof payload.name === "string" ? payload.name.trim() : "";
	const email = typeof payload.email === "string" ? payload.email.trim() : "";
	const message =
		typeof payload.message === "string" ? payload.message.trim() : "";

	if (!name || !message) {
		return jsonResponse({ error: "Name and message are required." }, 400);
	}

	// Email is optional, but when given it must be valid and reasonably sized.
	if (email && !EMAIL_PATTERN.test(email)) {
		return jsonResponse(
			{ error: "Please provide a valid email address." },
			400,
		);
	}
	if (
		name.length > MAX_FIELD_LENGTHS.name ||
		email.length > MAX_FIELD_LENGTHS.email ||
		message.length > MAX_FIELD_LENGTHS.message
	) {
		return jsonResponse(
			{ error: "Your message is too long. Please shorten it." },
			400,
		);
	}

	try {
		const sent = await sendEmail(env, { name, email, message });
		if (!sent) {
			return jsonResponse(
				{ error: "Something went wrong sending your message. Please try again later." },
				502,
			);
		}
	} catch (error) {
		console.error("Failed to send email:", error);
		return jsonResponse(
			{ error: "Something went wrong sending your message. Please try again later." },
			502,
		);
	}

	return jsonResponse({ ok: true });
}
