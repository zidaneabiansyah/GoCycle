"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import RevealOnScroll from "@/components/animations/RevealOnScroll/RevealOnScroll";
import { getEcoMakers, type EcoMaker } from "@/lib/showcase-api";
import { MapPin, Package, Recycle, Phone } from "lucide-react";

export default function MakersPage() {
    const [makers, setMakers] = useState<EcoMaker[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchMakers() {
            try {
                const data = await getEcoMakers();
                setMakers(data);
            } catch (error) {
                console.error('Failed to fetch makers:', error);
            } finally {
                setLoading(false);
            }
        }
        fetchMakers();
    }, []);

    if (loading) {
        return (
            <div className="bg-white min-h-screen pt-32 pb-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="animate-pulse space-y-8">
                        <div className="h-12 bg-gray-200 rounded-full w-64 mx-auto"></div>
                        <div className="h-8 bg-gray-200 rounded w-96 mx-auto"></div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
                            {[1, 2, 3, 4, 5, 6].map((i) => (
                                <div key={i} className="h-96 bg-gray-200 rounded-4xl"></div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white min-h-screen pt-32 pb-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <RevealOnScroll direction="up" className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-50 text-[#2E8B57] text-sm font-bold tracking-wide uppercase mb-4 border border-green-100">
                        <span className="w-2 h-2 rounded-full bg-[#2E8B57] animate-pulse"></span>
                        Eco Makers
                    </div>
                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-gray-900 mb-6 tracking-tight">
                        Para{" "}
                        <span className="text-transparent bg-clip-text bg-linear-to-r from-[#2E8B57] to-[#4ADE80]">
                            Pengrajin Hijau
                        </span>
                    </h1>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
                        Kenali para pengrajin lokal yang mengubah sampah menjadi karya seni dan produk bernilai. Mereka adalah pahlawan lingkungan kita.
                    </p>
                </RevealOnScroll>

                {/* Makers Grid */}
                {makers.length === 0 ? (
                    <div className="text-center py-20">
                        <div className="text-6xl mb-4">🌱</div>
                        <p className="text-gray-600 text-lg">Belum ada eco maker terdaftar</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {makers.map((maker, index) => (
                            <RevealOnScroll key={maker.id} direction="up" delay={index * 0.1}>
                                <Link href={`/impakers/${maker.id}`}>
                                    <div className="group bg-white rounded-[2.5rem] border-2 border-gray-200 hover:border-[#2E8B57] transition-all duration-300 overflow-hidden hover:shadow-xl hover:shadow-green-500/10 h-full flex flex-col">
                                        {/* Avatar Section */}
                                        <div className="relative h-64 bg-linear-to-br from-green-50 to-emerald-50 flex items-center justify-center overflow-hidden">
                                            {maker.avatarUrl ? (
                                                <Image
                                                    src={maker.avatarUrl}
                                                    alt={maker.name}
                                                    fill
                                                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                                                />
                                            ) : (
                                                <div className="w-32 h-32 rounded-full bg-[#2E8B57] flex items-center justify-center text-white text-5xl font-bold">
                                                    {maker.name.charAt(0)}
                                                </div>
                                            )}
                                        </div>

                                        {/* Content */}
                                        <div className="p-8 flex-1 flex flex-col">
                                            <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-[#2E8B57] transition-colors">
                                                {maker.name}
                                            </h3>

                                            <div className="flex items-center gap-2 text-gray-600 mb-4">
                                                <MapPin size={16} className="text-[#2E8B57]" />
                                                <span className="text-sm">{maker.location}</span>
                                            </div>

                                            <p className="text-gray-600 text-sm leading-relaxed mb-6 line-clamp-3 flex-1">
                                                {maker.story}
                                            </p>

                                            {/* Stats */}
                                            <div className="grid grid-cols-2 gap-4 pt-6 border-t border-gray-100">
                                                <div className="text-center">
                                                    <div className="flex items-center justify-center gap-1 text-[#2E8B57] mb-1">
                                                        <Package size={18} />
                                                    </div>
                                                    <div className="text-2xl font-bold text-gray-900">
                                                        {maker.productsCreated}
                                                    </div>
                                                    <div className="text-xs text-gray-500 uppercase tracking-wide">
                                                        Produk
                                                    </div>
                                                </div>
                                                <div className="text-center">
                                                    <div className="flex items-center justify-center gap-1 text-[#2E8B57] mb-1">
                                                        <Recycle size={18} />
                                                    </div>
                                                    <div className="text-2xl font-bold text-gray-900">
                                                        {maker.wasteRecycled}
                                                    </div>
                                                    <div className="text-xs text-gray-500 uppercase tracking-wide">
                                                        kg Sampah
                                                    </div>
                                                </div>
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
