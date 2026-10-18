export const profile = {
  name: "Francisca Portugal",
  mark: "f.pt",
  role: "Frontend Engineer",
  location: "Porto, Portugal",
  email: "hello@franciscapt.dev",
  cv: "/CV.pdf",
  portrait: "/images/people/francisca-portugal.png",
  statement:
    "I care about the parts you never see, so the parts you do feel effortless.",
  bio: [
    "I'm a frontend engineer who ventures into full-stack to build products that feel effortless. I thrive on interfaces that are technically rigorous under the hood, yet joyful and intuitive for the person using them.",
    "To me, code is a craft where logic meets creativity. I'm motivated to build high-caliber tools that are as profoundly important as they are a delight to interact with.",
  ],
} as const;

export const socials = [
  { label: "GitHub", handle: "franpts2", href: "https://github.com/franpts2" },
  {
    label: "LinkedIn",
    handle: "franciscaportugal",
    href: "https://linkedin.com/in/franciscaportugal",
  },
  {
    label: "X",
    handle: "franpts2",
    href: "https://x.com/franpts2",
  },
] as const;
