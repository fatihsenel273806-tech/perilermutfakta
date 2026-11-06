/* =====================================================================
   PERİLER MUTFAKTA – MENÜ & FİYATLAR
   ---------------------------------------------------------------------
   • Fiyatlar Kasım 2026 Türkiye piyasası (ev yapımı / butik pastane
     ortalamaları) esas alınarak belirlenmiştir. Dilediğiniz gibi
     değiştirebilirsiniz – sadece rakamları güncellemeniz yeterli.
   • options  : porsiyon / adet / kilo seçenekleri (label, detail, price)
   • variants : çeşit seçimi. "prices" verilirse o çeşit için porsiyon
                fiyatlarını (sırasıyla) değiştirir; "extra" verilirse
                her porsiyon fiyatına eklenir.
   • campaignPrice : kampanya aktifken uygulanan fiyat (siparişte 1 adet)
   • image    : assets/img klasöründeki görselin adı (-640/-1280.webp)
   • photoCredit : lisanslı (ör. Wikimedia Commons) fotoğraflar için yazar,
                lisans ve kaynak bağlantısı – ürün penceresinde gösterilir
   ===================================================================== */
window.MENU = {
  categories: [
    { id: 'ev-yemekleri', name: 'Ev Yemekleri', icon: 'leaf', blurb: 'Zeytinyağlılar, dolmalar ve köfteler' },
    { id: 'hamur-isleri', name: 'Hamur İşleri', icon: 'croissant', blurb: 'Her sabah taze fırından' },
    { id: 'tatlilar', name: 'Sütlü & Kup Tatlılar', icon: 'cake', blurb: 'Kaşık kaşık mutluluk' },
    { id: 'cheesecake', name: 'Cheesecake', icon: 'cheesecake', blurb: 'Bütün kek siparişleri' },
    { id: 'kurabiyeler', name: 'Kurabiyeler', icon: 'cookie', blurb: 'Çay saatinin vazgeçilmezi' },
    { id: 'organizasyon', name: 'İkram & Organizasyon', icon: 'party', blurb: 'Davetler, günler, kutlamalar' },
  ],

  products: [
    /* ------------------------------------------------------------------ */
    /* EV YEMEKLERİ                                                        */
    /* ------------------------------------------------------------------ */
    {
      id: 'yaprak-sarmasi',
      name: 'Yaprak Sarması',
      aliases: ['sarma', 'dolma', 'zeytinyağlı', 'yaprak sarma'],
      category: 'ev-yemekleri',
      image: 'yaprak-sarmasi',
      popular: true,
      tags: ['glutensiz', 'vegan'],
      short: 'Parmak inceliğinde sarılmış asma yaprağı; zeytinyağı, dolmalık fıstık ve kuş üzümüyle.',
      description:
        'Seçme asma yaprakları tek tek elde, parmak inceliğinde sarılır. Bol sızma zeytinyağı ve limonla kısık ateşte ağır ağır pişirilir; soğuk meze ya da ana yemek olarak servis edilir. Etli çeşidimizde dana kıyma kullanılır ve sıcak servis önerilir.',
      ingredients: ['Asma yaprağı', 'Baldo pirinç', 'Kuru soğan', 'Sızma zeytinyağı', 'Dolmalık fıstık', 'Kuş üzümü', 'Taze nane', 'Maydanoz', 'Dereotu', 'Limon', 'Domates salçası', 'Pul biber', 'Yenibahar', 'Tarçın', 'Karabiber', 'Tuz'],
      allergens: ['Çam fıstığı (zeytinyağlı çeşit)'],
      serving: '1 porsiyon ≈ 180–200 g (9–10 adet)',
      storage: 'Buzdolabında 3–4 gün',
      variantLabel: 'Çeşit',
      variants: [
        { id: 'zeytinyagli', name: 'Zeytinyağlı', prices: [540, 850, 1650] },
        { id: 'etli', name: 'Etli (dana kıymalı)', prices: [660, 1050, 2050], note: 'Etli çeşitte fıstık ve kuş üzümü kullanılmaz, dana kıyma eklenir.' },
      ],
      options: [
        { id: 'p3', label: '3 Kişilik', detail: '≈ 600 g · 30–33 adet' },
        { id: 'p5', label: '5 Kişilik', detail: '≈ 1 kg · 50–55 adet' },
        { id: 'p10', label: '10 Kişilik', detail: '≈ 2 kg · 100–110 adet' },
      ],
    },
    {
      id: 'kuru-dolma',
      name: 'Kuru Dolma',
      aliases: ['kurudolma', 'antep dolması', 'kuru patlıcan', 'kuru biber', 'dolma'],
      category: 'ev-yemekleri',
      image: 'kuru-dolma',
      popular: true,
      tags: ['glutensiz'],
      short: 'Güneşte kurutulmuş patlıcan ve biber; nar ekşili, isotlu iç harçla Antep usulü.',
      description:
        'Yaz güneşinde kurutulan patlıcan ve biberler haşlanıp yumuşatılır; pirinç, isot ve nar ekşili baharatlı iç harçla doldurulur. Ekşili domates sosunda ağır ateşte pişirilir. Karışık (patlıcan + biber) hazırlanır.',
      ingredients: ['Kuru patlıcan', 'Kuru biber', 'Baldo pirinç', 'Kuru soğan', 'Sarımsak', 'Biber salçası', 'Domates salçası', 'Nar ekşisi', 'İsot', 'Kuru nane', 'Karabiber', 'Zeytinyağı', 'Limon', 'Tuz'],
      allergens: [],
      serving: '1 porsiyon ≈ 250 g (5–6 adet karışık)',
      storage: 'Buzdolabında 3 gün',
      variantLabel: 'Çeşit',
      variants: [
        { id: 'zeytinyagli', name: 'Zeytinyağlı', prices: [780, 1250, 2400] },
        { id: 'etli', name: 'Etli (dana kıymalı)', prices: [960, 1550, 2990] },
      ],
      options: [
        { id: 'p3', label: '3 Kişilik', detail: '≈ 750 g · 16–18 adet' },
        { id: 'p5', label: '5 Kişilik', detail: '≈ 1,25 kg · 28–30 adet' },
        { id: 'p10', label: '10 Kişilik', detail: '≈ 2,5 kg · 55–60 adet' },
      ],
    },
    {
      id: 'icli-kofte',
      name: 'İçli Köfte',
      aliases: ['icli kofte', 'köfte', 'kofte'],
      category: 'ev-yemekleri',
      image: 'icli-kofte',
      tags: [],
      short: 'İncecik bulgur kabuk, cevizli ve baharatlı kıyma iç harcı.',
      description:
        'İnce köftelik bulgurla yoğrulan dış hamur incecik açılır; cevizli, isotlu kıyma harcıyla doldurulur. Servise hazır kızartılmış ya da evde kızartmanız için çiğ-dondurulmuş olarak hazırlanır.',
      ingredients: ['İnce köftelik bulgur', 'İrmik', 'Dana kıyma', 'Kuru soğan', 'Ceviz', 'Maydanoz', 'İsot', 'Kimyon', 'Karabiber', 'Biber salçası', 'Tuz', 'Ayçiçek yağı'],
      allergens: ['Gluten', 'Ceviz'],
      serving: '1 adet ≈ 70–80 g · 1 porsiyon 3–4 adet',
      storage: 'Kızartılmış: buzdolabında 2 gün · Çiğ: dondurucuda 2 ay',
      variantLabel: 'Hazırlanış',
      variants: [
        { id: 'kizartilmis', name: 'Kızartılmış (servise hazır)' },
        { id: 'dondurulmus', name: 'Çiğ – dondurulmuş (evde kızartmalık)' },
      ],
      options: [
        { id: 'a6', label: '6 Adet', detail: '≈ 450 g · 2 kişilik', price: 450 },
        { id: 'a12', label: '12 Adet', detail: '≈ 900 g · 3–4 kişilik', price: 870 },
        { id: 'a25', label: '25 Adet', detail: '≈ 1,9 kg · 7–8 kişilik', price: 1750 },
      ],
    },

    {
      id: 'kayseri-mantisi',
      name: 'Kayseri Mantısı',
      aliases: ['manti', 'mantı', 'kayseri', 'yoğurtlu', 'ev mantısı'],
      category: 'ev-yemekleri',
      image: 'kayseri-mantisi',
      photoCredit: { author: 'E4024', license: 'CC BY-SA 4.0', url: 'https://commons.wikimedia.org/wiki/File:Kayseri_mant%C4%B1s%C4%B1.jpg' },
      popular: true,
      tags: [],
      short: 'Bir kaşığa 40 tane sığan minik Kayseri mantısı; sarımsaklı yoğurt ve tereyağlı salça sosuyla.',
      description:
        'Hamuru elde açılır, minicik kesilip tek tek kapatılır. Soğanlı dana kıyma iç harcıyla hazırlanan mantı; sarımsaklı yoğurt, tereyağında kızdırılmış salça, pul biber ve kuru naneyle servis edilir. Kuru (pişirmeye hazır) olarak da sipariş edebilirsiniz; yoğurt ve sos ayrı paketlenir.',
      ingredients: ['Un', 'Yumurta', 'Su', 'Tuz', 'Dana kıyma', 'Kuru soğan', 'Karabiber', 'Süzme yoğurt', 'Sarımsak', 'Tereyağı', 'Domates salçası', 'Pul biber', 'Kuru nane', 'Sumak'],
      allergens: ['Gluten', 'Yumurta', 'Süt'],
      serving: '1 porsiyon ≈ 150 g kuru mantı (pişmiş ≈ 300 g, soslu)',
      storage: 'Kuru mantı: serin yerde 2 hafta · dondurucuda 3 ay · Pişmiş: aynı gün tüketin',
      variantLabel: 'Hazırlanış',
      variants: [
        { id: 'kuru', name: 'Kuru – pişirmeye hazır (yoğurt & sos ayrı)', prices: [450, 850, 1650] },
        { id: 'pismis', name: 'Pişmiş, yoğurtlu & soslu (servise hazır)', prices: [540, 1000, 1950] },
      ],
      options: [
        { id: 'p3', label: '3 Kişilik', detail: '≈ 500 g kuru mantı' },
        { id: 'p6', label: '6 Kişilik', detail: '≈ 1 kg kuru mantı' },
        { id: 'p12', label: '12 Kişilik', detail: '≈ 2 kg kuru mantı' },
      ],
    },
    {
      id: 'mercimek-koftesi',
      name: 'Mercimek Köftesi',
      aliases: ['mercimek', 'kofte', 'köfte', 'vegan', 'gün menüsü'],
      category: 'ev-yemekleri',
      image: 'mercimek-koftesi',
      photoCredit: { author: 'İmmortalance', license: 'CC BY-SA 4.0', url: 'https://commons.wikimedia.org/wiki/File:Lentil_meatballs.jpg' },
      tags: ['vegan'],
      short: 'Kırmızı mercimek ve ince bulgurla yoğrulan, bol yeşillikli mercimek köftesi; marul ve limonla.',
      description:
        'Kırmızı mercimek haşlanıp ince bulgurla demlenir; zeytinyağında kavrulan soğan, salça, isot, taze soğan ve maydanozla yoğrulur. Elde şekillendirilip marul yapraklarıyla, yanında limonla servis edilir. Günler ve çay davetleri için birebir.',
      ingredients: ['Kırmızı mercimek', 'İnce köftelik bulgur', 'Kuru soğan', 'Zeytinyağı', 'Domates salçası', 'Biber salçası', 'Taze soğan', 'Maydanoz', 'İsot', 'Kimyon', 'Nar ekşisi', 'Limon', 'Tuz', 'Marul'],
      allergens: ['Gluten'],
      serving: '1 adet ≈ 25–30 g · 1 porsiyon 6–7 adet',
      storage: 'Buzdolabında 2 gün',
      options: [
        { id: 'a30', label: '30 Adet', detail: '≈ 850 g · 4–5 kişilik', price: 420 },
        { id: 'a60', label: '60 Adet', detail: '≈ 1,7 kg · 8–10 kişilik', price: 800 },
        { id: 'a100', label: '100 Adet', detail: '≈ 2,8 kg · 15–18 kişilik', price: 1300 },
      ],
    },
    /* ------------------------------------------------------------------ */
    /* HAMUR İŞLERİ                                                        */
    /* ------------------------------------------------------------------ */
    {
      id: 'pogaca',
      name: 'Poğaça Çeşitleri',
      aliases: ['pogaca', 'poğaça', 'peynirli', 'patatesli', 'zeytinli', 'kahvaltı'],
      category: 'hamur-isleri',
      image: 'pogaca',
      popular: true,
      tags: ['vejetaryen'],
      short: 'Yoğurtlu, tereyağlı, pamuk gibi yumuşak poğaçalar; susamlı ve çörekotlu.',
      description:
        'Yoğurt ve tereyağıyla yoğrulan mayalı hamur, seçtiğiniz iç harçla doldurulur; üzeri yumurta sarısı ve susamla fırınlanır. Kahvaltı, okul beslenmesi ve misafir sofraları için birebir. Karışık kutuda tüm çeşitlerden bulunur.',
      ingredients: ['Un', 'Yoğurt', 'Süt', 'Tereyağı', 'Ayçiçek yağı', 'Yumurta', 'Maya', 'Şeker', 'Tuz', 'Susam', 'Çörekotu', 'İç harç (seçime göre)'],
      allergens: ['Gluten', 'Süt', 'Yumurta', 'Susam'],
      serving: '1 adet ≈ 70–80 g · kahvaltıda kişi başı 2 adet',
      storage: 'Oda sıcaklığında 2 gün · dondurucuda 1 ay',
      variantLabel: 'İç harç',
      variants: [
        { id: 'peynirli', name: 'Peynirli & maydanozlu' },
        { id: 'patatesli', name: 'Patatesli' },
        { id: 'zeytinli', name: 'Zeytinli' },
        { id: 'kasarli', name: 'Kaşarlı' },
        { id: 'karisik', name: 'Karışık kutu' },
      ],
      options: [
        { id: 'a10', label: '10 Adet', detail: '≈ 750 g · 4–5 kişilik kahvaltı', price: 320 },
        { id: 'a20', label: '20 Adet', detail: '≈ 1,5 kg · 8–10 kişilik', price: 620 },
        { id: 'a40', label: '40 Adet', detail: '≈ 3 kg · 18–20 kişilik', price: 1200 },
      ],
    },
    {
      id: 'hashasli-corek',
      name: 'Haşhaşlı Çörek',
      aliases: ['haşhaş', 'hashas', 'çörek', 'corek', 'haşhaşlı'],
      category: 'hamur-isleri',
      image: 'hashasli-corek',
      tags: ['vejetaryen'],
      short: 'Bol haşhaş ezmesiyle kat kat sarılmış, susamlı ay çörekleri.',
      description:
        'Sütlü, tereyağlı mayalı hamur incecik açılır; haşhaş ezmesi, şeker ve tarçınla kat kat sarılıp hilal şeklinde kıvrılır. Üzeri yumurta sarısı ve susamla parlak, içi nemli ve yumuşacık.',
      ingredients: ['Un', 'Süt', 'Tereyağı', 'Yumurta', 'Maya', 'Şeker', 'Tuz', 'Haşhaş ezmesi', 'Toz şeker', 'Tarçın', 'Susam'],
      allergens: ['Gluten', 'Süt', 'Yumurta', 'Susam'],
      serving: '1 adet ≈ 90–100 g',
      storage: 'Oda sıcaklığında 3 gün',
      options: [
        { id: 'a6', label: '6 Adet', detail: '≈ 570 g', price: 330 },
        { id: 'a12', label: '12 Adet', detail: '≈ 1,15 kg', price: 640 },
        { id: 'a24', label: '24 Adet', detail: '≈ 2,3 kg · ikramlık', price: 1240 },
      ],
    },
    {
      id: 'kruvasan',
      name: 'Tereyağlı Kruvasan',
      aliases: ['kruvasan', 'croissant', 'ay çöreği'],
      category: 'hamur-isleri',
      image: 'kruvasan',
      tags: ['vejetaryen'],
      short: 'Kat kat tereyağlı; dışı çıtır, içi yumuşacık ev kruvasanı.',
      description:
        'Tereyağıyla katlanan hamur bir gece dinlendirilir, sabah elde şekil verilip fırınlanır. Sade, kaşarlı ya da çikolatalı seçenekleriyle kahvaltının yıldızı.',
      ingredients: ['Un', 'Tereyağı', 'Süt', 'Yumurta', 'Maya', 'Şeker', 'Tuz', 'Kaşar / çikolata (seçime göre)'],
      allergens: ['Gluten', 'Süt', 'Yumurta'],
      serving: '1 adet ≈ 70–80 g',
      storage: 'Oda sıcaklığında 2 gün',
      variantLabel: 'Çeşit',
      variants: [
        { id: 'sade', name: 'Sade', prices: [360, 700, 1350] },
        { id: 'kasarli', name: 'Kaşarlı', prices: [400, 780, 1500] },
        { id: 'cikolatali', name: 'Çikolatalı', prices: [400, 780, 1500] },
      ],
      options: [
        { id: 'a6', label: '6 Adet', detail: '≈ 450 g' },
        { id: 'a12', label: '12 Adet', detail: '≈ 900 g' },
        { id: 'a24', label: '24 Adet', detail: '≈ 1,8 kg · ikramlık' },
      ],
    },
    {
      id: 'peynirli-pide',
      name: 'Peynirli Mini Pide',
      aliases: ['pide', 'peynirli pide', 'karadeniz pidesi'],
      category: 'hamur-isleri',
      image: 'peynirli-pide',
      tags: ['vejetaryen'],
      short: 'Bol beyaz peynir ve kaşarla, kenarları kıvrık tereyağlı mini pide.',
      description:
        'Sütlü mayalı hamur elde açılır, kenarları kıvrılarak bol beyaz peynir ve kaşarla doldurulur. Fırından çıkınca tereyağı sürülür. Kahvaltıya ve çay saatine.',
      ingredients: ['Un', 'Süt', 'Yoğurt', 'Maya', 'Tereyağı', 'Beyaz peynir', 'Kaşar peyniri', 'Yumurta', 'Maydanoz', 'Tuz'],
      allergens: ['Gluten', 'Süt', 'Yumurta'],
      serving: '1 adet ≈ 180–200 g (16–18 cm) · kişi başı 1 adet',
      storage: 'Aynı gün tüketilmesi önerilir',
      options: [
        { id: 'a4', label: '4 Adet', detail: '4 kişilik', price: 640 },
        { id: 'a8', label: '8 Adet', detail: '8 kişilik', price: 1240 },
        { id: 'a12', label: '12 Adet', detail: '12 kişilik', price: 1800 },
      ],
    },
    {
      id: 'kavurmali-pide',
      name: 'Kavurmalı Yumurtalı Pide',
      aliases: ['pide', 'kavurma', 'yumurtalı pide', 'kıymalı'],
      category: 'hamur-isleri',
      image: 'kavurmali-pide',
      tags: [],
      short: 'Ev kavurması, beyaz peynir ve ortasında köy yumurtası.',
      description:
        'Tereyağlı mini pide hamuru; kendi yaptığımız dana kavurma ve beyaz peynirle doldurulur, ortasına köy yumurtası kırılarak fırınlanır. Doyurucu bir kahvaltı ya da öğle yemeği.',
      ingredients: ['Un', 'Süt', 'Yoğurt', 'Maya', 'Tereyağı', 'Dana kavurma', 'Beyaz peynir', 'Kaşar peyniri', 'Köy yumurtası', 'Karabiber', 'Tuz'],
      allergens: ['Gluten', 'Süt', 'Yumurta'],
      serving: '1 adet ≈ 250 g (18 cm) · kişi başı 1 adet',
      storage: 'Aynı gün tüketilmesi önerilir',
      options: [
        { id: 'a2', label: '2 Adet', detail: '2 kişilik', price: 540 },
        { id: 'a4', label: '4 Adet', detail: '4 kişilik', price: 1060 },
        { id: 'a8', label: '8 Adet', detail: '8 kişilik', price: 2080 },
      ],
    },
    {
      id: 'milfoy-kulah',
      name: 'Milföy Külah',
      aliases: ['milföy', 'milfoy', 'külah', 'kulah', 'kokteyl'],
      category: 'hamur-isleri',
      image: 'milfoy-kulah',
      tags: ['vejetaryen'],
      short: 'Susamlı çıtır milföy külahlar; dereotlu labne ve kırmızı biber dolgusu.',
      description:
        'Milföy hamuru külah kalıplarına sarılıp bol susamla fırınlanır; servis öncesi dereotlu, maydanozlu labne ve kırmızı biberli peynir harcıyla doldurulur. Davetlerin en çok konuşulan ikramı.',
      ingredients: ['Milföy hamuru', 'Yumurta sarısı', 'Susam', 'Labne peyniri', 'Beyaz peynir', 'Dereotu', 'Maydanoz', 'Kırmızı biber', 'Karabiber'],
      allergens: ['Gluten', 'Süt', 'Yumurta', 'Susam'],
      serving: '1 adet ≈ 55–60 g · kişi başı 2–3 adet',
      storage: 'Dolgulu olduğu için aynı gün tüketilmelidir',
      options: [
        { id: 'a10', label: '10 Adet', detail: '≈ 4–5 kişilik', price: 480 },
        { id: 'a20', label: '20 Adet', detail: '≈ 8–10 kişilik', price: 920 },
        { id: 'a40', label: '40 Adet', detail: '≈ 15–20 kişilik', price: 1780 },
      ],
    },

    {
      id: 'su-boregi',
      name: 'Su Böreği',
      aliases: ['borek', 'börek', 'su boregi', 'peynirli börek', 'kıymalı börek'],
      category: 'hamur-isleri',
      image: 'su-boregi',
      photoCredit: { author: 'Samizambak', license: 'CC BY-SA 4.0', url: 'https://commons.wikimedia.org/wiki/File:Su_b%C3%B6re%C4%9Fi_2025.jpg' },
      tags: ['vejetaryen'],
      short: 'Yufkası elde açılıp haşlanan, kat kat tereyağlı su böreği; peynirli veya kıymalı.',
      description:
        'Yumurtalı hamur ince ince açılır, her kat tek tek haşlanıp soğuk suya alınır ve bol tereyağıyla tepsiye serilir. Lor-beyaz peynir ve maydanozlu ya da soğanlı dana kıymalı iç harçla fırında kızartılır. Tepsi kare dilimlenmiş olarak teslim edilir.',
      ingredients: ['Un', 'Yumurta', 'Tuz', 'Tereyağı', 'Süt', 'Beyaz peynir', 'Lor peyniri', 'Maydanoz', 'İç harç (seçime göre)'],
      allergens: ['Gluten', 'Yumurta', 'Süt'],
      serving: '1 dilim ≈ 150–170 g',
      storage: 'Buzdolabında 3 gün · tüketmeden önce ısıtın',
      variantLabel: 'İç harç',
      variants: [
        { id: 'peynirli', name: 'Peynirli & maydanozlu', prices: [750, 1400] },
        { id: 'kiymali', name: 'Kıymalı (vejetaryen değildir)', prices: [900, 1700] },
      ],
      options: [
        { id: 'yt', label: 'Yarım Tepsi', detail: '8 dilim · ≈ 1,3 kg' },
        { id: 'tt', label: 'Tam Tepsi', detail: '16 dilim · ≈ 2,6 kg' },
      ],
    },
    /* ------------------------------------------------------------------ */
    /* SÜTLÜ & KUP TATLILAR                                                */
    /* ------------------------------------------------------------------ */
    {
      id: 'trilice',
      name: 'Triliçe',
      aliases: ['trileçe', 'trilece', 'trilice', 'üç sütlü', 'karamelli'],
      category: 'tatlilar',
      image: 'trilice',
      popular: true,
      tags: ['vejetaryen'],
      short: 'Üç sütle ıslanmış pamuk gibi kek, üzerinde parlak karamel.',
      description:
        'Yumurtası bol, hafif pandispanya; süt, krema ve kaymaktan oluşan üç sütlü karışımla bir gece ıslatılır. Üzeri ev yapımı karamel sos ve süt kreması desenle tamamlanır. Tepside, dilimli olarak teslim edilir.',
      ingredients: ['Yumurta', 'Un', 'Toz şeker', 'Kabartma tozu', 'Vanilya', 'Süt', 'Krema', 'Kaymak', 'Karamel (şeker, krema, tereyağı)'],
      allergens: ['Gluten', 'Süt', 'Yumurta'],
      serving: '1 dilim ≈ 170–180 g',
      storage: 'Buzdolabında 3 gün',
      variantLabel: 'Sos',
      variants: [
        { id: 'karamel', name: 'Karamelli (klasik)' },
        { id: 'cikolata', name: 'Çikolatalı' },
        { id: 'orman', name: 'Orman meyveli' },
      ],
      options: [
        { id: 'p4', label: '4 Kişilik', detail: '4 dilim · ≈ 700 g', price: 600 },
        { id: 'p8', label: '8 Kişilik', detail: '8 dilim · ≈ 1,4 kg', price: 1150 },
        { id: 'p12', label: '12 Kişilik', detail: 'Tam tepsi · 12 dilim · ≈ 2,1 kg', price: 1650 },
      ],
    },
    {
      id: 'magnolya',
      name: 'Magnolya',
      aliases: ['magnolia', 'çilekli', 'muzlu', 'kup'],
      category: 'tatlilar',
      image: 'magnolya',
      popular: true,
      tags: ['vejetaryen'],
      short: 'Taze çilek, ipeksi vanilyalı krema ve kıtır bisküvi katmanları.',
      description:
        'Sütlü, vanilyalı hafif kremanın arasına kıtır bisküvi ve taze meyve yerleştirilir; bir gece dinlendirilerek katmanlar birbirine kaynaşır. Kapaklı kaplarda, tek kişilik servis edilir.',
      ingredients: ['Süt', 'Krema', 'Yumurta sarısı', 'Mısır nişastası', 'Un', 'Toz şeker', 'Vanilya', 'Tereyağı', 'Bisküvi', 'Taze çilek / muz'],
      allergens: ['Gluten', 'Süt', 'Yumurta'],
      serving: '1 kap ≈ 220–250 g (250 ml)',
      storage: 'Buzdolabında 2 gün',
      variantLabel: 'Meyve',
      variants: [
        { id: 'cilek', name: 'Çilekli', prices: [190, 720, 1400, 1450] },
        { id: 'muz', name: 'Muzlu', prices: [190, 720, 1400, 1450] },
        { id: 'karisik', name: 'Çilek & muz', prices: [190, 720, 1400, 1450] },
        { id: 'lotus', name: 'Lotus bisküvili', prices: [220, 840, 1640, 1700] },
      ],
      options: [
        { id: 'k1', label: '1 Kap', detail: 'Tek kişilik · 250 ml' },
        { id: 'k4', label: '4\'lü Kutu', detail: '4 kişilik · 4 × 250 ml' },
        { id: 'k8', label: '8\'li Kutu', detail: '8 kişilik · 8 × 250 ml' },
        { id: 'kase', label: 'Aile Kasesi', detail: '8–10 kişilik · ≈ 2 kg' },
      ],
    },
    {
      id: 'supangle',
      name: 'Supangle',
      aliases: ['supangle', 'çikolatalı puding', 'puding', 'kakaolu'],
      category: 'tatlilar',
      image: 'supangle',
      photoCredit: { author: 'E4024', license: 'CC BY-SA 4.0', url: 'https://commons.wikimedia.org/wiki/File:Supangle_(cake_inside).jpg' },
      tags: ['vejetaryen'],
      short: 'Yoğun bitter çikolatalı puding, kakaolu kek tabanı ve hindistan cevizi.',
      description:
        'Gerçek bitter çikolata ve kakaoyla pişirilen yoğun kıvamlı puding, kakaolu pandispanya tabanın üzerine dökülür. Soğuyunca hindistan cevizi ve çikolata talaşıyla süslenir.',
      ingredients: ['Süt', 'Bitter çikolata', 'Kakao', 'Toz şeker', 'Mısır nişastası', 'Un', 'Tereyağı', 'Vanilya', 'Kakaolu pandispanya', 'Hindistan cevizi'],
      allergens: ['Gluten', 'Süt', 'Yumurta'],
      serving: '1 kap ≈ 200–220 g',
      storage: 'Buzdolabında 3 gün',
      options: [
        { id: 'k1', label: '1 Kap', detail: 'Tek kişilik', price: 160 },
        { id: 'k4', label: '4\'lü Kutu', detail: '4 kişilik', price: 600 },
        { id: 'k8', label: '8\'li Kutu', detail: '8 kişilik', price: 1160 },
      ],
    },
    {
      id: 'spoonful',
      name: 'Spoonful',
      aliases: ['spunfull', 'spunful', 'spoonfull', 'kup tatlı', 'çikolatalı'],
      category: 'tatlilar',
      image: 'spoonful',
      popular: true,
      tags: ['vejetaryen'],
      short: 'Kek kırıntısı, pastacı kreması ve çikolata ganajdan üç katlı kup tatlı.',
      description:
        'Sosyal medyanın en sevilen kup tatlısı: tabanda kakaolu kek kırıntıları, ortada ipeksi pastacı kreması, en üstte sütlü çikolata ganaj; badem dilimleri ve beyaz çikolata talaşıyla süslenir.',
      ingredients: ['Kakaolu kek (un, yumurta, şeker, kakao)', 'Süt', 'Krema', 'Yumurta sarısı', 'Mısır nişastası', 'Toz şeker', 'Vanilya', 'Sütlü çikolata', 'Badem dilimi', 'Beyaz çikolata'],
      allergens: ['Gluten', 'Süt', 'Yumurta', 'Badem'],
      serving: '1 kap ≈ 200–230 g',
      storage: 'Buzdolabında 3 gün',
      options: [
        { id: 'k1', label: '1 Kap', detail: 'Tek kişilik', price: 180 },
        { id: 'k4', label: '4\'lü Kutu', detail: '4 kişilik', price: 680 },
        { id: 'k8', label: '8\'li Kutu', detail: '8 kişilik', price: 1320 },
      ],
    },
    {
      id: 'berliner',
      name: 'Kremalı Berliner',
      aliases: ['berliner', 'alman pastası', 'pofuduk', 'kremalı çörek', 'tatlı çörek'],
      category: 'tatlilar',
      image: 'berliner',
      gallery: ['berliner', 'berliner-tabak'],
      tags: ['vejetaryen'],
      short: 'Pofuduk mayalı hamur, bol vanilyalı krema ve pudra şekeri.',
      description:
        'Tereyağlı, limon kabuğu kokulu mayalı hamur pamuk gibi kabarır; ortadan açılıp bol pastacı kremasıyla doldurulur, üzerine pudra şekeri serpilir. Kahvenin yanına en güzel eşlikçi.',
      ingredients: ['Un', 'Süt', 'Yumurta', 'Tereyağı', 'Maya', 'Şeker', 'Limon kabuğu', 'Tuz', 'Pastacı kreması (süt, krema, yumurta sarısı, nişasta, vanilya)', 'Pudra şekeri'],
      allergens: ['Gluten', 'Süt', 'Yumurta'],
      serving: '1 adet ≈ 100–110 g',
      storage: 'Buzdolabında 2 gün',
      variantLabel: 'Krema',
      variants: [
        { id: 'vanilya', name: 'Vanilyalı' },
        { id: 'cikolata', name: 'Çikolatalı' },
      ],
      options: [
        { id: 'a6', label: '6 Adet', detail: '≈ 650 g', price: 450 },
        { id: 'a12', label: '12 Adet', detail: '≈ 1,3 kg', price: 870 },
        { id: 'a24', label: '24 Adet', detail: '≈ 2,6 kg · ikramlık', price: 1700 },
      ],
    },

    {
      id: 'firin-sutlac',
      name: 'Fırın Sütlaç',
      aliases: ['sutlac', 'sütlaç', 'sütlü', 'fırın sütlaç', 'pirinç tatlısı'],
      category: 'tatlilar',
      image: 'firin-sutlac',
      photoCredit: { author: 'E4024', license: 'CC BY-SA 4.0', url: 'https://commons.wikimedia.org/wiki/File:Turkish_rice_pudding_(s%C3%BCtla%C3%A7).jpg' },
      tags: ['vejetaryen', 'glutensiz'],
      short: 'Toprak güveçte, üstü fırında kızarmış klasik sütlaç; tarçın ve fındıkla.',
      description:
        'Baldo pirinç sütte ağır ağır pişirilir, pirinç unuyla kıvamlanır. Toprak güveçlere paylanıp üzeri nar gibi kızarana kadar fırınlanır. İsteğe göre tarçın ve fındıkla servis edilir.',
      ingredients: ['Süt', 'Baldo pirinç', 'Toz şeker', 'Pirinç unu', 'Vanilya', 'Tarçın (ayrı)', 'Fındık (ayrı)'],
      allergens: ['Süt', 'Fındık (isteğe bağlı)'],
      serving: '1 güveç ≈ 200–220 g',
      storage: 'Buzdolabında 3 gün',
      options: [
        { id: 'k1', label: '1 Güveç', detail: 'Tek kişilik', price: 150 },
        { id: 'k4', label: '4\'lü Kutu', detail: '4 kişilik', price: 560 },
        { id: 'k8', label: '8\'li Kutu', detail: '8 kişilik', price: 1080 },
      ],
    },
    {
      id: 'ev-baklavasi',
      name: 'Ev Baklavası',
      aliases: ['baklava', 'cevizli', 'fıstıklı', 'şerbetli', 'bayram'],
      category: 'tatlilar',
      image: 'ev-baklavasi',
      photoCredit: { author: 'Maksym Kozlenko', license: 'CC BY-SA 4.0', url: 'https://commons.wikimedia.org/wiki/File:2018-04-28_Turkish_baklava_in_Australian_turkish_cafe.jpg' },
      tags: ['vejetaryen'],
      short: 'Elde açılan 40 kat yufka, bol tereyağı ve iç; şerbeti tam kıvamında ev baklavası.',
      description:
        'Nişastayla incecik açılan yufkalar kat kat dizilir, araya bol ceviz ya da Antep fıstığı serpilir. Sade tereyağıyla fırınlanır, ılık şerbetle buluşturulur. Bayramlar, misafirler ve hediyelik kutular için.',
      ingredients: ['Un', 'Yumurta', 'Süt', 'Nişasta', 'Sade tereyağı', 'Ceviz içi veya Antep fıstığı', 'Toz şeker', 'Su', 'Limon'],
      allergens: ['Gluten', 'Yumurta', 'Süt', 'Ceviz / Antep fıstığı'],
      serving: '1 dilim ≈ 40–45 g',
      storage: 'Oda sıcaklığında, kapalı kapta 1 hafta',
      variantLabel: 'İç',
      variants: [
        { id: 'cevizli', name: 'Cevizli', prices: [650, 1250, 2400] },
        { id: 'fistikli', name: 'Antep fıstıklı', prices: [950, 1850, 3600] },
      ],
      options: [
        { id: 'g500', label: '500 g', detail: '≈ 12 dilim' },
        { id: 'kg1', label: '1 kg', detail: '≈ 24 dilim' },
        { id: 'kg2', label: '2 kg (tepsi)', detail: '≈ 48 dilim · ikramlık' },
      ],
    },
    /* ------------------------------------------------------------------ */
    /* CHEESECAKE                                                          */
    /* ------------------------------------------------------------------ */
    {
      id: 'san-sebastian',
      name: 'San Sebastian Cheesecake',
      aliases: ['sansebastian', 'sunsebastian', 'san sebastian', 'cheesecake', 'bask', 'yanık cheesecake'],
      category: 'cheesecake',
      image: 'san-sebastian',
      popular: true,
      campaign: true,
      tags: ['vejetaryen'],
      short: 'Dışı karamelize, içi akışkan ve kremamsı Bask usulü cheesecake.',
      description:
        'Bol krem peynir ve kremayla, yüksek ısıda pişirilen ünlü Bask usulü cheesecake: yüzeyi koyu karamelize, içi akışkan ve kadifemsi. Dilerseniz orman meyveleri, badem ve Antep fıstığıyla süslüyoruz.',
      ingredients: ['Krem peynir', 'Krema', 'Yumurta', 'Toz şeker', 'Bir tutam un', 'Vanilya', 'Tuz', 'Süsleme: orman meyveleri, badem, Antep fıstığı (seçime göre)'],
      allergens: ['Süt', 'Yumurta', 'Gluten (az miktarda)', 'Badem & Antep fıstığı (süslemeli çeşitte)'],
      serving: '1 dilim ≈ 130–150 g',
      storage: 'Buzdolabında 4 gün · servisten 30 dk önce çıkarın',
      variantLabel: 'Süsleme / sos',
      variants: [
        { id: 'sade', name: 'Sade (klasik)', extra: 0 },
        { id: 'orman', name: 'Orman meyveli & bademli', extra: 120 },
        { id: 'cikolata', name: 'Belçika çikolatası soslu', extra: 120 },
        { id: 'lotus', name: 'Lotus soslu', extra: 150 },
      ],
      options: [
        { id: 'c16', label: '16 cm', detail: '4–6 kişilik · ≈ 900 g', price: 950 },
        { id: 'c20', label: '20 cm', detail: '8–10 kişilik · ≈ 1,5 kg', price: 1450, campaignPrice: 1000 },
        { id: 'c24', label: '24 cm', detail: '12–14 kişilik · ≈ 2,2 kg', price: 2050 },
      ],
    },
    {
      id: 'limonlu-cheesecake',
      name: 'Limonlu Cheesecake',
      aliases: ['cheesecake', 'limonlu', 'limon'],
      category: 'cheesecake',
      image: 'limonlu-cheesecake',
      tags: ['vejetaryen'],
      short: 'Bisküvi taban, hafif krem peynir dolgusu ve taze limon sosu.',
      description:
        'Tereyağlı bisküvi tabanın üzerinde fırında yavaş pişen hafif krem peynir dolgusu; üzeri taze sıkılmış limonla hazırlanan parlak limon sosu ve nane yapraklarıyla tamamlanır.',
      ingredients: ['Bisküvi', 'Tereyağı', 'Krem peynir', 'Labne', 'Krema', 'Yumurta', 'Toz şeker', 'Nişasta', 'Vanilya', 'Taze limon suyu & kabuğu', 'Nane (süsleme)'],
      allergens: ['Gluten', 'Süt', 'Yumurta'],
      serving: '1 dilim ≈ 130–150 g',
      storage: 'Buzdolabında 4 gün',
      options: [
        { id: 'c16', label: '16 cm', detail: '4–6 kişilik · ≈ 900 g', price: 900 },
        { id: 'c20', label: '20 cm', detail: '8–10 kişilik · ≈ 1,5 kg', price: 1350 },
        { id: 'c24', label: '24 cm', detail: '12–14 kişilik · ≈ 2,2 kg', price: 1900 },
      ],
    },

    /* ------------------------------------------------------------------ */
    /* KURABİYELER                                                         */
    /* ------------------------------------------------------------------ */
    {
      id: 'tuzlu-kurabiye',
      name: 'Tuzlu Kurabiye',
      aliases: ['tuzlu', 'kurabiye', 'halka', 'susamlı', 'çörekotlu', 'kaşarlı'],
      category: 'kurabiyeler',
      image: 'tuzlu-kurabiye',
      tags: ['vejetaryen'],
      short: 'Ağızda dağılan susamlı halka, çörekotlu ve kaşarlı çeşitler.',
      description:
        'Tereyağı ve yoğurtla yoğrulan, ağızda dağılan tuzlu kurabiyeler. Halka şeklinde verilip bol susama bulanır ya da çörekotu ve kaşarla zenginleştirilir. Çay saatlerinin, misafir sofralarının olmazsa olmazı.',
      ingredients: ['Un', 'Tereyağı', 'Ayçiçek yağı', 'Yoğurt', 'Yumurta', 'Kabartma tozu', 'Sirke', 'Tuz', 'Susam', 'Çörekotu', 'Kaşar (kaşarlı çeşitte)'],
      allergens: ['Gluten', 'Süt', 'Yumurta', 'Susam'],
      serving: '1 adet ≈ 20–25 g · 1 kg ≈ 45–50 adet',
      storage: 'Kapalı kapta oda sıcaklığında 10 gün',
      variantLabel: 'Çeşit',
      variants: [
        { id: 'susamli', name: 'Susamlı halka' },
        { id: 'corekotlu', name: 'Çörekotlu' },
        { id: 'kasarli', name: 'Kaşarlı' },
        { id: 'karisik', name: 'Karışık kutu' },
      ],
      options: [
        { id: 'g500', label: '500 g', detail: '≈ 22–25 adet', price: 380 },
        { id: 'kg1', label: '1 kg', detail: '≈ 45–50 adet', price: 720 },
        { id: 'kg2', label: '2 kg', detail: '≈ 90–100 adet · ikramlık', price: 1400 },
      ],
    },
    {
      id: 'elmali-kurabiye',
      name: 'Elmalı Kurabiye',
      aliases: ['elmalı', 'elmali', 'kurabiye', 'tarçınlı', 'pudra şekerli'],
      category: 'kurabiyeler',
      image: 'elmali-kurabiye',
      tags: ['vejetaryen'],
      short: 'Tarçınlı elma ve cevizli iç, pudra şekerli yumuşacık hilal kurabiyeler.',
      description:
        'Tereyağlı, yoğurtlu yumuşak hamur; tarçınla pişirilmiş elma ve cevizli iç harçla hilal şeklinde sarılır. Fırından çıktıktan sonra bol pudra şekerine bulanır.',
      ingredients: ['Un', 'Tereyağı', 'Yoğurt', 'Pudra şekeri', 'Yumurta', 'Kabartma tozu', 'Vanilya', 'Elma', 'Toz şeker', 'Tarçın', 'Ceviz'],
      allergens: ['Gluten', 'Süt', 'Yumurta', 'Ceviz (cevizli çeşitte)'],
      serving: '1 adet ≈ 30–35 g · 1 kg ≈ 30–33 adet',
      storage: 'Kapalı kapta oda sıcaklığında 5 gün',
      variantLabel: 'İç harç',
      variants: [
        { id: 'cevizli', name: 'Cevizli' },
        { id: 'cevizsiz', name: 'Cevizsiz' },
      ],
      options: [
        { id: 'g500', label: '500 g', detail: '≈ 15–16 adet', price: 420 },
        { id: 'kg1', label: '1 kg', detail: '≈ 30–33 adet', price: 800 },
        { id: 'kg2', label: '2 kg', detail: '≈ 60–65 adet · ikramlık', price: 1550 },
      ],
    },

    /* ------------------------------------------------------------------ */
    /* İKRAM & ORGANİZASYON                                                */
    /* ------------------------------------------------------------------ */
    {
      id: 'kokteyl-standi',
      name: 'Kokteyl Sandviç Standı',
      aliases: ['kokteyl', 'mini sandviç', 'mini burger', 'mini kruvasan', 'organizasyon', 'doğum günü', 'ikram'],
      category: 'organizasyon',
      image: 'kokteyl-standi',
      popular: true,
      tags: [],
      short: 'Mini burger ve mini kruvasan sandviçlerle iki katlı ikram standı.',
      description:
        'Doğum günü, gün, toplantı ve kutlamalar için: ev yapımı susamlı mini burger ekmeklerinde salam & kaşar, mini kruvasanlarda hindi füme & kaşar. Kıvırcık, çeri domates ve zeytinle süslenip kürdanlı servis edilir.',
      ingredients: ['Mini burger ekmeği & mini kruvasan (un, süt, tereyağı, yumurta, maya, susam)', 'Dana salam', 'Hindi füme', 'Kaşar peyniri', 'Kıvırcık marul', 'Çeri domates', 'Siyah zeytin', 'Mayonez & hardal sos'],
      allergens: ['Gluten', 'Süt', 'Yumurta', 'Susam', 'Hardal'],
      serving: '1 parça ≈ 40–50 g · kişi başı 3–4 parça',
      storage: 'Aynı gün tüketilmelidir',
      variantLabel: 'İçerik',
      variants: [
        { id: 'karisik', name: 'Karışık (burger + kruvasan)' },
        { id: 'kruvasan', name: 'Sadece mini kruvasan' },
        { id: 'burger', name: 'Sadece mini burger' },
      ],
      options: [
        { id: 'pr30', label: '30 Parça', detail: '8–10 kişilik', price: 2100 },
        { id: 'pr50', label: '50 Parça', detail: '12–15 kişilik', price: 3400 },
        { id: 'pr80', label: '80 Parça', detail: '20–25 kişilik', price: 5300 },
      ],
    },
  ],
};
