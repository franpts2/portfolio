# Francisca Portugal — Portfolio

A personal portfolio for frontend work: a project gallery, experience timeline, and interactive details.

<p align="left">
  <a href="https://franciscapt.dev"><img src="https://img.shields.io/badge/live-franciscapt.dev-FF3D81?style=flat-square" alt="Live site"></a>
</p>

<p align="left">
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React">
  <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript">
  <img src="https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E" alt="Vite">
  <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS">
  <img src="https://img.shields.io/badge/Cloudflare%20Pages-F38020?style=for-the-badge&logo=Cloudflare%20Pages&logoColor=white" alt="Cloudflare Pages">
</p>

## About

Personal portfolio website showcasing my work as a frontend engineer. Features a modern, responsive UI, project gallery, experience timeline, and interactive components.

**Live:** [franciscapt.dev](https://franciscapt.dev)

## Screenshot

![Portfolio home page](docs/screenshots/home.jpg)

## Features

- Responsive design for all devices
- Project gallery with detailed views
- Experience timeline
- Interactive UI elements (squishy portrait, scroll-driven chat animation)
- Fast performance with Vite
- Built with accessibility in mind

## How It Works

The site is a React 19 single-page application built with Vite and Tailwind CSS v4. The
contact form posts to a Cloudflare Pages Function, which sends the message through Resend;
everything else is static.

**Folder Structure**

```
portfolio/
├── functions/           ← Cloudflare Pages Functions (contact email API)
├── public/
│   └── images/
│       ├── people/
│       └── projects/
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── effects/     ← Animation/interactive components
│   │   ├── error/       ← Error boundaries
│   │   ├── forms/       ← Form components
│   │   ├── layout/      ← Header, Footer
│   │   ├── sections/    ← Page sections
│   │   └── ui/          ← Reusable primitives
│   ├── data/
│   ├── lib/             ← Shared constants
│   ├── style/
│   ├── App.tsx
│   └── main.tsx
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.js
└── README.md
```

## License

No license file is included. The source is public for reference; all rights reserved.

---

_Portfolio — built to show the work, not just list it._
