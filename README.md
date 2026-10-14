# Francisca Portugal - Portfolio

<div align="left">
	<img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React"/>
	<img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript"/>
	<img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS"/>
	<img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=FFD62E" alt="Vite"/>
</div>

## About

Personal portfolio website showcasing my work as a frontend engineer. Features a modern, responsive UI, project gallery, experience timeline, and interactive components.

## Key Features

- Responsive design for all devices
- Project gallery with detailed views
- Experience timeline
- Interactive UI elements (squishy portrait, scroll-driven chat animation)
- Fast performance with Vite
- Built with accessibility in mind

## Live Demo

Live at: [https://franciscapt.pages.dev](https://franciscapt.pages.dev)

## Technical Implementation

**Tech Stack**

- Framework: React 19 (TypeScript)
- Styling: Tailwind CSS v4
- Build Tool: Vite
- Animation: Motion
- Icons: Iconify
- Contact form: Resend API via Cloudflare Pages Functions

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

## Features Implemented

- Responsive layout with Tailwind CSS
- Project gallery and detail pages
- Experience timeline
- Interactive squishy portrait with particle burst
- Scroll-driven chat animation
- Custom UI components (buttons, section headers, reveal animations)
- Accessibility best practices
- Contact form that delivers messages via Resend

---

_Portfolio of Francisca Portugal - Frontend Engineer_
