# Periler Mutfakta 🧚 – Ev Yapımı Lezzetler Sipariş Sitesi

Müşterilerin ürün seçip porsiyon belirlediği, sepet oluşturduğu ve siparişini
**WhatsApp'a hazır mesaj olarak** gönderdiği, tamamen statik (sunucu gerektirmeyen)
bir sipariş sitesi.

## Özellikler

- **19 ürün, 6 kategori** – fotoğraflar, içindekiler, alerjen ve saklama bilgisi
- **Porsiyon seçimi** – 3/5/10 kişilik, adet, kilo veya kek çapı (cm); her seçenekte yaklaşık gramaj
- **Çeşit seçimi** – zeytinyağlı/etli, iç harç, sos, meyve vb. (fiyat farkı otomatik)
- **Kampanya** – "İlk 5 siparişe San Sebastian 1.000 ₺" (siparişte 1 adet için uygulanır)
- **Sepet** – adet artır/azalt, ürün notu, ücretsiz teslimat ilerleme çubuğu, minimum sipariş kontrolü
- **Sipariş özeti** – ad, telefon, adres, teslim tarihi/saat aralığı, ödeme yöntemi, not
- **WhatsApp butonu** – sipariş özeti biçimlendirilmiş mesaj olarak yazılı açılır; müşteriye sadece *Gönder* kalır
- Arama (Türkçe karakter duyarsız: "pogaca" → Poğaça), kategori ve Vejetaryen/Vegan/Glutensiz filtreleri
- Mobil öncelikli, responsive; sepet ve müşteri bilgileri tarayıcıda hatırlanır
- Organizasyon teklif butonu, SSS, WhatsApp/Instagram link önizlemesi (og-image)

## 1) WhatsApp numarasını girin (zorunlu)

`assets/js/config.js` dosyasını açın:

```js
whatsappNumber: '905321234567',   // başında + veya 0 olmadan, ülke koduyla
displayPhone: '0532 123 45 67',   // sitede görünecek telefon (isteğe bağlı)
instagram: 'perilermutfakta',     // isteğe bağlı
```

Numara boş bırakılırsa WhatsApp yine açılır ama kişiyi müşteri seçmek zorunda kalır.

Aynı dosyadan **teslimat ücreti** (`deliveryFee`), **ücretsiz teslimat sınırı**
(`freeDeliveryThreshold`), **minimum sipariş** (`minOrderAmount`), **kaç gün önceden
sipariş** (`leadTimeDays`), **saat aralıkları**, **ödeme yöntemleri** ve **kampanya**
(`campaign.active: false` ile kapatılır) değiştirilebilir.

## 2) Fiyat / ürün düzenleme

Tüm menü `assets/js/products.js` içindedir. Fiyatı değiştirmek için sadece rakamı
güncellemeniz yeterlidir:

```js
options: [
  { id: 'p3', label: '3 Kişilik', detail: '≈ 600 g · 30–33 adet', price: 540 },
  ...
]
```

Çeşide göre fiyat değişiyorsa `variants[].prices` dizisindeki rakamlar porsiyon
sırasıyla eşleşir. Yeni ürün eklerken mevcut bir ürünü kopyalayıp `id`'yi değiştirin;
fotoğrafı `assets/img/` klasörüne `urun-adi-640.webp` ve `urun-adi-1280.webp`
olarak koyun (veya `image: 'dosya.svg'`).

> Supangle için gerçek fotoğraf gelene kadar illüstrasyon kullanılıyor
> (`assets/img/supangle.svg`). Fotoğrafı ekleyip `image: 'supangle'` yapmanız yeterli.

## 3) Yayınlama (GitHub Pages – ücretsiz)

1. GitHub'da depo → **Settings → Pages**
2. **Source:** *Deploy from a branch*
3. **Branch:** `claude/food-order-website-c46n9k` (veya birleştirdiğiniz `main`) → klasör **/ (root)** → **Save**
4. 1–2 dakika sonra site şu adreste yayında olur:
   **https://fatihsenel273806-tech.github.io/perilermutfakta/**

Doğrudan ürün linki paylaşmak için adresin sonuna ürün kimliğini ekleyin, ör.
`…/perilermutfakta/#san-sebastian`.

## Geliştirme

Stil dosyası Tailwind CSS ile derlenir (sadece tasarım sınıflarını değiştirirseniz gerekir):

```bash
npm install
npm run build   # assets/css/styles.css dosyasını üretir
npm run dev     # değişiklikleri izler
```

Fiyat/ürün/ayar değişiklikleri için derleme **gerekmez**.

### Renk sistemi

| Rol | Renk | Kullanım |
| --- | --- | --- |
| Ana (CTA) | `#E5383B` Biber Kırmızısı | Sipariş Ver, Sepete Ekle |
| İkincil | `#F3722C` Gün Batımı Turuncusu | Kategori başlıkları, filtreler |
| Vurgu | `#F9C74F` Sıcak Sarı | Rozetler, kampanya, bildirim |
| Arka plan | `#FFFDF9` Sıcak Krem | Tüm sayfa zemini |
| Metin | `#2B1E1A` Koyu Yanık Kahve | Başlık ve gövde metinleri |
| Tazelik | `#4A7C59` Yaprak Yeşili | Vejetaryen, Vegan, Glutensiz |

