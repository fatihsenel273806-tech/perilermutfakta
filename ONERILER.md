# Periler Mutfakta – Yapılacaklar ve Öneriler

_6 Kasım 2026_

## ✅ Yapıldı

- Google için işletme bilgisi (Schema.org), `robots.txt`, `sitemap.xml`, canonical bağlantı
- KVKK aydınlatma metni (`kvkk.html`) ve sipariş formunda zorunlu onay kutusu
- Havale/EFT seçilince IBAN + "Kopyala" butonu (IBAN girilince çalışır)
- Gıda işletme kayıt numarasının sitenin altında gösterilmesi (numara girilince)
- Çerezsiz ziyaretçi istatistiği (GoatCounter) ve sipariş/sepet olaylarının sayımı
- Fiyatları ve ürün gösterimini Google E-Tablo'dan güncelleme

## 🔧 Sizin doldurmanız gerekenler (`assets/js/config.js`)

- [ ] `bankAccount` → hesap sahibi, banka, IBAN
- [ ] `foodRegistrationNo` → gıda işletme kayıt numarası
- [ ] `goatcounterCode` → goatcounter.com'da hesap açıp kodu yazın
- [ ] `priceSheetUrl` → (isteğe bağlı) yayınlanan Google E-Tablo bağlantısı
- [ ] `instagram` → Instagram kullanıcı adı
- [ ] KVKK metnini bir hukukçuya kontrol ettirin

## 1. Güven

- [ ] **Kendi ürün fotoğraflarınızı çekin.** 7 üründe hâlâ Wikimedia fotoğrafı var. Gün ışığında, pencere kenarında,
      telefonla, kendi tabak/tezgâhınızda çekmeniz yeterli. Aynı dosya adıyla değiştirip `photoCredit` satırını silin.
- [ ] **Müşteri yorumları bölümü.** WhatsApp'tan gelen teşekkür mesajlarının ekran görüntüleri veya 4–6 kısa yorum + yıldız.
      (Yorumları toplayınca bana gönderin, bölümü ekleyeyim.)
- [ ] **Instagram hesabı.** Açıp `config.js`'e ekleyin; Instagram profilindeki bağlantı siteyi göstersin.
- [ ] **"Biz kimiz" bölümü.** Mutfaktan bir fotoğraf ve kısa hikâye ("annemizin mutfağı").

## 2. Bulunabilirlik – sizin yapmanız gerekenler

- [ ] **Google İşletme Profili** açın (business.google.com). "Hizmet bölgesi işletmesi" seçip adresi gizleyebilirsiniz.
      Site bağlantısını, telefonu, saatleri ve fotoğrafları ekleyin. Memnun müşterilerden Google yorumu isteyin.
- [ ] **Kendi alan adınızı alın** (ör. perilermutfakta.com / .com.tr). Aldıktan sonra GitHub Pages'e bağlamayı ve
      sitedeki adresleri güncellemeyi ben yapabilirim.
- [ ] **Google Search Console**'a siteyi ekleyip `sitemap.xml` gönderin.

## 3. Yasal

- [ ] Tarım İl Müdürlüğü'nden **gıda işletme kaydı** (yoksa) – numarayı `config.js`'e yazın.

## 4. Satışı artıracak özellikler (sırada)

- [ ] Sepette **"Bunu da ekleyin"** önerisi (tuzluya tatlı, mantıya sarma).
- [ ] **"Bu hafta ne var" / günün menüsü** bölümü.
- [ ] **Doluluk bilgisi** – "Cumartesi için son 3 sipariş" (aciliyet + kapasite kontrolü).
- [ ] **Kapalı günler** – tatil / yoğun günlerde takvimde o tarihlerin kapatılması.
- [ ] **Özel gün paketleri** – mevlüt, doğum günü, kına, toplantı ikramı için hazır set ve fiyat.
