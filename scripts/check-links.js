#!/usr/bin/env node
// Checks that every local href/src in the site's pages (and the manifest icons) points to a file
// that exists. Run before pushing:  node scripts/check-links.js
// Exits with code 1 if anything is broken.
const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const pages = [
  'index.html', 'projects.html', 'case-study.html', 'buy-me-a-coffee.html', '404.html',
  ...fs.readdirSync(path.join(root, 'blog')).filter((f) => f.endsWith('.html')).map((f) => 'blog/' + f),
];
let broken = 0;
let checked = 0;

function check(fromFile, ref) {
  if (!ref || /^(https?:|mailto:|tel:|data:|#|javascript:)/.test(ref)) return;
  const clean = decodeURIComponent(ref.split('#')[0].split('?')[0]);
  if (!clean) return;
  let target = clean.startsWith('/') ? path.join(root, clean) : path.join(root, path.dirname(fromFile), clean);
  if (clean.endsWith('/')) target = path.join(target, 'index.html');
  checked++;
  if (!fs.existsSync(target)) {
    broken++;
    console.log(`BROKEN  ${fromFile} -> ${ref}`);
  }
}

for (const page of pages) {
  const html = fs.readFileSync(path.join(root, page), 'utf8');
  for (const m of html.matchAll(/\b(?:href|src)\s*=\s*"([^"]*)"/g)) check(page, m[1]);
  // full site URLs in meta tags (og:image etc.)
  for (const m of html.matchAll(/https:\/\/zulfiqaralam18\.github\.io(\/[^"#?\s]*)/g)) {
    check(page, m[1] === '/' ? '/index.html' : m[1]);
  }
}
const manifest = JSON.parse(fs.readFileSync(path.join(root, 'manifest.json'), 'utf8'));
manifest.icons.forEach((icon) => check('manifest.json', icon.src));

// every case study listed on a page must exist as Markdown
for (const page of pages) {
  const html = fs.readFileSync(path.join(root, page), 'utf8');
  for (const m of html.matchAll(/case-study\.html\?p=([a-z0-9-]+)/g)) check(page, `/case-studies/${m[1]}.md`);
}

console.log(`Checked ${checked} local references across ${pages.length} pages: ${broken} broken.`);
process.exit(broken ? 1 : 0);
