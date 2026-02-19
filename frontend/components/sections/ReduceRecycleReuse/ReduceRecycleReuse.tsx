import RevealOnScroll from "@/components/animations/RevealOnScroll/RevealOnScroll";
import Link from "next/link";
import { ArrowRight, ShoppingBag, TrendingUp, BookOpen, Users, Leaf, ArrowUpRight } from "lucide-react";

export default function ReduceRecycleReuse() {
    return (
        <section className="relative bg-[#F8F9FA] py-24 overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                
                {/* 1. HEADER SECTION */}
                <div className="max-w-3xl mx-auto text-center mb-16">
                    <RevealOnScroll direction="up">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-100 text-[#2E8B57] text-xs font-bold uppercase tracking-wider mb-6">
                            <Leaf size={14} />
                            Ekosistem Gocycle
                        </div>
                        <h2 className="text-4xl md:text-6xl font-bold text-gray-900 leading-[1.1] tracking-tight mb-6">
                            Satu Aplikasi, <br/>
                            <span className="text-[#2E8B57]">Berjuta Dampak Baik.</span>
                        </h2>
                        <p className="text-gray-500 text-lg leading-relaxed">
                            Kami menghubungkan setiap aspek gaya hidup berkelanjutan dalam satu platform yang mudah digunakan.
                        </p>
                    </RevealOnScroll>
                </div>

                {/* 2. BENTO GRID LAYOUT */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 auto-rows-[minmax(180px,auto)]">
                    
                    {/* CARD 1: MARKETPLACE (Large, Span 2 Cols, Span 2 Rows) */}
                    <RevealOnScroll direction="up" delay={0.1} className="lg:col-span-2 lg:row-span-2">
                        <div className="group h-full bg-white rounded-[2.5rem] p-8 sm:p-10 flex flex-col justify-between relative overflow-hidden border border-gray-200 hover:border-[#2E8B57]/30 transition-all duration-500 hover:shadow-xl hover:shadow-green-900/5">
                            <div className="relative z-10 max-w-md">
                                <div className="w-12 h-12 bg-[#E8F5E9] rounded-2xl flex items-center justify-center text-[#2E8B57] mb-6">
                                    <ShoppingBag size={24} />
                                </div>
                                <h3 className="text-3xl font-bold text-gray-900 mb-4">Circular Marketplace</h3>
                                <p className="text-gray-500 leading-relaxed mb-8">
                                    Tempat jual beli limbah terpilah dan produk daur ulang. Ubah barang tak terpakai menjadi cuan dengan aman.
                                </p>
                                <Link href="/marketplace" className="inline-flex items-center gap-2 text-[#2E8B57] font-bold hover:gap-3 transition-all">
                                    Mulai Belanja <ArrowRight size={18} />
                                </Link>
                            </div>

                            {/* Visual Decoration: Mockup Floating Cards */}
                            <div className="absolute right-[-10%] bottom-[-10%] w-[60%] h-[70%] bg-gray-50 rounded-tl-[3rem] border-t border-l border-gray-100 p-6 flex flex-col gap-4 group-hover:translate-x-[-10px] group-hover:translate-y-[-10px] transition-transform duration-500">
                                {/* Mock Item 1 */}
                                <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
                                    <div className="w-12 h-12 bg-gray-200 rounded-lg animate-pulse"></div>
                                    <div className="flex-1">
                                        <div className="h-3 w-24 bg-gray-200 rounded mb-2"></div>
                                        <div className="h-3 w-16 bg-green-100 rounded"></div>
                                    </div>
                                </div>
                                {/* Mock Item 2 */}
                                <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4 ml-8">
                                    <div className="w-12 h-12 bg-gray-200 rounded-lg animate-pulse"></div>
                                    <div className="flex-1">
                                        <div className="h-3 w-24 bg-gray-200 rounded mb-2"></div>
                                        <div className="h-3 w-16 bg-green-100 rounded"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </RevealOnScroll>

                    {/* CARD 2: TRACKING (Tall, Span 1 Col, Span 2 Rows) */}
                    <RevealOnScroll direction="up" delay={0.2} className="lg:col-span-1 lg:row-span-2">
                        <div className="group h-full bg-[#1B4D3E] rounded-[2.5rem] p-8 flex flex-col relative overflow-hidden hover:shadow-xl transition-all duration-300">
                            <div className="relative z-10 mb-auto">
                                <div className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center text-[#4ADE80] mb-6">
                                    <TrendingUp size={24} />
                                </div>
                                <h3 className="text-2xl font-bold text-white mb-4">Impact Tracker</h3>
                                <p className="text-green-100/70 text-sm leading-relaxed">
                                    Monitor jejak karbon dan statistik daur ulangmu secara real-time.
                                </p>
                            </div>

                            {/* Visual: Chart Bars */}
                            <div className="mt-8 flex items-end gap-3 h-40 justify-center opacity-80">
                                <div className="w-8 bg-[#4ADE80]/30 rounded-t-lg h-[40%] group-hover:h-[60%] transition-all duration-500 delay-75"></div>
                                <div className="w-8 bg-[#4ADE80]/50 rounded-t-lg h-[70%] group-hover:h-[90%] transition-all duration-500 delay-150"></div>
                                <div className="w-8 bg-[#4ADE80] rounded-t-lg h-[50%] group-hover:h-[80%] transition-all duration-500"></div>
                                <div className="w-8 bg-[#4ADE80]/30 rounded-t-lg h-[60%] group-hover:h-[40%] transition-all duration-500 delay-100"></div>
                            </div>
                        </div>
                    </RevealOnScroll>

                    {/* CARD 3: EDUCATION (Medium) */}
                    <RevealOnScroll direction="up" delay={0.3} className="lg:col-span-1">
                        <Link href="/edukasi" className="group block h-full bg-white rounded-[2.5rem] p-8 border border-gray-200 hover:border-orange-200 hover:shadow-lg hover:shadow-orange-500/5 transition-all duration-300 relative overflow-hidden">
                            <div className="flex justify-between items-start">
                                <div className="w-12 h-12 bg-orange-50 rounded-2xl flex items-center justify-center text-orange-500 mb-4 group-hover:scale-110 transition-transform">
                                    <BookOpen size={24} />
                                </div>
                                <ArrowUpRight className="text-gray-300 group-hover:text-orange-500 transition-colors" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">Pusat Edukasi</h3>
                            <p className="text-gray-500 text-sm">Tutorial & Artikel.</p>
                        </Link>
                    </RevealOnScroll>

                    {/* CARD 4: COMMUNITY (Medium) */}
                    <RevealOnScroll direction="up" delay={0.4} className="lg:col-span-1">
                        <Link href="/komunitas" className="group block h-full bg-white rounded-[2.5rem] p-8 border border-gray-200 hover:border-purple-200 hover:shadow-lg hover:shadow-purple-500/5 transition-all duration-300 relative overflow-hidden">
                            <div className="flex justify-between items-start">
                                <div className="w-12 h-12 bg-purple-50 rounded-2xl flex items-center justify-center text-purple-500 mb-4 group-hover:scale-110 transition-transform">
                                    <Users size={24} />
                                </div>
                                <ArrowUpRight className="text-gray-300 group-hover:text-purple-500 transition-colors" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">Komunitas</h3>
                            <p className="text-gray-500 text-sm">Event & Diskusi.</p>
                        </Link>
                    </RevealOnScroll>

                    {/* CARD 5: JOIN CTA (Vibrant) */}
                    <RevealOnScroll direction="up" delay={0.5} className="lg:col-span-1">
                        <Link href="/register" className="group block h-full bg-[#2E8B57] rounded-[2.5rem] p-8 relative overflow-hidden hover:bg-[#246e45] transition-all duration-300 flex flex-col justify-center items-center text-center">
                            <div className="relative z-10">
                                <h3 className="text-2xl font-bold text-white mb-2">Gabung Sekarang</h3>
                                <p className="text-green-100 text-sm">Mulai langkah hijaumu.</p>
                            </div>
                            {/* Decorative Glow */}
                            <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-white/20 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500"></div>
                        </Link>
                    </RevealOnScroll>

                </div>
            </div>
        </section>
    );
}

