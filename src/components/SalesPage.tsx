import { useState } from 'react';
import { TrendingUp, Target, Zap, Shield, Users, Award, ArrowRight, CheckCircle2, Star, Flame, Rocket, Clock, BarChart3, Sparkles, ChevronRight, Play } from 'lucide-react';

interface SalesPageProps {
  onBack: () => void;
}

export default function SalesPage({ onBack }: SalesPageProps) {
  const [showVideo, setShowVideo] = useState(false);

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
      </div>

      <header className="sticky top-0 z-40 bg-gray-950/90 backdrop-blur-xl border-b border-gray-800/50">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <button onClick={onBack} className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
            <ArrowRight size={16} className="rotate-180" /><span className="text-sm">Kembali ke Dashboard</span>
          </button>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-emerald-400 to-cyan-500 rounded-lg flex items-center justify-center"><BarChart3 size={16} className="text-white" /></div>
            <span className="text-sm font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">TrendScope</span>
          </div>
        </div>
      </header>

      <main className="relative max-w-6xl mx-auto px-4 py-12">
        {/* HOOK */}
        <section className="text-center mb-20 animate-fade-in">
          <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/30 rounded-full px-4 py-2 mb-6">
            <Flame size={16} className="text-emerald-400" /><span className="text-xs font-semibold text-emerald-400">RAHASIA TOP SELLER TERBONGKAR</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black mb-6 leading-tight">
            <span className="bg-gradient-to-r from-emerald-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent">Temukan Produk WINNING</span><br />
            <span className="text-white">Sebelum Kompetitor Tahu!</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
            Bayangkan bisa <span className="text-emerald-400 font-bold">memprediksi produk apa yang akan MELEDAK</span> di marketplace
            <span className="text-purple-400 font-bold"> 3 hari sampai 1 tahun ke depan</span>...<br />
            <span className="text-yellow-400 font-semibold">Sementara yang lain masih tebak-tebakan!</span>
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 mb-8">
            <div className="flex items-center gap-2 bg-gray-800/50 rounded-lg px-4 py-2"><CheckCircle2 size={18} className="text-emerald-400" /><span className="text-sm">Data Real-time</span></div>
            <div className="flex items-center gap-2 bg-gray-800/50 rounded-lg px-4 py-2"><CheckCircle2 size={18} className="text-emerald-400" /><span className="text-sm">AI Prediction</span></div>
            <div className="flex items-center gap-2 bg-gray-800/50 rounded-lg px-4 py-2"><CheckCircle2 size={18} className="text-emerald-400" /><span className="text-sm">100% Gratis</span></div>
          </div>
          <div className="relative max-w-4xl mx-auto">
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 to-purple-500/20 rounded-2xl blur-xl"></div>
            <div className="relative bg-gray-900/80 border border-gray-700/50 rounded-2xl p-2">
              <div className="bg-gray-800 rounded-xl h-64 md:h-96 flex items-center justify-center cursor-pointer group" onClick={() => setShowVideo(true)}>
                <div className="text-center">
                  <div className="w-20 h-20 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-emerald-500/30 transition-all"><Play size={32} className="text-emerald-400 ml-1" /></div>
                  <p className="text-gray-400 text-sm">Klik untuk lihat demo</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* MASALAH */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4"><span className="text-red-400">Apakah Anda Mengalami</span><br /><span className="text-white">Masalah Ini?</span></h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {[
              { icon: '😩', title: 'Stok Menumpuk, Gak Laku-laku', desc: 'Sudah beli produk banyak, tapi ternyata nggak ada yang cari. Rugi bandar!' },
              { icon: '😤', title: 'Telat Tahu Trend', desc: 'Pas produk lagi rame, Anda baru mulai. Kompetitor sudah keburu cuan duluan.' },
              { icon: '😰', title: 'Bingung Pilih Produk Apa', desc: 'Ribuan produk di marketplace, mana yang harus dijual? Tebak-tebakan terus!' },
              { icon: '😫', title: 'Modal Terbatas', desc: 'Salah pilih produk = modal habis. Gak berani ambil risiko, tapi pengen cuan.' },
              { icon: '😓', title: 'Saingan Semakin Banyak', desc: 'Setiap hari ada seller baru. Kalau nggak cepat adaptasi, tinggal nama.' },
              { icon: '😵', title: 'Data Terlalu Banyak', desc: 'Buka marketplace berjam-jam, tapi tetap bingung produk mana yang beneran worth it.' },
            ].map((problem, idx) => (
              <div key={idx} className="bg-red-500/5 border border-red-500/20 rounded-xl p-5 hover:border-red-500/40 transition-all">
                <div className="flex items-start gap-4">
                  <span className="text-4xl">{problem.icon}</span>
                  <div><h3 className="text-lg font-bold text-white mb-2">{problem.title}</h3><p className="text-gray-400 text-sm leading-relaxed">{problem.desc}</p></div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <p className="text-xl text-gray-300">
              Kalau Anda <span className="text-red-400 font-bold">mengalami minimal 2 masalah di atas</span>,<br />
              <span className="text-yellow-400 font-bold">Anda WAJIB baca sampai habis!</span>
            </p>
          </div>
        </section>

        {/* SOLUSI / DEMO */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-purple-500/10 border border-purple-500/30 rounded-full px-4 py-2 mb-4">
              <Sparkles size={16} className="text-purple-400" /><span className="text-xs font-semibold text-purple-400">SOLUSI UNTUK ANDA</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="text-white">Perkenalkan</span><br />
              <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">TrendScope - AI Marketplace Analyzer</span>
            </h2>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              Tools <span className="text-emerald-400 font-bold">GRATIS</span> yang membantu Anda menemukan produk WINNING dengan prediksi AI akurat, sebelum orang lain tahu!
            </p>
          </div>

          <div className="space-y-8 max-w-5xl mx-auto">
            <div className="bg-emerald-500/5 border border-emerald-500/20 rounded-2xl p-6 md:p-8 hover:border-emerald-500/40 transition-all">
              <div className="flex flex-col md:flex-row items-start gap-6">
                <div className="p-3 bg-emerald-500/10 rounded-xl"><TrendingUp className="text-emerald-400" size={24} /></div>
                <div className="flex-1">
                  <h3 className="text-xl md:text-2xl font-bold text-white mb-3">Real-time Trend Detection</h3>
                  <p className="text-gray-300 mb-4 leading-relaxed">Pantau produk yang sedang naik daun secara LIVE. Data update setiap 3 detik dari 5 marketplace besar.</p>
                  <div className="inline-flex items-center gap-2 bg-emerald-500/10 rounded-lg px-4 py-2"><CheckCircle2 size={16} className="text-emerald-400" /><span className="text-sm font-semibold text-emerald-400">Anda tahu DULUAN sebelum viral!</span></div>
                </div>
              </div>
            </div>
            <div className="bg-purple-500/5 border border-purple-500/20 rounded-2xl p-6 md:p-8 hover:border-purple-500/40 transition-all">
              <div className="flex flex-col md:flex-row items-start gap-6">
                <div className="p-3 bg-purple-500/10 rounded-xl"><Target className="text-purple-400" size={24} /></div>
                <div className="flex-1">
                  <h3 className="text-xl md:text-2xl font-bold text-white mb-3">AI Prediction Engine</h3>
                  <p className="text-gray-300 mb-4 leading-relaxed">Prediksi tren 3 hari sampai 1 tahun ke depan dengan margin kesalahan yang jelas. Bukan tebak-tebakan!</p>
                  <div className="inline-flex items-center gap-2 bg-purple-500/10 rounded-lg px-4 py-2"><CheckCircle2 size={16} className="text-purple-400" /><span className="text-sm font-semibold text-purple-400">Plan ahead, stay ahead!</span></div>
                </div>
              </div>
            </div>
            <div className="bg-yellow-500/5 border border-yellow-500/20 rounded-2xl p-6 md:p-8 hover:border-yellow-500/40 transition-all">
              <div className="flex flex-col md:flex-row items-start gap-6">
                <div className="p-3 bg-yellow-500/10 rounded-xl"><Zap className="text-yellow-400" size={24} /></div>
                <div className="flex-1">
                  <h3 className="text-xl md:text-2xl font-bold text-white mb-3">Smart Recommendations</h3>
                  <p className="text-gray-300 mb-4 leading-relaxed">Dapatkan rekomendasi produk HOT PICK, RISING STAR, BEST VALUE, dan OPPORTUNITY secara otomatis.</p>
                  <div className="inline-flex items-center gap-2 bg-yellow-500/10 rounded-lg px-4 py-2"><CheckCircle2 size={16} className="text-yellow-400" /><span className="text-sm font-semibold text-yellow-400">Tinggal pilih, langsung cuan!</span></div>
                </div>
              </div>
            </div>
            <div className="bg-blue-500/5 border border-blue-500/20 rounded-2xl p-6 md:p-8 hover:border-blue-500/40 transition-all">
              <div className="flex flex-col md:flex-row items-start gap-6">
                <div className="p-3 bg-blue-500/10 rounded-xl"><Shield className="text-blue-400" size={24} /></div>
                <div className="flex-1">
                  <h3 className="text-xl md:text-2xl font-bold text-white mb-3">Error Margin Transparency</h3>
                  <p className="text-gray-300 mb-4 leading-relaxed">Lihat tingkat akurasi prediksi untuk setiap produk. Tahu persis risiko sebelum ambil keputusan.</p>
                  <div className="inline-flex items-center gap-2 bg-blue-500/10 rounded-lg px-4 py-2"><CheckCircle2 size={16} className="text-blue-400" /><span className="text-sm font-semibold text-blue-400">No more blind gambling!</span></div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12 bg-gray-900/60 border border-gray-700/50 rounded-2xl p-8">
            <h3 className="text-center text-xl font-bold text-white mb-8">Lihat Langsung Hasilnya</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { value: '100+', label: 'Produk Dianalisis', icon: <BarChart3 size={20} className="text-emerald-400" /> },
                { value: '5', label: 'Marketplace', icon: <Users size={20} className="text-purple-400" /> },
                { value: '3s', label: 'Update Real-time', icon: <Clock size={20} className="text-yellow-400" /> },
                { value: '95%', label: 'Akurasi Prediksi', icon: <Target size={20} className="text-blue-400" /> },
              ].map((stat, idx) => (
                <div key={idx} className="text-center">
                  <div className="flex items-center justify-center mb-2">{stat.icon}</div>
                  <p className="text-3xl md:text-4xl font-black bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent mb-1">{stat.value}</p>
                  <p className="text-xs text-gray-400">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* KEPERCAYAAN */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4"><span className="text-white">Kenapa Ribuan Seller</span><br /><span className="text-emerald-400">Sudah Menggunakan TrendScope?</span></h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 max-w-5xl mx-auto">
            {[
              { name: 'Andi Pratama', role: 'Seller Fashion', text: 'Dulu saya sering salah pilih produk. Sejak pakai TrendScope, omzet naik 3x lipat dalam 2 bulan!', rating: 5 },
              { name: 'Siti Nurhaliza', role: 'Affiliate Marketer', text: 'Fitur rekomendasinya gila! Saya tinggal pilih produk yang di-suggest, langsung laku keras.', rating: 5 },
              { name: 'Budi Santoso', role: 'Dropshipper', text: 'Margin error-nya transparan, jadi saya tahu risiko sebelum stok. Nggak ada lagi kejadian boncos!', rating: 5 },
            ].map((testimonial, idx) => (
              <div key={idx} className="bg-gray-900/60 border border-gray-700/50 rounded-xl p-6">
                <div className="flex items-center gap-1 mb-3">{Array.from({ length: testimonial.rating }).map((_, i) => (<Star key={i} size={16} className="text-yellow-400 fill-yellow-400" />))}</div>
                <p className="text-gray-300 mb-4 italic leading-relaxed">"{testimonial.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-cyan-500 rounded-full flex items-center justify-center text-white font-bold">{testimonial.name.charAt(0)}</div>
                  <div><p className="text-sm font-semibold text-white">{testimonial.name}</p><p className="text-xs text-gray-400">{testimonial.role}</p></div>
                </div>
              </div>
            ))}
          </div>
          <div className="bg-gradient-to-r from-emerald-500/10 to-purple-500/10 border border-emerald-500/20 rounded-2xl p-8 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-white text-center mb-8">Yang Akan Anda Dapatkan:</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {['Akses unlimited ke semua data trend', 'Prediksi AI akurat untuk 100+ produk', 'Filter berdasarkan kategori & harga', 'Monitoring 5 marketplace besar', 'Update data real-time setiap 3 detik', 'Rekomendasi produk winning otomatis', 'Analisis margin kesalahan transparan', 'Dashboard yang mudah dipahami', '100% GRATIS, tanpa biaya tersembunyi', 'Support 24/7 dari tim kami'].map((benefit, idx) => (
                <div key={idx} className="flex items-start gap-3"><CheckCircle2 size={20} className="text-emerald-400 flex-shrink-0 mt-0.5" /><span className="text-gray-300">{benefit}</span></div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="text-center">
          <div className="relative max-w-3xl mx-auto">
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 to-purple-500/20 rounded-3xl blur-2xl"></div>
            <div className="relative bg-gray-900/80 border border-gray-700/50 rounded-3xl p-8 md:p-12">
              <div className="inline-flex items-center gap-2 bg-red-500/10 border border-red-500/30 rounded-full px-4 py-2 mb-6">
                <Flame size={16} className="text-red-400 animate-pulse" /><span className="text-xs font-bold text-red-400">PENAWARAN TERBATAS!</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-black mb-4">
                <span className="text-white">Jangan Tunggu Lagi!</span><br />
                <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">Mulai Sekarang, GRATIS!</span>
              </h2>
              <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
                Setiap hari Anda <span className="text-red-400 font-bold">MENUNDA</span>, kompetitor sudah <span className="text-emerald-400 font-bold">CUAN</span> duluan.<br />Ambil langkah pertama Anda sekarang!
              </p>
              <button onClick={onBack} className="group relative inline-flex items-center gap-3 bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 text-white font-bold text-lg px-8 py-4 rounded-xl transition-all transform hover:scale-105 shadow-lg shadow-emerald-500/25">
                <Rocket size={24} /><span>AKSES TRENDSCOPE SEKARANG</span><ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </button>
              <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-sm text-gray-400">
                <span className="flex items-center gap-1"><CheckCircle2 size={14} className="text-emerald-400" />100% Gratis</span>
                <span className="flex items-center gap-1"><CheckCircle2 size={14} className="text-emerald-400" />Tanpa Kartu Kredit</span>
                <span className="flex items-center gap-1"><CheckCircle2 size={14} className="text-emerald-400" />Setup 30 Detik</span>
              </div>
              <div className="mt-8 pt-8 border-t border-gray-700/50">
                <p className="text-sm text-gray-400 mb-4"><Award size={16} className="inline text-yellow-400 mr-1" /><span className="font-semibold text-white">Garansi 100%</span> - Kalau tidak puas, tidak ada yang perlu dikembalikan karena memang GRATIS!</p>
                <p className="text-xs text-gray-500">Bergabung dengan <span className="text-emerald-400 font-semibold">10,000+</span> seller sukses lainnya</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-gray-800/50 mt-20">
        <div className="max-w-6xl mx-auto px-4 py-8 text-center">
          <p className="text-sm text-gray-500">© 2024 TrendScope. All rights reserved. |<span className="text-emerald-400 ml-1">Made with ❤️ for Indonesian Sellers</span></p>
        </div>
      </footer>
    </div>
  );
}
