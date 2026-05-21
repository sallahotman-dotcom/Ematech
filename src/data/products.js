// Ematech - Premium Tech Store
// Master data file: categories, products, and customer reviews

export const categories = [
  {
    id: 'smartphones',
    slug: 'smartphones',
    name: 'Smartphones',
    nameAr: 'الهواتف الذكية',
    description: "Flagship smartphones from the world's leading brands.",
    image:
      'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&q=80&auto=format&fit=crop'
  },
  {
    id: 'smartwatches',
    slug: 'smartwatches',
    name: 'Smartwatches',
    nameAr: 'الساعات الذكية',
    description: 'Track your fitness and stay connected in style.',
    image:
      'https://images.unsplash.com/photo-1551816230-ef5deaed4a26?w=800&q=80&auto=format&fit=crop'
  },
  {
    id: 'audio',
    slug: 'audio',
    name: 'Audio & Speakers',
    nameAr: 'مكبرات الصوت',
    description: 'Studio-grade headphones and speakers for true audiophiles.',
    image:
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80&auto=format&fit=crop'
  },
  {
    id: 'home-appliances',
    slug: 'home-appliances',
    name: 'Home Appliances',
    nameAr: 'الأجهزة المنزلية',
    description: 'Smart, modern appliances to elevate your home.',
    image:
      'https://images.unsplash.com/photo-1558317374-067fb5f30001?w=800&q=80&auto=format&fit=crop'
  }
];

