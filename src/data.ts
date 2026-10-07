import { Product, Category, PriceRange, ForecastPeriod, Marketplace, ErrorMargin } from './types';

export const categories: Category[] = [
  'Semua Kategori', 'Elektronik', 'Fashion', 'Kecantikan', 'Rumah Tangga',
  'Olahraga', 'Otomotif', 'Makanan & Minuman', 'Kesehatan', 'Mainan & Hobi', 'Buku & Alat Tulis',
];

export const priceRanges: PriceRange[] = [
  { label: 'Semua Harga', min: 0, max: Infinity },
  { label: '< Rp 50.000', min: 0, max: 50000 },
  { label: 'Rp 50.000 - 200.000', min: 50000, max: 200000 },
  { label: 'Rp 200.000 - 500.000', min: 200000, max: 500000 },
  { label: 'Rp 500.000 - 2.000.000', min: 500000, max: 2000000 },
  { label: '> Rp 2.000.000', min: 2000000, max: Infinity },
];

export const marketplaces: Marketplace[] = [
  'Semua Marketplace', 'Tokopedia', 'Shopee', 'Lazada', 'Bukalapak', 'TikTok Shop',
];

const marketplaceList = ['Tokopedia', 'Shopee', 'Lazada', 'Bukalapak', 'TikTok Shop'];

const productNames: Record<string, string[]> = {
  'Elektronik': ['Earbuds TWS Bluetooth 5.3', 'Power Bank 20000mAh', 'Smartwatch Fitness Tracker', 'Webcam HD 1080p', 'Keyboard Mechanical RGB', 'Mouse Wireless Ergonomic', 'Speaker Bluetooth Portable', 'Charger GaN 65W USB-C', 'Ring Light 26cm + Tripod', 'SSD External 1TB NVMe'],
  'Fashion': ['Kaos Oversize Premium Cotton', 'Hoodie Unisex Fleece', 'Celana Cargo Wide Leg', 'Sneakers Running Lightweight', 'Tas Selempang Anti Air', 'Topi Bucket Hat Cotton', 'Kacamata Anti UV Polarized', 'Jaket Bomber Premium', 'Sandal Slide Premium', 'Dompet Kulit RFID Blocking'],
  'Kecantikan': ['Serum Vitamin C Brightening', 'Sunscreen SPF 50 PA++++', 'Lip Tint Velvet Matte', 'Cushion Foundation Glow', 'Micellar Water 500ml', 'Sheet Mask Hydrating 10pcs', 'Hair Serum Anti Frizz', 'Setting Spray Long Lasting', 'Eyeshadow Palette 12 Warna', 'Face Wash Gentle pH Balanced'],
  'Rumah Tangga': ['Vacuum Cleaner Portable', 'Blender Portable USB-C', 'Rak Serbaguna 5 Tingkat', 'Lampu LED Smart WiFi', 'Set Panci Anti Lengket 5pcs', 'Dispenser Air Hot & Cool', 'Air Purifier HEPA Filter', 'Rice Cooker Digital 1.8L', 'Kipas Angin Standing Remote', 'Set Handuk Microfiber 4pcs'],
  'Olahraga': ['Yoga Mat Anti Slip 6mm', 'Resistance Band Set 5 Level', 'Dumbbell Adjustable 20kg', 'Sepeda Statis Indoor', 'Tumbler Sport 1L Tritan', 'Gym Bag Waterproof', 'Jump Rope Speed Cable', 'Foam Roller Muscle Recovery', 'Sports Bra High Impact', 'Gloves Gym Weight Lifting'],
  'Otomotif': ['Dashcam Dual 1080p WiFi', 'Car Phone Holder Magnetic', 'Parfum Mobil Premium', 'Vacuum Cleaner Mobil Portable', 'Ban Tubeless 17 inch', 'Helm Full Face SNI', 'Jas Hujan Motor Premium', 'GPS Tracker Motor', 'Oli Mesin Synthetic 4T', 'Cover Motor Waterproof'],
  'Makanan & Minuman': ['Kopi Arabica Specialty 250g', 'Matcha Latte Premium Powder', 'Protein Bar High Fiber', 'Sambal Bu Rudy Original', 'Teh Premium Loose Leaf', 'Granola Clusters Nut & Fruit', 'Susu Oat Plant Based 1L', 'Keripik Singkong Balado', 'Coklat Dark 70% Cocoa', 'Madu Murni Hutan 500ml'],
  'Kesehatan': ['Vitamin D3 1000IU', 'Masker KN95 50pcs', 'Thermometer Digital Infrared', 'Suplemen Omega 3 Fish Oil', 'Alat Cek Gula Darah', 'Vitamin C 1000mg Effervescent', 'Tensimeter Digital Lengan', 'Probiotik 10 Billion CFU', 'Koyo Hangat Herbal', 'Pulse Oximeter Finger'],
  'Mainan & Hobi': ['LEGO Technic Set 500pcs', 'Drone Mini Camera HD', 'Action Figure Anime Limited', 'Board Game Strategy Family', 'Rubik Speed Cube Magnetic', 'RC Car Off-Road 4WD', 'Model Kit Gundam RG', 'Puzzle 1000pcs World Map', 'Gitar Ukulele Soprano', 'Sketchbook A3 Premium Paper'],
  'Buku & Alat Tulis': ['Novel Best Seller 2024', 'Buku Self Improvement', 'Bullet Journal A5 Dotted', 'Pulpen Gel 0.5mm 12pcs', 'Sticky Notes Pastel 6 Pack', 'Planner 2024 Weekly', 'Spidol Marker Dual Tip 24', 'Buku Catatan Hardcover A5', 'Kertas Origami 200 Lembar', 'Sticky Notes Transparent'],
};

