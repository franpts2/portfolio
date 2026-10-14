import { useState, type FormEvent } from "react";
import { Icon } from "@iconify/react";
import { icons } from "../../assets/icons.js";
import { Button } from "../ui/Button.js";

type FormStatus = "idle" | "sending" | "sent" | "error";

const floatingFieldClass =
	"w-full bg-transparent border-0 border-b border-(--color-line) pt-6 pb-2 text-lg text-(--color-ink) placeholder:text-transparent focus:border-(--color-accent) focus:outline-none transition-colors";

const floatingLabelClass =
	"absolute left-0 top-1/2 -translate-y-1/2 text-lg text-(--color-ink-faint) transition-all duration-200 pointer-events-none peer-focus:top-2 peer-focus:translate-y-0 peer-focus:text-xs peer-focus:text-(--color-accent) peer-not-placeholder-shown:top-2 peer-not-placeholder-shown:translate-y-0 peer-not-placeholder-shown:text-xs";

const floatingTextareaLabelClass =
	"absolute left-0 top-2 text-lg text-(--color-ink-faint) transition-all duration-200 pointer-events-none peer-focus:text-xs peer-focus:text-(--color-accent) peer-not-placeholder-shown:text-xs";

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
				"Thanks! Your message is on its way. I'll get back to you soon.",
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

			<div className="relative">
				<input
					id="contact-name"
					name="name"
					type="text"
					autoComplete="name"
					required
					placeholder=" "
					value={name}
					onChange={(event) => setName(event.target.value)}
					className={`${floatingFieldClass} peer`}
				/>
				<label htmlFor="contact-name" className={floatingLabelClass}>
					Name
				</label>
			</div>

			<div className="relative">
				<input
					id="contact-email"
					name="email"
					type="email"
					autoComplete="email"
					placeholder=" "
					value={email}
					onChange={(event) => setEmail(event.target.value)}
					className={`${floatingFieldClass} peer`}
				/>
				<label htmlFor="contact-email" className={floatingLabelClass}>
					Email (optional)
				</label>
			</div>

			<div className="relative">
				<textarea
					id="contact-message"
					name="message"
					rows={5}
					required
					placeholder=" "
					value={message}
					onChange={(event) => setMessage(event.target.value)}
					className={`${floatingFieldClass} peer resize-none`}
				/>
				<label htmlFor="contact-message" className={floatingTextareaLabelClass}>
					Message
				</label>
			</div>

			<div className="flex flex-col gap-4">
				<Button
					type="submit"
					disabled={sending}
					className="px-6 py-3"
					icon={icons.arrowUpward.outline}
				>
					{sending ? "Sending…" : "Send message"}
				</Button>

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