export const products = [
  // ---------- Smartphones ----------
  {
    id: 'sp-001',
    name: 'iPhone 15 Pro Max 256GB',
    brand: 'Apple',
    category: 'smartphones',
    price: 14999,
    oldPrice: 16499,
    currency: 'MAD',
    rating: 4.9,
    reviewsCount: 412,
    inStock: true,
    isFeatured: true,
    isNew: true,
    image:
      'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=800&q=80&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=800&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=800&q=80&auto=format&fit=crop'
    ],
    description:
      'Titanium design, A17 Pro chip, and a pro-level camera system. The most advanced iPhone ever.',
    specs: {
      Display: '6.7" Super Retina XDR',
      Chip: 'A17 Pro',
      Storage: '256GB',
      Camera: '48MP Triple System',
      Battery: 'Up to 29 hours video playback'
    }
  },
  {
    id: 'sp-002',
    name: 'Samsung Galaxy S24 Ultra 512GB',
    brand: 'Samsung',
    category: 'smartphones',
    price: 13499,
    oldPrice: 14999,
    currency: 'MAD',
    rating: 4.8,
    reviewsCount: 358,
    inStock: true,
    isFeatured: true,
    isNew: true,
    image:
      'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=800&q=80&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=800&q=80&auto=format&fit=crop'
    ],
    description:
      'Galaxy AI, built-in S Pen, and a 200MP camera. Designed for professionals and creators.',
    specs: {
      Display: '6.8" Dynamic AMOLED 2X',
      Chip: 'Snapdragon 8 Gen 3',
      Storage: '512GB',
      Camera: '200MP Quad System',
      Battery: '5000 mAh'
    }
  },
  {
    id: 'sp-003',
    name: 'Xiaomi 14 Pro 256GB',
    brand: 'Xiaomi',
    category: 'smartphones',
    price: 8999,
    oldPrice: 9999,
    currency: 'MAD',
    rating: 4.7,
    reviewsCount: 221,
    inStock: true,
    isFeatured: false,
    isNew: false,
    image:
      'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=800&q=80&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=800&q=80&auto=format&fit=crop'
    ],
    description:
      'Leica optics, ultra-fast charging, and a flagship Snapdragon 8 Gen 3 processor.',
    specs: {
      Display: '6.73" LTPO AMOLED',
      Chip: 'Snapdragon 8 Gen 3',
      Storage: '256GB',
      Camera: 'Leica 50MP Triple',
      Battery: '4880 mAh, 120W'
    }
  },
  {
    id: 'sp-004',
    name: 'Google Pixel 8 Pro 256GB',
    brand: 'Google',
    category: 'smartphones',
    price: 9499,
    oldPrice: 10499,
    currency: 'MAD',
    rating: 4.7,
    reviewsCount: 189,
    inStock: true,
    isFeatured: false,
    isNew: false,
    image:
      'https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=800&q=80&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=800&q=80&auto=format&fit=crop'
    ],
    description:
      'Pure Android with Google Tensor G3 and the smartest AI camera on the market.',
    specs: {
      Display: '6.7" LTPO OLED',
      Chip: 'Google Tensor G3',
      Storage: '256GB',
      Camera: '50MP Triple AI',
      Battery: '5050 mAh'
    }
  },
  {
    id: 'sp-005',
    name: 'OnePlus 12 256GB',
    brand: 'OnePlus',
    category: 'smartphones',
    price: 7999,
    oldPrice: 8799,
    currency: 'MAD',
    rating: 4.6,
    reviewsCount: 142,
    inStock: true,
    isFeatured: false,
    isNew: true,
    image:
      'https://images.unsplash.com/photo-1567581935884-3349723552ca?w=800&q=80&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1567581935884-3349723552ca?w=800&q=80&auto=format&fit=crop'
    ],
    description:
      'Hasselblad camera system, 100W charging, and silky-smooth 120Hz display.',
    specs: {
      Display: '6.82" LTPO AMOLED',
      Chip: 'Snapdragon 8 Gen 3',
      Storage: '256GB',
      Camera: 'Hasselblad 50MP Triple',
      Battery: '5400 mAh, 100W'
    }
  },

  // ---------- Smartwatches ----------
  {
    id: 'sw-001',
    name: 'Apple Watch Series 9 GPS 45mm',
    brand: 'Apple',
    category: 'smartwatches',
    price: 4299,
    oldPrice: 4699,
    currency: 'MAD',
    rating: 4.8,
    reviewsCount: 287,
    inStock: true,
    isFeatured: true,
    isNew: true,
    image:
      'https://images.unsplash.com/photo-1551816230-ef5deaed4a26?w=800&q=80&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1551816230-ef5deaed4a26?w=800&q=80&auto=format&fit=crop'
    ],
    description:
      'The most advanced Apple Watch yet with the new S9 chip and Double Tap gesture.',
    specs: {
      Display: 'Always-On Retina',
      Chip: 'S9 SiP',
      Size: '45mm',
      Connectivity: 'GPS + Bluetooth 5.3',
      Battery: 'Up to 18 hours'
    }
  },
  {
    id: 'sw-002',
    name: 'Samsung Galaxy Watch 6 Classic 47mm',
    brand: 'Samsung',
    category: 'smartwatches',
    price: 3199,
    oldPrice: 3599,
    currency: 'MAD',
    rating: 4.7,
    reviewsCount: 198,
    inStock: true,
    isFeatured: true,
    isNew: false,
    image:
      'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=800&q=80&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=800&q=80&auto=format&fit=crop'
    ],
    description:
      'The legendary rotating bezel returns with advanced health tracking and Wear OS.',
    specs: {
      Display: '1.5" Super AMOLED',
      Chip: 'Exynos W930',
      Size: '47mm',
      Connectivity: 'Bluetooth + Wi-Fi',
      Battery: '425 mAh'
    }
  },
  {
    id: 'sw-003',
    name: 'Garmin Fenix 7 Sapphire Solar',
    brand: 'Garmin',
    category: 'smartwatches',
    price: 6499,
    oldPrice: 6999,
    currency: 'MAD',
    rating: 4.9,
    reviewsCount: 156,
    inStock: true,
    isFeatured: false,
    isNew: false,
    image:
      'https://images.unsplash.com/photo-1617043786394-f977fa12eddf?w=800&q=80&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1617043786394-f977fa12eddf?w=800&q=80&auto=format&fit=crop'
    ],
    description:
      'Multisport GPS adventure watch with solar charging and a sapphire crystal lens.',
    specs: {
      Display: '1.3" Solar Transflective',
      Build: 'Sapphire + Titanium',
      Size: '47mm',
      Connectivity: 'Multi-band GPS',
      Battery: 'Up to 22 days'
    }
  },
  {
    id: 'sw-004',
    name: 'Huawei Watch GT 4 46mm',
    brand: 'Huawei',
    category: 'smartwatches',
    price: 2499,
    oldPrice: 2799,
    currency: 'MAD',
    rating: 4.6,
    reviewsCount: 134,
    inStock: true,
    isFeatured: false,
    isNew: true,
    image:
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80&auto=format&fit=crop'
    ],
    description:
      'Premium octagonal design, advanced fitness tracking, and 14-day battery life.',
    specs: {
      Display: '1.43" AMOLED',
      Build: 'Stainless Steel',
      Size: '46mm',
      Connectivity: 'Bluetooth 5.2',
      Battery: 'Up to 14 days'
    }
  },
  {
    id: 'sw-005',
    name: 'Apple Watch Ultra 2 49mm',
    brand: 'Apple',
    category: 'smartwatches',
    price: 8999,
    oldPrice: 9499,
    currency: 'MAD',
    rating: 4.9,
    reviewsCount: 178,
    inStock: true,
    isFeatured: true,
    isNew: true,
    image:
      'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=800&q=80&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=800&q=80&auto=format&fit=crop'
    ],
    description:
      'Built for endurance and exploration. Titanium case, brightest display ever.',
    specs: {
      Display: 'Always-On Retina 3000 nits',
      Chip: 'S9 SiP',
      Size: '49mm Titanium',
      Connectivity: 'GPS + Cellular',
      Battery: 'Up to 36 hours'
    }
  },

  // ---------- Audio & Speakers ----------
  {
    id: 'au-001',
    name: 'Sony WH-1000XM5 Wireless Headphones',
    brand: 'Sony',
    category: 'audio',
    price: 3299,
    oldPrice: 3699,
    currency: 'MAD',
    rating: 4.9,
    reviewsCount: 521,
    inStock: true,
    isFeatured: true,
    isNew: false,
    image:
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80&auto=format&fit=crop'
    ],
    description:
      'Industry-leading noise cancellation with crystal-clear hands-free calling.',
    specs: {
      Type: 'Over-ear, Wireless',
      ANC: 'Adaptive Dual Noise Sensor',
      Battery: 'Up to 30 hours',
      Codecs: 'LDAC, AAC, SBC',
      Weight: '250g'
    }
  },
  {
    id: 'au-002',
    name: 'Bose QuietComfort Ultra Headphones',
    brand: 'Bose',
    category: 'audio',
    price: 3899,
    oldPrice: 4199,
    currency: 'MAD',
    rating: 4.8,
    reviewsCount: 312,
    inStock: true,
    isFeatured: true,
    isNew: true,
    image:
      'https://images.unsplash.com/photo-1545127398-14699f92334b?w=800&q=80&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1545127398-14699f92334b?w=800&q=80&auto=format&fit=crop'
    ],
    description:
      'Immersive Audio with spatial sound and the world-class quiet you expect from Bose.',
    specs: {
      Type: 'Over-ear, Wireless',
      ANC: 'CustomTune ANC',
      Battery: 'Up to 24 hours',
      Codecs: 'aptX Adaptive, AAC',
      Weight: '254g'
    }
  },
  {
    id: 'au-003',
    name: 'JBL Charge 5 Portable Speaker',
    brand: 'JBL',
    category: 'audio',
    price: 1699,
    oldPrice: 1899,
    currency: 'MAD',
    rating: 4.7,
    reviewsCount: 408,
    inStock: true,
    isFeatured: false,
    isNew: false,
    image:
      'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=800&q=80&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=800&q=80&auto=format&fit=crop'
    ],
    description:
      'Bold JBL Pro Sound, 20-hour battery, and IP67 waterproof + dustproof rating.',
    specs: {
      Type: 'Portable Bluetooth',
      Power: '40W RMS',
      Battery: '20 hours',
      Waterproof: 'IP67',
      Weight: '960g'
    }
  },
  {
    id: 'au-004',
    name: 'Apple AirPods Pro (2nd Gen) USB-C',
    brand: 'Apple',
    category: 'audio',
    price: 2799,
    oldPrice: 2999,
    currency: 'MAD',
    rating: 4.8,
    reviewsCount: 612,
    inStock: true,
    isFeatured: true,
    isNew: true,
    image:
      'https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?w=800&q=80&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?w=800&q=80&auto=format&fit=crop'
    ],
    description:
      'Adaptive Audio, Personalized Spatial Audio, and twice the noise cancellation.',
    specs: {
      Type: 'In-ear, Wireless',
      Chip: 'H2',
      Battery: '6h + 30h with case',
      Charging: 'USB-C / MagSafe / Qi',
      Waterproof: 'IP54'
    }
  },
  {
    id: 'au-005',
    name: 'Marshall Stanmore III Bluetooth Speaker',
    brand: 'Marshall',
    category: 'audio',
    price: 4499,
    oldPrice: 4899,
    currency: 'MAD',
    rating: 4.8,
    reviewsCount: 184,
    inStock: true,
    isFeatured: false,
    isNew: false,
    image:
      'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=800&q=80&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=800&q=80&auto=format&fit=crop'
    ],
    description:
      'Iconic Marshall design with rich, room-filling sound and Bluetooth 5.2.',
    specs: {
      Type: 'Wireless Bookshelf',
      Power: '80W',
      Connectivity: 'Bluetooth 5.2, RCA, 3.5mm',
      Codecs: 'aptX',
      Weight: '4.25 kg'
    }
  },

  // ---------- Home Appliances ----------
  {
    id: 'ha-001',
    name: 'Dyson V15 Detect Cordless Vacuum',
    brand: 'Dyson',
    category: 'home-appliances',
    price: 7499,
    oldPrice: 8299,
    currency: 'MAD',
    rating: 4.8,
    reviewsCount: 246,
    inStock: true,
    isFeatured: true,
    isNew: true,
    image:
      'https://images.unsplash.com/photo-1558317374-067fb5f30001?w=800&q=80&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1558317374-067fb5f30001?w=800&q=80&auto=format&fit=crop'
    ],
    description:
      'Laser dust detection, scientifically proven deep clean, and intelligent suction.',
    specs: {
      Type: 'Cordless Stick Vacuum',
      Suction: '230 AW',
      Battery: 'Up to 60 minutes',
      Bin: '0.77 L',
      Weight: '3.1 kg'
    }
  },
  {
    id: 'ha-002',
    name: 'Nespresso Vertuo Plus Coffee Machine',
    brand: 'Nespresso',
    category: 'home-appliances',
    price: 1999,
    oldPrice: 2299,
    currency: 'MAD',
    rating: 4.7,
    reviewsCount: 389,
    inStock: true,
    isFeatured: true,
    isNew: false,
    image:
      'https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=800&q=80&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=800&q=80&auto=format&fit=crop'
    ],
    description:
      'Five cup sizes, automatic capsule recognition, and a perfect crema every time.',
    specs: {
      Type: 'Capsule Coffee Machine',
      Pressure: '19 bar',
      Tank: '1.2 L',
      Power: '1260 W',
      Heatup: '20 seconds'
    }
  },
  {
    id: 'ha-003',
    name: 'Philips Airfryer XXL Premium',
    brand: 'Philips',
    category: 'home-appliances',
    price: 2299,
    oldPrice: 2599,
    currency: 'MAD',
    rating: 4.6,
    reviewsCount: 267,
    inStock: true,
    isFeatured: false,
    isNew: false,
    image:
      'https://images.unsplash.com/photo-1585515320310-259814833e62?w=800&q=80&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1585515320310-259814833e62?w=800&q=80&auto=format&fit=crop'
    ],
    description:
      'Twin TurboStar technology to remove up to 90% of fat. Family-size 1.4kg basket.',
    specs: {
      Capacity: '1.4 kg',
      Power: '2225 W',
      Programs: '7 presets',
      Display: 'Digital Touch',
      Cleaning: 'Dishwasher safe'
    }
  },
  {
    id: 'ha-004',
    name: 'LG InstaView Smart Refrigerator 635L',
    brand: 'LG',
    category: 'home-appliances',
    price: 18999,
    oldPrice: 21499,
    currency: 'MAD',
    rating: 4.8,
    reviewsCount: 92,
    inStock: true,
    isFeatured: true,
    isNew: true,
    image:
      'https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?w=800&q=80&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?w=800&q=80&auto=format&fit=crop'
    ],
    description:
      'Knock twice on the InstaView panel to see inside. Door-in-Door with smart Wi-Fi.',
    specs: {
      Capacity: '635 L',
      Type: 'Side-by-Side',
      Energy: 'Inverter Linear Compressor',
      Smart: 'Wi-Fi + ThinQ App',
      Warranty: '10 years compressor'
    }
  },
  {
    id: 'ha-005',
    name: 'Samsung MS23 Solo Microwave 23L',
    brand: 'Samsung',
    category: 'home-appliances',
    price: 1899,
    oldPrice: 2099,
    currency: 'MAD',
    rating: 4.5,
    reviewsCount: 174,
    inStock: true,
    isFeatured: false,
    isNew: false,
    image:
      'https://images.unsplash.com/photo-1574269909862-7e1d70bb8078?w=800&q=80&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1574269909862-7e1d70bb8078?w=800&q=80&auto=format&fit=crop'
    ],
    description:
      'Ceramic enamel interior, healthy auto cook menus, and a sleek modern design.',
    specs: {
      Capacity: '23 L',
      Power: '800 W',
      Programs: '20 auto menus',
      Interior: 'Ceramic Enamel',
      Warranty: '2 years'
    }
  }
];

