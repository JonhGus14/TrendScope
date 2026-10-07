import React from 'react';
import { Product, ForecastPeriod } from '../types';
import { formatPrice, formatNumber } from '../data';
import { TrendingUp, TrendingDown, Minus, Star, Shield, Rocket, Target, ChevronRight, Sparkles, Crown, Zap, ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { AreaChart, Area, ResponsiveContainer } from 'recharts';

interface SmartRecommendationsProps {
  products: Product[];
  period: ForecastPeriod;
  onSelectProduct: (product: Product) => void;
}

interface Recommendation {
  product: Product;
  type: 'hot' | 'rising' | 'value' | 'safe' | 'opportunity';
  score: number;
  reason: string;
  action: string;
  urgency: 'tinggi' | 'sedang' | 'rendah';
  tags: string[];
  errorMargin: string;
  accuracyLevel: 'tinggi' | 'sedang' | 'rendah';
}

function analyzeRecommendations(products: Product[], period: ForecastPeriod): Recommendation[] {
  const recommendations: Recommendation[] = [];
  products.forEach(product => {
    const { trend, searchVolume, salesVolume, price, prediction, category } = product;
    const conversionRate = searchVolume > 0 ? (salesVolume / searchVolume) * 100 : 0;
    const margin = product.errorMargin.mediumTerm;
    const accuracyLevel: 'tinggi' | 'sedang' | 'rendah' = margin < 15 ? 'tinggi' : margin < 25 ? 'sedang' : 'rendah';

    if (trend > 40 && searchVolume > 3000) {
      recommendations.push({
        product, type: 'hot', score: Math.min(99, trend + (searchVolume / 200)),
        reason: `Sangat populer dengan ${formatNumber(searchVolume)} pencarian dan trend naik ${trend}%. Konversi penjualan ${conversionRate.toFixed(1)}%.`,
        action: '🔥 Segera stok/promosikan - permintaan sangat tinggi!', urgency: 'tinggi',
        tags: ['Best Seller', 'High Demand', category], errorMargin: `±${margin}%`, accuracyLevel,
      });
    }
    if (trend > 20 && trend <= 40 && searchVolume > 1000) {
      recommendations.push({
        product, type: 'rising', score: Math.min(95, trend * 1.5 + conversionRate * 2),
        reason: `Tren naik ${trend}% dengan pertumbuhan stabil. Konversi ${conversionRate.toFixed(1)}% menunjukkan minat beli yang kuat.`,
        action: '📈 Mulai stok sekarang - sebelum kompetitor banyak!', urgency: 'tinggi',
        tags: ['Rising Star', 'Early Opportunity', category], errorMargin: `±${margin}%`, accuracyLevel,
      });
    }
    if (trend > 10 && price < 200000 && salesVolume > 200) {
      recommendations.push({
        product, type: 'value', score: Math.min(90, (200000 - price) / 3000 + trend + conversionRate * 3),
        reason: `Harga terjangkau ${formatPrice(price)} dengan ${formatNumber(salesVolume)} penjualan. Mudah dijual kembali dengan margin bagus.`,
        action: '💰 Modal kecil, potensi untung besar - cocok untuk pemula!', urgency: 'sedang',
        tags: ['Best Value', 'Low Risk', 'High Margin', category], errorMargin: `±${margin}%`, accuracyLevel,
      });
    }
    if (prediction.confidence > 75 && Math.abs(trend) < 20 && salesVolume > 300) {
      recommendations.push({
        product, type: 'safe', score: prediction.confidence + (salesVolume / 100),
        reason: `Prediksi ${prediction.confidence}% yakin akan stabil. Penjualan konsisten ${formatNumber(salesVolume)} per periode.`,
        action: '🛡️ Investasi aman - permintaan stabil jangka panjang!', urgency: 'rendah',
        tags: ['Stable', 'Long Term', 'Low Risk', category], errorMargin: `±${margin}%`, accuracyLevel,
      });
    }
    if (prediction.direction === 'up' && prediction.projectedGrowth > 30 && prediction.confidence > 60) {
      recommendations.push({
        product, type: 'opportunity', score: prediction.projectedGrowth + prediction.confidence * 0.5,
        reason: `Diprediksi naik ${prediction.projectedGrowth}% dalam ${prediction.period} dengan keyakinan ${prediction.confidence}%.`,
        action: '🚀 Peluang emas - persiapkan stok sebelum lonjakan!', urgency: 'tinggi',
        tags: ['Growth Potential', 'Future Trend', category], errorMargin: `±${margin}%`, accuracyLevel,
      });
    }
  });
  return recommendations.sort((a, b) => b.score - a.score).slice(0, 8);
}

export default function SmartRecommendations({ products, period, onSelectProduct }: SmartRecommendationsProps) {
  const recommendations = analyzeRecommendations(products, period);

  if (recommendations.length === 0) {
    return (
      <div className="bg-gray-900/60 backdrop-blur-sm border border-gray-700/40 rounded-2xl p-6 text-center">
        <p className="text-gray-400 text-sm">Tidak ada rekomendasi untuk filter saat ini. Coba ubah kategori atau rentang harga.</p>
      </div>
    );
  }

  const typeConfig = {
    hot: { icon: Rocket, label: 'HOT PICK', color: 'text-orange-400', bg: 'bg-orange-500/10', border: 'border-orange-500/30' },
    rising: { icon: Rocket, label: 'RISING STAR', color: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/30' },
    value: { icon: Star, label: 'BEST VALUE', color: 'text-yellow-400', bg: 'bg-yellow-500/10', border: 'border-yellow-500/30' },
    safe: { icon: Shield, label: 'SAFE BET', color: 'text-blue-400', bg: 'bg-blue-500/10', border: 'border-blue-500/30' },
    opportunity: { icon: Target, label: 'OPPORTUNITY', color: 'text-purple-400', bg: 'bg-purple-500/10', border: 'border-purple-500/30' },
  };

  const topPick = recommendations[0];
  const topConfig = typeConfig[topPick.type];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-gradient-to-br from-emerald-500/20 to-purple-500/20 rounded-xl"><Sparkles size={18} className="text-emerald-400" /></div>
          <div>
            <h2 className="text-base font-bold text-white">Rekomendasi Untuk Anda</h2>
            <p className="text-[11px] text-gray-400">Berdasarkan analisis tren & prediksi AI • Periode: {period === '3d' ? '3 Hari' : period === '7d' ? '7 Hari' : period === '30d' ? '30 Hari' : period === '90d' ? '3 Bulan' : '1 Tahun'}</p>
          </div>
        </div>
        <div className="flex items-center gap-1 text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded-full border border-emerald-500/20"><Zap size={10} />{recommendations.length} rekomendasi</div>
      </div>

      <div onClick={() => onSelectProduct(topPick.product)} className={`relative bg-gradient-to-r from-emerald-500/10 to-purple-500/5 border ${topConfig.border} rounded-2xl p-5 cursor-pointer hover:scale-[1.01] transition-all group overflow-hidden`}>
        <div className="relative">
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className={`p-1.5 rounded-lg ${topConfig.bg}`}><Crown size={14} className={topConfig.color} /></div>
              <span className="text-[10px] font-bold text-gray-300 tracking-wider">⭐ PILIHAN TERATAS</span>
              <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${topConfig.bg} ${topConfig.color}`}>{topConfig.label}</span>
            </div>
            <div className="flex items-center gap-1 text-xs text-gray-400 group-hover:text-white transition-colors"><span>Detail</span><ChevronRight size={14} /></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2">
              <h3 className="text-lg font-bold text-white mb-1 group-hover:text-emerald-300 transition-colors">{topPick.product.name}</h3>
              <p className="text-xs text-gray-400 mb-3">{topPick.product.category} • {topPick.product.marketplace}</p>
              <div className="bg-black/20 rounded-xl p-3 mb-3">
                <p className="text-xs text-gray-300 leading-relaxed"><CheckCircle2 size={12} className="inline text-emerald-400 mr-1" />{topPick.reason}</p>
              </div>
              <div className={`text-sm font-semibold ${topConfig.color} flex items-center gap-2`}><ArrowUpRight size={16} />{topPick.action}</div>
            </div>
            <div className="space-y-2">
              <div className="bg-black/20 rounded-lg p-3 text-center">
                <p className="text-[10px] text-gray-400">Score</p>
                <p className={`text-2xl font-bold ${topConfig.color}`}>{Math.round(topPick.score)}</p>
                <div className="w-full bg-gray-700/50 rounded-full h-1 mt-1"><div className="h-1 rounded-full bg-gradient-to-r from-emerald-500 to-cyan-500" style={{ width: `${Math.min(100, topPick.score)}%` }}></div></div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div className="bg-black/20 rounded-lg p-2 text-center"><p className="text-[10px] text-gray-400">Harga</p><p className="text-xs font-bold text-white">{formatPrice(topPick.product.price)}</p></div>
                <div className="bg-black/20 rounded-lg p-2 text-center"><p className="text-[10px] text-gray-400">Trend</p><p className={`text-xs font-bold ${topPick.product.trend > 0 ? 'text-emerald-400' : 'text-red-400'}`}>{topPick.product.trend > 0 ? '+' : ''}{topPick.product.trend}%</p></div>
              </div>
              <div className={`rounded-lg p-2 text-center border ${topPick.accuracyLevel === 'tinggi' ? 'bg-emerald-500/10 border-emerald-500/30' : topPick.accuracyLevel === 'sedang' ? 'bg-yellow-500/10 border-yellow-500/30' : 'bg-red-500/10 border-red-500/30'}`}>
                <p className="text-[9px] text-gray-400">Margin Error</p>
                <p className={`text-sm font-bold ${topPick.accuracyLevel === 'tinggi' ? 'text-emerald-400' : topPick.accuracyLevel === 'sedang' ? 'text-yellow-400' : 'text-red-400'}`}>{topPick.errorMargin}</p>
              </div>
            </div>
          </div>
          <div className="flex flex-wrap gap-1.5 mt-3">
            {topPick.tags.map(tag => (<span key={tag} className="text-[10px] px-2 py-0.5 rounded-full bg-white/5 text-gray-300 border border-white/10">{tag}</span>))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {recommendations.slice(1, 5).map((rec) => {
          const config = typeConfig[rec.type];
          const Icon = config.icon;
          return (
            <div key={rec.product.id} onClick={() => onSelectProduct(rec.product)} className="bg-gray-900/60 backdrop-blur-sm border border-gray-700/40 rounded-xl p-4 hover:border-gray-600/60 cursor-pointer transition-all group">
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className={`p-1.5 rounded-lg ${config.bg}`}><Icon size={14} className={config.color} /></div>
                  <div>
                    <span className={`text-[9px] font-bold ${config.color} tracking-wider`}>{config.label}</span>
                    <div className="flex items-center gap-1"><span className="text-[9px] text-gray-500">Score:</span><span className={`text-[10px] font-bold ${config.color}`}>{Math.round(rec.score)}</span></div>
                  </div>
                </div>
                <div className={`text-[9px] px-1.5 py-0.5 rounded ${rec.urgency === 'tinggi' ? 'bg-red-500/10 text-red-400' : rec.urgency === 'sedang' ? 'bg-yellow-500/10 text-yellow-400' : 'bg-gray-500/10 text-gray-400'}`}>Urgensi: {rec.urgency}</div>
              </div>
              <h4 className="text-sm font-semibold text-white mb-1 group-hover:text-emerald-300 transition-colors truncate">{rec.product.name}</h4>
              <p className="text-[11px] text-gray-400 mb-2 line-clamp-2">{rec.reason}</p>
              <div className={`text-[11px] font-medium ${config.color} mb-2 flex items-center gap-1`}><ArrowUpRight size={12} />{rec.action}</div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-emerald-400">{formatPrice(rec.product.price)}</span>
                <div className="flex items-center gap-2">
                  <span className={`text-[10px] font-medium px-1.5 py-0.5 rounded ${rec.accuracyLevel === 'tinggi' ? 'bg-emerald-500/10 text-emerald-400' : rec.accuracyLevel === 'sedang' ? 'bg-yellow-500/10 text-yellow-400' : 'bg-red-500/10 text-red-400'}`}>⚠️ {rec.errorMargin}</span>
                  <span className={`text-[10px] font-medium ${rec.product.trend > 0 ? 'text-emerald-400' : rec.product.trend < 0 ? 'text-red-400' : 'text-yellow-400'}`}>{rec.product.trend > 0 ? '+' : ''}{rec.product.trend}%</span>
                  <div className="w-12 h-6">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={rec.product.trendData.slice(-7)}>
                        <Area type="monotone" dataKey="searchVolume" stroke={rec.product.trend > 15 ? '#34d399' : rec.product.trend < -15 ? '#f87171' : '#fbbf24'} strokeWidth={1.5} fill="none" />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
