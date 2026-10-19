# Portfolio & Blog Website

Personal portfolio and technical blog for Zulfiqar Alam, Flutter Mobile Application Engineer. Hand-written HTML, CSS and vanilla JavaScript, hosted on GitHub Pages with no build step.

Live: https://zulfiqaralam18.github.io

## Goals

- Show recruiters and clients shipped work quickly: current role, four apps live on Google Play, and detailed write-ups.
- Stay fast and dependency-free so the site is easy to maintain and loads instantly.
- Rank for the owner's name and Flutter-related searches.

## Highlights

- **Code-themed hero** — an editor window types out a Dart class describing the owner, with syntax highlighting and line numbers. The source is real HTML, so the code is readable without JavaScript.
- **Terminal touches** — a typed `~# Portfolio & Blog Website

Personal portfolio and technical blog for Zulfiqar Alam, Flutter Mobile Application Engineer. Hand-written HTML, CSS and vanilla JavaScript, hosted on GitHub Pages with no build step.

Live: https://zulfiqaralam18.github.io

## Goals

- Show recruiters and clients shipped work quickly: current role, four apps live on Google Play, and detailed write-ups.
- Stay fast and dependency-free so the site is easy to maintain and loads instantly.
- Rank for the owner's name and Flutter-related searches.

## Highlights

- **Code-themed hero** — an editor window types out a Dart class describing the owner, with syntax highlighting and line numbers. The source is real HTML, so the code is readable without JavaScript.
 role line, code-comment section labels, and a code-window contact card and 404 page.
- **Projects page with filters** — All / Live on Play Store / Mobile / Web / AI, with an `ls`-style result count.
- **Monochrome design system** — colour, spacing and fonts are CSS custom properties in one place; the only accent colour is reserved for "live" status.
- **Accessibility** — skip link, keyboard focus styles, and every animation disabled under `prefers-reduced-motion`.
- **SEO** — JSON-LD `Person` and `BlogPosting` data, Open Graph and Twitter cards, sitemap, robots rules and Google Search Console verification.

## Tech

- HTML5, CSS3 (custom properties, Grid, Flexbox), vanilla JavaScript (IntersectionObserver, Clipboard API)
- Inter and JetBrains Mono (Google Fonts), Font Awesome icons
- FormSubmit for the contact form, Google Analytics 4
- Bash script for generating blog posts
- GitHub Pages hosting

## Structure

```
├── index.html, projects.html, buy-me-a-coffee.html, 404.html
├── blog/                  posts and the blog index
├── assets/
│   ├── css/               base, layout, components, motion, responsive + page styles
│   ├── js/                main.js (interactions), case-study.js (Markdown loader)
│   ├── images/            profile/ (web-ready + originals) and icons/
│   └── resume/            downloadable PDF resume
├── case-studies/          long-form project write-ups
├── docs/                  maintainer documentation
└── scripts/               local server, link checker, image generator, blog post generator
```

## Author

Zulfiqar Alam · [GitHub](https://github.com/ZulfiqarAlam18) · [LinkedIn](https://linkedin.com/in/zulfiqar-alam) · zulfiqaralam651@gmail.com
