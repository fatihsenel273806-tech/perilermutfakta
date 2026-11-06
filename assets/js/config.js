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
  whatsappNumber: '905533046412',

  // Sitede görünecek telefon (boş bırakılırsa gösterilmez)
  displayPhone: '0553 304 64 12',

  // Instagram kullanıcı adı (@ olmadan). Boş bırakılırsa gösterilmez.
  instagram: '',

  // Hizmet bölgesi / gel-al adresi bilgisi (sitede gösterilir)
  serviceArea: 'Teslimat bölgesi ve gel-al adresi sipariş onayında WhatsApp üzerinden paylaşılır.',

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

  // Kampanya – kapatmak için active: false yapın
  campaign: {
    active: true,
    title: 'İlk 5 siparişe özel',
    text: 'San Sebastian Cheesecake (20 cm) sadece 1.000 ₺',
    productId: 'san-sebastian',
  },

  // Sitenin yayınlandığı adres (sosyal medya önizlemesi için)
  siteUrl: 'https://fatihsenel273806-tech.github.io/perilermutfakta/',

  // Fiyatların güncellendiği dönem
  priceNote: 'Fiyatlar Kasım 2026 itibarıyla geçerlidir.',
};
