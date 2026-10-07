import React, { useState, useEffect, useCallback } from 'react';
import { Product, Category, PriceRange, ForecastPeriod, Marketplace } from './types';
import { generateProducts, updateProductRealtime, priceRanges, marketplaces } from './data';
import FilterPanel from './components/FilterPanel';
import ProductCard from './components/ProductCard';
import ProductDetail from './components/ProductDetail';
import StatsOverview from './components/StatsOverview';
import SmartRecommendations from './components/SmartRecommendations';
import SalesPage from './components/SalesPage';
import { Activity, RefreshCw, Wifi, WifiOff, Zap, ChevronDown, ChevronUp, Megaphone } from 'lucide-react';

function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<Category>('Semua Kategori');
  const [selectedPriceRange, setSelectedPriceRange] = useState<PriceRange>(priceRanges[0]);
  const [selectedPeriod, setSelectedPeriod] = useState<ForecastPeriod>('30d');
  const [selectedMarketplace, setSelectedMarketplace] = useState<Marketplace>('Semua Marketplace');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isLive, setIsLive] = useState(true);
  const [lastUpdate, setLastUpdate] = useState(new Date());
  const [isLoading, setIsLoading] = useState(true);
  const [showRecommendations, setShowRecommendations] = useState(true);
  const [showSalesPage, setShowSalesPage] = useState(false);

  // Initialize products
  useEffect(() => {
    const timer = setTimeout(() => {
      const initialProducts = generateProducts(selectedPeriod);
      setProducts(initialProducts);
      setIsLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, [selectedPeriod]);

  // Real-time updates
  useEffect(() => {
    if (!isLive || isLoading) return;
    
    const interval = setInterval(() => {
      setProducts(prev => {
        const updated = prev.map(p => {
          if (Math.random() > 0.7) {
            return updateProductRealtime(p);
          }
          return p;
        });
        return updated.sort((a, b) => b.searchVolume - a.searchVolume);
      });
      setLastUpdate(new Date());
    }, 3000);

    return () => clearInterval(interval);
  }, [isLive, isLoading]);

  // Filter products
  const applyFilters = useCallback(() => {
    let filtered = [...products];

    if (selectedCategory !== 'Semua Kategori') {
      filtered = filtered.filter(p => p.category === selectedCategory);
    }

    if (selectedMarketplace !== 'Semua Marketplace') {
      filtered = filtered.filter(p => p.marketplace === selectedMarketplace);
    }

    filtered = filtered.filter(p => 
      p.price >= selectedPriceRange.min && p.price <= selectedPriceRange.max
    );

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(p => 
        p.name.toLowerCase().includes(query) || 
        p.category.toLowerCase().includes(query)
      );
    }

    setFilteredProducts(filtered);
  }, [products, selectedCategory, selectedMarketplace, selectedPriceRange, searchQuery]);

  useEffect(() => {
    applyFilters();
  }, [applyFilters]);

  const handleRefresh = () => {
    setIsLoading(true);
    setTimeout(() => {
      const newProducts = generateProducts(selectedPeriod);
      setProducts(newProducts);
      setIsLoading(false);
      setLastUpdate(new Date());
    }, 500);
  };

  // Show Sales Page as full-screen overlay
  if (showSalesPage) {
    return <SalesPage onBack={() => setShowSalesPage(false)} />;
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Background effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/3 rounded-full blur-3xl"></div>
      </div>

      {/* Header */}
      <header className="sticky top-0 z-40 bg-gray-950/80 backdrop-blur-xl border-b border-gray-800/50">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-9 h-9 bg-gradient-to-br from-emerald-400 to-cyan-500 rounded-xl flex items-center justify-center">
                  <Activity size={18} className="text-white" />
                </div>
                {isLive && (
                  <div className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-emerald-400 rounded-full animate-pulse"></div>
                )}
              </div>
              <div>
                <h1 className="text-lg font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                  TrendScope
                </h1>
                <p className="text-[10px] text-gray-500">Marketplace Trend Analyzer</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {/* Live indicator */}
              <button
                onClick={() => setIsLive(!isLive)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  isLive 
                    ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30' 
                    : 'bg-gray-800 text-gray-400 border border-gray-700'
                }`}
              >
                {isLive ? <Wifi size={12} /> : <WifiOff size={12} />}
                {isLive ? 'LIVE' : 'PAUSED'}
              </button>

              {/* Refresh */}
              <button
                onClick={handleRefresh}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium bg-gray-800 text-gray-300 border border-gray-700 hover:border-gray-600 transition-all"
              >
                <RefreshCw size={12} className={isLoading ? 'animate-spin' : ''} />
                Refresh
              </button>

              {/* Last update */}
              <div className="hidden md:flex items-center gap-1.5 text-[10px] text-gray-500">
                <Zap size={10} />
                Update: {lastUpdate.toLocaleTimeString('id-ID')}
              </div>

              {/* Sales Page Button */}
              <button
                onClick={() => setShowSalesPage(true)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium bg-gradient-to-r from-emerald-500/20 to-purple-500/20 text-emerald-400 border border-emerald-500/30 hover:border-emerald-500/50 transition-all"
              >
                <Megaphone size={12} />
                <span className="hidden sm:inline">Kenalan Dulu</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-5 relative">
        {/* Stats */}
        <div className="mb-5">
          <StatsOverview products={filteredProducts} totalProducts={filteredProducts.length} />
        </div>

        {/* Smart Recommendations */}
        <div className="mb-5">
          <button
            onClick={() => setShowRecommendations(!showRecommendations)}
            className="w-full flex items-center justify-between mb-3 group"
          >
            <span className="text-xs text-gray-400 group-hover:text-gray-300 transition-colors flex items-center gap-1">
              {showRecommendations ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
              {showRecommendations ? 'Sembunyikan' : 'Tampilkan'} Rekomendasi
            </span>
          </button>
          {showRecommendations && !isLoading && filteredProducts.length > 0 && (
            <SmartRecommendations
              products={filteredProducts}
              period={selectedPeriod}
              onSelectProduct={setSelectedProduct}
            />
          )}
        </div>

        {/* Divider */}
        <div className="flex items-center gap-3 mb-5">
          <div className="flex-1 h-px bg-gray-800"></div>
          <span className="text-[10px] text-gray-500 uppercase tracking-wider">Semua Produk</span>
          <div className="flex-1 h-px bg-gray-800"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-5">
          {/* Sidebar - Filters */}
          <div className="lg:col-span-1">
            <div className="sticky top-20">
              <FilterPanel
                selectedCategory={selectedCategory}
                selectedPriceRange={selectedPriceRange}
                selectedPeriod={selectedPeriod}
                selectedMarketplace={selectedMarketplace}
                searchQuery={searchQuery}
                onCategoryChange={setSelectedCategory}
                onPriceRangeChange={setSelectedPriceRange}
                onPeriodChange={setSelectedPeriod}
                onMarketplaceChange={setSelectedMarketplace}
                onSearchChange={setSearchQuery}
              />

              {/* Quick Tips */}
              <div className="mt-4 bg-gray-900/60 backdrop-blur-sm border border-gray-700/40 rounded-xl p-4">
                <h4 className="text-xs font-semibold text-gray-300 mb-2">💡 Cara Baca Rekomendasi</h4>
                <ul className="text-[11px] text-gray-500 space-y-1.5">
                  <li>🔥 <span className="text-orange-400">HOT PICK</span> - Paling laris, segera ambil!</li>
                  <li>🚀 <span className="text-emerald-400">RISING STAR</span> - Baru naik, ambil sebelum ramai</li>
                  <li>⭐ <span className="text-yellow-400">BEST VALUE</span> - Murah, margin besar</li>
                  <li>🛡️ <span className="text-blue-400">SAFE BET</span> - Stabil, aman jangka panjang</li>
                  <li>🎯 <span className="text-purple-400">OPPORTUNITY</span> - Prediksi naik tinggi</li>
                </ul>
                <div className="mt-3 pt-3 border-t border-gray-700/30">
                  <p className="text-[10px] text-gray-500">
                    Score {'>'} 80 = Sangat direkomendasikan<br/>
                    Urgensi "Tinggi" = Ambil sekarang!
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Product Grid */}
          <div className="lg:col-span-3">
            {isLoading ? (
              <div className="flex items-center justify-center h-64">
                <div className="text-center">
                  <div className="w-10 h-10 border-2 border-emerald-400 border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
                  <p className="text-sm text-gray-400">Menganalisis tren marketplace...</p>
                </div>
              </div>
            ) : filteredProducts.length === 0 ? (
              <div className="flex items-center justify-center h-64">
                <div className="text-center">
                  <p className="text-4xl mb-3">🔍</p>
                  <p className="text-sm text-gray-400">Tidak ada produk yang cocok dengan filter</p>
                  <p className="text-xs text-gray-500 mt-1">Coba ubah kategori atau rentang harga</p>
                </div>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between mb-3">
                  <p className="text-xs text-gray-400">
                    Menampilkan <span className="text-white font-semibold">{filteredProducts.length}</span> produk
                    {selectedCategory !== 'Semua Kategori' && <span> dalam <span className="text-emerald-400">{selectedCategory}</span></span>}
                  </p>
                  <div className="flex items-center gap-1 text-[10px] text-gray-500">
                    <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></span>
                    Real-time
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
                  {filteredProducts.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      onClick={setSelectedProduct}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </main>

      {/* Product Detail Modal */}
      {selectedProduct && (
        <ProductDetail
          product={selectedProduct}
          period={selectedPeriod}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </div>
  );
}

export default App;