function generateTrendData(baseSearch: number, baseSales: number, trend: number) {
  const data = [];
  const now = new Date();
  for (let i = 29; i >= 0; i--) {
    const date = new Date(now);
    date.setDate(date.getDate() - i);
    const noise = (Math.random() - 0.5) * 0.3;
    const trendFactor = 1 + (trend / 100) * ((30 - i) / 30);
    data.push({
      date: date.toLocaleDateString('id-ID', { day: '2-digit', month: 'short' }),
      searchVolume: Math.round(baseSearch * trendFactor * (1 + noise)),
      salesVolume: Math.round(baseSales * trendFactor * (1 + noise * 0.7)),
    });
  }
  return data;
}

function generateForecast(trendData: { searchVolume: number; salesVolume: number }[], trend: number, period: ForecastPeriod) {
  const forecast = [];
  const now = new Date();
  const lastPoint = trendData[trendData.length - 1];
  const avgVolume = (lastPoint.searchVolume + lastPoint.salesVolume) / 2;
  let days: number;
  let interval: number;
  switch (period) {
    case '3d': days = 3; interval = 1; break;
    case '7d': days = 7; interval = 1; break;
    case '30d': days = 30; interval = 3; break;
    case '90d': days = 90; interval = 7; break;
    case '365d': days = 365; interval = 30; break;
    default: days = 30; interval = 3;
  }
  const trendMultiplier = trend / 100;
  for (let i = interval; i <= days; i += interval) {
    const date = new Date(now);
    date.setDate(date.getDate() + i);
    const progress = i / days;
    const growth = 1 + trendMultiplier * progress;
    const uncertainty = progress * 0.3;
    forecast.push({
      date: date.toLocaleDateString('id-ID', { day: '2-digit', month: 'short' }),
      predicted: Math.round(avgVolume * growth),
      upper: Math.round(avgVolume * growth * (1 + uncertainty)),
      lower: Math.round(avgVolume * growth * (1 - uncertainty)),
    });
  }
  return forecast;
}