// ---------- 20 Customer Reviews (Arabic / Moroccan) ----------
export const reviews = [
  {
    id: 'rv-01',
    name: 'محمد العمراني',
    city: 'الدار البيضاء',
    rating: 5,
    date: '2026-04-12',
    avatar: 'https://i.pravatar.cc/120?img=11',
    comment:
      'تجربة شراء راقية جداً مع Ematech. وصل الهاتف في أقل من 24 ساعة، التغليف فاخر والمنتج أصلي 100%. خدمة الزبائن في المستوى. شكراً لكم على الاحترافية.'
  },
  {
    id: 'rv-02',
    name: 'فاطمة الزهراء البناني',
    city: 'الرباط',
    rating: 5,
    date: '2026-04-08',
    avatar: 'https://i.pravatar.cc/120?img=47',
    comment:
      'صراحة ماكنتش متوقعة هاد الجودة. الساعة الذكية وصلاتني مزيانة بزاف وفي الوقت اللي قالو ليا. Ematech ولا الاختيار ديالي الأول للتكنولوجيا.'
  },
  {
    id: 'rv-03',
    name: 'يوسف التازي',
    city: 'مراكش',
    rating: 5,
    date: '2026-04-02',
    avatar: 'https://i.pravatar.cc/120?img=12',
    comment:
      'منتج أصلي، توصيل سريع، وثمن مناسب. اشتريت سماعات Sony وكانت في القمة. الخدمة بعد البيع كذلك ممتازة، المتجر يستحق الثقة.'
  },
  {
    id: 'rv-04',
    name: 'خديجة العلوي',
    city: 'فاس',
    rating: 4,
    date: '2026-03-28',
    avatar: 'https://i.pravatar.cc/120?img=44',
    comment:
      'الخدمة كانت احترافية والمنتج فعلاً عند التوقعات. التوصيل جا في يومين فقط لفاس. ننصح Ematech لكل من يبحث عن منتجات تكنولوجية أصلية.'
  },
  {
    id: 'rv-05',
    name: 'عمر بنجلون',
    city: 'طنجة',
    rating: 5,
    date: '2026-03-21',
    avatar: 'https://i.pravatar.cc/120?img=15',
    comment:
      'iPhone وصلني في حالة ممتازة، التغليف فيه ذوق راقي ويحس فيه الزبون أنه مهم. شكراً Ematech على هاد التجربة الراقية، غادي نعاود نشري عندكم.'
  },
  {
    id: 'rv-06',
    name: 'سلمى الفاسي',
    city: 'الدار البيضاء',
    rating: 5,
    date: '2026-03-17',
    avatar: 'https://i.pravatar.cc/120?img=49',
    comment:
      'المتجر الأكثر احترافية في المغرب من ناحية التكنولوجيا. التواصل ديالهم سريع، الأسعار معقولة، والمنتجات مضمونة. Ematech يستحق 5 نجوم بكل جدارة.'
  },
  {
    id: 'rv-07',
    name: 'كريم الشرقاوي',
    city: 'أكادير',
    rating: 5,
    date: '2026-03-10',
    avatar: 'https://i.pravatar.cc/120?img=33',
    comment:
      'طلبت Apple Watch وفرحت كي وصلاتني في 48 ساعة لأكادير. الجودة فاخرة والتعامل من البداية حتى التسليم كان في غاية الاحترام والاحترافية.'
  },
  {
    id: 'rv-08',
    name: 'إيمان الإدريسي',
    city: 'مكناس',
    rating: 5,
    date: '2026-03-05',
    avatar: 'https://i.pravatar.cc/120?img=20',
    comment:
      'أحسن متجر اشتريت منه على الإنترنت. الموقع سهل، الدفع آمن، والمنتج بانت عليه الجودة من الأول. Ematech فعلاً علامة جديدة وقوية في السوق المغربي.'
  },
  {
    id: 'rv-09',
    name: 'أمين الخطيب',
    city: 'وجدة',
    rating: 4,
    date: '2026-02-27',
    avatar: 'https://i.pravatar.cc/120?img=51',
    comment:
      'منتج جا كيفما هو في الصور بالضبط، ثلاجة LG اشتغلات من اللحظة الأولى. التوصيل لوجدة جا في 3 أيام وهذا شيء يستحق الإشادة. شكراً للفريق.'
  },
  {
    id: 'rv-10',
    name: 'سارة بوعزة',
    city: 'تطوان',
    rating: 5,
    date: '2026-02-22',
    avatar: 'https://i.pravatar.cc/120?img=23',
    comment:
      'Ematech بصراحة فاجأني بالسرعة في التسليم وبجودة المنتج. AirPods Pro أصلية ومقفولة. التجربة كانت رائعة من البداية للنهاية، شكراً جزيلاً.'
  },
  {
    id: 'rv-11',
    name: 'حمزة المنصوري',
    city: 'سلا',
    rating: 5,
    date: '2026-02-18',
    avatar: 'https://i.pravatar.cc/120?img=53',
    comment:
      'فريق خدمة الزبائن متجاوب بسرعة وكاينة جدية في التعامل. الهاتف وصل في حالته الأصلية ومضمون. هذا هو المستوى اللي كنا كنتسناوه من متجر مغربي راقي.'
  },
  {
    id: 'rv-12',
    name: 'نوال السبتي',
    city: 'الدار البيضاء',
    rating: 5,
    date: '2026-02-12',
    avatar: 'https://i.pravatar.cc/120?img=25',
    comment:
      'Galaxy S24 Ultra وصلاتني في يوم واحد فقط داخل البيضاء. التغليف فاخر، المنتج جديد ومختوم. Ematech عرفات كيفاش تخلق تجربة شراء استثنائية.'
  },
  {
    id: 'rv-13',
    name: 'رضا العثماني',
    city: 'القنيطرة',
    rating: 4,
    date: '2026-02-06',
    avatar: 'https://i.pravatar.cc/120?img=60',
    comment:
      'تعامل ممتاز ومنتجات أصلية. كنخاف نشري من النيت ولكن مع Ematech حسيت بالأمان. السماعة JBL في القمة وأنصح بها كل العائلة والأصدقاء.'
  },
  {
    id: 'rv-14',
    name: 'هاجر لزرق',
    city: 'الرباط',
    rating: 5,
    date: '2026-01-30',
    avatar: 'https://i.pravatar.cc/120?img=26',
    comment:
      'الجودة فاخرة والتوصيل أسرع مما توقعت. آلة القهوة Nespresso اشتغلات بدون أي مشكل، والتعليمات بالدارجة كانت مفيدة. Ematech يستحق الدعم والثقة.'
  },
  {
    id: 'rv-15',
    name: 'مهدي برادة',
    city: 'الجديدة',
    rating: 5,
    date: '2026-01-24',
    avatar: 'https://i.pravatar.cc/120?img=68',
    comment:
      'Pixel 8 Pro وصلني مع شاحن ضمان رسمي. الموقع منظم والشراء سهل بزاف. أنصح بقوة بـEmatech لكل من يبحث عن منتجات أصلية وخدمة راقية في المغرب.'
  },
  {
    id: 'rv-16',
    name: 'أسماء الكتاني',
    city: 'الدار البيضاء',
    rating: 5,
    date: '2026-01-19',
    avatar: 'https://i.pravatar.cc/120?img=29',
    comment:
      'تجربة شراء فاقت كل توقعاتي. Apple Watch Ultra جات في علبة فاخرة وحالة ممتازة. الفريق احترافي ومحترم. صراحة Ematech هو مستقبل التسوق التقني.'
  },
  {
    id: 'rv-17',
    name: 'عثمان السعيدي',
    city: 'بني ملال',
    rating: 4,
    date: '2026-01-14',
    avatar: 'https://i.pravatar.cc/120?img=65',
    comment:
      'منتج أصلي ومضمون، التوصيل جا لبني ملال في 3 أيام. الأسعار تنافسية مقارنة مع المتاجر الأخرى. Ematech بان عليه الاحتراف والذوق الراقي.'
  },
  {
    id: 'rv-18',
    name: 'سكينة بلحاج',
    city: 'تمارة',
    rating: 5,
    date: '2026-01-08',
    avatar: 'https://i.pravatar.cc/120?img=30',
    comment:
      'Microwave Samsung وصلاتني سالمة ومغلفة بطريقة احترافية. الخدمة بعد البيع متوفرة ومفيدة. Ematech بصراحة رفع المستوى ديال التجارة الإلكترونية بالمغرب.'
  },
  {
    id: 'rv-19',
    name: 'أيوب الفيلالي',
    city: 'الناظور',
    rating: 5,
    date: '2026-01-03',
    avatar: 'https://i.pravatar.cc/120?img=66',
    comment:
      'Marshall Stanmore III جات في القمة، الصوت رائع والتصميم أنيق. فريق Ematech متعاون ودائماً موجود للجواب على أي سؤال. تجربة 5 نجوم بدون منازع.'
  },
  {
    id: 'rv-20',
    name: 'زينب المهداوي',
    city: 'الصويرة',
    rating: 5,
    date: '2025-12-28',
    avatar: 'https://i.pravatar.cc/120?img=32',
    comment:
      'Ematech هو المتجر اللي كنا محتاجين بالمغرب. منتجات أصلية، أسعار شفافة، وتوصيل سريع حتى للصويرة. شكراً لكم على هاد المستوى الراقي من الخدمة.'
  }
];

// ---------- Helper Lookups ----------
export const getProductById = (id) => products.find((p) => p.id === id);

export const getProductsByCategory = (categorySlug) =>
  products.filter((p) => p.category === categorySlug);

export const getFeaturedProducts = () => products.filter((p) => p.isFeatured);

export const getNewProducts = () => products.filter((p) => p.isNew);

export const getCategoryBySlug = (slug) =>
  categories.find((c) => c.slug === slug);
