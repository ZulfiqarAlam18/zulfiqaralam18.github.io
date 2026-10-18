# zulfiqaralam18.github.io

Portfolio and blog of **Zulfiqar Alam**, Flutter Mobile Application Engineer.

**Live site:** https://zulfiqaralam18.github.io

A static site built with HTML, CSS and vanilla JavaScript, with no frameworks and no build step, hosted on GitHub Pages.

## Project structure

```
.
├── index.html                    Home: hero, about, experience, skills, projects, contact
├── projects.html                 All projects, with filters
├── case-study.html               Renders case-studies/<slug>.md as a page (?p=<slug>)
├── buy-me-a-coffee.html          Support page
├── 404.html                      Not-found page (served by GitHub Pages)
├── blog/
│   ├── index.html                Blog listing
│   └── *.html                    Posts
├── assets/
│   ├── css/
│   │   ├── base.css              Design tokens (:root), reset, headings, section rhythm
│   │   ├── layout.css            Navigation bar and footer
│   │   ├── components.css        Buttons, code window, cards, tag chips, filters, copy buttons, toasts
│   │   ├── motion.css            Scroll-reveal helpers and shared keyframes
│   │   ├── responsive.css        Breakpoints and reduced-motion overrides (always loaded last)
│   │   ├── sections/hero.css     Hero (home page and blog index)
│   │   └── pages/                home, projects, blog, case-study, support, not-found
│   ├── js/
│   │   ├── main.js               Shared interactions, animations, RESUME_CONFIG
│   │   └── case-study.js         Case-study loader
│   ├── images/
│   │   ├── profile/              headshot-320.webp, portrait-680.webp (served)
│   │   │   └── original/         Full-size originals (headshot.jpeg is also the social-share image)
│   │   └── icons/                Favicon, Apple touch icon, app icons
│   └── resume/                   Resume PDF
├── case-studies/                 Project write-ups in Markdown
├── docs/                         Maintainer documentation
├── scripts/
│   ├── serve.js                  Local preview server
│   ├── check-links.js            Verifies every local link and image path
│   ├── make-images.js            Regenerates web images and icons from the originals
│   └── create-blog-post.sh       New blog post from a template
├── manifest.json, robots.txt, sitemap.xml
└── README.md
```

Every page loads `base`, `layout`, `components`, its own page styles, then `motion` and `responsive` — in that order.

## Run locally

```bash
node scripts/serve.js        # then open http://localhost:8080
```

Use a server rather than opening `index.html` directly: case studies are loaded over HTTP, and the 404 page and manifest use root-relative paths. No install step is needed; the scripts only use Node.js.

## Common tasks

**Update the resume.** Put the PDF in `assets/resume/` and update `RESUME_CONFIG.filename` at the top of `assets/js/main.js`.

**Write a blog post.**

```bash
scripts/create-blog-post.sh "Post Title" "post-slug" "flutter"
```

Then fill in the generated `blog/post-slug.html`, add a card to `blog/index.html` and add the URL to `sitemap.xml`.

**Change the colours.** Edit the tokens in `:root` at the top of `assets/css/base.css`.

**Replace the profile photos.** Put new originals in `assets/images/profile/original/` (same file names) and run `node scripts/make-images.js` to regenerate the web images and icons.

**Before pushing.** Run `node scripts/check-links.js`; it fails if any link or image path is broken.

**Deploy.** Push to `main`. GitHub Pages publishes automatically.

More detail is in [docs/project_description.md](docs/project_description.md).

## Contact

- Email: zulfiqaralam651@gmail.com
- GitHub: [@ZulfiqarAlam18](https://github.com/ZulfiqarAlam18)
- LinkedIn: [Zulfiqar Alam](https://linkedin.com/in/zulfiqar-alam)

© Zulfiqar Alam. All rights reserved.
