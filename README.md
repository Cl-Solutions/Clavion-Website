# Clavion – Website

Marketing-Website von **Clavion** – KI-Automatisierung, Prozessautomatisierung und
Chatbot-/Voice-Agent-Lösungen für kleine und mittelständische Unternehmen in Deutschland (DACH).

## Tech-Stack

- **Vite** + **React 18** + **TypeScript**
- **Tailwind CSS** + **Framer Motion** + **GSAP**
- **React Router** (SPA), deployed on **Vercel**

## Entwicklung

```bash
npm install      # Abhängigkeiten installieren
npm run dev      # lokaler Dev-Server
npm run build    # Production-Build nach dist/
npm run preview  # Build lokal testen
npm run lint     # ESLint
npm run typecheck
```

## Struktur

- `index.html` – Primäre Meta-Tags, OpenGraph, Schema.org (Organization, LocalBusiness, WebSite, FAQ)
- `src/pages/` – Home, Blog, BlogPost, Impressum, Datenschutz, NotFound
- `src/components/` – UI-Komponenten (Hero, Services, About, Contact, Footer …)
- `src/data/blogPosts.ts` – Blog-Inhalte
- `public/` – `sitemap.xml`, `robots.txt`, `llms.txt`, Logo & OG-Image

Domain: https://clavion.pro
