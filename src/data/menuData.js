export const CATEGORIES = [
  { id: 'ayam', name: 'Ayam', desc: 'Berbagai olahan ayam pilihan', icon: '🍗', tint: 'var(--color-red-tint)' },
  { id: 'nasi', name: 'Nasi', desc: 'Aneka nasi dan nasi goreng', icon: '🍚', tint: 'var(--color-amber-tint)' },
  { id: 'mie', name: 'Mie', desc: 'Mie goreng dan mie kuah', icon: '🍜', tint: 'var(--color-amber-tint)' },
  { id: 'minuman', name: 'Minuman', desc: 'Minuman segar dan hangat', icon: '🥤', tint: 'var(--color-blue-tint)' },
];

const WIKI = 'https://commons.wikimedia.org/wiki/Special:FilePath/';

export const MENU_ITEMS = [
  { id: 'ayam-geprek', category: 'ayam', name: 'Ayam Geprek Sambal Bawang', price: 15000, desc: 'Ayam crispy digeprek dengan sambal bawang pedas khas.', icon: '🍗', image: WIKI + 'Ayam_Geprek.jpg', stock: 20 },
  { id: 'ayam-bakar', category: 'ayam', name: 'Ayam Bakar Madu', price: 18000, desc: 'Ayam bakar bumbu madu, manis gurih dan empuk.', icon: '🍗', image: WIKI + 'Ayam_Bakar_Bali.jpg', stock: 15 },
  { id: 'ayam-goreng', category: 'ayam', name: 'Ayam Goreng Kremes', price: 16000, desc: 'Ayam goreng renyah dengan taburan kremes gurih.', icon: '🍗', image: WIKI + 'Ayam_goreng_in_Jakarta.JPG', stock: 18 },
  { id: 'ayam-rica', category: 'ayam', name: 'Ayam Rica-Rica', price: 17000, desc: 'Ayam dengan bumbu rica pedas khas Manado.', icon: '🍗', image: WIKI + 'Ayam_Rica-rica.JPG', stock: 10 },
  { id: 'nasi-goreng', category: 'nasi', name: 'Nasi Goreng Spesial', price: 14000, desc: 'Nasi goreng dengan telur, ayam suwir, dan acar.', icon: '🍚', image: WIKI + 'Nasi_goreng_istimewa.JPG', stock: 25 },
  { id: 'nasi-uduk', category: 'nasi', name: 'Nasi Uduk Komplit', price: 13000, desc: 'Nasi uduk gurih dengan lauk lengkap dan sambal.', icon: '🍚', image: WIKI + 'Nasi_Uduk_Betawi.jpg', stock: 20 },
  { id: 'nasi-padang', category: 'nasi', name: 'Nasi Padang Rendang', price: 20000, desc: 'Nasi putih dengan rendang daging empuk pedas.', icon: '🍚', image: WIKI + 'Nasi_Padang_With_beef_rendang.jpg', stock: 12 },
  { id: 'nasi-campur', category: 'nasi', name: 'Nasi Campur Sayur', price: 13000, desc: 'Nasi dengan aneka sayur dan lauk pilihan.', icon: '🍚', image: WIKI + 'Nasi_Campur_Bali.jpg', stock: 16 },
  { id: 'mie-goreng', category: 'mie', name: 'Mie Goreng Jawa', price: 13000, desc: 'Mie goreng bumbu jawa dengan telur dan sayuran.', icon: '🍜', image: WIKI + 'Mi_goreng.JPG', stock: 20 },
  { id: 'mie-ayam', category: 'mie', name: 'Mie Ayam Pangsit', price: 14000, desc: 'Mie ayam dengan pangsit goreng dan bakso.', icon: '🍜', image: WIKI + 'Mi_ayam_pangsit_di_Rantepao.JPG', stock: 5 },
  { id: 'mie-kuah', category: 'mie', name: 'Mie Kuah Rebus', price: 12000, desc: 'Mie rebus hangat dengan kuah kaldu gurih.', icon: '🍜', image: WIKI + 'Mie_Rebus_Medan.jpg', stock: 0 },
  { id: 'es-teh', category: 'minuman', name: 'Es Teh Manis', price: 4000, desc: 'Teh manis dingin yang menyegarkan.', icon: '🥤', image: WIKI + 'Es_teh_gelas_jumbo.jpg', stock: 40 },
  { id: 'es-jeruk', category: 'minuman', name: 'Es Jeruk Peras', price: 6000, desc: 'Jeruk peras segar dengan es batu.', icon: '🥤', image: WIKI + 'Es_jeruk_peras.jpg', stock: 30 },
  { id: 'kopi-hitam', category: 'minuman', name: 'Kopi Hitam', price: 5000, desc: 'Kopi hitam panas khas warung.', icon: '☕', image: WIKI + 'Kopi_Tubruk_Jakarta.jpg', stock: 25 },
  { id: 'air-mineral', category: 'minuman', name: 'Air Mineral', price: 3000, desc: 'Air mineral dingin 600ml.', icon: '💧', image: WIKI + 'Botol_air_mineral.jpg', stock: 50 },
];
