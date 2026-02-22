"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import RevealOnScroll from "@/components/animations/RevealOnScroll/RevealOnScroll";
import { getEcoMakerById, getShowcaseProducts, type EcoMaker, type ShowcaseProduct } from "@/lib/showcase-api";
import { MapPin, Phone, Package, Recycle, ArrowLeft, ExternalLink } from "lucide-react";

export default function MakerDetailPage() {
    const params = useParams();
    const id = params.id as string;

    const [maker, setMaker] = useState<EcoMaker | null>(null);
    const [products, setProducts] = useState<ShowcaseProduct[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            try {
                const [makerData, allProducts] = await Promise.all([
                    getEcoMakerById(id),
                    getShowcaseProducts()
                ]);
                setMaker(makerData);
                
                // Filter products by this maker
                const makerProducts = allProducts.filter(p => p.maker.id === id);
                setProducts(makerProducts);
            } catch (error) {
                console.error('Failed to fetch maker:', error);
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, [id]);

    if (loading) {
        return (
            <div className="bg-white min-h-screen pt-32 pb-20">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="animate-pulse space-y-8">
                        <div className="h-96 bg-gray-200 rounded-[2.5rem]"></div>
                        <div className="h-64 bg-gray-200 rounded-[2.5rem]"></div>
                    </div>
                </div>
            </div>
        );
    }

    if (!maker) {
        return (
            <div className="bg-white min-h-screen pt-32 pb-20">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <p className="text-gray-600">Maker not found</p>
                    <Link href="/impakers" className="text-[#2E8B57] hover:underline mt-4 inline-block">
                        Back to Impakers
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white min-h-screen pt-32 pb-20">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Back Button */}
                <RevealOnScroll direction="up">
                    <Link
                        href="/impakers"
                        className="inline-flex items-center gap-2 text-gray-600 hover:text-[#2E8B57] mb-8 transition-colors"
                    >
                        <ArrowLeft size={20} />
                        <span className="font-semibold">Kembali ke Impakers</span>
                    </Link>
                </RevealOnScroll>

                {/* Hero Section */}
                <RevealOnScroll direction="up">
                    <div className="bg-linear-to-br from-green-50 to-emerald-50 rounded-[2.5rem] p-12 mb-12 border-2 border-green-100">
                        <div className="flex flex-col md:flex-row gap-8 items-center">
                            {/* Avatar */}
                            <div className="relative w-48 h-48 rounded-full overflow-hidden bg-[#2E8B57] shrink-0 ring-8 ring-white shadow-2xl">
                                {maker.avatarUrl ? (
                                    <Image
                                        src={maker.avatarUrl}
                                        alt={maker.name}
                                        fill
                                        className="object-cover"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-white text-6xl font-bold">
                                        {maker.name.charAt(0)}
                                    </div>
                                )}
                            </div>

                            {/* Info */}
                            <div className="flex-1 text-center md:text-left">
                                <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">
                                    {maker.name}
                                </h1>
                                
                                <div className="flex flex-wrap gap-4 justify-center md:justify-start mb-6">
                                    <div className="flex items-center gap-2 text-gray-700">
                                        <MapPin size={20} className="text-[#2E8B57]" />
                                        <span className="font-semibold">{maker.location}</span>
                                    </div>
                                    {maker.phone && (
                                        <div className="flex items-center gap-2 text-gray-700">
                                            <Phone size={20} className="text-[#2E8B57]" />
                                            <span className="font-semibold">{maker.phone}</span>
                                        </div>
                                    )}
                                </div>

                                {/* Stats */}
                                <div className="flex gap-6 justify-center md:justify-start">
                                    <div className="bg-white rounded-2xl px-6 py-4 shadow-sm">
                                        <div className="flex items-center gap-2 text-[#2E8B57] mb-1">
                                            <Package size={20} />
                                        </div>
                                        <div className="text-3xl font-bold text-gray-900">
                                            {maker.productsCreated}
                                        </div>
                                        <div className="text-sm text-gray-600">Produk Dibuat</div>
                                    </div>
                                    <div className="bg-white rounded-2xl px-6 py-4 shadow-sm">
                                        <div className="flex items-center gap-2 text-[#2E8B57] mb-1">
                                            <Recycle size={20} />
                                        </div>
                                        <div className="text-3xl font-bold text-gray-900">
                                            {maker.wasteRecycled} kg
                                        </div>
                                        <div className="text-sm text-gray-600">Sampah Didaur Ulang</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </RevealOnScroll>

                {/* Story Section */}
                <RevealOnScroll direction="up">
                    <div className="bg-white rounded-[2.5rem] border-2 border-gray-200 p-10 mb-12">
                        <h2 className="text-3xl font-bold text-gray-900 mb-6">Kisah Inspiratif</h2>
                        <p className="text-gray-700 text-lg leading-relaxed whitespace-pre-line">
                            {maker.story}
                        </p>
                    </div>
                </RevealOnScroll>

                {/* Products Section */}
                <RevealOnScroll direction="up">
                    <div className="mb-12">
                        <h2 className="text-3xl font-bold text-gray-900 mb-8">
                            Produk dari {maker.name}
                        </h2>
                        
                        {products.length === 0 ? (
                            <div className="text-center py-12 bg-gray-50 rounded-[2.5rem]">
                                <div className="text-5xl mb-4">📦</div>
                                <p className="text-gray-600">Belum ada produk dari maker ini</p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {products.map((product, index) => (
                                    <RevealOnScroll key={product.id} direction="up" delay={index * 0.1}>
                                        <Link href={`/showcase/${product.id}`}>
                                            <div className="group bg-white rounded-4xl border-2 border-gray-200 hover:border-[#2E8B57] transition-all duration-300 overflow-hidden hover:shadow-xl h-full flex flex-col">
                                                {/* Image */}
                                                <div className="relative h-56 bg-gray-100 overflow-hidden">
                                                    <Image
                                                        src={product.imageUrl}
                                                        alt={product.name}
                                                        fill
                                                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                                                    />
                                                </div>

                                                {/* Content */}
                                                <div className="p-6 flex-1 flex flex-col">
                                                    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-[#2E8B57] transition-colors line-clamp-2">
                                                        {product.name}
                                                    </h3>
                                                    <p className="text-gray-600 text-sm mb-4 line-clamp-2 flex-1">
                                                        {product.description || product.story}
                                                    </p>
                                                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                                                        <span className="text-sm text-gray-500">
                                                            {product.wasteSaved} kg sampah
                                                        </span>
                                                        <ExternalLink size={16} className="text-[#2E8B57] group-hover:translate-x-1 transition-transform" />
                                                    </div>
                                                </div>
                                            </div>
                                        </Link>
                                    </RevealOnScroll>
                                ))}
                            </div>
                        )}
                    </div>
                </RevealOnScroll>
            </div>
        </div>
    );
}
