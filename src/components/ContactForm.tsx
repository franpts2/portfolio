import { useState, type FormEvent } from "react";
import { Icon } from "@iconify/react";
import { icons } from "../assets/icons.js";

type FormStatus = "idle" | "sending" | "sent" | "error";

const fieldClass =
	"w-full bg-transparent border-0 border-b border-(--color-line) pb-3 text-lg text-(--color-ink) placeholder:text-(--color-ink-faint) focus:border-(--color-accent) focus:outline-none transition-colors";

export function ContactForm() {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [message, setMessage] = useState("");
	const [honeypot, setHoneypot] = useState("");
	const [status, setStatus] = useState<FormStatus>("idle");
	const [feedback, setFeedback] = useState("");

	const sending = status === "sending";

	async function handleSubmit(event: FormEvent<HTMLFormElement>) {
		event.preventDefault();
		if (sending) return;

		setStatus("sending");
		setFeedback("");

		try {
			const response = await fetch("/api/contact", {
				method: "POST",
				headers: { "content-type": "application/json" },
				body: JSON.stringify({ name, email, message, honeypot }),
			});

			const data = await response.json().catch(() => null);

			if (!response.ok) {
				throw new Error(
					data?.error ?? "Something went wrong. Please try again.",
				);
			}

			setName("");
			setEmail("");
			setMessage("");
			setStatus("sent");
			setFeedback(
				"Thanks! Your message is on its way — I'll get back to you soon.",
			);
		} catch (error) {
			setStatus("error");
			setFeedback(
				error instanceof Error
					? error.message
					: "Something went wrong. Please try again.",
			);
		}
	}

	return (
		<form onSubmit={handleSubmit} className="flex flex-col gap-8" noValidate>
			{/* Honeypot: hidden from humans, tempting for bots */}
			<div aria-hidden="true" className="hidden">
				<label htmlFor="contact-company">Company</label>
				<input
					id="contact-company"
					name="company"
					type="text"
					tabIndex={-1}
					autoComplete="off"
					value={honeypot}
					onChange={(event) => setHoneypot(event.target.value)}
				/>
			</div>

			<div>
				<label htmlFor="contact-name" className="t-label mb-2 block">
					Name
				</label>
				<input
					id="contact-name"
					name="name"
					type="text"
					autoComplete="name"
					required
					placeholder="Ada Lovelace"
					value={name}
					onChange={(event) => setName(event.target.value)}
					className={fieldClass}
				/>
			</div>

			<div>
				<label htmlFor="contact-email" className="t-label mb-2 block">
					Email (optional)
				</label>
				<input
					id="contact-email"
					name="email"
					type="email"
					autoComplete="email"
					placeholder="ada@example.com"
					value={email}
					onChange={(event) => setEmail(event.target.value)}
					className={fieldClass}
				/>
			</div>

			<div>
				<label htmlFor="contact-message" className="t-label mb-2 block">
					Message
				</label>
				<textarea
					id="contact-message"
					name="message"
					rows={5}
					required
					placeholder="Tell me about your project, idea, or just say hi"
					value={message}
					onChange={(event) => setMessage(event.target.value)}
					className={`${fieldClass} resize-none`}
				/>
			</div>

			<div className="flex flex-col gap-4">
				<button
					type="submit"
					disabled={sending}
					className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-(--color-ink) text-(--color-bg) rounded-full font-medium text-sm hover:bg-(--color-accent) disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
				>
					{sending ? "Sending…" : "Send message"}
					<Icon icon={icons.arrowUpward.outline} height={16} />
				</button>

				<p
					role="status"
					aria-live="polite"
					className={`flex items-center gap-2 text-sm ${
						status === "error"
							? "text-(--color-accent)"
							: "text-(--color-ink-muted)"
					}`}
				>
					{status === "sent" && (
						<Icon icon={icons.check.outline} height={16} />
					)}
					{feedback}
				</p>
			</div>
		</form>
	);
}