function generateErrorMargin(trend: number, searchVolume: number, category: string): ErrorMargin {
  const volatileCategories = ['Fashion', 'Mainan & Hobi', 'Kecantikan'];
  const stableCategories = ['Makanan & Minuman', 'Kesehatan', 'Buku & Alat Tulis'];
  let baseError = 15;
  if (searchVolume > 5000) baseError -= 5;
  else if (searchVolume < 1000) baseError += 8;
  if (Math.abs(trend) > 50) baseError += 10;
  else if (Math.abs(trend) > 30) baseError += 5;
  else if (Math.abs(trend) < 10) baseError -= 3;
  if (volatileCategories.includes(category)) baseError += 5;
  if (stableCategories.includes(category)) baseError -= 4;
  baseError += (Math.random() - 0.5) * 6;
  baseError = Math.max(5, Math.min(45, baseError));
  const factors: string[] = [];
  if (searchVolume > 5000) factors.push('Volume pencarian tinggi');
  if (searchVolume < 1000) factors.push('Volume pencarian rendah');
  if (Math.abs(trend) > 50) factors.push('Tren sangat fluktuatif');
  if (volatileCategories.includes(category)) factors.push('Kategori volatile');
  if (stableCategories.includes(category)) factors.push('Kategori stabil');
  if (baseError < 15) factors.push('Data historis konsisten');
  if (baseError > 25) factors.push('Pola tidak stabil');
  return {
    shortTerm: Math.round(baseError * 0.5 * 10) / 10,
    mediumTerm: Math.round(baseError * 10) / 10,
    longTerm: Math.round(baseError * 2.5 * 10) / 10,
    factors,
  };
}

function generatePrediction(trend: number, period: ForecastPeriod) {
  const direction = trend > 15 ? 'up' as const : trend < -15 ? 'down' as const : 'stable' as const;
  const confidence = Math.min(95, Math.max(30, 80 - Math.abs(trend) * 0.3 + Math.random() * 20));
  const periodLabels: Record<ForecastPeriod, string> = {
    '3d': '3 Hari', '7d': '7 Hari', '30d': '30 Hari', '90d': '3 Bulan', '365d': '1 Tahun',
  };
  const projectedGrowth = trend * (
    period === '3d' ? 0.1 : period === '7d' ? 0.3 : period === '30d' ? 1 : period === '90d' ? 2.5 : 8
  );
  return {
    direction,
    confidence: Math.round(confidence),
    period: periodLabels[period],
    projectedGrowth: Math.round(projectedGrowth * 10) / 10,
    forecast: [] as { date: string; predicted: number; upper: number; lower: number }[],
  };
}

export function generateProducts(period: ForecastPeriod = '30d'): Product[] {
  const products: Product[] = [];
  let id = 1;
  Object.entries(productNames).forEach(([category, names]) => {
    names.forEach((name) => {
      const baseSearch = Math.round(500 + Math.random() * 9500);
      const baseSales = Math.round(baseSearch * (0.1 + Math.random() * 0.4));
      const trend = Math.round((Math.random() - 0.35) * 120);
      const price = Math.round((10000 + Math.random() * 2000000) / 1000) * 1000;
      const trendData = generateTrendData(baseSearch, baseSales, trend);
      const prediction = generatePrediction(trend, period);
      prediction.forecast = generateForecast(trendData, trend, period);
      const errorMargin = generateErrorMargin(trend, baseSearch, category);
      products.push({
        id: `prod-${id++}`, name, category, price,
        searchVolume: baseSearch + Math.round(trend * 20),
        salesVolume: baseSales + Math.round(trend * 5),
        trend, trendData, prediction,
        marketplace: marketplaceList[Math.floor(Math.random() * marketplaceList.length)],
        imageUrl: '', lastUpdated: new Date(), errorMargin,
      });
    });
  });
  return products.sort((a, b) => b.searchVolume - a.searchVolume);
}

export function updateProductRealtime(product: Product): Product {
  const change = (Math.random() - 0.48) * 0.1;
  const newSearchVolume = Math.max(100, Math.round(product.searchVolume * (1 + change)));
  const newSalesVolume = Math.max(10, Math.round(product.salesVolume * (1 + change * 0.8)));
  const newTrend = Math.max(-100, Math.min(100, product.trend + (Math.random() - 0.48) * 5));
  const newTrendData = [...product.trendData.slice(1), {
    date: new Date().toLocaleDateString('id-ID', { day: '2-digit', month: 'short' }),
    searchVolume: newSearchVolume, salesVolume: newSalesVolume,
  }];
  return {
    ...product, searchVolume: newSearchVolume, salesVolume: newSalesVolume,
    trend: Math.round(newTrend), trendData: newTrendData, lastUpdated: new Date(),
  };
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(price);
}

export function formatNumber(num: number): string {
  if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
  if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
  return num.toString();
}
