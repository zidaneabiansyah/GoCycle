"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import RevealOnScroll from "@/components/animations/RevealOnScroll/RevealOnScroll";
import { motion } from "framer-motion";
import { getImpactStats, getEcoMakers, type ImpactStats, type EcoMaker } from "@/lib/showcase-api";
import { TrendingUp, Users, Recycle, Leaf, Package, BookOpen, MapPin } from "lucide-react";

export default function ImpakersPage() {
    const [stats, setStats] = useState<ImpactStats | null>(null);
    const [makers, setMakers] = useState<EcoMaker[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            try {
                const [statsData, makersData] = await Promise.all([
                    getImpactStats(),
                    getEcoMakers()
                ]);
                setStats(statsData);
                setMakers(makersData);
            } catch (error) {
                console.error('Failed to fetch data:', error);
            } finally {
                setLoading(false);
            }
        }
        fetchData();
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
                                <div key={i} className="h-48 bg-gray-200 rounded-4xl"></div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (!stats) {
        return (
            <div className="bg-white min-h-screen pt-32 pb-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <p className="text-gray-600">Failed to load data</p>
                </div>
            </div>
        );
    }

    const mainMetrics = [
        {
            icon: Recycle,
            label: "Total Sampah Didaur Ulang",
            value: `${stats.totalWasteRecycled.toLocaleString('id-ID')} kg`,
            color: "green",
            bgColor: "bg-green-50",
            iconColor: "text-green-600",
            borderColor: "border-green-200"
        },
        {
            icon: Package,
            label: "Produk Eco-Friendly",
            value: stats.totalProducts.toLocaleString('id-ID'),
            color: "blue",
            bgColor: "bg-blue-50",
            iconColor: "text-blue-600",
            borderColor: "border-blue-200"
        },
        {
            icon: BookOpen,
            label: "Tutorial DIY Selesai",
            value: stats.totalDIYCreated.toLocaleString('id-ID'),
            color: "orange",
            bgColor: "bg-orange-50",
            iconColor: "text-orange-600",
            borderColor: "border-orange-200"
        },
        {
            icon: Leaf,
            label: "CO2 Berkurang",
            value: `${stats.totalCO2Reduced.toLocaleString('id-ID')} kg`,
            color: "emerald",
            bgColor: "bg-emerald-50",
            iconColor: "text-emerald-600",
            borderColor: "border-emerald-200"
        },
        {
            icon: Users,
            label: "Anggota Komunitas",
            value: stats.communityMembers.toLocaleString('id-ID'),
            color: "purple",
            bgColor: "bg-purple-50",
            iconColor: "text-purple-600",
            borderColor: "border-purple-200"
        },
        {
            icon: TrendingUp,
            label: "Botol Terselamatkan",
            value: stats.totalBottlesSaved.toLocaleString('id-ID'),
            color: "cyan",
            bgColor: "bg-cyan-50",
            iconColor: "text-cyan-600",
            borderColor: "border-cyan-200"
        },
    ];

    const wasteBreakdown = [
        { type: "Plastik", value: stats.wasteByType.plastic, color: "bg-blue-500" },
        { type: "Kaca", value: stats.wasteByType.glass, color: "bg-cyan-500" },
        { type: "Logam", value: stats.wasteByType.metal, color: "bg-gray-500" },
        { type: "Tekstil", value: stats.wasteByType.textile, color: "bg-purple-500" },
        { type: "Kardus", value: stats.wasteByType.cardboard, color: "bg-amber-500" },
    ];

    const maxWaste = Math.max(...wasteBreakdown.map(w => w.value));

    return (
        <div className="bg-white min-h-screen pt-32 pb-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <RevealOnScroll direction="up" className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-50 text-[#2E8B57] text-sm font-bold tracking-wide uppercase mb-4 border border-green-100">
                        <span className="w-2 h-2 rounded-full bg-[#2E8B57] animate-pulse"></span>
                        Impact & Makers
                    </div>
                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-gray-900 mb-6 tracking-tight">
                        Dampak{" "}
                        <span className="text-transparent bg-clip-text bg-linear-to-r from-[#2E8B57] to-[#4ADE80]">
                            Kolektif Kita
                        </span>
                    </h1>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
                        Setiap aksi kecil menciptakan perubahan besar. Lihat dampak nyata dari gerakan daur ulang kita bersama.
                    </p>
                </RevealOnScroll>

                {/* Main Metrics Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
                    {mainMetrics.map((metric, index) => {
                        const Icon = metric.icon;
                        return (
                            <RevealOnScroll key={metric.label} direction="up" delay={index * 0.1}>
                                <motion.div
                                    whileHover={{ scale: 1.02, y: -4 }}
                                    className={`${metric.bgColor} ${metric.borderColor} border-2 rounded-[2.5rem] p-8 transition-all duration-300 hover:shadow-xl`}
                                >
                                    <div className={`w-14 h-14 ${metric.bgColor} rounded-2xl flex items-center justify-center ${metric.iconColor} mb-6 ring-2 ring-white`}>
                                        <Icon size={28} strokeWidth={2.5} />
                                    </div>
                                    <div className="text-4xl font-black text-gray-900 mb-2">
                                        {metric.value}
                                    </div>
                                    <div className="text-sm font-semibold text-gray-600 uppercase tracking-wide">
                                        {metric.label}
                                    </div>
                                </motion.div>
                            </RevealOnScroll>
                        );
                    })}
                </div>

                {/* Waste Breakdown Section */}
                <RevealOnScroll direction="up">
                    <div className="bg-[#F8F9FA] rounded-[2.5rem] p-10 mb-20">
                        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
                            Distribusi Sampah Terdaur Ulang
                        </h2>
                        <div className="space-y-6">
                            {wasteBreakdown.map((waste, index) => (
                                <motion.div
                                    key={waste.type}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    className="flex items-center gap-4"
                                >
                                    <div className="w-32 text-sm font-bold text-gray-700">
                                        {waste.type}
                                    </div>
                                    <div className="flex-1 bg-gray-200 rounded-full h-8 overflow-hidden">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={{ width: `${(waste.value / maxWaste) * 100}%` }}
                                            transition={{ duration: 1, delay: index * 0.1, ease: "easeOut" }}
                                            className={`${waste.color} h-full rounded-full flex items-center justify-end pr-4`}
                                        >
                                            <span className="text-white text-sm font-bold">
                                                {waste.value.toLocaleString('id-ID')} kg
                                            </span>
                                        </motion.div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </RevealOnScroll>

                {/* Eco Makers Section */}
                <RevealOnScroll direction="up">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                            Kenali Para{" "}
                            <span className="text-transparent bg-clip-text bg-linear-to-r from-[#2E8B57] to-[#4ADE80]">
                                Penggerak
                            </span>
                        </h2>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
                            Mereka adalah wajah di balik angka-angka ini. Para pengrajin lokal yang mengubah sampah menjadi karya bernilai.
                        </p>
                    </div>
                </RevealOnScroll>

                {makers.length === 0 ? (
                    <div className="text-center py-20">
                        <div className="text-6xl mb-4">🌱</div>
                        <p className="text-gray-600 text-lg">Belum ada eco maker terdaftar</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
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

                {/* Call to Action */}
                <RevealOnScroll direction="up">
                    <div className="bg-linear-to-br from-[#1B4D3E] to-[#2E8B57] rounded-[2.5rem] p-12 text-center relative overflow-hidden">
                        <div className="relative z-10">
                            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                                Jadilah Bagian dari Perubahan
                            </h2>
                            <p className="text-green-100 text-lg mb-8 max-w-2xl mx-auto leading-relaxed">
                                Setiap produk yang kamu beli, setiap tutorial yang kamu selesaikan, berkontribusi pada statistik ini.
                            </p>
                            <div className="flex flex-wrap gap-4 justify-center">
                                <a
                                    href="/showcase"
                                    className="inline-flex items-center gap-2 px-8 py-4 bg-white text-[#2E8B57] rounded-full font-bold hover:bg-gray-50 transition-all duration-300 shadow-xl"
                                >
                                    <Package size={20} />
                                    Lihat Produk
                                </a>
                                <a
                                    href="/edukasi"
                                    className="inline-flex items-center gap-2 px-8 py-4 bg-white/10 backdrop-blur-sm text-white rounded-full font-bold hover:bg-white/20 transition-all duration-300 border-2 border-white/20"
                                >
                                    <BookOpen size={20} />
                                    Coba Tutorial
                                </a>
                            </div>
                        </div>
                        {/* Decorative Elements */}
                        <div className="absolute -top-20 -right-20 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
                        <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-[#4ADE80]/20 rounded-full blur-3xl"></div>
                    </div>
                </RevealOnScroll>

                {/* Last Updated */}
                <div className="text-center mt-12">
                    <p className="text-sm text-gray-500">
                        Terakhir diperbarui: {new Date(stats.lastUpdated).toLocaleDateString('id-ID', {
                            day: 'numeric',
                            month: 'long',
                            year: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                        })}
                    </p>
                </div>
            </div>
        </div>
    );
}
