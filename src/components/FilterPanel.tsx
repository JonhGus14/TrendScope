import React from 'react';
import { Category, PriceRange, ForecastPeriod, Marketplace } from '../types';
import { categories, priceRanges, marketplaces } from '../data';
import { Filter, TrendingUp, Search, DollarSign, Calendar, Store } from 'lucide-react';

interface FilterPanelProps {
  selectedCategory: Category;
  selectedPriceRange: PriceRange;
  selectedPeriod: ForecastPeriod;
  selectedMarketplace: Marketplace;
  searchQuery: string;
  onCategoryChange: (cat: Category) => void;
  onPriceRangeChange: (range: PriceRange) => void;
  onPeriodChange: (period: ForecastPeriod) => void;
  onMarketplaceChange: (mp: Marketplace) => void;
  onSearchChange: (query: string) => void;
}

const periods: { value: ForecastPeriod; label: string }[] = [
  { value: '3d', label: '3 Hari' }, { value: '7d', label: '7 Hari' },
  { value: '30d', label: '30 Hari' }, { value: '90d', label: '3 Bulan' }, { value: '365d', label: '1 Tahun' },
];

export default function FilterPanel({
  selectedCategory, selectedPriceRange, selectedPeriod, selectedMarketplace, searchQuery,
  onCategoryChange, onPriceRangeChange, onPeriodChange, onMarketplaceChange, onSearchChange,
}: FilterPanelProps) {
  return (
    <div className="bg-gray-900/80 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-5 space-y-5">
      <div className="flex items-center gap-2 text-emerald-400 font-semibold text-sm">
        <Filter size={16} />
        <span>FILTER & PENCARIAN</span>
      </div>
      <div className="relative">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        <input type="text" placeholder="Cari produk..." value={searchQuery} onChange={(e) => onSearchChange(e.target.value)}
          className="w-full bg-gray-800/60 border border-gray-700/50 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/20 transition-all" />
      </div>
      <div>
        <label className="flex items-center gap-1.5 text-xs text-gray-400 mb-2"><TrendingUp size={12} />Kategori</label>
        <select value={selectedCategory} onChange={(e) => onCategoryChange(e.target.value as Category)}
          className="w-full bg-gray-800/60 border border-gray-700/50 rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500/50 transition-all appearance-none cursor-pointer">
          {categories.map((cat) => (<option key={cat} value={cat}>{cat}</option>))}
        </select>
      </div>
      <div>
        <label className="flex items-center gap-1.5 text-xs text-gray-400 mb-2"><Store size={12} />Marketplace</label>
        <div className="grid grid-cols-2 gap-1">
          {marketplaces.map((mp) => (
            <button key={mp} onClick={() => onMarketplaceChange(mp)}
              className={`px-2 py-1.5 rounded-lg text-[10px] font-medium transition-all ${selectedMarketplace === mp ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40' : 'bg-gray-800/40 text-gray-400 border border-gray-700/30 hover:border-gray-600/50'}`}>
              {mp === 'Semua Marketplace' ? 'Semua' : mp}
            </button>
          ))}
        </div>
      </div>
      <div>
        <label className="flex items-center gap-1.5 text-xs text-gray-400 mb-2"><DollarSign size={12} />Rentang Harga</label>
        <select value={selectedPriceRange.label} onChange={(e) => { const range = priceRanges.find(r => r.label === e.target.value); if (range) onPriceRangeChange(range); }}
          className="w-full bg-gray-800/60 border border-gray-700/50 rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500/50 transition-all appearance-none cursor-pointer">
          {priceRanges.map((range) => (<option key={range.label} value={range.label}>{range.label}</option>))}
        </select>
      </div>
      <div>
        <label className="flex items-center gap-1.5 text-xs text-gray-400 mb-2"><Calendar size={12} />Periode Prediksi</label>
        <div className="grid grid-cols-5 gap-1">
          {periods.map((p) => (
            <button key={p.value} onClick={() => onPeriodChange(p.value)}
              className={`px-1 py-1.5 rounded-lg text-[10px] font-medium transition-all ${selectedPeriod === p.value ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40' : 'bg-gray-800/40 text-gray-400 border border-gray-700/30 hover:border-gray-600/50'}`}>
              {p.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
