/* =====================================================================
   PERİLER MUTFAKTA – SİTE AYARLARI
   ---------------------------------------------------------------------
   Bu dosyayı düzenleyerek telefon numarasını, teslimat ücretini,
   kampanyayı ve diğer ayarları kod bilmeden değiştirebilirsiniz.
   ===================================================================== */
window.SITE_CONFIG = {
  brandName: 'Periler Mutfakta',
  tagline: 'Ev yapımı lezzetler',

  // >>> SİPARİŞLERİN GELECEĞİ WHATSAPP NUMARASI <<<
  // Başında + veya 0 olmadan, ülke koduyla yazın. Örnek: 905321234567
  // Numara girilmezse WhatsApp açılır ve kişi seçmeniz istenir.
  whatsappNumber: '905332144881',

  // Sitede görünecek telefon (boş bırakılırsa gösterilmez)
  displayPhone: '0533 214 48 81',

  // Instagram kullanıcı adı (@ olmadan). Boş bırakılırsa gösterilmez.
  instagram: '',

  // Şehir / hizmet bölgesi (sitede gösterilir)
  city: 'Kayseri',
  serviceArea: 'Kayseri merkez (Melikgazi, Kocasinan, Talas) adrese teslim veya gel-al. Gel-al adresi sipariş onayında WhatsApp üzerinden paylaşılır.',

  // Çalışma saatleri
  workingHours: 'Her gün 09:00 – 20:00',

  // Para birimi gösterimi
  currency: '₺',

  // Minimum sipariş tutarı (₺). 0 yazarsanız sınır olmaz.
  minOrderAmount: 400,

  // Teslimat ücreti (₺) ve ücretsiz teslimat sınırı (₺)
  deliveryFee: 150,
  freeDeliveryThreshold: 2000,

  // Kaç gün önceden sipariş alınır (1 = en erken yarın)
  leadTimeDays: 1,

  // Teslimat saat aralıkları
  timeSlots: ['10:00 – 12:00', '12:00 – 14:00', '14:00 – 16:00', '16:00 – 18:00', '18:00 – 20:00'],

  // Ödeme seçenekleri
  paymentMethods: ['Nakit (teslimatta)', 'Havale / EFT (IBAN)', 'Kredi kartı (teslimatta)'],

  // Havale / EFT bilgileri – doldurulursa müşteri "Havale / EFT" seçtiğinde
  // IBAN kopyalama butonuyla birlikte gösterilir. Boş bırakılırsa
  // "IBAN onay mesajında paylaşılır" yazar.
  bankAccount: {
    holder: '', // Hesap sahibi adı soyadı, ör. 'Ayşe Yılmaz'
    bank: '', // Banka adı, ör. 'Ziraat Bankası'
    iban: '', // ör. 'TR00 0000 0000 0000 0000 0000 00'
  },

  // Tarım İl Müdürlüğü'nden alınan gıda işletme kayıt numarası.
  // Doldurulursa sitenin en altında gösterilir.
  foodRegistrationNo: '',

  // Ziyaretçi istatistiği (GoatCounter – ücretsiz, çerezsiz).
  // goatcounter.com'da hesap açarken seçtiğiniz kodu yazın.
  // Ör. kod 'perilermutfakta' ise panel: https://perilermutfakta.goatcounter.com
  goatcounterCode: '',

  // Google E-Tablo'dan fiyat güncelleme (isteğe bağlı).
  // Tabloyu Dosya → Paylaş → Web'de yayınla → "Virgülle ayrılmış değerler (.csv)"
  // ile yayınlayıp çıkan bağlantıyı buraya yapıştırın. Ayrıntılar README'de.
  // Boş bırakılırsa products.js içindeki fiyatlar kullanılır.
  priceSheetUrl: '',

  // Kampanya – kapatmak için active: false yapın
  // minOrder: kampanya fiyatının geçmesi için gereken sipariş tutarı (₺, indirim sonrası)
  campaign: {
    active: true,
    minOrder: 2000,
    title: '2.000 ₺ üzeri siparişlerde',
    text: 'San Sebastian (20 cm) 1.000 ₺',
    productId: 'san-sebastian',
  },

  // Sitenin yayınlandığı adres (sosyal medya önizlemesi için)
  siteUrl: 'https://fatihsenel273806-tech.github.io/perilermutfakta/',

  // Fiyatların güncellendiği dönem
  priceNote: 'Fiyatlar Kasım 2026 itibarıyla geçerlidir.',
};
