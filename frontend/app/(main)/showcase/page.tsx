"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import RevealOnScroll from "@/components/animations/RevealOnScroll/RevealOnScroll";
import { getShowcaseProducts, type ShowcaseProduct, type ProductCategory } from "@/lib/showcase-api";

const categories: { value: ProductCategory | 'ALL'; label: string }[] = [
    { value: 'ALL', label: 'Semua' },
    { value: 'HOME_DECOR', label: 'Dekorasi Rumah' },
    { value: 'FASHION', label: 'Fashion' },
    { value: 'FURNITURE', label: 'Furniture' },
    { value: 'ACCESSORIES', label: 'Aksesoris' },
    { value: 'TOYS', label: 'Mainan' },
    { value: 'STORAGE', label: 'Penyimpanan' },
    { value: 'GARDEN', label: 'Taman' },
    { value: 'LIGHTING', label: 'Pencahayaan' },
];

export default function ShowcasePage() {
    const [products, setProducts] = useState<ShowcaseProduct[]>([]);
    const [filteredProducts, setFilteredProducts] = useState<ShowcaseProduct[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState<ProductCategory | 'ALL'>('ALL');
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        async function loadProducts() {
            try {
                const data = await getShowcaseProducts();
                setProducts(data);
                setFilteredProducts(data);
            } catch (error) {
                console.error('Failed to load products:', error);
            } finally {
                setLoading(false);
            }
        }
        loadProducts();
    }, []);

    useEffect(() => {
        let filtered = products;

        // Filter by category
        if (selectedCategory !== 'ALL') {
            filtered = filtered.filter(p => p.category === selectedCategory);
        }

        // Filter by search query
        if (searchQuery) {
            filtered = filtered.filter(p =>
                p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                p.story.toLowerCase().includes(searchQuery.toLowerCase()) ||
                p.maker.name.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        setFilteredProducts(filtered);
    }, [selectedCategory, searchQuery, products]);

    return (
        <div className="bg-white min-h-screen pt-32 pb-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <RevealOnScroll direction="up" className="text-center mb-12">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-50 text-[#2E8B57] text-sm font-bold tracking-wide uppercase mb-4 border border-green-100">
                        <span className="w-2 h-2 rounded-full bg-[#2E8B57] animate-pulse"></span>
                        Product Showcase
                    </div>
                    <h1 className="text-5xl sm:text-6xl font-black text-gray-900 mb-6">
                        Karya{" "}
                        <span className="text-transparent bg-clip-text bg-linear-to-r from-[#2E8B57] to-[#4ADE80]">
                            Eco-Makers
                        </span>
                    </h1>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Jelajahi produk daur ulang dengan cerita inspiratif dan dampak lingkungan yang terukur
                    </p>
                </RevealOnScroll>

                {/* Search & Filter */}
                <div className="mb-12">
                    {/* Search Bar */}
                    <div className="mb-6">
                        <div className="relative max-w-2xl mx-auto">
                            <input
                                type="text"
                                placeholder="Cari produk, maker, atau kata kunci..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full px-6 py-4 rounded-full border-2 border-gray-200 focus:border-[#2E8B57] focus:outline-none text-gray-900 placeholder-gray-400 transition-colors"
                            />
                            <svg
                                className="absolute right-6 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </div>
                    </div>

                    {/* Category Filter */}
                    <div className="flex flex-wrap gap-3 justify-center">
                        {categories.map((cat) => (
                            <button
                                key={cat.value}
                                onClick={() => setSelectedCategory(cat.value)}
                                className={`
                  px-6 py-3 rounded-full font-semibold text-sm transition-all duration-300
                  ${selectedCategory === cat.value
                                        ? 'bg-[#2E8B57] text-white shadow-lg shadow-green-500/30'
                                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}
                `}
                            >
                                {cat.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Results Count */}
                <div className="mb-8 text-center">
                    <p className="text-gray-600">
                        Menampilkan <span className="font-bold text-gray-900">{filteredProducts.length}</span> produk
                    </p>
                </div>

                {/* Products Grid */}
                {loading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
                            <div key={i} className="bg-gray-100 rounded-4xl h-[500px] animate-pulse"></div>
                        ))}
                    </div>
                ) : filteredProducts.length === 0 ? (
                    <div className="text-center py-20">
                        <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                            <svg className="w-12 h-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">Tidak ada produk ditemukan</h3>
                        <p className="text-gray-600 mb-6">Coba ubah filter atau kata kunci pencarian</p>
                        <button
                            onClick={() => {
                                setSelectedCategory('ALL');
                                setSearchQuery('');
                            }}
                            className="px-6 py-3 bg-[#2E8B57] text-white rounded-full font-semibold hover:bg-[#246e45] transition-colors"
                        >
                            Reset Filter
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredProducts.map((product, index) => (
                            <RevealOnScroll key={product.id} direction="up" delay={index * 0.05}>
                                <Link
                                    href={`/showcase/${product.id}`}
                                    className="group bg-white rounded-4xl shadow-sm hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 hover:border-green-200 block"
                                >
                                    <div className="aspect-square bg-gray-100 relative overflow-hidden">
                                        <img
                                            src={product.imageUrl}
                                            alt={product.name}
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                        />
                                        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full text-xs font-bold text-[#2E8B57] border border-green-100">
                                            {product.category.replace('_', ' ')}
                                        </div>
                                        <div className="absolute bottom-4 left-4 right-4 flex gap-2">
                                            <div className="flex items-center gap-1 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold">
                                                <svg className="w-3 h-3 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                                                </svg>
                                                <span>{product.likeCount}</span>
                                            </div>
                                            <div className="flex items-center gap-1 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold">
                                                <svg className="w-3 h-3 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                                </svg>
                                                <span>{product.viewCount}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="p-6">
                                        <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-[#2E8B57] transition-colors line-clamp-1">
                                            {product.name}
                                        </h3>
                                        <p className="text-gray-600 text-sm mb-4 line-clamp-2 leading-relaxed">
                                            {product.story}
                                        </p>

                                        <div className="flex items-center gap-4 mb-4">
                                            <div className="flex items-center gap-2">
                                                <div className="w-8 h-8 rounded-full bg-green-50 flex items-center justify-center">
                                                    <svg className="w-4 h-4 text-[#2E8B57]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                    </svg>
                                                </div>
                                                <div>
                                                    <div className="text-sm font-bold text-gray-900">{product.wasteSaved} kg</div>
                                                    <div className="text-xs text-gray-500">Sampah</div>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center">
                                                    <svg className="w-4 h-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                                                    </svg>
                                                </div>
                                                <div>
                                                    <div className="text-sm font-bold text-gray-900">{product.co2Reduced} kg</div>
                                                    <div className="text-xs text-gray-500">CO2</div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                                            <div className="text-sm text-gray-500">
                                                oleh <span className="font-semibold text-gray-700">{product.maker.name}</span>
                                            </div>
                                            <div className="text-sm font-bold text-[#2E8B57]">
                                                Rp {product.estimatedPrice.toLocaleString()}
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </RevealOnScroll>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
