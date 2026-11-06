// Google E-Tablo için fiyat şablonu üretir: node tools/fiyat-sablonu.js > fiyat-listesi.csv
// Çıkan dosyayı Google E-Tablo'da Dosya → İçe aktar ile açın.
const fs = require('fs');
const path = require('path');
const window = {};
new Function('window', fs.readFileSync(path.join(__dirname, '../assets/js/products.js'), 'utf8'))(window);
const q = (v) => (/[",;\n]/.test(String(v)) ? `"${String(v).replace(/"/g, '""')}"` : String(v));
const rows = [['urun_id', 'urun', 'secenek_id', 'secenek', 'cesit_id', 'cesit', 'fiyat', 'goster']];
window.MENU.products.forEach((p) => {
  const priced = (p.variants || []).filter((v) => Array.isArray(v.prices));
  p.options.forEach((o, i) => {
    if (priced.length) priced.forEach((v) => rows.push([p.id, p.name, o.id, o.label, v.id, v.name, v.prices[i], 'evet']));
    else rows.push([p.id, p.name, o.id, o.label, '', '', o.price, 'evet']);
  });
});
process.stdout.write(rows.map((r) => r.map(q).join(',')).join('\n') + '\n');
