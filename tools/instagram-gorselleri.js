// Instagram menü görsellerini üretir: node tools/instagram-gorselleri.js
// Çıktılar instagram/ klasörüne yazılır. Menü adı, içerik ve fiyatlar
// assets/js/products.js dosyasından okunur; fiyat değişince komutu tekrar çalıştırın.
// Gerekenler: Node.js ve Playwright (npx playwright install chromium).
const http = require('http');
const fs = require('fs');
const path = require('path');
const { chromium } = require('playwright');

const ROOT = path.join(__dirname, '..');
const OUT = path.join(ROOT, 'instagram');
const TYPES = { '.html': 'text/html', '.js': 'text/javascript', '.svg': 'image/svg+xml', '.webp': 'image/webp', '.css': 'text/css' };

const server = http.createServer((req, res) => {
  const file = path.join(ROOT, decodeURIComponent(req.url.split('?')[0]));
  if (!file.startsWith(ROOT) || !fs.existsSync(file) || fs.statSync(file).isDirectory()) {
    res.writeHead(404).end();
    return;
  }
  res.writeHead(200, { 'Content-Type': TYPES[path.extname(file)] || 'application/octet-stream' });
  fs.createReadStream(file).pipe(res);
});

const JOBS = [
  { file: 'gun-menuleri-gonderi.jpg', query: 'f=post', w: 1080, h: 1350 },
  { file: 'gun-menuleri-hikaye.jpg', query: 'f=story', w: 1080, h: 1920 },
  { file: 'menu-1.jpg', query: 'f=single&m=1', w: 1080, h: 1350 },
  { file: 'menu-2.jpg', query: 'f=single&m=2', w: 1080, h: 1350 },
  { file: 'menu-3.jpg', query: 'f=single&m=3', w: 1080, h: 1350 },
];

(async () => {
  await new Promise((r) => server.listen(0, r));
  const base = `http://localhost:${server.address().port}/instagram/sablon.html`;
  const browser = await chromium.launch();
  for (const job of JOBS) {
    const page = await browser.newPage({ viewport: { width: job.w, height: job.h } });
    await page.goto(`${base}?${job.query}`, { waitUntil: 'networkidle' });
    await page.evaluate(() => document.fonts.ready);
    await page.screenshot({ path: path.join(OUT, job.file), type: 'jpeg', quality: 92 });
    await page.close();
    console.log('✓', job.file);
  }
  await browser.close();
  server.close();
})();
