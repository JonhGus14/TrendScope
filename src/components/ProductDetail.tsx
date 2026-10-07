import { Product, ForecastPeriod } from '../types';
import { formatPrice, formatNumber } from '../data';
import { X, TrendingUp, TrendingDown, Minus, Target, Clock, BarChart3, ShoppingBag, Eye, Zap } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ComposedChart, Line, Bar } from 'recharts';

interface ProductDetailProps {
  product: Product;
  period: ForecastPeriod;
  onClose: () => void;
}

export default function ProductDetail({ product, period, onClose }: ProductDetailProps) {
  const chartData = [
    ...product.trendData.map(d => ({ ...d, type: 'actual' as const })),
    ...product.prediction.forecast.map(f => ({
      date: f.date, searchVolume: f.predicted, salesVolume: undefined,
      upper: f.upper, lower: f.lower, type: 'forecast' as const,
    })),
  ];

  const trendIcon = product.trend > 15 ? <TrendingUp size={20} className="text-emerald-400" /> : product.trend < -15 ? <TrendingDown size={20} className="text-red-400" /> : <Minus size={20} className="text-yellow-400" />;
  const predictionLabel = product.prediction.direction === 'up' ? 'Akan Meningkat' : product.prediction.direction === 'down' ? 'Akan Menurun' : 'Stabil';
  const predictionEmoji = product.prediction.direction === 'up' ? '🚀' : product.prediction.direction === 'down' ? '⚠️' : '⚖️';

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-gray-900 border border-gray-700/50 rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        <div className="sticky top-0 bg-gray-900/95 backdrop-blur-sm border-b border-gray-700/50 p-5 flex items-start justify-between z-10">
          <div>
            <h2 className="text-xl font-bold text-white">{product.name}</h2>
            <div className="flex items-center gap-3 mt-1">
              <span className="text-sm text-gray-400">{product.category}</span>
              <span className="text-xs bg-gray-800 px-2 py-0.5 rounded-full text-gray-400">{product.marketplace}</span>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-800 rounded-lg transition-colors"><X size={20} className="text-gray-400" /></button>
        </div>
        <div className="p-5 space-y-5">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <div className="bg-gray-800/50 rounded-xl p-3">
              <div className="flex items-center gap-1.5 text-gray-400 text-xs mb-1"><Eye size={12} />Volume Pencarian</div>
              <p className="text-lg font-bold text-white">{formatNumber(product.searchVolume)}</p>
              <p className={`text-xs mt-0.5 ${product.trend > 0 ? 'text-emerald-400' : 'text-red-400'}`}>{product.trend > 0 ? '+' : ''}{product.trend}% dari kemarin</p>
            </div>
            <div className="bg-gray-800/50 rounded-xl p-3">
              <div className="flex items-center gap-1.5 text-gray-400 text-xs mb-1"><ShoppingBag size={12} />Volume Penjualan</div>
              <p className="text-lg font-bold text-white">{formatNumber(product.salesVolume)}</p>
            </div>
            <div className="bg-gray-800/50 rounded-xl p-3">
              <div className="flex items-center gap-1.5 text-gray-400 text-xs mb-1"><BarChart3 size={12} />Harga</div>
              <p className="text-lg font-bold text-emerald-400">{formatPrice(product.price)}</p>
            </div>
            <div className="bg-gray-800/50 rounded-xl p-3">
              <div className="flex items-center gap-1.5 text-gray-400 text-xs mb-1"><Zap size={12} />Trend Score</div>
              <div className="flex items-center gap-2">{trendIcon}<p className="text-lg font-bold text-white">{product.trend}</p></div>
            </div>
          </div>
          <div className="bg-gray-800/30 rounded-xl p-4 border border-gray-700/30">
            <h3 className="text-sm font-semibold text-white mb-3 flex items-center gap-2"><BarChart3 size={14} className="text-emerald-400" />Grafik Tren & Prediksi</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={chartData}>
                  <defs>
                    <linearGradient id="actualGradient" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#34d399" stopOpacity={0.3} /><stop offset="100%" stopColor="#34d399" stopOpacity={0} /></linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="date" tick={{ fill: '#9ca3af', fontSize: 10 }} />
                  <YAxis tick={{ fill: '#9ca3af', fontSize: 10 }} />
                  <Tooltip contentStyle={{ backgroundColor: '#1f2937', border: '1px solid #374151', borderRadius: '8px' }} labelStyle={{ color: '#fff' }} itemStyle={{ color: '#d1d5db' }} />
                  <Area type="monotone" dataKey="searchVolume" stroke="#34d399" fill="url(#actualGradient)" strokeWidth={2} name="Pencarian" />
                  <Line type="monotone" dataKey="upper" stroke="#818cf8" strokeDasharray="5 5" strokeWidth={1} dot={false} name="Batas Atas" opacity={0.5} />
                  <Line type="monotone" dataKey="lower" stroke="#818cf8" strokeDasharray="5 5" strokeWidth={1} dot={false} name="Batas Bawah" opacity={0.5} />
                  <Bar dataKey="salesVolume" fill="#6366f1" opacity={0.4} name="Penjualan" radius={[2, 2, 0, 0]} />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="bg-gray-800/30 rounded-xl p-4 border border-gray-700/30">
            <h3 className="text-sm font-semibold text-white mb-3 flex items-center gap-2"><Target size={14} className="text-purple-400" />Analisis Prediksi</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-gray-900/50 rounded-lg p-4 text-center">
                <div className="text-3xl mb-2">{predictionEmoji}</div>
                <p className={`text-lg font-bold ${product.prediction.direction === 'up' ? 'text-emerald-400' : product.prediction.direction === 'down' ? 'text-red-400' : 'text-yellow-400'}`}>{predictionLabel}</p>
                <p className="text-xs text-gray-400 mt-1">dalam {product.prediction.period}</p>
              </div>
              <div className="bg-gray-900/50 rounded-lg p-4 text-center">
                <div className="flex items-center justify-center gap-1 mb-2"><Clock size={16} className="text-blue-400" /></div>
                <p className="text-2xl font-bold text-white">{product.prediction.confidence}%</p>
                <p className="text-xs text-gray-400 mt-1">Tingkat Keyakinan</p>
                <div className="w-full bg-gray-700 rounded-full h-1.5 mt-2"><div className="bg-blue-400 h-1.5 rounded-full transition-all" style={{ width: `${product.prediction.confidence}%` }}></div></div>
              </div>
              <div className="bg-gray-900/50 rounded-lg p-4 text-center">
                <div className="flex items-center justify-center gap-1 mb-2">
                  {product.prediction.direction === 'up' ? <TrendingUp size={16} className="text-emerald-400" /> : product.prediction.direction === 'down' ? <TrendingDown size={16} className="text-red-400" /> : <Minus size={16} className="text-yellow-400" />}
                </div>
                <p className={`text-2xl font-bold ${product.prediction.projectedGrowth > 0 ? 'text-emerald-400' : product.prediction.projectedGrowth < 0 ? 'text-red-400' : 'text-yellow-400'}`}>
                  {product.prediction.projectedGrowth > 0 ? '+' : ''}{product.prediction.projectedGrowth}%
                </p>
                <p className="text-xs text-gray-400 mt-1">Proyeksi Pertumbuhan</p>
              </div>
            </div>
          </div>
          <div className="bg-gray-800/30 rounded-xl p-4 border border-gray-700/30">
            <h3 className="text-sm font-semibold text-white mb-3 flex items-center gap-2"><span className="text-amber-400">⚠️</span>Margin Kesalahan Prediksi</h3>
            <div className="grid grid-cols-3 gap-3 mb-4">
              <div className="bg-gray-900/50 rounded-lg p-3 text-center">
                <p className="text-[10px] text-gray-400 mb-1">3-7 Hari</p>
                <p className={`text-xl font-bold ${product.errorMargin.shortTerm < 10 ? 'text-emerald-400' : product.errorMargin.shortTerm < 20 ? 'text-yellow-400' : 'text-red-400'}`}>±{product.errorMargin.shortTerm}%</p>
                <div className="w-full bg-gray-700 rounded-full h-1 mt-2"><div className={`h-1 rounded-full ${product.errorMargin.shortTerm < 10 ? 'bg-emerald-400' : product.errorMargin.shortTerm < 20 ? 'bg-yellow-400' : 'bg-red-400'}`} style={{ width: `${Math.min(100, product.errorMargin.shortTerm * 2.5)}%` }}></div></div>
                <p className="text-[9px] text-gray-500 mt-1">{product.errorMargin.shortTerm < 10 ? 'Sangat Akurat' : product.errorMargin.shortTerm < 20 ? 'Cukup Akurat' : 'Kurang Akurat'}</p>
              </div>
              <div className="bg-gray-900/50 rounded-lg p-3 text-center">
                <p className="text-[10px] text-gray-400 mb-1">30 Hari</p>
                <p className={`text-xl font-bold ${product.errorMargin.mediumTerm < 15 ? 'text-emerald-400' : product.errorMargin.mediumTerm < 25 ? 'text-yellow-400' : 'text-red-400'}`}>±{product.errorMargin.mediumTerm}%</p>
                <div className="w-full bg-gray-700 rounded-full h-1 mt-2"><div className={`h-1 rounded-full ${product.errorMargin.mediumTerm < 15 ? 'bg-emerald-400' : product.errorMargin.mediumTerm < 25 ? 'bg-yellow-400' : 'bg-red-400'}`} style={{ width: `${Math.min(100, product.errorMargin.mediumTerm * 2)}%` }}></div></div>
                <p className="text-[9px] text-gray-500 mt-1">{product.errorMargin.mediumTerm < 15 ? 'Akurat' : product.errorMargin.mediumTerm < 25 ? 'Moderat' : 'Perlu Hati-hati'}</p>
              </div>
              <div className="bg-gray-900/50 rounded-lg p-3 text-center">
                <p className="text-[10px] text-gray-400 mb-1">90 Hari - 1 Tahun</p>
                <p className={`text-xl font-bold ${product.errorMargin.longTerm < 20 ? 'text-emerald-400' : product.errorMargin.longTerm < 35 ? 'text-yellow-400' : 'text-red-400'}`}>±{product.errorMargin.longTerm}%</p>
                <div className="w-full bg-gray-700 rounded-full h-1 mt-2"><div className={`h-1 rounded-full ${product.errorMargin.longTerm < 20 ? 'bg-emerald-400' : product.errorMargin.longTerm < 35 ? 'bg-yellow-400' : 'bg-red-400'}`} style={{ width: `${Math.min(100, product.errorMargin.longTerm * 1.5)}%` }}></div></div>
                <p className="text-[9px] text-gray-500 mt-1">{product.errorMargin.longTerm < 20 ? 'Relatif Akurat' : product.errorMargin.longTerm < 35 ? 'Estimasi Kasar' : 'Sangat Tidak Pasti'}</p>
              </div>
            </div>
            <div className="bg-gray-900/30 rounded-lg p-3">
              <p className="text-[10px] text-gray-400 mb-2">Faktor yang mempengaruhi akurasi:</p>
              <div className="flex flex-wrap gap-1.5">
                {product.errorMargin.factors.map((factor, idx) => (<span key={idx} className="text-[10px] px-2 py-0.5 rounded-full bg-gray-700/50 text-gray-300 border border-gray-600/30">{factor}</span>))}
              </div>
            </div>
            <div className={`mt-3 rounded-lg p-3 border ${product.errorMargin.mediumTerm < 15 ? 'bg-emerald-500/5 border-emerald-500/20' : product.errorMargin.mediumTerm < 25 ? 'bg-yellow-500/5 border-yellow-500/20' : 'bg-red-500/5 border-red-500/20'}`}>
              <p className="text-[11px] text-gray-300">
                {product.errorMargin.mediumTerm < 15 ? `✅ Prediksi untuk "${product.name}" memiliki akurasi tinggi. Margin kesalahan hanya ±${product.errorMargin.mediumTerm}% untuk 30 hari ke depan. Anda bisa mengandalkan data ini untuk keputusan bisnis.` : product.errorMargin.mediumTerm < 25 ? `⚡ Prediksi untuk "${product.name}" cukup akurat dengan margin kesalahan ±${product.errorMargin.mediumTerm}%. Gunakan sebagai referensi, tapi tetap pantau perkembangan aktual.` : `⚠️ Prediksi untuk "${product.name}" memiliki margin kesalahan tinggi ±${product.errorMargin.longTerm}% untuk jangka panjang. Sebaiknya gunakan sebagai estimasi kasar saja dan lakukan riset tambahan.`}
              </p>
            </div>
          </div>
          <div className={`rounded-xl p-4 border ${product.prediction.direction === 'up' ? 'bg-emerald-500/5 border-emerald-500/20' : product.prediction.direction === 'down' ? 'bg-red-500/5 border-red-500/20' : 'bg-yellow-500/5 border-yellow-500/20'}`}>
            <h4 className="text-sm font-semibold text-white mb-2">💡 Rekomendasi</h4>
            <p className="text-sm text-gray-300">
              {product.prediction.direction === 'up' ? `Produk "${product.name}" diprediksi akan terus meningkat dalam ${product.prediction.period} ke depan dengan pertumbuhan ${product.prediction.projectedGrowth}%. Ini adalah waktu yang baik untuk menyetok atau mempromosikan produk ini.` : product.prediction.direction === 'down' ? `Produk "${product.name}" diprediksi akan menurun dalam ${product.prediction.period} ke depan. Pertimbangkan untuk mengurangi stok atau mencari alternatif produk yang lebih trending.` : `Produk "${product.name}" diprediksi akan stabil dalam ${product.prediction.period} ke depan. Produk ini bisa menjadi pilihan aman untuk investasi jangka menengah.`}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
