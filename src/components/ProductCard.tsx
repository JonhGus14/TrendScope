import { Product } from '../types';
import { formatPrice, formatNumber } from '../data';
import { TrendingUp, TrendingDown, Minus, ShoppingBag, Eye } from 'lucide-react';
import { AreaChart, Area, ResponsiveContainer } from 'recharts';

interface ProductCardProps {
  product: Product;
  onClick: (product: Product) => void;
}

export default function ProductCard({ product, onClick }: ProductCardProps) {
  const trendIcon = product.trend > 15 ? <TrendingUp size={14} className="text-emerald-400" /> : product.trend < -15 ? <TrendingDown size={14} className="text-red-400" /> : <Minus size={14} className="text-yellow-400" />;
  const trendColor = product.trend > 15 ? 'text-emerald-400' : product.trend < -15 ? 'text-red-400' : 'text-yellow-400';
  const trendBg = product.trend > 15 ? 'bg-emerald-500/10' : product.trend < -15 ? 'bg-red-500/10' : 'bg-yellow-500/10';
  const predictionColor = product.prediction.direction === 'up' ? 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30' : product.prediction.direction === 'down' ? 'text-red-400 bg-red-500/10 border-red-500/30' : 'text-yellow-400 bg-yellow-500/10 border-yellow-500/30';
  const chartColor = product.trend > 15 ? '#34d399' : product.trend < -15 ? '#f87171' : '#fbbf24';

  return (
    <div onClick={() => onClick(product)} className="bg-gray-900/60 backdrop-blur-sm border border-gray-700/40 rounded-xl p-4 hover:border-emerald-500/30 hover:bg-gray-800/60 transition-all cursor-pointer group">
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-semibold text-white truncate group-hover:text-emerald-300 transition-colors">{product.name}</h3>
          <p className="text-xs text-gray-500 mt-0.5">{product.category}</p>
        </div>
        <div className={`flex items-center gap-1 px-2 py-1 rounded-lg ${trendBg} ${trendColor}`}>
          {trendIcon}<span className="text-xs font-bold">{product.trend > 0 ? '+' : ''}{product.trend}%</span>
        </div>
      </div>
      <div className="h-12 mb-3 -mx-1">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={product.trendData.slice(-14)}>
            <defs><linearGradient id={`gradient-${product.id}`} x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor={chartColor} stopOpacity={0.3} /><stop offset="100%" stopColor={chartColor} stopOpacity={0} /></linearGradient></defs>
            <Area type="monotone" dataKey="searchVolume" stroke={chartColor} strokeWidth={1.5} fill={`url(#gradient-${product.id})`} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      <div className="grid grid-cols-2 gap-2 mb-3">
        <div className="bg-gray-800/40 rounded-lg p-2">
          <div className="flex items-center gap-1 text-gray-500 mb-0.5"><Eye size={10} /><span className="text-[10px]">Pencarian</span></div>
          <p className="text-xs font-bold text-white">{formatNumber(product.searchVolume)}</p>
        </div>
        <div className="bg-gray-800/40 rounded-lg p-2">
          <div className="flex items-center gap-1 text-gray-500 mb-0.5"><ShoppingBag size={10} /><span className="text-[10px]">Penjualan</span></div>
          <p className="text-xs font-bold text-white">{formatNumber(product.salesVolume)}</p>
        </div>
      </div>
      <div className="flex items-center justify-between">
        <span className="text-sm font-bold text-emerald-400">{formatPrice(product.price)}</span>
        <div className={`flex items-center gap-1 px-2 py-1 rounded-md border text-[10px] font-medium ${predictionColor}`}>
          {product.prediction.direction === 'up' ? '📈' : product.prediction.direction === 'down' ? '📉' : '➡️'}
          <span>{product.prediction.projectedGrowth > 0 ? '+' : ''}{product.prediction.projectedGrowth}%</span>
        </div>
      </div>
      <div className="mt-2 flex items-center justify-between">
        <span className="text-[10px] text-gray-500 bg-gray-800/40 px-2 py-0.5 rounded-full">{product.marketplace}</span>
        <div className="flex items-center gap-1.5">
          <span className={`text-[10px] font-medium px-1.5 py-0.5 rounded ${product.errorMargin.mediumTerm < 15 ? 'bg-emerald-500/10 text-emerald-400' : product.errorMargin.mediumTerm < 25 ? 'bg-yellow-500/10 text-yellow-400' : 'bg-red-500/10 text-red-400'}`}>
            ±{product.errorMargin.mediumTerm}%
          </span>
          <span className="text-[10px] text-gray-600">{product.prediction.confidence}%</span>
        </div>
      </div>
    </div>
  );
}
