/* =====================================================================
   PERİLER MUTFAKTA – UYGULAMA
   Menü, sepet, sipariş özeti ve WhatsApp mesajı oluşturma.
   Ayarlar: assets/js/config.js · Menü & fiyatlar: assets/js/products.js
   ===================================================================== */
(() => {
  'use strict';

  const CFG = window.SITE_CONFIG || {};
  const MENU = window.MENU || { categories: [], products: [] };
  const PRODUCTS = MENU.products;
  const CATEGORIES = MENU.categories;
  const byId = Object.fromEntries(PRODUCTS.map((p) => [p.id, p]));
  const catById = Object.fromEntries(CATEGORIES.map((c) => [c.id, c]));

  /* ------------------------------------------------------------ */
  /* Yardımcılar                                                   */
  /* ------------------------------------------------------------ */
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => Array.from(el.querySelectorAll(s));
  const esc = (s) =>
    String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);
  const nf = new Intl.NumberFormat('tr-TR', { maximumFractionDigits: 0 });
  const money = (n) => `${nf.format(Math.round(n))} ${CFG.currency || '₺'}`;
  const TR_MAP = { ç: 'c', ğ: 'g', ı: 'i', ö: 'o', ş: 's', ü: 'u', â: 'a', î: 'i', û: 'u' };
  const norm = (s) =>
    String(s || '')
      .toLocaleLowerCase('tr')
      .replace(/[çğıöşüâîû]/g, (c) => TR_MAP[c])
      .normalize('NFD')
      .replace(/[̀-ͯ]/g, '');

  const store = {
    get(key, fallback) {
      try {
        const v = window.localStorage.getItem(key);
        return v ? JSON.parse(v) : fallback;
      } catch (_) {
        return fallback;
      }
    },
    set(key, value) {
      try {
        window.localStorage.setItem(key, JSON.stringify(value));
      } catch (_) {
        /* depolama kapalı olabilir – sorun değil */
      }
    },
  };
  const KEY_CART = 'pm_cart_v1';
  const KEY_CUSTOMER = 'pm_customer_v1';

  /* ------------------------------------------------------------ */
  /* İkonlar (Lucide, ISC lisansı)                                 */
  /* ------------------------------------------------------------ */
  const ICONS = {
    bag: '<path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/>',
    plus: '<path d="M5 12h14"/><path d="M12 5v14"/>',
    minus: '<path d="M5 12h14"/>',
    x: '<path d="M18 6 6 18"/><path d="m6 6 12 12"/>',
    trash: '<path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/>',
    search: '<circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>',
    leaf: '<path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/>',
    croissant: '<path d="m4.6 13.11 5.79-3.21c1.89-1.05 4.79 1.78 3.71 3.71l-3.22 5.81C8.8 23.16.79 15.23 4.6 13.11Z"/><path d="m10.5 9.5-1-2.29C9.2 6.48 8.8 6 8 6H4.5C2.79 6 2 6.5 2 8.5a7.71 7.71 0 0 0 2 4.83"/><path d="M8 6c0-1.55.24-4-2-4-2 0-2.5 2.17-2.5 4"/><path d="m14.5 13.5 2.29 1c.73.3 1.21.7 1.21 1.5v3.5c0 1.71-.5 2.5-2.5 2.5a7.71 7.71 0 0 1-4.83-2"/><path d="M18 16c1.55 0 4-.24 4 2 0 2-2.17 2.5-4 2.5"/>',
    cake: '<circle cx="9" cy="7" r="2"/><path d="M7.2 7.9 3 11v9c0 .6.4 1 1 1h16c.6 0 1-.4 1-1v-9c0-2-3-6-7-8l-3.6 2.6"/><path d="M16 13H3"/><path d="M16 17H3"/>',
    cheesecake: '<path d="M3 11h18v7a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3z"/><path d="M3 11c0-2.8 4-5 9-5s9 2.2 9 5"/><path d="M3 15h18"/><path d="M12 3v3"/>',
    cookie: '<path d="M12 2a10 10 0 1 0 10 10 4 4 0 0 1-5-5 4 4 0 0 1-5-5"/><path d="M8.5 8.5v.01"/><path d="M16 15.5v.01"/><path d="M12 12v.01"/><path d="M11 17v.01"/><path d="M7 14v.01"/>',
    party: '<path d="M5.8 11.3 2 22l10.7-3.79"/><path d="M4 3h.01"/><path d="M22 8h.01"/><path d="M15 2h.01"/><path d="M22 20h.01"/><path d="m22 2-2.24.75a2.9 2.9 0 0 0-1.96 3.12c.1.86-.57 1.63-1.45 1.63h-.38c-.86 0-1.6.6-1.76 1.44L14 10"/><path d="m22 13-.82-.33c-.86-.34-1.82.2-1.98 1.11c-.11.7-.72 1.22-1.43 1.22H17"/><path d="m11 2 .33.82c.34.86-.2 1.82-1.11 1.98C9.52 4.9 9 5.52 9 6.23V7"/><path d="M11 13c1.93 1.93 2.83 4.17 2 5-.83.83-3.07-.07-5-2-1.93-1.93-2.83-4.17-2-5 .83-.83 3.07.07 5 2Z"/>',
    utensils: '<path d="m16 2-2.3 2.3a3 3 0 0 0 0 4.2l1.8 1.8a3 3 0 0 0 4.2 0L22 8"/><path d="M15 15 3.3 3.3a4.2 4.2 0 0 0 0 6l7.3 7.3c.7.7 2 .7 2.8 0L15 15Zm0 0 7 7"/><path d="m2.1 21.8 6.4-6.3"/><path d="m19 5-7 7"/>',
    sparkles: '<path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"/><path d="M20 3v4"/><path d="M22 5h-4"/><path d="M4 17v2"/><path d="M5 18H3"/>',
    truck: '<path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2"/><path d="M15 18H9"/><path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14"/><circle cx="17" cy="18" r="2"/><circle cx="7" cy="18" r="2"/>',
    clock: '<circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>',
    calendar: '<path d="M8 2v4"/><path d="M16 2v4"/><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M3 10h18"/><path d="M8 14h.01"/><path d="M12 14h.01"/><path d="M16 14h.01"/><path d="M8 18h.01"/><path d="M12 18h.01"/><path d="M16 18h.01"/>',
    chef: '<path d="M17 21a1 1 0 0 0 1-1v-5.35c0-.457.316-.844.727-1.041a4 4 0 0 0-2.134-7.589 5 5 0 0 0-9.186 0 4 4 0 0 0-2.134 7.588c.411.198.727.585.727 1.041V20a1 1 0 0 0 1 1Z"/><path d="M6 17h12"/>',
    heart: '<path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/><path d="M12 5 9.04 7.96a2.17 2.17 0 0 0 0 3.08c.82.82 2.13.85 3 .07l2.07-1.9a2.82 2.82 0 0 1 3.79 0l2.96 2.66"/><path d="m18 15-2-2"/><path d="m15 18-2-2"/>',
    'arrow-right': '<path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>',
    'arrow-left': '<path d="m12 19-7-7 7-7"/><path d="M19 12H5"/>',
    'chevron-left': '<path d="m15 18-6-6 6-6"/>',
    'chevron-right': '<path d="m9 18 6-6-6-6"/>',
    'chevron-down': '<path d="m6 9 6 6 6-6"/>',
    check: '<path d="M20 6 9 17l-5-5"/>',
    pin: '<path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"/><circle cx="12" cy="10" r="3"/>',
    phone: '<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>',
    instagram: '<rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>',
    info: '<circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/>',
    store: '<path d="m2 7 4.41-4.41A2 2 0 0 1 7.83 2h8.34a2 2 0 0 1 1.42.59L22 7"/><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/><path d="M15 22v-4a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v4"/><path d="M2 7h20"/><path d="M22 7v3a2 2 0 0 1-2 2a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 16 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 12 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 8 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 4 12a2 2 0 0 1-2-2V7"/>',
    package: '<path d="M11 21.73a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73z"/><path d="M12 22V12"/><path d="m3.3 7 7.703 4.734a2 2 0 0 0 1.994 0L20.7 7"/><path d="m7.5 4.27 9 5.15"/>',
    flame: '<path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/>',
    gift: '<rect x="3" y="8" width="18" height="4" rx="1"/><path d="M12 8v13"/><path d="M19 12v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7"/><path d="M7.5 8a2.5 2.5 0 0 1 0-5A4.8 8 0 0 1 12 8a4.8 8 0 0 1 4.5-5 2.5 2.5 0 0 1 0 5"/>',
    weight: '<circle cx="12" cy="5" r="3"/><path d="M6.5 8a2 2 0 0 0-1.905 1.46L2.1 18.5A2 2 0 0 0 4 21h16a2 2 0 0 0 1.925-2.54L19.4 9.5A2 2 0 0 0 17.48 8Z"/>',
    users: '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',
    user: '<path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>',
    alert: '<path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"/><path d="M12 9v4"/><path d="M12 17h.01"/>',
    copy: '<rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/>',
    card: '<rect width="20" height="14" x="2" y="5" rx="2"/><line x1="2" x2="22" y1="10" y2="10"/>',
    note: '<path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/>',
    pencil: '<path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"/><path d="m15 5 4 4"/>',
    snow: '<path d="M2 12h20"/><path d="M12 2v20"/><path d="m20 16-4-4 4-4"/><path d="m4 8 4 4-4 4"/><path d="m16 4-4 4-4-4"/><path d="m8 20 4-4 4 4"/>',
  };
  const WA_PATH =
    'M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z';

  function icon(name, cls = 'h-5 w-5') {
    if (name === 'whatsapp') {
      return `<svg class="${cls}" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="${WA_PATH}"/></svg>`;
    }
    return `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICONS[name] || ''}</svg>`;
  }
  function hydrateIcons(root = document) {
    $$('.js-icon', root).forEach((el) => {
      el.outerHTML = icon(el.dataset.icon, `${el.dataset.class || 'h-5 w-5'} ${el.className.replace('js-icon', '')}`.trim());
    });
  }

  /* ------------------------------------------------------------ */
  /* WhatsApp                                                       */
  /* ------------------------------------------------------------ */
  function waNumber() {
    let n = String(CFG.whatsappNumber || '').replace(/\D/g, '');
    if (n.startsWith('00')) n = n.slice(2);
    if (n.length === 11 && n.startsWith('0')) n = '9' + n; // 05xx… → 905xx…
    if (n.length === 10 && n.startsWith('5')) n = '90' + n; // 5xx… → 905xx…
    return n.length >= 11 ? n : '';
  }
  function waLink(text) {
    const n = waNumber();
    return `https://wa.me/${n}?text=${encodeURIComponent(text)}`;
  }
  const WA_TEXTS = {
    info: `Merhaba ${CFG.brandName || ''}, menünüz ve sipariş hakkında bilgi almak istiyorum.`,
    event:
      `Merhaba ${CFG.brandName || ''}, organizasyon / ikram masası için teklif almak istiyorum.\n\n` +
      'Etkinlik türü: \nTarih: \nKişi sayısı: \nİstediğim ürünler: ',
  };

  /* ------------------------------------------------------------ */
  /* Fiyat hesaplama                                                */
  /* ------------------------------------------------------------ */
  const campaignOn = (p) => Boolean(CFG.campaign && CFG.campaign.active && p.campaign);
  function findVariant(p, variantId) {
    if (!p.variants || !p.variants.length) return null;
    return p.variants.find((v) => v.id === variantId) || null;
  }
  function unitPrice(p, optIdx, variant) {
    const opt = p.options[optIdx];
    let price = variant && Array.isArray(variant.prices) ? variant.prices[optIdx] : opt.price;
    if (variant && variant.extra) price += variant.extra;
    return Number(price) || 0;
  }
  function campaignUnitPrice(p, optIdx, variant) {
    const opt = p.options[optIdx];
    if (!campaignOn(p) || opt.campaignPrice == null) return null;
    return opt.campaignPrice + (variant && variant.extra ? variant.extra : 0);
  }
  function minPrice(p) {
    let min = Infinity;
    p.options.forEach((_, i) => {
      const vs = p.variants && p.variants.length ? p.variants : [null];
      vs.forEach((v) => {
        min = Math.min(min, unitPrice(p, i, v));
      });
    });
    return min;
  }
  function campaignOption(p) {
    if (!campaignOn(p)) return null;
    const i = p.options.findIndex((o) => o.campaignPrice != null);
    return i >= 0 ? { idx: i, opt: p.options[i] } : null;
  }

  /* ------------------------------------------------------------ */
  /* Havale / EFT                                                   */
  /* ------------------------------------------------------------ */
  const BANK = CFG.bankAccount || {};
  const hasIban = () => String(BANK.iban || '').replace(/\s/g, '').length >= 16;
  const isTransfer = (pm) => /havale|eft|iban/i.test(String(pm || ''));

  function ibanBoxHtml() {
    if (!hasIban()) {
      return `<p class="flex items-start gap-2 rounded-2xl bg-honey-50 px-4 py-3 text-xs font-bold ring-1 ring-honey/40">${icon('info', 'h-4 w-4 shrink-0 text-honey-700')}IBAN bilgisi onay mesajımızda paylaşılır. Lütfen ödemeyi siparişiniz onaylandıktan sonra yapın.</p>`;
    }
    return `
      <div class="rounded-2xl bg-honey-50 p-4 text-sm ring-1 ring-honey/40">
        <p class="text-xs font-extrabold uppercase tracking-wider text-honey-700">Havale / EFT bilgileri</p>
        ${BANK.holder ? `<p class="mt-2"><span class="text-cocoa-500">Alıcı:</span> <strong>${esc(BANK.holder)}</strong></p>` : ''}
        ${BANK.bank ? `<p class="mt-0.5"><span class="text-cocoa-500">Banka:</span> <strong>${esc(BANK.bank)}</strong></p>` : ''}
        <div class="mt-2 flex items-center justify-between gap-2 rounded-xl bg-white px-3 py-2 ring-1 ring-cocoa/10">
          <code class="break-all text-[13px] font-bold tracking-wide">${esc(BANK.iban)}</code>
          <button type="button" data-copy-iban class="inline-flex shrink-0 items-center gap-1 rounded-full bg-cocoa px-3 py-1.5 text-xs font-extrabold text-cream">${icon('copy', 'h-3.5 w-3.5')}<span>Kopyala</span></button>
        </div>
        <p class="mt-2 text-xs font-semibold text-cocoa-500">Açıklamaya sipariş numaranızı yazın. Lütfen ödemeyi siparişiniz onaylandıktan sonra yapın.</p>
      </div>`;
  }

  async function copyText(text) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch (_) {
      const ta = document.createElement('textarea');
      ta.value = text;
      ta.setAttribute('readonly', '');
      ta.style.cssText = 'position:fixed;opacity:0';
      document.body.appendChild(ta);
      ta.select();
      let ok = false;
      try {
        ok = document.execCommand('copy');
      } catch (_) {
        ok = false;
      }
      ta.remove();
      return ok;
    }
  }

  /* ------------------------------------------------------------ */
  /* Ziyaretçi istatistiği (GoatCounter – çerezsiz)                 */
  /* ------------------------------------------------------------ */
  const GC_CODE = String(CFG.goatcounterCode || '').trim().toLowerCase();
  function loadAnalytics() {
    if (!/^[a-z0-9-]+$/.test(GC_CODE)) return;
    const s = document.createElement('script');
    s.async = true;
    s.src = 'https://gc.zgo.at/count.js';
    s.dataset.goatcounter = `https://${GC_CODE}.goatcounter.com/count`;
    document.head.appendChild(s);
  }
  // Olay sayımı: örn. track('siparis-whatsapp', 'WhatsApp ile sipariş gönderildi')
  function track(path, title) {
    try {
      if (window.goatcounter && typeof window.goatcounter.count === 'function') {
        window.goatcounter.count({ path, title: title || path, event: true });
      }
    } catch (_) {
      /* istatistik hatası siteyi etkilememeli */
    }
  }

  /* ------------------------------------------------------------ */
  /* Google E-Tablo'dan fiyat güncelleme                            */
  /* Sütunlar: urun_id, urun, secenek_id, secenek, cesit_id, cesit, */
  /*           fiyat, goster  (urun/secenek/cesit yalnızca okunur)  */
  /* ------------------------------------------------------------ */
  function parseCsv(text) {
    const rows = [];
    let row = [];
    let cell = '';
    let q = false;
    for (let i = 0; i < text.length; i++) {
      const ch = text[i];
      if (q) {
        if (ch === '"' && text[i + 1] === '"') {
          cell += '"';
          i++;
        } else if (ch === '"') q = false;
        else cell += ch;
      } else if (ch === '"') q = true;
      else if (ch === ',' || ch === ';') {
        row.push(cell);
        cell = '';
      } else if (ch === '\n' || ch === '\r') {
        if (ch === '\r' && text[i + 1] === '\n') i++;
        row.push(cell);
        rows.push(row);
        row = [];
        cell = '';
      } else cell += ch;
    }
    if (cell || row.length) {
      row.push(cell);
      rows.push(row);
    }
    return rows.filter((r) => r.some((c) => c.trim()));
  }

  const toPrice = (v) => {
    const n = Number(String(v || '').replace(/[^\d,.-]/g, '').replace(/\.(?=\d{3}(\D|$))/g, '').replace(',', '.'));
    return Number.isFinite(n) && n > 0 ? Math.round(n) : null;
  };

  // Geçerli satırları uygular; değişen kayıt sayısını döndürür.
  function applyPriceSheet(text) {
    const rows = parseCsv(text);
    if (rows.length < 2) return 0;
    const head = rows[0].map((h) => norm(h).trim().replace(/\s+/g, '_'));
    const col = (name) => head.indexOf(name);
    const iP = col('urun_id');
    const iO = col('secenek_id');
    const iV = col('cesit_id');
    const iF = col('fiyat');
    const iS = col('goster');
    if (iP < 0) return 0;
    let changed = 0;
    const hidden = new Set();
    rows.slice(1).forEach((r) => {
      const p = byId[(r[iP] || '').trim()];
      if (!p) return;
      if (iS >= 0 && /^(hayir|hayır|yok|0|false|gizle)$/i.test((r[iS] || '').trim())) hidden.add(p.id);
      if (iO < 0 || iF < 0) return;
      const price = toPrice(r[iF]);
      const optIdx = p.options.findIndex((o) => o.id === (r[iO] || '').trim());
      if (price == null || optIdx < 0) return;
      const vId = iV >= 0 ? (r[iV] || '').trim() : '';
      const v = vId ? findVariant(p, vId) : null;
      if (v && Array.isArray(v.prices)) {
        if (v.prices[optIdx] !== price) changed++;
        v.prices[optIdx] = price;
      } else if (!vId) {
        if (p.options[optIdx].price !== price) changed++;
        p.options[optIdx].price = price;
      }
    });
    if (hidden.size) {
      for (let i = PRODUCTS.length - 1; i >= 0; i--) {
        if (hidden.has(PRODUCTS[i].id)) {
          PRODUCTS.splice(i, 1);
          changed++;
        }
      }
    }
    return changed;
  }

  async function loadPriceSheet() {
    const url = String(CFG.priceSheetUrl || '').trim();
    if (!/^https:\/\//.test(url)) return;
    try {
      const ctrl = typeof AbortController === 'function' ? new AbortController() : null;
      const timer = ctrl && setTimeout(() => ctrl.abort(), 8000);
      const res = await fetch(url, { cache: 'no-store', signal: ctrl && ctrl.signal });
      if (timer) clearTimeout(timer);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      if (!applyPriceSheet(await res.text())) return;
      cart = cart.filter((l) => PRODUCTS.some((p) => p.id === l.productId));
      saveCart();
      $('#stat-count').textContent = PRODUCTS.length;
      renderSetMenus();
      renderPopular();
      renderChips();
      renderMenu();
      updateCartIndicators();
      if (isOpen('cart')) renderCart();
    } catch (err) {
      console.warn('[Periler Mutfakta] Fiyat tablosu okunamadı, sitedeki fiyatlar kullanılıyor.', err);
    }
  }

  /* ------------------------------------------------------------ */
  /* Sepet                                                          */
  /* ------------------------------------------------------------ */
  let cart = (store.get(KEY_CART, []) || []).filter((l) => l && byId[l.productId]);
  let customer = store.get(KEY_CUSTOMER, {}) || {};
  let cartStep = 'cart'; // cart | details | summary | sent
  let orderNo = null;

  const lineKey = (l) => [l.productId, l.optionId, l.variantId || '', (l.note || '').trim()].join('|');

  function resolveLine(line) {
    const p = byId[line.productId];
    if (!p) return null;
    const optIdx = p.options.findIndex((o) => o.id === line.optionId);
    if (optIdx < 0) return null;
    const variant = findVariant(p, line.variantId);
    if (p.variants && p.variants.length && !variant) return null;
    return {
      line,
      p,
      opt: p.options[optIdx],
      optIdx,
      variant,
      unit: unitPrice(p, optIdx, variant),
      camp: campaignUnitPrice(p, optIdx, variant),
    };
  }

  const campaignMin = () => Number(CFG.campaign && CFG.campaign.minOrder) || 0;

  function computeTotals(method = customer.method || 'delivery') {
    let subtotal = 0;
    let campRow = null;
    const rows = cart
      .map(resolveLine)
      .filter(Boolean)
      .map((r) => {
        const row = { ...r, lineTotal: r.unit * r.line.qty, lineDiscount: 0 };
        if (!campRow && r.camp != null && r.camp < r.unit) campRow = row;
        subtotal += row.lineTotal;
        return row;
      });
    // Kampanya: siparişte 1 adet için, indirim sonrası tutar campaign.minOrder ve üzeriyse
    let discount = 0;
    let campaignUsed = false;
    let campaignRemain = 0;
    if (campRow) {
      const d = campRow.unit - campRow.camp;
      const remain = campaignMin() - (subtotal - d);
      if (remain <= 0) {
        campRow.lineDiscount = d;
        discount = d;
        campaignUsed = true;
      } else {
        campaignRemain = remain;
      }
    }
    const net = subtotal - discount;
    const count = rows.reduce((a, r) => a + r.line.qty, 0);
    const threshold = Number(CFG.freeDeliveryThreshold) || 0;
    let delivery = 0;
    if (count && method !== 'pickup') {
      delivery = threshold && net >= threshold ? 0 : Number(CFG.deliveryFee) || 0;
    }
    return { rows, subtotal, discount, net, delivery, total: net + delivery, count, campaignUsed, campaignRemain };
  }

  function saveCart() {
    store.set(KEY_CART, cart);
  }

  function addToCart(item) {
    const key = lineKey(item);
    const existing = cart.find((l) => lineKey(l) === key);
    if (existing) existing.qty = Math.min(99, existing.qty + item.qty);
    else cart.push({ ...item });
    orderNo = null;
    saveCart();
    updateCartIndicators(true);
    if (isOpen('cart')) renderCart();
  }

  function changeQty(index, delta) {
    const line = cart[index];
    if (!line) return;
    line.qty = Math.max(0, Math.min(99, line.qty + delta));
    if (line.qty === 0) cart.splice(index, 1);
    orderNo = null;
    saveCart();
    updateCartIndicators();
    renderCart();
  }

  function removeLine(index) {
    cart.splice(index, 1);
    orderNo = null;
    saveCart();
    updateCartIndicators();
    renderCart();
  }

  function clearCart() {
    cart = [];
    orderNo = null;
    saveCart();
    updateCartIndicators();
  }

  function updateCartIndicators(bump = false) {
    const t = computeTotals();
    const countEl = $('#cart-count');
    countEl.textContent = t.count;
    countEl.hidden = t.count === 0;
    if (bump) {
      countEl.classList.remove('animate-pop');
      void countEl.offsetWidth;
      countEl.classList.add('animate-pop');
    }
    $('#cart-total-header').textContent = t.count ? money(t.net) : '';
    $('#cart-bar-count').textContent = t.count;
    $('#cart-bar-total').textContent = money(t.net);
    const showBar = t.count > 0 && !isOpen('cart') && !isOpen('product');
    $('#cart-bar').hidden = !showBar;
    document.body.classList.toggle('has-cart-bar', t.count > 0);
  }

  /* ------------------------------------------------------------ */
  /* Modal yönetimi                                                 */
  /* ------------------------------------------------------------ */
  const roots = { product: '#product-root', cart: '#cart-root' };
  const lastFocus = {};
  const isOpen = (name) => {
    const el = $(roots[name]);
    return el && !el.hidden;
  };

  function openRoot(name) {
    const root = $(roots[name]);
    lastFocus[name] = document.activeElement;
    root.hidden = false;
    document.body.classList.add('lock');
    requestAnimationFrame(() => requestAnimationFrame(() => root.classList.add('is-open')));
    updateCartIndicators();
  }

  function closeRoot(name) {
    const root = $(roots[name]);
    if (!root || root.hidden) return;
    root.classList.remove('is-open');
    const done = () => {
      if (root.classList.contains('is-open')) return; // kapanırken yeniden açıldı
      root.hidden = true;
      const anyOpen = isOpen('product') || isOpen('cart');
      if (!anyOpen) document.body.classList.remove('lock');
      updateCartIndicators();
      const f = lastFocus[name];
      if (!anyOpen && f && document.contains(f)) f.focus({ preventScroll: true });
    };
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) done();
    else setTimeout(done, 320);
  }

  function focusables(container) {
    return $$('a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])', container).filter(
      (el) => el.offsetParent !== null || el === document.activeElement
    );
  }

  document.addEventListener('keydown', (e) => {
    const active = isOpen('product') ? 'product' : isOpen('cart') ? 'cart' : null;
    if (!active) return;
    if (e.key === 'Escape') {
      e.preventDefault();
      closeRoot(active);
      return;
    }
    if (e.key === 'Tab') {
      const panel = $(active === 'product' ? '#product-panel' : '#cart-panel');
      const items = focusables(panel);
      if (!items.length) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      } else if (!panel.contains(document.activeElement)) {
        e.preventDefault();
        first.focus();
      }
    }
  });

  /* ------------------------------------------------------------ */
  /* Görseller                                                      */
  /* ------------------------------------------------------------ */
  const isSvg = (name) => /\.svg$/i.test(name);
  function imgUrl(name, size = 640) {
    return isSvg(name) ? `assets/img/${name}` : `assets/img/${name}-${size}.webp`;
  }
  function imgTag(name, alt, cls, sizes = '100vw', eager = false) {
    if (isSvg(name)) {
      return `<img src="${imgUrl(name)}" alt="${esc(alt)}" class="${cls}" ${eager ? '' : 'loading="lazy"'} decoding="async" />`;
    }
    return `<img src="${imgUrl(name, 640)}" srcset="${imgUrl(name, 640)} 640w, ${imgUrl(name, 1280)} 1280w" sizes="${sizes}" alt="${esc(alt)}" class="${cls}" ${
      eager ? '' : 'loading="lazy"'
    } decoding="async" />`;
  }

  /* ------------------------------------------------------------ */
  /* Etiketler                                                      */
  /* ------------------------------------------------------------ */
  const TAGS = {
    vejetaryen: { label: 'Vejetaryen', icon: 'leaf' },
    vegan: { label: 'Vegan seçenek', icon: 'leaf' },
    glutensiz: { label: 'Glutensiz', icon: 'check' },
  };
  const DIETS = [
    { id: 'vejetaryen', label: 'Vejetaryen', match: (p) => p.tags.includes('vejetaryen') || p.tags.includes('vegan') },
    { id: 'vegan', label: 'Vegan seçenek', match: (p) => p.tags.includes('vegan') },
    { id: 'glutensiz', label: 'Glutensiz', match: (p) => p.tags.includes('glutensiz') },
  ];

  function tagBadges(p) {
    return (p.tags || [])
      .filter((t) => TAGS[t])
      .map((t) => `<span class="badge-leaf">${icon(TAGS[t].icon, 'h-3 w-3')}${TAGS[t].label}</span>`)
      .join('');
  }
  function imageBadges(p) {
    const out = [];
    if (campaignOn(p)) out.push(`<span class="badge-pepper">${icon('gift', 'h-3 w-3')}Kampanya</span>`);
    if (p.popular) out.push(`<span class="badge-honey">${icon('flame', 'h-3 w-3')}Çok sevilen</span>`);
    return out.join('');
  }

  /* ------------------------------------------------------------ */
  /* Gün menüleri (hazır ikram paketleri)                           */
  /* ------------------------------------------------------------ */
  const MENU_THEMES = {
    sunset: { band: 'bg-sunset', soft: 'bg-sunset-50', text: 'text-sunset-700', ring: 'ring-sunset/30', dot: 'text-sunset' },
    leaf: { band: 'bg-leaf', soft: 'bg-leaf-50', text: 'text-leaf-700', ring: 'ring-leaf/30', dot: 'text-leaf' },
    pepper: { band: 'bg-pepper', soft: 'bg-pepper-50', text: 'text-pepper-700', ring: 'ring-pepper/30', dot: 'text-pepper' },
  };
  function renderSetMenus() {
    const box = $('#set-menus');
    if (!box) return;
    const menus = PRODUCTS.filter((p) => p.category === 'gun-menuleri');
    box.closest('section').hidden = !menus.length;
    box.innerHTML = menus
      .map((p) => {
        const th = MENU_THEMES[p.menuTheme] || MENU_THEMES.sunset;
        const first = p.options[0];
        const rest = p.options.slice(1);
        return `
        <article class="group relative flex flex-col overflow-hidden rounded-3xl bg-white shadow-warm ring-1 ring-cocoa/5 transition hover:-translate-y-1 hover:shadow-warm-lg sm:rounded-4xl">
          <button type="button" data-open="${p.id}" class="relative block aspect-[16/9] overflow-hidden bg-cream-200 sm:aspect-[4/3]" aria-label="${esc(p.name)} menüsünü gör">
            ${imgTag(p.image, p.name, 'h-full w-full object-cover transition duration-700 group-hover:scale-105', '(min-width:768px) 32vw, 100vw')}
            <span class="absolute left-3 top-3 grid h-11 w-11 place-items-center rounded-full ${th.band} font-display text-xl font-semibold text-white shadow-warm ring-4 ring-white sm:h-14 sm:w-14 sm:text-2xl">${p.menuNo || ''}</span>
          </button>
          <div class="flex flex-1 flex-col p-4 sm:p-6">
            <p class="text-[11px] font-extrabold uppercase tracking-[0.18em] ${th.text}">${p.menuNo ? `${p.menuNo}. Menü` : 'Gün Menüsü'}</p>
            <h3 class="mt-1 text-2xl font-semibold leading-tight sm:text-[1.75rem]">${esc(p.name)}</h3>
            ${p.menuTagline ? `<p class="mt-1 text-sm italic text-cocoa-500">${esc(p.menuTagline)}</p>` : ''}
            <ul class="mt-3 space-y-1.5 sm:mt-4 sm:space-y-2">
              ${(p.items || [])
                .map((it) => `<li class="flex items-center gap-2 text-[15px] font-bold text-cocoa-700">${icon('sparkles', `h-4 w-4 shrink-0 ${th.dot}`)}${esc(it)}</li>`)
                .join('')}
            </ul>
            <div class="mt-auto pt-4 sm:pt-6">
              <div class="flex items-end justify-between gap-3 rounded-2xl ${th.soft} px-4 py-3 ring-1 ${th.ring}">
                <div>
                  <p class="text-xs font-extrabold ${th.text}">${esc(first.label)}</p>
                  <p class="font-display text-2xl font-semibold leading-none sm:text-3xl">${money(first.price)}</p>
                </div>
                <div class="text-right text-[11px] font-bold leading-snug text-cocoa-500 sm:text-xs">
                  ${rest.map((o) => `${esc(o.label)} <span class="whitespace-nowrap text-cocoa">${money(o.price)}</span>`).join('<br />')}
                </div>
              </div>
              <button type="button" data-open="${p.id}" class="btn-primary mt-3 w-full">${icon('plus', 'h-4 w-4')}Menüyü Seç</button>
            </div>
          </div>
        </article>`;
      })
      .join('');
  }

  /* ------------------------------------------------------------ */
  /* Popüler satırı                                                 */
  /* ------------------------------------------------------------ */
  function renderPopular() {
    const row = $('#popular-row');
    const items = PRODUCTS.filter((p) => p.popular);
    row.innerHTML = items
      .map((p) => {
        const camp = campaignOption(p);
        const priceHtml = camp
          ? `<span class="text-xs font-bold text-cream-300/80 line-through">${money(camp.opt.price)}</span> <span class="text-lg font-extrabold text-honey sm:text-2xl">${money(camp.opt.campaignPrice)}</span>`
          : `<span class="text-[10px] font-bold uppercase tracking-wide text-cream-300/80 sm:text-xs">başlayan</span> <span class="text-lg font-extrabold sm:text-2xl">${money(minPrice(p))}</span>`;
        return `
        <article class="group relative w-[46%] shrink-0 snap-start overflow-hidden rounded-2xl bg-cocoa shadow-warm sm:w-[44%] sm:rounded-4xl sm:shadow-warm-lg lg:w-[31%] xl:w-[23.5%]">
          <div class="aspect-[4/5] overflow-hidden">
            ${imgTag(p.image, p.name, 'h-full w-full object-cover transition duration-700 group-hover:scale-105', '(min-width:1280px) 24vw, (min-width:1024px) 31vw, (min-width:640px) 44vw, 46vw')}
          </div>
          <div class="absolute inset-0 bg-gradient-to-t from-cocoa via-cocoa/30 to-transparent" aria-hidden="true"></div>
          <div class="absolute left-2 top-2 flex flex-wrap gap-1 sm:left-4 sm:top-4 sm:gap-1.5">${imageBadges(p)}</div>
          <div class="absolute inset-x-0 bottom-0 flex items-end justify-between gap-2 p-2.5 text-white sm:gap-3 sm:p-5">
            <div class="min-w-0">
              <p class="text-[9px] font-extrabold uppercase tracking-wider text-honey sm:text-xs">${esc(catById[p.category].name)}</p>
              <h3 class="mt-0.5 font-display text-[15px] font-semibold leading-tight text-white sm:mt-1 sm:text-2xl">${esc(p.name)}</h3>
              <p class="mt-1 flex flex-wrap items-baseline gap-x-1.5 sm:mt-2 sm:gap-2">${priceHtml}</p>
            </div>
            <span class="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-pepper text-white shadow-cta transition group-hover:scale-110 sm:h-12 sm:w-12" aria-hidden="true">${icon('plus', 'h-4 w-4 sm:h-6 sm:w-6')}</span>
          </div>
          <button type="button" data-open="${p.id}" class="absolute inset-0 z-10 rounded-2xl sm:rounded-4xl" aria-label="${esc(p.name)} – seçenekleri gör"></button>
        </article>`;
      })
      .join('');
  }

  /* ------------------------------------------------------------ */
  /* Menü (kategori filtreleri + kartlar)                           */
  /* ------------------------------------------------------------ */
  const filters = { category: 'all', diet: null, query: '' };

  function renderChips() {
    const counts = {};
    PRODUCTS.forEach((p) => (counts[p.category] = (counts[p.category] || 0) + 1));
    const chip = (id, label, ic, n) => `
      <button type="button" class="chip" data-cat="${id}" aria-pressed="${filters.category === id}">
        ${ic ? icon(ic, 'h-3.5 w-3.5 sm:h-4 sm:w-4') : ''}${esc(label)}<span class="rounded-full bg-cocoa/5 px-1.5 text-[10px] sm:text-[11px] font-black opacity-80">${n}</span>
      </button>`;
    $('#category-chips').innerHTML =
      chip('all', 'Tümü', 'utensils', PRODUCTS.length) + CATEGORIES.map((c) => chip(c.id, c.name, c.icon, counts[c.id] || 0)).join('');
    $('#diet-chips').innerHTML =
      `<span class="shrink-0 text-[11px] font-bold text-cocoa-400 sm:text-xs">Filtre:</span>` +
      DIETS.map(
        (d) => `<button type="button" class="chip chip-diet gap-1 px-2.5 py-1 text-[11px] sm:gap-2 sm:px-3 sm:py-1.5 sm:text-xs" data-diet="${d.id}" aria-pressed="${filters.diet === d.id}">${icon('leaf', 'h-3 w-3 sm:h-3.5 sm:w-3.5')}${d.label}</button>`
      ).join('');
  }

  function matchesQuery(p, q) {
    if (!q) return true;
    const hay = norm([p.name, p.short, ...(p.aliases || []), ...(p.ingredients || []), catById[p.category].name].join(' '));
    return q
      .split(/\s+/)
      .filter(Boolean)
      .every((w) => hay.includes(w));
  }

  function productCard(p, i) {
    const camp = campaignOption(p);
    const optionPills = p.options
      .slice(0, 4)
      .map((o) => `<span class="rounded-full bg-cream-200 px-2.5 py-1 text-[11px] font-bold text-cocoa-700">${esc(o.label)}</span>`)
      .join('');
    const price = camp
      ? `<p class="whitespace-nowrap text-[9px] font-extrabold uppercase tracking-wide text-pepper sm:text-[11px]">${esc(camp.opt.label)} · <span class="text-cocoa-400 line-through">${money(camp.opt.price)}</span></p>
         <p class="whitespace-nowrap text-base font-black leading-tight text-pepper sm:text-xl">${money(camp.opt.campaignPrice)}</p>`
      : `<p class="whitespace-nowrap text-[9px] font-bold uppercase tracking-wide text-cocoa-400 sm:text-[11px]">başlayan fiyat</p>
         <p class="whitespace-nowrap text-base font-black leading-tight sm:text-xl">${money(minPrice(p))}</p>`;
    return `
    <article class="group flex animate-fade-up overflow-hidden rounded-2xl bg-white shadow-warm-sm ring-1 sm:rounded-3xl sm:shadow-warm ring-cocoa/5 transition duration-300 hover:-translate-y-1 hover:shadow-warm-lg sm:flex-col" style="animation-delay:${Math.min(i, 8) * 45}ms">
      <button type="button" data-open="${p.id}" class="relative block min-h-[112px] w-[104px] shrink-0 self-stretch overflow-hidden bg-cream-200 sm:aspect-[4/3] sm:min-h-0 sm:w-auto sm:max-w-none sm:self-auto" aria-label="${esc(p.name)} detaylarını gör">
        ${imgTag(p.image, p.name, 'absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-105', '(min-width:1280px) 25vw, (min-width:1024px) 33vw, (min-width:640px) 50vw, 160px')}
        <span class="absolute left-1.5 top-1.5 flex flex-col items-start gap-1 sm:left-3 sm:top-3 sm:flex-row sm:flex-wrap sm:gap-1.5">${imageBadges(p)}</span>
        ${p.illustrated ? '<span class="badge-cream absolute bottom-1.5 left-1.5 normal-case tracking-normal sm:bottom-3 sm:left-3">Görsel temsilidir</span>' : ''}
      </button>
      <div class="flex min-w-0 flex-1 flex-col px-3 py-2.5 sm:p-5">
        <div class="hidden flex-wrap items-center gap-1.5 sm:flex">
          <span class="text-[11px] font-extrabold uppercase tracking-wider text-sunset-700">${esc(catById[p.category].name)}</span>
          ${tagBadges(p)}
        </div>
        <h3 class="text-[15px] font-semibold leading-snug sm:mt-2 sm:text-[1.35rem]">
          <button type="button" data-open="${p.id}" class="text-left transition hover:text-pepper">${esc(p.name)}</button>
        </h3>
        <p class="mt-0.5 line-clamp-2 text-xs leading-snug text-cocoa-500 sm:mt-1.5 sm:text-sm sm:leading-relaxed">${esc(p.short)}</p>
        <div class="mt-1.5 flex flex-wrap gap-1 sm:hidden">${tagBadges(p)}</div>
        <div class="mt-3 hidden flex-wrap gap-1.5 sm:flex">${optionPills}</div>
        <p class="mt-3 hidden items-center gap-1.5 text-xs font-semibold text-cocoa-500 sm:flex">${icon('weight', 'h-3.5 w-3.5 shrink-0 text-sunset')}${esc(p.serving)}</p>
        <div class="mt-auto flex items-end justify-between gap-2 pt-2 sm:gap-3 sm:pt-5">
          <div class="min-w-0">${price}</div>
          <button type="button" data-open="${p.id}" class="btn-primary shrink-0 gap-1 px-3 py-1.5 text-xs shadow-warm-sm sm:gap-2 sm:px-4 sm:py-2.5 sm:text-sm sm:shadow-cta">${icon('plus', 'h-3.5 w-3.5 sm:h-4 sm:w-4')}<span class="sm:hidden">Ekle</span><span class="hidden sm:inline">Sepete Ekle</span></button>
        </div>
      </div>
    </article>`;
  }

  function renderMenu() {
    const q = norm(filters.query.trim());
    const diet = DIETS.find((d) => d.id === filters.diet);
    const list = PRODUCTS.filter(
      (p) => (filters.category === 'all' || p.category === filters.category) && (!diet || diet.match(p)) && matchesQuery(p, q)
    );
    const out = $('#menu-results');
    if (!list.length) {
      out.innerHTML = `
        <div class="mx-auto max-w-md rounded-4xl bg-white p-10 text-center shadow-warm ring-1 ring-cocoa/5">
          <span class="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-honey-50 text-honey-700">${icon('search', 'h-6 w-6')}</span>
          <h3 class="mt-4 text-xl font-semibold">Aradığınızı bulamadık</h3>
          <p class="mt-2 text-sm text-cocoa-500">Farklı bir kelime deneyin ya da özel isteğinizi bize yazın; elimizden geleni yaparız.</p>
          <div class="mt-6 flex flex-wrap justify-center gap-2">
            <button type="button" class="btn-ghost" data-reset-filters>Filtreleri temizle</button>
            <a class="btn-primary" target="_blank" rel="noopener" href="${waLink(WA_TEXTS.info)}">${icon('whatsapp', 'h-4 w-4')}Bize yazın</a>
          </div>
        </div>`;
      return;
    }
    let i = 0;
    out.innerHTML = CATEGORIES.map((c) => {
      const items = list.filter((p) => p.category === c.id);
      if (!items.length) return '';
      return `
        <section class="mb-8 last:mb-4 sm:mb-14 sm:last:mb-6" aria-labelledby="cat-${c.id}">
          <div class="mb-3 flex items-end justify-between gap-3 border-b border-cocoa/10 pb-2.5 sm:mb-6 sm:gap-4 sm:pb-4">
            <div class="flex min-w-0 items-center gap-2.5 sm:gap-3">
              <span class="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-sunset text-white shadow-warm-sm sm:h-12 sm:w-12 sm:rounded-2xl sm:shadow-warm">${icon(c.icon, 'h-5 w-5 sm:h-6 sm:w-6')}</span>
              <div>
                <h3 id="cat-${c.id}" class="text-lg font-semibold leading-tight sm:text-[1.7rem]">${esc(c.name)}</h3>
                <p class="truncate text-xs font-semibold text-sunset-700 sm:text-sm">${esc(c.blurb)}</p>
              </div>
            </div>
            <span class="shrink-0 text-xs font-bold text-cocoa-400 sm:text-sm">${items.length} ürün</span>
          </div>
          <div class="grid gap-2.5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 xl:grid-cols-4">${items.map((p) => productCard(p, i++)).join('')}</div>
        </section>`;
    }).join('');
  }

  function setFilter(patch, scroll = true) {
    Object.assign(filters, patch);
    renderChips();
    renderMenu();
    if (scroll) {
      const target = $('#menu-results');
      const top = target.getBoundingClientRect().top + window.scrollY - 190;
      if (Math.abs(window.scrollY - top) > 40 && window.scrollY > top) window.scrollTo({ top, behavior: 'smooth' });
      else if (target.getBoundingClientRect().top > window.innerHeight * 0.6) window.scrollTo({ top, behavior: 'smooth' });
    }
  }

  /* ------------------------------------------------------------ */
  /* Ürün detay penceresi                                           */
  /* ------------------------------------------------------------ */
  let sel = null; // { p, optIdx, variantId, qty }

  function priceCellHtml(p, i, variant) {
    const unit = unitPrice(p, i, variant);
    const camp = campaignUnitPrice(p, i, variant);
    if (camp != null && camp < unit) {
      return `<span class="block text-xs font-bold text-cocoa-400 line-through">${money(unit)}</span>
              <span class="block text-base font-black text-pepper">${money(camp)}</span>`;
    }
    return `<span class="block text-base font-black">${money(unit)}</span>`;
  }

  function selectionTotal() {
    const { p, optIdx, qty } = sel;
    const variant = findVariant(p, sel.variantId);
    const unit = unitPrice(p, optIdx, variant);
    const camp = campaignUnitPrice(p, optIdx, variant);
    if (camp != null && camp < unit) {
      const t = computeTotals();
      const hasCampItem = t.rows.some((r) => r.camp != null && r.camp < r.unit);
      if (!hasCampItem && t.subtotal + unit * qty - (unit - camp) >= campaignMin()) return camp + unit * (qty - 1);
    }
    return unit * qty;
  }

  function openProduct(id, presetOptIdx) {
    const p = byId[id];
    if (!p) return;
    const camp = campaignOption(p);
    sel = {
      p,
      optIdx: presetOptIdx != null ? presetOptIdx : camp ? camp.idx : 0,
      variantId: p.variants && p.variants.length ? p.variants[0].id : null,
      qty: 1,
    };
    const cat = catById[p.category];
    const variant = findVariant(p, sel.variantId);
    const gallery = p.gallery && p.gallery.length > 1 ? p.gallery : null;

    $('#product-panel').innerHTML = `
      <div class="min-h-0 flex-1 overflow-y-auto sm:grid sm:grid-cols-[minmax(0,1fr)_minmax(0,1.08fr)] sm:overflow-hidden">
        <div class="relative bg-cream-200 sm:h-full">
          <div id="pd-image" class="aspect-[16/10] w-full overflow-hidden sm:aspect-auto sm:h-full">
            ${imgTag(p.image, p.name, 'h-full w-full object-cover', '(min-width:640px) 48vw, 100vw', true)}
          </div>
          <span class="absolute left-3 top-3 flex flex-wrap gap-1.5 sm:left-4 sm:top-4">${imageBadges(p)}</span>
          ${p.illustrated ? '<span class="badge-cream absolute bottom-4 left-4 normal-case tracking-normal">Görsel temsilidir</span>' : ''}
          ${
            p.photoCredit
              ? `<a href="${esc(p.photoCredit.url)}" target="_blank" rel="noopener" class="absolute bottom-2 right-2 rounded-full bg-cocoa/55 px-2 py-0.5 text-[10px] font-semibold text-white/90 backdrop-blur-sm hover:bg-cocoa/75">Foto: ${esc(p.photoCredit.author)} · ${esc(p.photoCredit.license)}</a>`
              : ''
          }
          ${
            gallery
              ? `<div class="absolute bottom-4 left-4 flex gap-2">${gallery
                  .map(
                    (g, gi) => `<button type="button" data-gallery="${g}" class="h-14 w-14 overflow-hidden rounded-xl ring-2 ${gi === 0 ? 'ring-white' : 'ring-white/40'} shadow-warm transition hover:ring-white" aria-label="Görsel ${gi + 1}">${imgTag(g, '', 'h-full w-full object-cover', '56px')}</button>`
                  )
                  .join('')}</div>`
              : ''
          }
          <button type="button" data-close-product class="absolute right-3 top-3 grid h-9 w-9 sm:right-4 sm:top-4 sm:h-11 sm:w-11 place-items-center rounded-full bg-white/95 text-cocoa shadow-warm transition hover:text-pepper" aria-label="Kapat">${icon('x', 'h-5 w-5')}</button>
        </div>

        <div class="flex flex-col sm:min-h-0">
          <div class="p-4 sm:min-h-0 sm:flex-1 sm:overflow-y-auto sm:p-8">
            <div class="flex flex-wrap items-center gap-1.5">
              <span class="text-xs font-extrabold uppercase tracking-wider text-sunset-700">${esc(cat.name)}</span>
              ${tagBadges(p)}
            </div>
            <h2 id="product-title" class="mt-1 text-[1.4rem] font-semibold leading-tight sm:mt-2 sm:text-[2.2rem]">${esc(p.name)}</h2>
            <p class="mt-2 text-sm leading-relaxed text-cocoa-500 sm:mt-3 sm:text-base">${esc(p.description)}</p>

            ${
              campaignOn(p) && CFG.campaign
                ? `<div class="mt-5 flex items-start gap-3 rounded-2xl bg-honey-50 p-4 ring-1 ring-honey/40">
                    <span class="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-honey text-cocoa">${icon('gift', 'h-5 w-5')}</span>
                    <p class="text-sm"><strong class="font-extrabold">${esc(CFG.campaign.title)}:</strong> ${esc(CFG.campaign.text)}. Sepet tutarı (indirim sonrası) ${money(campaignMin())} ve üzeri olduğunda 1 adet için otomatik uygulanır; sos/süsleme farkı ayrıca eklenir.</p>
                  </div>`
                : ''
            }

            ${
              p.variants && p.variants.length
                ? `<fieldset class="mt-6">
                    <legend class="field-label">${esc(p.variantLabel || 'Çeşit')} seçin</legend>
                    <div class="flex flex-wrap gap-2">
                      ${p.variants
                        .map(
                          (v) => `<label class="variant-pill"><input type="radio" name="pd-variant" value="${v.id}" class="sr-only" ${v.id === sel.variantId ? 'checked' : ''} />${esc(v.name)}${
                            v.extra ? ` <span class="opacity-75">+${money(v.extra)}</span>` : ''
                          }</label>`
                        )
                        .join('')}
                    </div>
                    <p id="pd-variant-note" class="mt-2 text-xs font-semibold text-cocoa-500" ${variant && variant.note ? '' : 'hidden'}>${esc(variant && variant.note)}</p>
                  </fieldset>`
                : ''
            }

            <fieldset class="mt-6">
              <legend class="field-label">Porsiyon / miktar seçin</legend>
              <div class="grid gap-2">
                ${p.options
                  .map(
                    (o, i) => `
                  <label class="option-card">
                    <input type="radio" name="pd-option" value="${i}" class="sr-only" ${i === sel.optIdx ? 'checked' : ''} />
                    <span class="flex items-center gap-3">
                      <span class="radio-dot"></span>
                      <span>
                        <span class="block font-extrabold">${esc(o.label)}${o.campaignPrice != null && campaignOn(p) ? ' <span class="badge-honey ml-1 align-middle">Kampanya</span>' : ''}</span>
                        <span class="block text-xs font-semibold text-cocoa-500">${esc(o.detail)}</span>
                      </span>
                    </span>
                    <span class="shrink-0 text-right" data-opt-price="${i}">${priceCellHtml(p, i, variant)}</span>
                  </label>`
                  )
                  .join('')}
              </div>
            </fieldset>

            <div class="mt-5 grid grid-cols-2 gap-2 sm:mt-6 sm:gap-3">
              <div class="rounded-2xl bg-white p-4 ring-1 ring-cocoa/5">
                <p class="flex items-center gap-2 text-xs font-extrabold uppercase tracking-wide text-sunset-700">${icon('weight', 'h-4 w-4')}Porsiyon gramajı</p>
                <p class="mt-1 text-sm font-semibold">${esc(p.serving)}</p>
              </div>
              <div class="rounded-2xl bg-white p-4 ring-1 ring-cocoa/5">
                <p class="flex items-center gap-2 text-xs font-extrabold uppercase tracking-wide text-sunset-700">${icon('snow', 'h-4 w-4')}Saklama</p>
                <p class="mt-1 text-sm font-semibold">${esc(p.storage || '—')}</p>
              </div>
            </div>

            <div class="mt-6">
              <p class="field-label">İçindekiler</p>
              <ul class="flex flex-wrap gap-1.5">
                ${(p.ingredients || []).map((x) => `<li class="rounded-full bg-cream-200 px-3 py-1 text-xs font-semibold text-cocoa-700">${esc(x)}</li>`).join('')}
              </ul>
              ${
                p.allergens && p.allergens.length
                  ? `<p class="mt-3 flex items-start gap-2 rounded-2xl bg-pepper-50 px-4 py-3 text-xs font-semibold text-pepper-800">${icon('alert', 'mt-0.5 h-4 w-4 shrink-0')}<span><strong>Alerjen:</strong> ${p.allergens.map(esc).join(', ')}</span></p>`
                  : ''
              }
            </div>

            <div class="mt-6">
              <label for="pd-note" class="field-label">Bu ürün için notunuz <span class="font-semibold text-cocoa-400">(isteğe bağlı)</span></label>
              <textarea id="pd-note" rows="2" maxlength="140" class="field resize-none" placeholder="Örn: Az tuzlu olsun, üzerine “İyi ki doğdun” yazılsın…"></textarea>
            </div>
            <p class="mt-4 flex items-center gap-2 text-xs font-semibold text-cocoa-400">${icon('calendar', 'h-4 w-4')}En az ${Number(CFG.leadTimeDays) || 1} gün önceden sipariş verilmelidir.</p>
          </div>

          <div class="sticky bottom-0 flex items-center gap-2 border-t border-cocoa/10 bg-cream/95 px-3 py-2.5 pb-[max(0.625rem,env(safe-area-inset-bottom))] backdrop-blur sm:gap-3 sm:p-4 sm:px-8">
            <div class="stepper" role="group" aria-label="Adet">
              <button type="button" data-pd-qty="-1" aria-label="Azalt">${icon('minus', 'h-4 w-4')}</button>
              <output id="pd-qty" aria-live="polite">1</output>
              <button type="button" data-pd-qty="1" aria-label="Artır">${icon('plus', 'h-4 w-4')}</button>
            </div>
            <button type="button" id="pd-add" class="btn-primary min-w-0 flex-1 whitespace-nowrap px-3 py-3 text-sm sm:px-4 sm:py-3.5 sm:text-base">
              ${icon('bag', 'hidden h-5 w-5 shrink-0 min-[400px]:block')}<span>Sepete Ekle</span><span class="opacity-60">·</span><span id="pd-total" class="tabular-nums"></span>
            </button>
          </div>
        </div>
      </div>`;

    updateProductTotals();
    if (!isOpen('product')) openRoot('product');
    setTimeout(() => {
      const first = $('#product-panel input[name="pd-option"]:checked') || $('#pd-add');
      if (first) first.focus({ preventScroll: true });
    }, 60);
  }

  function updateProductTotals() {
    if (!sel) return;
    const variant = findVariant(sel.p, sel.variantId);
    sel.p.options.forEach((_, i) => {
      const cell = $(`[data-opt-price="${i}"]`, $('#product-panel'));
      if (cell) cell.innerHTML = priceCellHtml(sel.p, i, variant);
    });
    const note = $('#pd-variant-note');
    if (note) {
      note.hidden = !(variant && variant.note);
      note.textContent = (variant && variant.note) || '';
    }
    $('#pd-qty').textContent = sel.qty;
    $('#pd-total').textContent = money(selectionTotal());
    const dec = $('[data-pd-qty="-1"]');
    if (dec) dec.disabled = sel.qty <= 1;
  }

  /* ------------------------------------------------------------ */
  /* Sepet çekmecesi                                                */
  /* ------------------------------------------------------------ */
  const STEPS = [
    { id: 'cart', label: 'Sepet' },
    { id: 'details', label: 'Bilgiler' },
    { id: 'summary', label: 'Özet' },
  ];

  function renderSteps() {
    const activeIdx = cartStep === 'sent' ? 3 : STEPS.findIndex((s) => s.id === cartStep);
    $('#cart-steps').innerHTML = STEPS.map((s, i) => {
      const done = i < activeIdx;
      const active = i === activeIdx;
      return `<div>
        <div class="h-1.5 rounded-full ${done || active ? 'bg-sunset' : 'bg-cocoa/10'}"></div>
        <p class="mt-1.5 text-[11px] font-extrabold uppercase tracking-wide ${active ? 'text-sunset-700' : done ? 'text-cocoa-500' : 'text-cocoa-300'}">${i + 1}. ${s.label}</p>
      </div>`;
    }).join('');
    const t = computeTotals();
    const titles = { cart: 'Sepetim', details: 'Teslimat Bilgileri', summary: 'Sipariş Özeti', sent: 'Neredeyse tamam!' };
    $('#cart-title').textContent = titles[cartStep];
    $('#cart-subtitle').textContent = t.count ? `${t.count} ürün · ${money(t.net)}` : 'Sepetiniz boş';
  }

  function totalsHtml(t, method, { showDeliveryHint = false } = {}) {
    const isPickup = method === 'pickup';
    const threshold = Number(CFG.freeDeliveryThreshold) || 0;
    let hint = '';
    if (showDeliveryHint && !isPickup && threshold && t.count) {
      const remain = threshold - t.net;
      const pct = Math.max(4, Math.min(100, (t.net / threshold) * 100));
      hint = `
        <div class="mb-4 rounded-2xl bg-white p-3 ring-1 ring-cocoa/5">
          <p class="flex items-center gap-2 text-xs font-bold ${remain > 0 ? 'text-cocoa-700' : 'text-leaf'}">${icon('truck', 'h-4 w-4 shrink-0')}${
            remain > 0 ? `Ücretsiz teslimata <strong class="text-pepper">${money(remain)}</strong> kaldı` : 'Teslimat ücretsiz!'
          }</p>
          <div class="mt-2 h-1.5 overflow-hidden rounded-full bg-cocoa/10"><div class="h-full rounded-full ${remain > 0 ? 'bg-sunset' : 'bg-leaf'}" style="width:${pct}%"></div></div>
        </div>`;
    }
    return `
      ${hint}
      <dl class="space-y-1.5 text-sm">
        <div class="flex justify-between"><dt class="text-cocoa-500">Ara toplam</dt><dd class="font-bold tabular-nums">${money(t.subtotal)}</dd></div>
        ${t.discount ? `<div class="flex justify-between text-pepper"><dt>Kampanya indirimi</dt><dd class="font-bold tabular-nums">−${money(t.discount)}</dd></div>` : ''}
        <div class="flex justify-between"><dt class="text-cocoa-500">${isPickup ? 'Gel-al' : 'Teslimat'}</dt><dd class="font-bold tabular-nums">${
          isPickup || t.delivery === 0 ? '<span class="text-leaf">Ücretsiz</span>' : money(t.delivery)
        }</dd></div>
        <div class="flex items-baseline justify-between border-t border-dashed border-cocoa/15 pt-2.5"><dt class="font-extrabold">Toplam</dt><dd class="font-display text-2xl font-semibold tabular-nums">${money(t.total)}</dd></div>
      </dl>`;
  }

  function renderCart() {
    renderSteps();
    const body = $('#cart-body');
    const footer = $('#cart-footer');
    const t = computeTotals();

    if (!t.count && cartStep !== 'sent') cartStep = 'cart';

    if (cartStep === 'cart') {
      if (!t.count) {
        body.innerHTML = `
          <div class="grid h-full place-items-center py-10 text-center">
            <div>
              <span class="mx-auto grid h-20 w-20 place-items-center rounded-full bg-honey-50 text-honey-700">${icon('bag', 'h-9 w-9')}</span>
              <h3 class="mt-5 text-xl font-semibold">Sepetiniz henüz boş</h3>
              <p class="mt-2 text-sm text-cocoa-500">Menümüze göz atın, canınızın çektiği lezzeti ekleyin.</p>
            </div>
          </div>`;
        footer.innerHTML = `<button type="button" class="btn-primary w-full py-3.5" data-goto-menu>${icon('utensils', 'h-5 w-5')}Menüye Göz At</button>`;
        return;
      }
      const method = customer.method || 'delivery';
      body.innerHTML = `
        <ul class="space-y-3">
          ${t.rows
            .map((r, idx) => {
              const realIdx = cart.indexOf(r.line);
              return `
            <li class="flex gap-3 rounded-3xl bg-white p-3 shadow-warm-sm ring-1 ring-cocoa/5">
              <button type="button" data-open="${r.p.id}" class="h-20 w-20 shrink-0 overflow-hidden rounded-2xl bg-cream-200" aria-label="${esc(r.p.name)}">${imgTag(r.p.image, r.p.name, 'h-full w-full object-cover', '80px')}</button>
              <div class="min-w-0 flex-1">
                <div class="flex items-start justify-between gap-2">
                  <p class="font-extrabold leading-tight">${esc(r.p.name)}</p>
                  <button type="button" data-remove="${realIdx}" class="-mr-1 -mt-1 grid h-8 w-8 shrink-0 place-items-center rounded-full text-cocoa-400 transition hover:bg-pepper-50 hover:text-pepper" aria-label="${esc(r.p.name)} ürününü kaldır">${icon('trash', 'h-4 w-4')}</button>
                </div>
                <p class="mt-0.5 text-xs font-semibold text-cocoa-500">${esc(r.opt.label)} · ${esc(r.opt.detail)}${r.variant ? ` · ${esc(r.variant.name)}` : ''}</p>
                ${r.line.note ? `<p class="mt-1 text-xs italic text-cocoa-500">Not: ${esc(r.line.note)}</p>` : ''}
                <div class="mt-2 flex items-center justify-between gap-2">
                  <div class="stepper scale-90 origin-left" role="group" aria-label="Adet">
                    <button type="button" data-qty="${realIdx}" data-delta="-1" aria-label="Azalt">${icon('minus', 'h-4 w-4')}</button>
                    <output>${r.line.qty}</output>
                    <button type="button" data-qty="${realIdx}" data-delta="1" aria-label="Artır">${icon('plus', 'h-4 w-4')}</button>
                  </div>
                  <div class="text-right">
                    ${
                      r.lineDiscount
                        ? `<p class="text-[11px] font-bold text-cocoa-400 line-through">${money(r.lineTotal)}</p><p class="font-black text-pepper tabular-nums">${money(r.lineTotal - r.lineDiscount)}</p>`
                        : `<p class="font-black tabular-nums">${money(r.lineTotal)}</p>`
                    }
                  </div>
                </div>
              </div>
            </li>`;
            })
            .join('')}
        </ul>
        <button type="button" data-goto-menu class="mt-4 inline-flex items-center gap-2 text-sm font-extrabold text-sunset-700 hover:text-sunset-600">${icon('plus', 'h-4 w-4')}Başka ürün ekle</button>
        ${
          t.discount
            ? `<p class="mt-4 flex items-center gap-2 rounded-2xl bg-honey-50 px-4 py-3 text-xs font-bold ring-1 ring-honey/40">${icon('gift', 'h-4 w-4 shrink-0 text-honey-700')}Kampanya uygulandı! ${money(t.discount)} kazandınız.</p>`
            : t.campaignRemain
              ? `<p class="mt-4 flex items-center gap-2 rounded-2xl bg-honey-50 px-4 py-3 text-xs font-bold ring-1 ring-honey/40">${icon('gift', 'h-4 w-4 shrink-0 text-honey-700')}<span>${money(t.campaignRemain)} daha ekleyin, San Sebastian kampanya fiyatına düşsün!</span></p>`
              : ''
        }`;
      const min = Number(CFG.minOrderAmount) || 0;
      const belowMin = min && t.net < min;
      footer.innerHTML = `
        ${totalsHtml(t, method, { showDeliveryHint: true })}
        ${belowMin ? `<p class="mt-3 rounded-2xl bg-pepper-50 px-4 py-2.5 text-xs font-bold text-pepper-700">Minimum sipariş tutarı ${money(min)}. ${money(min - t.net)} daha ekleyin.</p>` : ''}
        <button type="button" class="btn-primary mt-4 w-full py-4 text-base" data-step="details" ${belowMin ? 'disabled' : ''}>
          Siparişi Tamamla ${icon('arrow-right', 'h-5 w-5')}
        </button>`;
      return;
    }

    if (cartStep === 'details') {
      const c = customer;
      const method = c.method || 'delivery';
      const minDate = dateInputValue(addDays(new Date(), Number(CFG.leadTimeDays) || 1));
      const slots = CFG.timeSlots || [];
      const pays = CFG.paymentMethods || [];
      const fee = Number(CFG.deliveryFee) || 0;
      body.innerHTML = `
        <form id="checkout-form" novalidate class="space-y-5">
          <fieldset>
            <legend class="field-label">Teslimat şekli</legend>
            <div class="grid grid-cols-2 gap-2">
              <label class="option-card flex-col items-start justify-start gap-1">
                <input type="radio" name="method" value="delivery" class="sr-only" ${method !== 'pickup' ? 'checked' : ''} />
                <span class="flex items-center gap-2 font-extrabold">${icon('truck', 'h-5 w-5 text-sunset')}Adrese teslim</span>
                <span class="text-xs font-semibold text-cocoa-500">${fee ? `${money(fee)}${CFG.freeDeliveryThreshold ? ` · ${money(CFG.freeDeliveryThreshold)} üzeri ücretsiz` : ''}` : 'Ücretsiz'}</span>
              </label>
              <label class="option-card flex-col items-start justify-start gap-1">
                <input type="radio" name="method" value="pickup" class="sr-only" ${method === 'pickup' ? 'checked' : ''} />
                <span class="flex items-center gap-2 font-extrabold">${icon('store', 'h-5 w-5 text-sunset')}Gel-al</span>
                <span class="text-xs font-semibold text-cocoa-500">Ücretsiz · adres WhatsApp'tan</span>
              </label>
            </div>
          </fieldset>

          <div>
            <label class="field-label" for="f-name">Ad Soyad *</label>
            <input id="f-name" name="name" class="field" autocomplete="name" value="${esc(c.name)}" placeholder="Adınız ve soyadınız" />
            <p class="mt-1 text-xs font-bold text-pepper" data-err="name" hidden></p>
          </div>
          <div>
            <label class="field-label" for="f-phone">Telefon *</label>
            <input id="f-phone" name="phone" type="tel" inputmode="tel" class="field" autocomplete="tel" value="${esc(c.phone)}" placeholder="05XX XXX XX XX" />
            <p class="mt-1 text-xs font-bold text-pepper" data-err="phone" hidden></p>
          </div>

          <div data-delivery-only ${method === 'pickup' ? 'hidden' : ''} class="space-y-5">
            <div>
              <label class="field-label" for="f-address">Açık adres *</label>
              <textarea id="f-address" name="address" rows="3" class="field resize-none" autocomplete="street-address" placeholder="Mahalle, sokak, bina no, daire no">${esc(c.address)}</textarea>
              <p class="mt-1 text-xs font-bold text-pepper" data-err="address" hidden></p>
            </div>
            <div>
              <label class="field-label" for="f-district">İlçe / semt *</label>
              <input id="f-district" name="district" class="field" autocomplete="address-level2" value="${esc(c.district)}" placeholder="Örn: Kadıköy / Moda" />
              <p class="mt-1 text-xs font-bold text-pepper" data-err="district" hidden></p>
            </div>
          </div>

          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="field-label" for="f-date">Teslim tarihi *</label>
              <input id="f-date" name="date" type="date" class="field" min="${minDate}" value="${c.date && c.date >= minDate ? esc(c.date) : minDate}" />
              <p class="mt-1 text-xs font-bold text-pepper" data-err="date" hidden></p>
            </div>
            <div>
              <label class="field-label" for="f-slot">Saat aralığı *</label>
              <select id="f-slot" name="slot" class="field">
                ${slots.map((s) => `<option ${c.slot === s ? 'selected' : ''}>${esc(s)}</option>`).join('')}
              </select>
            </div>
          </div>

          <fieldset>
            <legend class="field-label">Ödeme yöntemi</legend>
            <div class="flex flex-wrap gap-2">
              ${pays
                .map((pm, i) => `<label class="variant-pill"><input type="radio" name="payment" value="${esc(pm)}" class="sr-only" ${(c.payment ? c.payment === pm : i === 0) ? 'checked' : ''} />${esc(pm)}</label>`)
                .join('')}
            </div>
            <div class="mt-3" data-iban-box ${isTransfer(c.payment || pays[0]) ? '' : 'hidden'}>${ibanBoxHtml()}</div>
          </fieldset>

          <div>
            <label class="field-label" for="f-note">Sipariş notu <span class="font-semibold text-cocoa-400">(isteğe bağlı)</span></label>
            <textarea id="f-note" name="note" rows="2" maxlength="300" class="field resize-none" placeholder="Zil çalışmıyor, kapıda arayın; hediye paketi olsun…">${esc(c.note)}</textarea>
          </div>
          <div>
            <label class="flex cursor-pointer items-start gap-3 rounded-2xl bg-white p-3 text-xs font-semibold leading-relaxed text-cocoa-600 ring-1 ring-cocoa/10">
              <input type="checkbox" name="kvkk" value="1" class="mt-0.5 h-5 w-5 shrink-0 accent-pepper" ${c.kvkk === '1' ? 'checked' : ''} />
              <span><a href="kvkk.html" target="_blank" rel="noopener" class="font-extrabold text-sunset-700 underline underline-offset-2">KVKK Aydınlatma Metni</a>'ni okudum; sipariş bilgilerimin siparişin hazırlanması ve teslimi için WhatsApp üzerinden iletilmesini kabul ediyorum.</span>
            </label>
            <p class="mt-1 text-xs font-bold text-pepper" data-err="kvkk" hidden></p>
          </div>
          <p class="flex items-start gap-2 text-xs font-semibold text-cocoa-400">${icon('info', 'h-4 w-4 shrink-0')}Bilgileriniz sunucumuza gönderilmez; yalnızca bu cihazda saklanır ve WhatsApp mesajınıza eklenir.</p>
        </form>`;
      footer.innerHTML = `
        ${totalsHtml(t, method)}
        <div class="mt-4 flex gap-2">
          <button type="button" class="btn-ghost px-5" data-step="cart">${icon('arrow-left', 'h-5 w-5')}<span class="sr-only sm:not-sr-only">Geri</span></button>
          <button type="button" class="btn-primary flex-1 py-4 text-base" data-submit-details>Sipariş Özetini Gör ${icon('arrow-right', 'h-5 w-5')}</button>
        </div>`;
      return;
    }

    if (cartStep === 'summary') {
      const c = customer;
      const method = c.method || 'delivery';
      const tt = computeTotals(method);
      if (!orderNo) orderNo = makeOrderNo();
      const msg = buildMessage(tt, c);
      const href = waLink(msg);
      body.innerHTML = `
        <div class="rounded-3xl bg-white p-5 shadow-warm-sm ring-1 ring-cocoa/5">
          <div class="flex items-center justify-between gap-2">
            <p class="text-xs font-extrabold uppercase tracking-wider text-sunset-700">Sipariş No</p>
            <p class="font-display text-lg font-semibold">${esc(orderNo)}</p>
          </div>
          <ul class="mt-4 space-y-2.5 text-sm">
            <li class="flex gap-3">${icon('user', 'h-4 w-4 mt-0.5 shrink-0 text-sunset')}<span><strong>${esc(c.name)}</strong> · ${esc(c.phone)}</span></li>
            <li class="flex gap-3">${icon(method === 'pickup' ? 'store' : 'truck', 'h-4 w-4 mt-0.5 shrink-0 text-sunset')}<span>${
              method === 'pickup' ? 'Gel-al' : `Adrese teslim · ${esc(c.address)}${c.district ? `, ${esc(c.district)}` : ''}`
            }</span></li>
            <li class="flex gap-3">${icon('calendar', 'h-4 w-4 mt-0.5 shrink-0 text-sunset')}<span>${esc(longDate(c.date))} · ${esc(c.slot)}</span></li>
            <li class="flex gap-3">${icon('card', 'h-4 w-4 mt-0.5 shrink-0 text-sunset')}<span>${esc(c.payment)}</span></li>
            ${c.note ? `<li class="flex gap-3">${icon('note', 'h-4 w-4 mt-0.5 shrink-0 text-sunset')}<span>${esc(c.note)}</span></li>` : ''}
          </ul>
          <button type="button" data-step="details" class="mt-4 inline-flex items-center gap-1.5 text-xs font-extrabold text-sunset-700 hover:text-sunset-600">${icon('pencil', 'h-3.5 w-3.5')}Bilgileri düzenle</button>
        </div>
        ${isTransfer(c.payment) ? `<div class="mt-4">${ibanBoxHtml()}</div>` : ''}

        <div class="mt-4 rounded-3xl bg-white p-5 shadow-warm-sm ring-1 ring-cocoa/5">
          <p class="text-xs font-extrabold uppercase tracking-wider text-sunset-700">Ürünler</p>
          <ul class="mt-3 divide-y divide-cocoa/5 text-sm">
            ${tt.rows
              .map(
                (r) => `<li class="flex justify-between gap-3 py-2.5">
                  <span><strong>${r.line.qty} ×</strong> ${esc(r.p.name)}${r.variant ? ` – ${esc(r.variant.name)}` : ''}<br /><span class="text-xs text-cocoa-500">${esc(r.opt.label)} · ${esc(r.opt.detail)}</span>${
                  r.line.note ? `<br /><span class="text-xs italic text-cocoa-500">Not: ${esc(r.line.note)}</span>` : ''
                }</span>
                  <span class="shrink-0 font-bold tabular-nums ${r.lineDiscount ? 'text-pepper' : ''}">${money(r.lineTotal - r.lineDiscount)}</span>
                </li>`
              )
              .join('')}
          </ul>
        </div>

        <div class="mt-4">
          <p class="mb-2 flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-leaf">${icon('whatsapp', 'h-4 w-4')}WhatsApp mesajınız</p>
          <div class="wa-bubble">${waPreview(msg)}</div>
        </div>`;
      footer.innerHTML = `
        ${totalsHtml(tt, method)}
        <div class="mt-4 flex gap-2">
          <button type="button" class="btn-ghost px-5" data-step="details">${icon('arrow-left', 'h-5 w-5')}<span class="sr-only sm:not-sr-only">Geri</span></button>
          <a href="${href}" target="_blank" rel="noopener" class="btn-primary flex-1 py-4 text-base" data-wa-send>${icon('whatsapp', 'h-5 w-5')}WhatsApp ile Gönder</a>
        </div>
        <p class="mt-2 text-center text-[11px] font-semibold text-cocoa-400">WhatsApp açıldığında mesajınız hazır olacak; sadece <strong>Gönder</strong>'e basın.</p>`;
      return;
    }

    if (cartStep === 'sent') {
      const c = customer;
      const tt = computeTotals(c.method);
      const href = tt.count ? waLink(buildMessage(tt, c)) : waLink(WA_TEXTS.info);
      body.innerHTML = `
        <div class="py-6 text-center">
          <span class="mx-auto grid h-20 w-20 place-items-center rounded-full bg-leaf text-white shadow-warm">${icon('check', 'h-10 w-10')}</span>
          <h3 class="mt-6 text-2xl font-semibold">Siparişiniz WhatsApp'a aktarıldı</h3>
          <p class="mx-auto mt-3 max-w-xs text-sm leading-relaxed text-cocoa-500">WhatsApp'ta mesajınızı <strong class="text-cocoa">Gönder</strong>'e basarak iletmeyi unutmayın. Siparişiniz, onay mesajımızla kesinleşir.</p>
          <div class="mx-auto mt-6 max-w-xs rounded-2xl bg-white p-4 text-sm shadow-warm-sm ring-1 ring-cocoa/5">
            <p class="flex justify-between"><span class="text-cocoa-500">Sipariş No</span><strong>${esc(orderNo || '-')}</strong></p>
            <p class="mt-1 flex justify-between"><span class="text-cocoa-500">Toplam</span><strong>${money(tt.total)}</strong></p>
          </div>
          ${isTransfer(c.payment) ? `<div class="mx-auto mt-4 max-w-xs text-left">${ibanBoxHtml()}</div>` : ''}
          <a href="${href}" target="_blank" rel="noopener" class="btn-secondary mt-6">${icon('whatsapp', 'h-5 w-5 text-leaf')}WhatsApp'ı tekrar aç</a>
        </div>`;
      footer.innerHTML = `
        <button type="button" class="btn-primary w-full py-4 text-base" data-finish>${icon('check', 'h-5 w-5')}Sepeti Temizle ve Kapat</button>
        <button type="button" class="mt-2 w-full py-2 text-sm font-bold text-cocoa-500 hover:text-cocoa" data-step="cart">Sepete geri dön</button>`;
    }
  }

  /* ------------------------------------------------------------ */
  /* Form doğrulama                                                 */
  /* ------------------------------------------------------------ */
  function readForm() {
    const f = $('#checkout-form');
    if (!f) return customer;
    const data = Object.fromEntries(new FormData(f).entries());
    Object.keys(data).forEach((k) => (data[k] = String(data[k]).trim()));
    data.kvkk = data.kvkk === '1' ? '1' : '';
    return { ...customer, ...data };
  }

  function validate(data) {
    const errs = {};
    if (!data.name || data.name.length < 3) errs.name = 'Lütfen adınızı ve soyadınızı yazın.';
    const digits = (data.phone || '').replace(/\D/g, '');
    if (digits.length < 10 || digits.length > 13) errs.phone = 'Lütfen geçerli bir telefon numarası yazın.';
    if (data.method !== 'pickup') {
      if (!data.address || data.address.length < 10) errs.address = 'Lütfen açık adresinizi yazın.';
      if (!data.district || data.district.length < 2) errs.district = 'Lütfen ilçe / semt yazın.';
    }
    const minDate = dateInputValue(addDays(new Date(), Number(CFG.leadTimeDays) || 1));
    if (!data.date) errs.date = 'Lütfen teslim tarihi seçin.';
    else if (data.date < minDate) errs.date = `En erken ${longDate(minDate)} için sipariş alabiliyoruz.`;
    if (data.kvkk !== '1') errs.kvkk = 'Devam etmek için aydınlatma metnini onaylayın.';
    return errs;
  }

  function showErrors(errs) {
    $$('[data-err]').forEach((el) => {
      const k = el.dataset.err;
      const input = $(`[name="${k}"]`);
      if (errs[k]) {
        el.textContent = errs[k];
        el.hidden = false;
        if (input) input.setAttribute('aria-invalid', 'true');
      } else {
        el.hidden = true;
        if (input) input.removeAttribute('aria-invalid');
      }
    });
    const firstKey = Object.keys(errs)[0];
    if (firstKey) {
      const input = $(`[name="${firstKey}"]`);
      if (input) {
        input.focus();
        input.scrollIntoView({ block: 'center', behavior: 'smooth' });
      }
    }
  }

  /* ------------------------------------------------------------ */
  /* Tarih & mesaj                                                  */
  /* ------------------------------------------------------------ */
  function addDays(d, n) {
    const x = new Date(d);
    x.setDate(x.getDate() + n);
    return x;
  }
  function dateInputValue(d) {
    const p = (n) => String(n).padStart(2, '0');
    return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}`;
  }
  function longDate(value) {
    if (!value) return '';
    const [y, m, d] = value.split('-').map(Number);
    try {
      return new Date(y, m - 1, d).toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric', weekday: 'long' });
    } catch (_) {
      return value;
    }
  }
  function makeOrderNo() {
    const d = new Date();
    const p = (n) => String(n).padStart(2, '0');
    return `PM-${p(d.getDate())}${p(d.getMonth() + 1)}-${Math.floor(100 + Math.random() * 900)}`;
  }

  function buildMessage(t, c) {
    const L = [];
    const pickup = c.method === 'pickup';
    L.push(`*${String(CFG.brandName || 'Sipariş').toLocaleUpperCase('tr')} – YENİ SİPARİŞ*`);
    L.push(`Sipariş No: ${orderNo}`);
    L.push('');
    L.push('👤 *Müşteri Bilgileri*');
    L.push(`Ad Soyad: ${c.name}`);
    L.push(`Telefon: ${c.phone}`);
    L.push(`Teslimat: ${pickup ? 'Gel-al' : 'Adrese teslim'}`);
    if (!pickup) L.push(`Adres: ${c.address}${c.district ? ` – ${c.district}` : ''}`);
    L.push(`Tarih: ${longDate(c.date)}`);
    L.push(`Saat: ${c.slot}`);
    L.push(`Ödeme: ${c.payment}`);
    L.push('');
    L.push('🛒 *Sipariş Detayı*');
    t.rows.forEach((r, i) => {
      L.push(`${i + 1}) *${r.p.name}*${r.variant ? ` – ${r.variant.name}` : ''}`);
      L.push(`    ${r.opt.label} (${r.opt.detail}) × ${r.line.qty} = ${money(r.lineTotal - r.lineDiscount)}${r.lineDiscount ? ' (kampanya)' : ''}`);
      if (r.line.note) L.push(`    Not: ${r.line.note}`);
    });
    L.push('');
    L.push(`Ara toplam: ${money(t.subtotal)}`);
    if (t.discount) L.push(`Kampanya indirimi: -${money(t.discount)}`);
    L.push(`${pickup ? 'Gel-al' : 'Teslimat'}: ${t.delivery ? money(t.delivery) : 'Ücretsiz'}`);
    L.push(`*TOPLAM: ${money(t.total)}*`);
    if (c.note) {
      L.push('');
      L.push(`📝 Not: ${c.note}`);
    }
    L.push('');
    L.push('Siparişimi onaylamanızı rica ederim, teşekkürler!');
    return L.join('\n');
  }

  function waPreview(msg) {
    return esc(msg).replace(/\*([^*\n]+)\*/g, '<strong>$1</strong>');
  }

  /* ------------------------------------------------------------ */
  /* SSS & alt bilgi                                                */
  /* ------------------------------------------------------------ */
  function renderFaq() {
    const fee = Number(CFG.deliveryFee) || 0;
    const items = [
      [
        'Siparişimi ne kadar önceden vermeliyim?',
        `Tüm ürünlerimiz siparişe özel hazırlandığı için en az ${Number(CFG.leadTimeDays) || 1} gün önceden sipariş vermenizi rica ediyoruz. Tepsi tatlıları, kokteyl standı ve 40 adet üzeri siparişler için 2–3 gün önceden haber vermeniz idealdir.`,
      ],
      [
        'Teslimat yapıyor musunuz?',
        `Evet, adrese teslim ve gel-al seçeneklerimiz var. ${fee ? `Adrese teslimat ücreti ${money(fee)}${CFG.freeDeliveryThreshold ? `; ${money(CFG.freeDeliveryThreshold)} ve üzeri siparişlerde teslimat ücretsizdir` : ''}.` : 'Teslimat ücretsizdir.'} ${esc(CFG.serviceArea || '')}`,
      ],
      ['Ödemeyi nasıl yapabilirim?', `${(CFG.paymentMethods || []).join(', ')} seçeneklerinden birini sipariş sırasında seçebilirsiniz. ${hasIban() ? 'Havale/EFT seçtiğinizde IBAN bilgimiz sipariş ekranında gösterilir' : 'Havale/EFT bilgileri onay mesajında paylaşılır'}; ödemeyi siparişiniz onaylandıktan sonra yapmanızı rica ederiz.`],
      [
        'Siparişim ne zaman kesinleşir?',
        'WhatsApp mesajınız bize ulaştıktan sonra ürünlerin ve teslimat saatinin uygunluğunu kontrol edip onay mesajı gönderiyoruz. Onay mesajıyla siparişiniz kesinleşir.',
      ],
      [
        'Kampanya koşulları nelerdir?',
        CFG.campaign && CFG.campaign.active
          ? `${esc(CFG.campaign.title)}: ${esc(CFG.campaign.text)}. Sepet tutarınız (indirim sonrası) ${money(campaignMin())} ve üzeri olduğunda kampanya 1 adet için otomatik uygulanır; sos ve süsleme seçimlerinin farkı ayrıca eklenir.`
          : 'Güncel kampanyalarımızı bu sayfadan ve WhatsApp üzerinden duyuruyoruz.',
      ],
      [
        'Porsiyon gramajları ve alerjenler',
        'Her ürünün detayında yaklaşık gramaj, kişi sayısı, içindekiler ve alerjen bilgisi yer alır. Ürünlerimiz el yapımı olduğundan gramajlarda ±%10 farklılık olabilir. Mutfağımızda gluten, süt, yumurta, susam ve kuruyemiş kullanıldığından eser miktarda çapraz bulaşma olabilir.',
      ],
      ['Özel sipariş veriyor musunuz?', 'Elbette! Menüde olmayan bir lezzet, özel bir doğum günü masası ya da farklı bir porsiyon isterseniz WhatsApp’tan yazmanız yeterli.'],
    ];
    $('#faq').innerHTML = items
      .map(
        ([q, a], i) => `
      <details class="group rounded-3xl bg-white p-5 shadow-warm-sm ring-1 ring-cocoa/5 open:shadow-warm" ${i === 0 ? 'open' : ''}>
        <summary class="flex cursor-pointer list-none items-center justify-between gap-4 font-extrabold [&::-webkit-details-marker]:hidden">
          <span>${esc(q)}</span>
          <span class="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-cream-200 text-cocoa transition group-open:rotate-180 group-open:bg-sunset group-open:text-white">${icon('chevron-down', 'h-4 w-4')}</span>
        </summary>
        <p class="mt-3 text-sm leading-relaxed text-cocoa-500">${a}</p>
      </details>`
      )
      .join('');
  }

  function renderFooter() {
    $('#footer-categories').innerHTML = CATEGORIES.map(
      (c) => `<li><button type="button" data-cat-link="${c.id}" class="text-left text-cream-300/80 transition hover:text-honey">${esc(c.name)}</button></li>`
    ).join('');
    const contact = [];
    contact.push(
      `<li><a href="${waLink(WA_TEXTS.info)}" target="_blank" rel="noopener" class="inline-flex items-center gap-2 font-bold text-cream transition hover:text-honey">${icon('whatsapp', 'h-4 w-4 text-honey')}WhatsApp ile sipariş${
        CFG.displayPhone ? ` · ${esc(CFG.displayPhone)}` : ''
      }</a></li>`
    );
    if (CFG.displayPhone) {
      contact.push(`<li class="flex items-center gap-2">${icon('phone', 'h-4 w-4 text-honey')}<a href="tel:${esc(CFG.displayPhone.replace(/\s/g, ''))}" class="hover:text-honey">${esc(CFG.displayPhone)}</a></li>`);
    }
    if (CFG.instagram) {
      contact.push(
        `<li class="flex items-center gap-2">${icon('instagram', 'h-4 w-4 text-honey')}<a href="https://instagram.com/${esc(CFG.instagram)}" target="_blank" rel="noopener" class="hover:text-honey">@${esc(CFG.instagram)}</a></li>`
      );
    }
    if (CFG.workingHours) contact.push(`<li class="flex items-center gap-2">${icon('clock', 'h-4 w-4 text-honey')}${esc(CFG.workingHours)}</li>`);
    if (CFG.serviceArea) contact.push(`<li class="flex items-start gap-2">${icon('pin', 'mt-0.5 h-4 w-4 shrink-0 text-honey')}<span class="text-cream-300/80">${esc(CFG.serviceArea)}</span></li>`);
    $('#footer-contact').innerHTML = contact.join('');
    const reg = $('#food-reg');
    if (reg && CFG.foodRegistrationNo) {
      reg.textContent = `Gıda İşletme Kayıt No: ${CFG.foodRegistrationNo}`;
      reg.hidden = false;
    }
  }

  function renderCampaign() {
    const c = CFG.campaign;
    const p = c && byId[c.productId];
    const active = Boolean(c && c.active && p && p.campaign);
    $('#campaign-bar').hidden = !active;
    if (!active) return;
    $$('.js-campaign-title').forEach((el) => (el.textContent = c.title));
    $$('.js-campaign-text').forEach((el) => (el.textContent = c.text));
  }

  /* ------------------------------------------------------------ */
  /* Bildirim                                                       */
  /* ------------------------------------------------------------ */
  let toastTimer;
  function toast(html) {
    const host = $('#toast');
    host.innerHTML = `<div class="pointer-events-auto flex animate-fade-up items-center gap-3 rounded-full bg-cocoa py-2 pl-2 pr-2 text-sm font-bold text-cream shadow-warm-lg">
      <span class="grid h-8 w-8 place-items-center rounded-full bg-honey text-cocoa">${icon('check', 'h-4 w-4')}</span>
      <span class="pr-1">${html}</span>
      <button type="button" data-open-cart class="rounded-full bg-pepper px-4 py-2 text-xs font-extrabold text-white">Sepeti Gör</button>
    </div>`;
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => (host.innerHTML = ''), 3200);
  }

  /* ------------------------------------------------------------ */
  /* Olaylar                                                        */
  /* ------------------------------------------------------------ */
  document.addEventListener('click', (e) => {
    const t = e.target.closest(
      '[data-open],[data-open-cart],[data-close-cart],[data-close-product],[data-cat],[data-diet],[data-scroll],[data-qty],[data-remove],[data-step],[data-submit-details],[data-wa-send],[data-finish],[data-goto-menu],[data-reset-filters],[data-gallery],[data-pd-qty],#pd-add,[data-cat-link],[data-copy-iban]'
    );
    if (!t) return;

    if (t.matches('[data-copy-iban]')) {
      const label = t.querySelector('span');
      copyText(String(BANK.iban || '').replace(/\s+/g, ' ').trim()).then((ok) => {
        if (label) label.textContent = ok ? 'Kopyalandı' : 'Kopyalanamadı';
        setTimeout(() => label && (label.textContent = 'Kopyala'), 2000);
      });
      track('iban-kopyala', 'IBAN kopyalandı');
      return;
    }
    if (t.matches('[data-open]')) {
      e.preventDefault();
      if (isOpen('cart')) closeRoot('cart');
      openProduct(t.dataset.open);
      track(`urun/${t.dataset.open}`, `Ürün açıldı: ${(byId[t.dataset.open] || {}).name || t.dataset.open}`);
      return;
    }
    if (t.matches('[data-open-cart]')) {
      if (isOpen('product')) closeRoot('product');
      if (cartStep === 'sent' && computeTotals().count) cartStep = 'cart';
      clearTimeout(toastTimer);
      $('#toast').innerHTML = '';
      renderCart();
      openRoot('cart');
      setTimeout(() => $('#cart-panel [data-close-cart]').focus({ preventScroll: true }), 60);
      return;
    }
    if (t.matches('[data-close-cart]')) return closeRoot('cart');
    if (t.matches('[data-close-product]')) return closeRoot('product');

    if (t.matches('[data-cat]')) return setFilter({ category: t.dataset.cat });
    if (t.matches('[data-cat-link]')) {
      setFilter({ category: t.dataset.catLink, query: '', diet: null }, false);
      $('#menu-search').value = '';
      $('#menu').scrollIntoView({ behavior: 'smooth' });
      return;
    }
    if (t.matches('[data-diet]')) return setFilter({ diet: filters.diet === t.dataset.diet ? null : t.dataset.diet });
    if (t.matches('[data-reset-filters]')) {
      $('#menu-search').value = '';
      return setFilter({ category: 'all', diet: null, query: '' });
    }
    if (t.matches('[data-scroll]')) {
      const row = $('#popular-row');
      row.scrollBy({ left: Number(t.dataset.scroll) * row.clientWidth * 0.8, behavior: 'smooth' });
      return;
    }

    // Ürün penceresi
    if (t.matches('[data-pd-qty]') && sel) {
      sel.qty = Math.max(1, Math.min(99, sel.qty + Number(t.dataset.pdQty)));
      return updateProductTotals();
    }
    if (t.matches('[data-gallery]')) {
      const name = t.dataset.gallery;
      $('#pd-image').innerHTML = imgTag(name, sel ? sel.p.name : '', 'h-full w-full object-cover', '(min-width:640px) 48vw, 100vw', true);
      $$('[data-gallery]').forEach((b) => {
        b.classList.toggle('ring-white', b === t);
        b.classList.toggle('ring-white/40', b !== t);
      });
      return;
    }
    if (t.matches('#pd-add') && sel) {
      const p = sel.p;
      const note = ($('#pd-note').value || '').trim().slice(0, 140);
      addToCart({ productId: p.id, optionId: p.options[sel.optIdx].id, variantId: sel.variantId, qty: sel.qty, note });
      closeRoot('product');
      toast(`${esc(p.name)} sepete eklendi`);
      track(`sepete-ekle/${p.id}`, `Sepete eklendi: ${p.name}`);
      return;
    }

    // Sepet
    if (t.matches('[data-qty]')) return changeQty(Number(t.dataset.qty), Number(t.dataset.delta));
    if (t.matches('[data-remove]')) return removeLine(Number(t.dataset.remove));
    if (t.matches('[data-goto-menu]')) {
      closeRoot('cart');
      setTimeout(() => $('#menu').scrollIntoView({ behavior: 'smooth' }), 150);
      return;
    }
    if (t.matches('[data-step]')) {
      if (cartStep === 'details') {
        customer = readForm();
        store.set(KEY_CUSTOMER, customer);
      }
      cartStep = t.dataset.step;
      renderCart();
      $('#cart-body').scrollTop = 0;
      return;
    }
    if (t.matches('[data-submit-details]')) {
      const data = readForm();
      const errs = validate(data);
      customer = data;
      store.set(KEY_CUSTOMER, customer);
      if (Object.keys(errs).length) return showErrors(errs);
      cartStep = 'summary';
      renderCart();
      $('#cart-body').scrollTop = 0;
      return;
    }
    if (t.matches('[data-wa-send]')) {
      track('siparis-whatsapp', `WhatsApp siparişi (${money(computeTotals().total)})`);
      // Bağlantı yeni sekmede açılır; ekranda tamamlandı adımını gösteriyoruz.
      setTimeout(() => {
        cartStep = 'sent';
        renderCart();
      }, 400);
      return;
    }
    if (t.matches('[data-finish]')) {
      clearCart();
      cartStep = 'cart';
      closeRoot('cart');
      setTimeout(renderCart, 350);
    }
  });

  // Genel WhatsApp bağlantıları (bilgi / organizasyon teklifi)
  document.addEventListener('click', (e) => {
    const a = e.target.closest('a[data-wa]');
    if (a) track(`whatsapp-${a.dataset.wa}`, `WhatsApp bağlantısı: ${a.dataset.wa}`);
  });

  document.addEventListener('change', (e) => {
    const t = e.target;
    if (!sel) return;
    if (t.name === 'pd-option') {
      sel.optIdx = Number(t.value);
      updateProductTotals();
    } else if (t.name === 'pd-variant') {
      sel.variantId = t.value;
      updateProductTotals();
    }
  });

  document.addEventListener('change', (e) => {
    const t = e.target;
    if (t.name === 'payment' && $('#checkout-form')) {
      const box = $('[data-iban-box]');
      if (box) box.hidden = !isTransfer(t.value);
    }
    if (t.name === 'method' && $('#checkout-form')) {
      customer = readForm();
      const wrap = $('[data-delivery-only]');
      if (wrap) wrap.hidden = t.value === 'pickup';
      const totalsBox = $('#cart-footer dl');
      if (totalsBox) {
        const tmp = document.createElement('div');
        tmp.innerHTML = totalsHtml(computeTotals(t.value), t.value);
        totalsBox.replaceWith(tmp.querySelector('dl'));
      }
    }
  });

  let searchTimer;
  $('#menu-search').addEventListener('input', (e) => {
    clearTimeout(searchTimer);
    searchTimer = setTimeout(() => setFilter({ query: e.target.value }, false), 160);
  });

  // Başlık gölgesi
  const header = $('#site-header');
  const onScroll = () => header.classList.toggle('shadow-warm-sm', window.scrollY > 8);
  window.addEventListener('scroll', onScroll, { passive: true });

  // Başka sekmede sepet değişirse senkronize et
  window.addEventListener('storage', (e) => {
    if (e.key === KEY_CART) {
      cart = (store.get(KEY_CART, []) || []).filter((l) => l && byId[l.productId]);
      updateCartIndicators();
      if (isOpen('cart')) renderCart();
    }
  });

  /* ------------------------------------------------------------ */
  /* Başlat                                                         */
  /* ------------------------------------------------------------ */
  function init() {
    hydrateIcons();
    $$('[data-wa]').forEach((a) => (a.href = waLink(WA_TEXTS[a.dataset.wa] || WA_TEXTS.info)));
    $$('.js-price-note').forEach((el) => (el.textContent = CFG.priceNote || ''));
    $('#stat-count').textContent = PRODUCTS.length;
    $('#year').textContent = new Date().getFullYear();
    renderCampaign();
    renderSetMenus();
    renderPopular();
    renderChips();
    renderMenu();
    renderFaq();
    renderFooter();
    updateCartIndicators();
    onScroll();
    loadAnalytics();
    loadPriceSheet();
    if (!waNumber()) {
      console.info('[Periler Mutfakta] WhatsApp numarası ayarlanmadı. assets/js/config.js içindeki whatsappNumber alanını doldurun.');
    }
    // #urun-id ile doğrudan ürün açma (örn. index.html#san-sebastian)
    const hash = decodeURIComponent(location.hash.slice(1));
    if (byId[hash]) openProduct(hash);
  }

  init();
})();
