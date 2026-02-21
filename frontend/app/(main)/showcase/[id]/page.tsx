"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import RevealOnScroll from "@/components/animations/RevealOnScroll/RevealOnScroll";
import { getShowcaseProductById, type ShowcaseProduct } from "@/lib/showcase-api";

export default function ShowcaseDetailPage() {
    const params = useParams();
    const [product, setProduct] = useState<ShowcaseProduct | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadProduct() {
            try {
                const data = await getShowcaseProductById(params.id as string);
                setProduct(data);
            } catch (error) {
                console.error('Failed to load product:', error);
            } finally {
                setLoading(false);
            }
        }
        loadProduct();
    }, [params.id]);

    if (loading) {
        return (
            <div className="bg-white min-h-screen pt-32 pb-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="animate-pulse">
                        <div className="h-96 bg-gray-200 rounded-4xl mb-8"></div>
                        <div className="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
                        <div className="h-4 bg-gray-200 rounded w-1/2 mb-8"></div>
                        <div className="grid grid-cols-3 gap-4">
                            <div className="h-32 bg-gray-200 rounded-2xl"></div>
                            <div className="h-32 bg-gray-200 rounded-2xl"></div>
                            <div className="h-32 bg-gray-200 rounded-2xl"></div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (!product) {
        return (
            <div className="bg-white min-h-screen pt-32 pb-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">Produk tidak ditemukan</h1>
                    <Link href="/showcase" className="text-[#2E8B57] hover:underline">
                        Kembali ke Showcase
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white min-h-screen pt-32 pb-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Back Button */}
                <Link
                    href="/showcase"
                    className="inline-flex items-center gap-2 text-gray-600 hover:text-[#2E8B57] mb-8 transition-colors"
                >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    Kembali ke Showcase
                </Link>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
                    {/* Image Section */}
                    <RevealOnScroll direction="left">
                        <div className="relative aspect-square rounded-4xl overflow-hidden shadow-2xl">
                            <img
                                src={product.imageUrl}
                                alt={product.name}
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute top-6 right-6 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-bold text-[#2E8B57] border border-green-100">
                                {product.category.replace('_', ' ')}
                            </div>
                        </div>
                    </RevealOnScroll>

                    {/* Info Section */}
                    <RevealOnScroll direction="right">
                        <div>
                            <h1 className="text-4xl sm:text-5xl font-black text-gray-900 mb-4">
                                {product.name}
                            </h1>

                            <div className="flex items-center gap-4 mb-6">
                                <div className="flex items-center gap-2 text-gray-600">
                                    <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                                    </svg>
                                    <span className="font-semibold">{product.likeCount}</span>
                                </div>
                                <div className="flex items-center gap-2 text-gray-600">
                                    <svg className="w-5 h-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                    </svg>
                                    <span className="font-semibold">{product.viewCount}</span>
                                </div>
                            </div>

                            <div className="text-3xl font-bold text-[#2E8B57] mb-8">
                                Rp {product.estimatedPrice.toLocaleString()}
                            </div>

                            {/* Impact Metrics */}
                            <div className="grid grid-cols-2 gap-4 mb-8">
                                <div className="bg-linear-to-br from-green-50 to-emerald-50 p-6 rounded-2xl border border-green-100">
                                    <div className="text-3xl font-black text-[#2E8B57] mb-2">
                                        {product.wasteSaved} kg
                                    </div>
                                    <div className="text-sm text-gray-600">Sampah Terselamatkan</div>
                                </div>
                                <div className="bg-linear-to-br from-blue-50 to-cyan-50 p-6 rounded-2xl border border-blue-100">
                                    <div className="text-3xl font-black text-blue-600 mb-2">
                                        {product.co2Reduced} kg
                                    </div>
                                    <div className="text-sm text-gray-600">CO2 Berkurang</div>
                                </div>
                            </div>

                            {/* Materials */}
                            <div className="mb-8">
                                <h3 className="text-lg font-bold text-gray-900 mb-3">Bahan yang Digunakan</h3>
                                <p className="text-gray-600 leading-relaxed bg-gray-50 p-4 rounded-xl">
                                    {product.materials}
                                </p>
                            </div>
                        </div>
                    </RevealOnScroll>
                </div>

                {/* Story Section */}
                <RevealOnScroll direction="up">
                    <div className="bg-linear-to-br from-gray-50 to-green-50 rounded-4xl p-8 sm:p-12 mb-16">
                        <h2 className="text-3xl font-bold text-gray-900 mb-6">Cerita di Balik Karya</h2>
                        <p className="text-lg text-gray-700 leading-relaxed mb-8">
                            {product.story}
                        </p>
                        {product.description && (
                            <p className="text-gray-600 leading-relaxed">
                                {product.description}
                            </p>
                        )}
                    </div>
                </RevealOnScroll>

                {/* Maker & Studio Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
                    {/* Maker Card */}
                    <RevealOnScroll direction="left">
                        <div className="bg-white rounded-4xl p-8 border-2 border-gray-100 hover:border-green-200 transition-colors">
                            <h3 className="text-xl font-bold text-gray-900 mb-4">Dibuat Oleh</h3>
                            <div className="flex items-start gap-4">
                                <div className="w-16 h-16 rounded-full bg-linear-to-br from-[#2E8B57] to-[#4ADE80] flex items-center justify-center text-white text-2xl font-bold shrink-0">
                                    {product.maker.name.charAt(0)}
                                </div>
                                <div>
                                    <h4 className="text-lg font-bold text-gray-900 mb-2">{product.maker.name}</h4>
                                    <p className="text-gray-600 text-sm leading-relaxed">
                                        {product.maker.story}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </RevealOnScroll>

                    {/* Studio Card */}
                    <RevealOnScroll direction="right">
                        <div className="bg-white rounded-4xl p-8 border-2 border-gray-100 hover:border-purple-200 transition-colors">
                            <h3 className="text-xl font-bold text-gray-900 mb-4">Studio</h3>
                            <div className="flex items-start gap-4">
                                <div className="w-16 h-16 rounded-full bg-linear-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white text-2xl font-bold shrink-0">
                                    {product.studio.name.charAt(0)}
                                </div>
                                <div>
                                    <h4 className="text-lg font-bold text-gray-900 mb-2">{product.studio.name}</h4>
                                    <div className="flex items-center gap-2 text-gray-600 text-sm">
                                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                        {product.studio.location}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </RevealOnScroll>
                </div>

                {/* CTA Section */}
                <RevealOnScroll direction="up">
                    <div className="bg-linear-to-br from-[#2E8B57] to-[#4ADE80] rounded-4xl p-12 text-center">
                        <h2 className="text-3xl font-bold text-white mb-4">
                            Tertarik Membuat Karya Serupa?
                        </h2>
                        <p className="text-green-50 mb-8 max-w-2xl mx-auto">
                            Pelajari cara membuat produk daur ulang dengan tutorial DIY kami yang mudah diikuti
                        </p>
                        <Link
                            href="/edukasi/diy"
                            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-[#2E8B57] rounded-full font-bold hover:bg-gray-50 transition-all duration-300 shadow-xl"
                        >
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                            </svg>
                            Lihat Tutorial DIY
                        </Link>
                    </div>
                </RevealOnScroll>
            </div>
        </div>
    );
}
