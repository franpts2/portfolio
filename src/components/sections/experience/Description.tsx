import { Fragment } from "react";
import type { RoleLink } from "../../../data/experience.js";

interface DescriptionProps {
  readonly text: string;
  readonly links?: readonly RoleLink[] | undefined;
}

const escapeRegExp = (value: string) =>
  value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

export function Description({ text, links = [] }: DescriptionProps) {
  if (links.length === 0) {
    return <>{text}</>;
  }

  const pattern = new RegExp(
    `(${links.map((link) => escapeRegExp(link.text)).join("|")})`,
    "g",
  );
  const hrefByText = new Map(links.map((link) => [link.text, link.href]));

  return (
    <>
      {text.split(pattern).map((part, index) => {
        const href = hrefByText.get(part);

        if (!href) {
          return <Fragment key={index}>{part}</Fragment>;
        }

        return (
          <a
            key={index}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-(--color-accent) underline decoration-(--color-accent) underline-offset-2 transition-colors"
          >
            {part}
          </a>
        );
      })}
    </>
  );
}
