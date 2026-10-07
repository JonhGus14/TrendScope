export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  searchVolume: number;
  salesVolume: number;
  trend: number;
  trendData: TrendPoint[];
  prediction: Prediction;
  marketplace: string;
  imageUrl: string;
  lastUpdated: Date;
  errorMargin: ErrorMargin;
}

export interface TrendPoint {
  date: string;
  searchVolume: number;
  salesVolume: number;
}

export interface Prediction {
  direction: 'up' | 'down' | 'stable';
  confidence: number;
  period: string;
  projectedGrowth: number;
  forecast: ForecastPoint[];
}

export interface ForecastPoint {
  date: string;
  predicted: number;
  upper: number;
  lower: number;
}

export type Category = 
  | 'Semua Kategori'
  | 'Elektronik'
  | 'Fashion'
  | 'Kecantikan'
  | 'Rumah Tangga'
  | 'Olahraga'
  | 'Otomotif'
  | 'Makanan & Minuman'
  | 'Kesehatan'
  | 'Mainan & Hobi'
  | 'Buku & Alat Tulis';

export type PriceRange = {
  label: string;
  min: number;
  max: number;
};

export type ForecastPeriod = '3d' | '7d' | '30d' | '90d' | '365d';

export type Marketplace = 
  | 'Semua Marketplace'
  | 'Tokopedia'
  | 'Shopee'
  | 'Lazada'
  | 'Bukalapak'
  | 'TikTok Shop';

export interface ErrorMargin {
  shortTerm: number;
  mediumTerm: number;
  longTerm: number;
  factors: string[];
}
