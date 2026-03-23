import React, { useState } from "react";
import type { ReactNode } from "react";
import { Icon } from "@iconify/react";
import { icons } from "../../assets/icons.ts";

interface AccordionItemProps {
	value: string;
	trigger: ReactNode;
	children: ReactNode;
}

interface AccordionProps {
	children: ReactNode;
	type?: "single" | "multiple";
	defaultValue?: string | string[];
	onValueChange?: (value: string | string[]) => void;
}

interface AccordionContextType {
	openItems: Set<string>;
	toggleItem: (value: string) => void;
	type: "single" | "multiple";
}

const AccordionContext = React.createContext<AccordionContextType | undefined>(
	undefined,
);

const Accordion = React.forwardRef<HTMLDivElement, AccordionProps>(
	({ children, type = "single", defaultValue, onValueChange }, ref) => {
		const [openItems, setOpenItems] = useState<Set<string>>(() => {
			const initial = new Set<string>();
			if (defaultValue) {
				if (typeof defaultValue === "string") {
					initial.add(defaultValue);
				} else {
					defaultValue.forEach((v) => initial.add(v));
				}
			}
			return initial;
		});

		const toggleItem = (value: string) => {
			setOpenItems((prev) => {
				const newSet = new Set(prev);
				if (type === "single") {
					newSet.clear();
					if (prev.has(value)) {
						// Allow closing item
					} else {
						newSet.add(value);
					}
				} else {
					if (newSet.has(value)) {
						newSet.delete(value);
					} else {
						newSet.add(value);
					}
				}

				const newValue =
					type === "single" ? Array.from(newSet)[0] || "" : Array.from(newSet);
				onValueChange?.(newValue);

				return newSet;
			});
		};

		return (
			<AccordionContext.Provider value={{ openItems, toggleItem, type }}>
				<div
					ref={ref}
					className="w-full border border-tertiary-bg rounded-lg divide-y divide-tertiary-bg"
				>
					{children}
				</div>
			</AccordionContext.Provider>
		);
	},
);

Accordion.displayName = "Accordion";

const AccordionItem = React.forwardRef<HTMLDivElement, AccordionItemProps>(
	({ value, trigger, children }, ref) => {
		const context = React.useContext(AccordionContext);

		if (!context) {
			throw new Error("AccordionItem must be used within Accordion");
		}

		const isOpen = context.openItems.has(value);

		return (
			<div ref={ref} className="overflow-hidden">
				<button
					onClick={() => context.toggleItem(value)}
					className="flex w-full items-center justify-between px-4 py-3 text-left transition-colors"
					aria-expanded={isOpen}
					aria-controls={`accordion-content-${value}`}
				>
					<span className="font-medium text-sm">{trigger}</span>
					<Icon
						icon={icons.dropdown.fill}
						className={`h-5 w-5 shrink-0 transition-transform duration-200 ${
							isOpen ? "rotate-180" : ""
						}`}
					/>
				</button>
				{isOpen && (
					<div
						id={`accordion-content-${value}`}
						className="px-4 py-3 text-sm text-neutral-300 animate-in fade-in-0 slide-in-from-top-2 duration-200"
					>
						{children}
					</div>
				)}
			</div>
		);
	},
);

AccordionItem.displayName = "AccordionItem";

export { Accordion, AccordionItem };