Mavi ve soğuk gri tonları Tailwind yapılandırmasından tamamen çıkarılmıştır.

## Fiyat listesi (Kasım 2026)

Fiyatlar; Yemeksepeti'deki ev yemeği işletmeleri, Armut.com 2026 ev yapımı yaprak
sarma talepleri (~650–700 ₺/kg), pastane ve fırınların 2026 web fiyatları
(San Sebastian bütün 1.400–3.000 ₺, supangle/magnolya 135–200 ₺, tuzlu kurabiye
450–800 ₺/kg) ve 2026 fırın tarifeleri esas alınarak, ev yapımı/butik konumlandırmaya
göre belirlenmiştir.

| Ürün | Seçenekler ve fiyatlar | Gramaj |
| --- | --- | --- |
| Yaprak Sarması | 3 kişilik 540 ₺ · 5 kişilik 850 ₺ · 10 kişilik 1.650 ₺ (etli: 660 / 1.050 / 2.050 ₺) | 1 porsiyon ≈ 180–200 g (9–10 adet) |
| Kuru Dolma | 3 kişilik 780 ₺ · 5 kişilik 1.250 ₺ · 10 kişilik 2.400 ₺ (etli: 960 / 1.550 / 2.990 ₺) | 1 porsiyon ≈ 250 g (5–6 adet) |
| İçli Köfte | 6 adet 450 ₺ · 12 adet 870 ₺ · 25 adet 1.750 ₺ | 1 adet ≈ 70–80 g |
| Poğaça Çeşitleri | 10 adet 320 ₺ · 20 adet 620 ₺ · 40 adet 1.200 ₺ | 1 adet ≈ 70–80 g |
| Haşhaşlı Çörek | 6 adet 330 ₺ · 12 adet 640 ₺ · 24 adet 1.240 ₺ | 1 adet ≈ 90–100 g |
| Tereyağlı Kruvasan | 6 adet 360 ₺ · 12 adet 700 ₺ · 24 adet 1.350 ₺ (kaşarlı/çikolatalı 400 / 780 / 1.500 ₺) | 1 adet ≈ 70–80 g |
| Peynirli Mini Pide | 4 adet 640 ₺ · 8 adet 1.240 ₺ · 12 adet 1.800 ₺ | 1 adet ≈ 180–200 g |
| Kavurmalı Yumurtalı Pide | 2 adet 540 ₺ · 4 adet 1.060 ₺ · 8 adet 2.080 ₺ | 1 adet ≈ 250 g |
| Milföy Külah | 10 adet 480 ₺ · 20 adet 920 ₺ · 40 adet 1.780 ₺ | 1 adet ≈ 55–60 g |
| Triliçe | 4 kişilik 600 ₺ · 8 kişilik 1.150 ₺ · 12 kişilik tepsi 1.650 ₺ | 1 dilim ≈ 170–180 g |
| Magnolya | 1 kap 190 ₺ · 4'lü 720 ₺ · 8'li 1.400 ₺ · aile kasesi 1.450 ₺ (lotuslu 220 / 840 / 1.640 / 1.700 ₺) | 1 kap ≈ 220–250 g |
| Supangle | 1 kap 160 ₺ · 4'lü 600 ₺ · 8'li 1.160 ₺ | 1 kap ≈ 200–220 g |
| Spoonful | 1 kap 180 ₺ · 4'lü 680 ₺ · 8'li 1.320 ₺ | 1 kap ≈ 200–230 g |
| Kremalı Berliner | 6 adet 450 ₺ · 12 adet 870 ₺ · 24 adet 1.700 ₺ | 1 adet ≈ 100–110 g |
| San Sebastian | 16 cm 950 ₺ · **20 cm 1.450 ₺ → kampanya 1.000 ₺** · 24 cm 2.050 ₺ (+120/150 ₺ süsleme) | 1 dilim ≈ 130–150 g |
| Limonlu Cheesecake | 16 cm 900 ₺ · 20 cm 1.350 ₺ · 24 cm 1.900 ₺ | 1 dilim ≈ 130–150 g |
| Tuzlu Kurabiye | 500 g 380 ₺ · 1 kg 720 ₺ · 2 kg 1.400 ₺ | 1 kg ≈ 45–50 adet |
| Elmalı Kurabiye | 500 g 420 ₺ · 1 kg 800 ₺ · 2 kg 1.550 ₺ | 1 kg ≈ 30–33 adet |
| Kokteyl Sandviç Standı | 30 parça 2.100 ₺ · 50 parça 3.400 ₺ · 80 parça 5.300 ₺ | kişi başı 3–4 parça |

## Dosya yapısı

```
index.html              Sayfa iskeleti
assets/js/config.js     Ayarlar (WhatsApp numarası, teslimat, kampanya)
assets/js/products.js   Menü, fiyatlar, içerikler, gramajlar
assets/js/app.js        Sepet, sipariş özeti ve WhatsApp mesajı
assets/css/styles.css   Derlenmiş Tailwind CSS
src/styles.css          Tailwind kaynak dosyası
tailwind.config.js      Renk sistemi
assets/img/             Ürün görselleri (WebP), og-image.jpg, supangle.svg
```

İkonlar: [Lucide](https://lucide.dev) (ISC lisansı).
