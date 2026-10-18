#!/usr/bin/env node
// Regenerates web-ready images and icons from the originals in assets/images/profile/original/,
// using headless Chrome's canvas (no image libraries needed).
// Usage:  node scripts/make-images.js
// Set CHROME_PATH if Chrome is not in the default Windows location.
const fs = require('fs');
const os = require('os');
const path = require('path');
const { execFileSync } = require('child_process');

const root = path.resolve(__dirname, '..');
const CHROME = process.env.CHROME_PATH || 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const ORIGINALS = path.join(root, 'assets/images/profile/original');
const dataUrl = (file) => 'data:image/jpeg;base64,' + fs.readFileSync(path.join(ORIGINALS, file)).toString('base64');

// [output, source, square crop, width, height, mime, quality, round mask]
const jobs = [
  ['assets/images/profile/headshot-320.webp', 'head', true, 320, 320, 'image/webp', 0.86, false],
  ['assets/images/profile/portrait-680.webp', 'portrait', false, 680, 907, 'image/webp', 0.84, false],
  ['assets/images/icons/favicon-64.png', 'head', true, 64, 64, 'image/png', 1, true],
  ['assets/images/icons/apple-touch-icon.png', 'head', true, 180, 180, 'image/png', 1, false],
  ['assets/images/icons/icon-192.jpg', 'head', true, 192, 192, 'image/jpeg', 0.86, false],
  ['assets/images/icons/icon-512.jpg', 'head', true, 512, 512, 'image/jpeg', 0.86, false],
];

const html = `<!doctype html><html><body><script>
const SRC = { head: ${JSON.stringify(dataUrl('headshot.jpeg'))}, portrait: ${JSON.stringify(dataUrl('portrait.jpeg'))} };
const jobs = ${JSON.stringify(jobs)};
const load = (src) => new Promise((r) => { const i = new Image(); i.onload = () => r(i); i.src = src; });
(async () => {
  for (const [out, key, square, w, h, mime, q, round] of jobs) {
    const img = await load(SRC[key]);
    const c = document.createElement('canvas'); c.width = w; c.height = h;
    const x = c.getContext('2d'); x.imageSmoothingQuality = 'high';
    let sx = 0, sy = 0, sw = img.naturalWidth, sh = img.naturalHeight;
    if (square) { const side = Math.min(sw, sh); sx = (sw - side) / 2; sy = 0; sw = sh = side; }
    if (round) { x.beginPath(); x.arc(w / 2, h / 2, w / 2, 0, Math.PI * 2); x.clip(); }
    x.drawImage(img, sx, sy, sw, sh, 0, 0, w, h);
    const t = document.createElement('textarea'); t.dataset.out = out; t.textContent = c.toDataURL(mime, q);
    document.body.appendChild(t);
  }
})();
<\/script></body></html>`;

const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'make-images-'));
const page = path.join(tmpDir, 'render.html');
fs.writeFileSync(page, html);
try {
  const dom = execFileSync(CHROME, ['--headless=new', '--disable-gpu', `--user-data-dir=${path.join(tmpDir, 'profile')}`,
    '--virtual-time-budget=20000', '--dump-dom', 'file:///' + page.replace(/\\/g, '/')],
    { maxBuffer: 64 * 1024 * 1024, stdio: ['ignore', 'pipe', 'ignore'] }).toString();
  let written = 0;
  for (const m of dom.matchAll(/<textarea data-out="([^"]+)">data:[^;]+;base64,([^<]+)<\/textarea>/g)) {
    const out = path.join(root, m[1]);
    fs.mkdirSync(path.dirname(out), { recursive: true });
    fs.writeFileSync(out, Buffer.from(m[2], 'base64'));
    console.log(m[1].padEnd(46), (fs.statSync(out).size / 1024).toFixed(1) + ' KB');
    written++;
  }
  if (written !== jobs.length) throw new Error(`expected ${jobs.length} images, got ${written}`);
} finally {
  fs.rmSync(tmpDir, { recursive: true, force: true });
}
