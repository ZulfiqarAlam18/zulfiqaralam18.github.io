# zulfiqaralam18.github.io

Portfolio and blog of **Zulfiqar Alam**, Flutter Mobile Application Engineer.

**Live site:** https://zulfiqaralam18.github.io

A static site built with HTML, CSS and vanilla JavaScript, with no frameworks and no build step, hosted on GitHub Pages.

## Project structure

```
.
├── index.html                 Home: hero, about, experience, skills, projects, contact
├── projects.html              All projects, with filters
├── case-study.html            Renders case-studies/*.md as a page (?p=<slug>)
├── buy-me-a-coffee.html       Support page
├── 404.html                   Not-found page (served by GitHub Pages)
├── blog/
│   ├── index.html             Blog listing
│   └── *.html                 Posts
├── assets/
│   ├── css/style.css          Design tokens (:root) and all styles
│   ├── js/main.js             Interactions, animations, resume config
│   ├── js/case-study.js       Case-study loader
│   ├── images/
│   │   ├── profile/           Headshot and portrait (optimised .webp + originals)
│   │   └── icons/             Favicon and app icons
│   └── resume/                Resume PDF
├── case-studies/              Detailed project write-ups (Markdown)
├── docs/                      Maintainer documentation
├── scripts/
│   └── create-blog-post.sh    Generates a new blog post from a template
├── manifest.json              Web app manifest
├── robots.txt
└── sitemap.xml
```

## Run locally

Any static server works, for example:

```bash
npx serve .
# or
python -m http.server 8000
```

Use a server rather than opening `index.html` directly: case studies are loaded over HTTP, and the 404 page and manifest use root-relative paths.

## Common tasks

**Update the resume.** Put the PDF in `assets/resume/` and update `RESUME_CONFIG.filename` at the top of `assets/js/main.js`.

**Write a blog post.**

```bash
scripts/create-blog-post.sh "Post Title" "post-slug" "flutter"
```

Then fill in the generated `blog/post-slug.html`, add a card to `blog/index.html` and add the URL to `sitemap.xml`.

**Change the colours.** Edit the tokens in `:root` at the top of `assets/css/style.css`.

**Deploy.** Push to `main`. GitHub Pages publishes automatically.

More detail is in [docs/project_description.md](docs/project_description.md).

## Contact

- Email: zulfiqaralam651@gmail.com
- GitHub: [@ZulfiqarAlam18](https://github.com/ZulfiqarAlam18)
- LinkedIn: [Zulfiqar Alam](https://linkedin.com/in/zulfiqar-alam)

© Zulfiqar Alam. All rights reserved.
