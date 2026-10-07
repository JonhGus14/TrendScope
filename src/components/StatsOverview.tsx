import React from 'react';
import { Product } from '../types';
import { TrendingUp, TrendingDown, Minus, ShoppingBag, Eye, Package, Activity } from 'lucide-react';

interface StatsOverviewProps {
  products: Product[];
  totalProducts: number;
}

export default function StatsOverview({ products, totalProducts }: StatsOverviewProps) {
  const trendingUp = products.filter(p => p.trend > 15).length;
  const trendingDown = products.filter(p => p.trend < -15).length;
  const avgSearchVolume = products.length > 0 ? Math.round(products.reduce((sum, p) => sum + p.searchVolume, 0) / products.length) : 0;
  const avgSalesVolume = products.length > 0 ? Math.round(products.reduce((sum, p) => sum + p.salesVolume, 0) / products.length) : 0;

  const stats = [
    { label: 'Total Produk', value: totalProducts.toString(), icon: Package, color: 'text-blue-400', bg: 'bg-blue-500/10' },
    { label: 'Sedang Trending', value: trendingUp.toString(), icon: TrendingUp, color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
    { label: 'Menurun', value: trendingDown.toString(), icon: TrendingDown, color: 'text-red-400', bg: 'bg-red-500/10' },
    { label: 'Rata-rata Pencarian', value: avgSearchVolume >= 1000 ? `${(avgSearchVolume / 1000).toFixed(1)}K` : avgSearchVolume.toString(), icon: Eye, color: 'text-purple-400', bg: 'bg-purple-500/10' },
    { label: 'Rata-rata Penjualan', value: avgSalesVolume >= 1000 ? `${(avgSalesVolume / 1000).toFixed(1)}K` : avgSalesVolume.toString(), icon: ShoppingBag, color: 'text-orange-400', bg: 'bg-orange-500/10' },
    { label: 'Indeks Pasar', value: products.length > 0 ? Math.round(products.reduce((sum, p) => sum + p.trend, 0) / products.length).toString() : '0', icon: Activity, color: 'text-cyan-400', bg: 'bg-cyan-500/10' },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
      {stats.map((stat) => (
        <div key={stat.label} className="bg-gray-900/60 backdrop-blur-sm border border-gray-700/40 rounded-xl p-3">
          <div className="flex items-center gap-2 mb-2">
            <div className={`p-1.5 rounded-lg ${stat.bg}`}><stat.icon size={14} className={stat.color} /></div>
          </div>
          <p className="text-lg font-bold text-white">{stat.value}</p>
          <p className="text-[10px] text-gray-400 mt-0.5">{stat.label}</p>
        </div>
      ))}
    </div>
  );
}
