"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { IconArrowLeft, IconStar, IconShoppingCart, IconHeart, IconShare, IconTruck, IconShieldCheck, IconLeaf, IconMessage } from "@tabler/icons-react";
import { motion } from "motion/react";
import ProductCard from "@/components/ui/ProductCard/ProductCard";
import { getPublicProductsAction } from "@/lib/public-product-actions";
import { ProductResponse } from "@/lib/api";

export default function ProductDetail() {
    const params = useParams();
    const router = useRouter();
    const id = params.id as string;

    const [product, setProduct] = useState<ProductResponse | null>(null);
    const [relatedProducts, setRelatedProducts] = useState<ProductResponse[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            const result = await getPublicProductsAction();
            if (result.success && result.data) {
                const foundProduct = result.data.find((p) => p.id === id);
                setProduct(foundProduct || null);
                // Get related products (same category, different id)
                const related = result.data.filter(p => p.id !== id).slice(0, 4);
                setRelatedProducts(related);
            }
            setIsLoading(false);
        }
        fetchData();
    }, [id]);

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#FDFDFD]">
                <div className="animate-pulse text-gray-400">Memuat...</div>
            </div>
        );
    }

    if (!product) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#FDFDFD]">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-gray-900 mb-2">Produk Tidak Ditemukan</h1>
                    <button
                        onClick={() => router.back()}
                        className="text-emerald-600 hover:underline"
                    >
                        Kembali ke Marketplace
                    </button>
                </div>
            </div>
        );
    }

    // Random tags for visual variety
    const getTags = (index: number): string | null => {
        const tags = ["Best Seller", "New", null, "Limited"];
        return tags[index % tags.length];
    };

    return (
        <div className="min-h-screen bg-[#FDFDFD] font-sans selection:bg-emerald-100 pb-24 lg:pb-12">

            {/* Navbar Placeholder (Back Button) */}
            <div className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-gray-100/50 px-4 py-4 supports-[backdrop-filter]:bg-white/60">
                <div className="max-w-7xl mx-auto flex items-center gap-4">
                    <button
                        onClick={() => router.back()}
                        className="p-2.5 rounded-full hover:bg-gray-100/80 transition-all text-gray-600 hover:text-gray-900 active:scale-95"
                    >
                        <IconArrowLeft size={22} />
                    </button>
                    <span className="font-bold text-gray-900 truncate text-lg">Detail Produk</span>
                </div>
            </div>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 mb-20">

                    {/* LEFT COLUMN: IMAGES */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        className="space-y-6 lg:sticky lg:top-28 self-start"
                    >
                        <div className="relative group">
                            {/* Ambient Glow */}
                            <div className="absolute -inset-4 bg-gradient-to-r from-emerald-100 to-blue-50 rounded-[3rem] blur-2xl opacity-50 group-hover:opacity-70 transition-opacity duration-700" />

                            <div className="relative aspect-[4/5] rounded-[2rem] overflow-hidden bg-white shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-gray-100">
                                <img
                                    src={product.imageUrl}
                                    alt={product.name}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                            </div>
                        </div>

                        {/* Thumbnails */}
                        <div className="grid grid-cols-4 gap-4">
                            {[1, 2, 3, 4].map((item) => (
                                <div key={item} className="aspect-square rounded-2xl bg-white border border-gray-100 cursor-pointer hover:ring-2 ring-emerald-500 ring-offset-2 transition-all overflow-hidden shadow-sm hover:shadow-md">
                                    <img src={product.imageUrl} className="w-full h-full object-cover opacity-80 hover:opacity-100 transition-opacity" alt="thumbnail" />
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    {/* RIGHT COLUMN: DETAILS */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="flex flex-col h-full pt-2"
                    >
                        {/* Header & Rating */}
                        <div className="mb-8">
                            <div className="flex items-center gap-3 mb-4">
                                <span className="px-3 py-1 bg-emerald-50 text-emerald-700 text-xs font-bold uppercase tracking-wider rounded-full border border-emerald-100">
                                    {product.subCategoryName || product.category}
                                </span>
                                <div className="flex items-center gap-1.5 text-amber-500 bg-amber-50/50 px-3 py-1 rounded-full border border-amber-100/50">
                                    <IconStar size={14} className="fill-current" />
                                    <span className="text-xs font-bold text-gray-900">{(4.5 + Math.random() * 0.5).toFixed(1)}</span>
                                    <span className="text-gray-300 mx-1">|</span>
                                    <span className="text-xs text-gray-500">120 Ulasan</span>
                                </div>
                            </div>

                            <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-gray-900 leading-tight mb-4 tracking-tight">
                                {product.name}
                            </h1>

                            <div className="flex items-end gap-4 pb-6 border-b border-gray-100">
                                <div className="flex items-baseline gap-2">
                                    <p className="text-4xl lg:text-5xl font-black text-emerald-600 tracking-tight">
                                        <span className="text-xl lg:text-2xl font-bold text-gray-400 mr-1 align-top mt-2 inline-block">Rp</span>
                                        {product.price.toLocaleString('id-ID')}
                                    </p>
                                    <span className="text-xl text-gray-400 font-medium">
                                        / {product.priceUnitAmount > 1 ? `${product.priceUnitAmount} ` : ''}{product.priceUnit}
                                    </span>
                                </div>
                                <span className="mb-2 text-sm font-medium text-emerald-600 bg-emerald-50 px-3 py-1 rounded-lg">
                                    1.2rb Terjual
                                </span>
                            </div>
                        </div>

                        {/* DESKTOP ACTIONS (Inline) */}
                        <div className="hidden lg:flex items-center gap-4 mb-10">
                            <button className="flex-1 bg-gray-900 text-white font-bold rounded-xl text-lg hover:bg-emerald-600 transition-all shadow-lg shadow-gray-200 hover:shadow-emerald-200 flex items-center justify-center gap-3 h-14 active:scale-[0.99]">
                                <IconShieldCheck size={22} />
                                Beli Sekarang
                            </button>
                            <button className="w-14 h-14 rounded-xl border border-gray-200 flex items-center justify-center text-gray-400 hover:text-emerald-500 hover:border-emerald-200 hover:bg-emerald-50 transition-all bg-white">
                                <IconShoppingCart size={24} />
                            </button>
                            <button className="w-14 h-14 rounded-xl border border-gray-200 flex items-center justify-center text-gray-400 hover:text-blue-500 hover:border-blue-200 hover:bg-blue-50 transition-all bg-white">
                                <IconShare size={24} />
                            </button>
                        </div>

                        {/* Description - Only show if product has description */}
                        {product.description && (
                            <div className="mb-10">
                                <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                                    <IconLeaf className="text-emerald-500" size={20} />
                                    Deskripsi Produk
                                </h3>
                                <div className="prose prose-gray prose-sm max-w-none">
                                    <p className="text-gray-600 leading-relaxed text-base">
                                        {product.description}
                                    </p>
                                </div>
                            </div>
                        )}

                        {/* Seller Card */}
                        <div className="p-1 rounded-[2rem] bg-gradient-to-br from-gray-50 to-white border border-gray-100 shadow-sm mb-10">
                            <div className="bg-white rounded-[1.8rem] p-5 flex flex-col sm:flex-row items-center justify-between gap-6">
                                <div className="flex items-center gap-4 w-full sm:w-auto">
                                    <div className="relative shrink-0">
                                        <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#00C090] to-[#00A078] flex items-center justify-center text-white font-bold text-xl shadow-md shadow-emerald-100">
                                            {product.storeName.charAt(0)}
                                        </div>
                                        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-[#00C090] border-[3px] border-white rounded-full shadow-sm" title="Online"></div>
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-2 mb-0.5">
                                            <h3 className="font-bold text-gray-900 text-lg">{product.storeName}</h3>
                                            <IconShieldCheck size={18} className="text-[#00C090] fill-emerald-50" />
                                        </div>
                                        <div className="flex items-center gap-2 text-xs text-gray-500">
                                            <span className="text-[#00C090] font-medium">Online</span>
                                            <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                                            <span>Jakarta Pusat</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex gap-2 w-full sm:w-auto">
                                    <button className="flex-1 sm:flex-none px-5 py-2 rounded-lg bg-gray-900 text-white text-xs font-bold hover:bg-gray-800 transition-all shadow-md shadow-gray-200 hover:shadow-gray-300 active:scale-95">
                                        Follow
                                    </button>
                                    <button
                                        onClick={() => router.push(`/chat/${product.storeName.toLowerCase().replace(/\s+/g, '-')}`)}
                                        className="flex-1 sm:flex-none px-5 py-2 rounded-lg border border-gray-200 text-gray-700 text-xs font-bold hover:bg-gray-50 transition-all active:scale-95 flex items-center justify-center gap-1.5"
                                    >
                                        <IconMessage size={16} />
                                        Chat
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Eco Impact Feature */}
                        <div className="bg-gradient-to-br from-emerald-50 to-teal-50/30 rounded-2xl p-6 border border-emerald-100/50 mb-10 relative overflow-hidden">
                            <div className="absolute top-0 right-0 -mt-4 -mr-4 w-20 h-20 bg-emerald-100 rounded-full blur-2xl opacity-50"></div>
                            <div className="relative z-10 flex gap-4">
                                <div className="p-3 bg-white rounded-xl text-emerald-600 shadow-sm h-fit">
                                    <IconLeaf size={24} />
                                </div>
                                <div>
                                    <h4 className="font-bold text-emerald-900 text-base mb-1">Dampak Lingkungan Positif</h4>
                                    <p className="text-emerald-800/80 text-sm leading-relaxed">
                                        Dengan membeli produk ini, Anda berkontribusi mengurangi limbah di TPA dan mendukung ekonomi sirkular.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Features Grid */}
                        <div className="grid grid-cols-2 gap-4 mb-10">
                            <div className="flex items-center gap-3 p-4 rounded-2xl bg-gray-50 border border-gray-100">
                                <IconTruck className="text-gray-400" size={24} />
                                <div>
                                    <p className="font-bold text-gray-900 text-sm">Pengiriman Cepat</p>
                                    <p className="text-xs text-gray-500 mt-0.5">Estimasi 1-3 hari</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 p-4 rounded-2xl bg-gray-50 border border-gray-100">
                                <IconShieldCheck className="text-gray-400" size={24} />
                                <div>
                                    <p className="font-bold text-gray-900 text-sm">Jaminan Kualitas</p>
                                    <p className="text-xs text-gray-500 mt-0.5">Garansi 7 hari</p>
                                </div>
                            </div>
                        </div>

                        {/* Testimonials Section */}
                        <div className="mb-8">
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-lg font-bold text-gray-900">Ulasan Pembeli</h3>
                                <button className="text-emerald-600 font-bold text-sm hover:underline">Lihat Semua</button>
                            </div>
                            <div className="space-y-4">
                                {[
                                    { name: "Budi Santoso", text: "Barangnya bagus banget! Sesuai deskripsi dan pengiriman cepat.", rating: 5, time: "2 jam lalu" },
                                    { name: "Siti Aminah", text: "Kualitas oke, seller ramah. Recommended!", rating: 5, time: "1 hari lalu" }
                                ].map((review, i) => (
                                    <div key={i} className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                                        <div className="flex items-center justify-between mb-3">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-sm font-bold text-gray-600">
                                                    {review.name.charAt(0)}
                                                </div>
                                                <div>
                                                    <p className="font-bold text-gray-900 text-sm">{review.name}</p>
                                                    <div className="flex items-center gap-1">
                                                        {[...Array(5)].map((_, starI) => (
                                                            <IconStar key={starI} size={10} className={`${starI < review.rating ? "text-amber-400 fill-current" : "text-gray-300"}`} />
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                            <span className="text-xs text-gray-400 font-medium">{review.time}</span>
                                        </div>
                                        <p className="text-gray-600 text-sm leading-relaxed pl-[3.25rem]">{review.text}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                    </motion.div>
                </div>

                {/* RECOMMENDED PRODUCTS SECTION */}
                {relatedProducts.length > 0 && (
                    <div className="border-t border-gray-100 pt-16">
                        <div className="flex items-center justify-between mb-10">
                            <div>
                                <h2 className="text-2xl md:text-3xl font-black text-gray-900 mb-2">Kamu Mungkin Suka</h2>
                                <p className="text-gray-500 text-sm">Rekomendasi produk sejenis untukmu</p>
                            </div>
                            <button className="px-5 py-2 rounded-xl border border-gray-200 text-gray-900 font-bold text-sm hover:bg-gray-50 transition-all">
                                Lihat Semua
                            </button>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                            {relatedProducts.map((item, index) => (
                                <ProductCard
                                    key={item.id}
                                    id={item.id}
                                    name={item.name}
                                    price={item.price}
                                    storeName={item.storeName}
                                    image={item.imageUrl}
                                    subCategoryName={item.subCategoryName}
                                    tag={getTags(index)}
                                />
                            ))}
                        </div>
                    </div>
                )}
            </main>

            {/* MOBILE STICKY BOTTOM ACTIONS (Hidden on Desktop) */}
            <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 p-4 z-40 shadow-[0_-4px_20px_rgba(0,0,0,0.05)] pb-6 sm:pb-4">
                <div className="flex items-center gap-3">
                    <button className="w-12 h-12 rounded-xl border border-gray-200 flex items-center justify-center text-gray-400 hover:text-emerald-500 hover:border-emerald-200 hover:bg-emerald-50 transition-all bg-white">
                        <IconShoppingCart size={22} />
                    </button>
                    <button className="flex-1 bg-gray-900 text-white font-bold rounded-xl text-base hover:bg-emerald-600 transition-all shadow-lg shadow-gray-200 hover:shadow-emerald-200 flex items-center justify-center gap-2 h-12 active:scale-[0.99]">
                        <IconShieldCheck size={20} />
                        Beli Sekarang
                    </button>
                </div>
            </div>
        </div>
    );
}
