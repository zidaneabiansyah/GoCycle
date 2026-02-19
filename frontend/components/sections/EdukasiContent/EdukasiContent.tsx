"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import {
    IconBulb,
    IconTools,
    IconNews,
    IconClock,
    IconChartBar,
    IconArrowRight,
    IconLeaf,
    IconHeart,
    IconShare,
    IconRecycle,
    IconPlant
} from "@tabler/icons-react";

// Mock Data
const tipsData = [
    {
        id: 1,
        title: "5 Cara Mulai Zero Waste",
        description: "Langkah praktis menerapkan gaya hidup minim sampah dari rumah. Mulai dari belanja hingga makan.",
        icon: <IconLeaf size={32} className="text-white" />,
        color: "bg-emerald-500",
        image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&q=80"
    },
    {
        id: 2,
        title: "Pilah Sampah: Mudah Kok!",
        description: "Panduan warna-warni memisahkan sampah organik, plastik, kertas, dan B3 di rumah.",
        icon: <IconRecycle size={32} className="text-white" />,
        color: "bg-blue-500",
        image: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=800&q=80"
    },
    {
        id: 3,
        title: "Kompos: Sampah Jadi Harta",
        description: "Tutorial bikin kompos sendiri dari sisa makanan. Tanaman kamu bakal seneng!",
        icon: <IconPlant size={32} className="text-white" />,
        color: "bg-orange-500",
        image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800&q=80"
    },
];

const diyData = [
    {
        id: 1,
        title: "Vertical Garden dari Botol Bekas",
        image: "https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?w=800&q=80",
        difficulty: "Mudah",
        time: "1 Jam",
        category: "Gardening"
    },
    {
        id: 2,
        title: "Organizer Meja Kaleng Susu",
        image: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=800&q=80",
        difficulty: "Mudah",
        time: "30 Menit",
        category: "Home Decor"
    },
    {
        id: 3,
        title: "Tas Kece dari Jeans Lama",
        image: "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=800&q=80",
        difficulty: "Sedang",
        time: "2 Jam",
        category: "Fashion"
    },
];

const newsData = [
    {
        id: 1,
        title: "Gen Z Driving Indonesia's Waste Revolution",
        date: "28 Nov 2024",
        source: "EcoTrend",
        image: "https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?w=800&q=80",
        excerpt: "Generasi muda Indonesia memimpin gerakan daur ulang digital dan bank sampah komunitas."
    },
    {
        id: 2,
        title: "Plastik Jadi Bahan Bakar: Terobosan Baru ITS",
        date: "22 Nov 2024",
        source: "Tech Green",
        image: "https://images.unsplash.com/photo-1581093588401-fbb62a02f120?w=800&q=80",
        excerpt: "Mahasiswa ITS berhasil ubah sampah plastik menjadi bahan bakar alternatif ramah lingkungan."
    },
    {
        id: 3,
        title: "Bali Wajibkan Sedotan Bambu di Semua Resto",
        date: "15 Nov 2024",
        source: "Eco Policy",
        image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&q=80",
        excerpt: "Pemerintah Bali terapkan regulasi baru melarang sedotan plastik di seluruh tempat makan."
    }
];

const tabs = [
    { id: "tips", label: "Tips & Trik", icon: <IconBulb size={18} /> },
    { id: "diy", label: "DIY Projects", icon: <IconTools size={18} /> },
    { id: "news", label: "Berita Terkini", icon: <IconNews size={18} /> },
];

export function EdukasiContent() {
    const [activeTab, setActiveTab] = useState("tips");

    return (
        <div className="relative z-20 -mt-20 min-h-screen">
            <div className="bg-white rounded-t-[60px] shadow-[0_-20px_50px_rgba(0,0,0,0.05)] pt-20 pb-20 min-h-screen">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                    {/* Modern Minimalist Tabs */}
                    <div className="flex justify-center mb-16">
                        <div className="bg-gray-100/50 p-1.5 rounded-full inline-flex gap-1 backdrop-blur-sm">
                            {tabs.map((tab) => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 relative ${activeTab === tab.id
                                        ? "text-white shadow-lg shadow-emerald-500/30"
                                        : "text-gray-500 hover:text-gray-900"
                                        }`}
                                >
                                    {activeTab === tab.id && (
                                        <motion.div
                                            layoutId="activeTab"
                                            className="absolute inset-0 bg-[#2E8B57] rounded-full"
                                            transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                        />
                                    )}
                                    <span className="relative z-10 flex items-center gap-2">
                                        {tab.icon}
                                        {tab.label}
                                    </span>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Content Grid */}
                    <div className="min-h-[400px]">
                        <AnimatePresence mode="wait">
                            {activeTab === "tips" && (
                                <motion.div
                                    key="tips"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    transition={{ duration: 0.4 }}
                                    className="grid grid-cols-1 md:grid-cols-3 gap-6"
                                >
                                    {tipsData.map((tip, index) => (
                                        <div
                                            key={tip.id}
                                            className={`group relative overflow-hidden rounded-[32px] ${index === 0 ? 'md:col-span-2 md:row-span-2 h-[500px]' : 'h-[240px]'}`}
                                        >
                                            <Image
                                                src={tip.image}
                                                alt={tip.title}
                                                fill
                                                sizes={index === 0 ? "(max-width: 768px) 100vw, 66vw" : "(max-width: 768px) 100vw, 33vw"}
                                                className="absolute inset-0 object-cover transition-transform duration-700 group-hover:scale-105"
                                            />
                                            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-300"></div>
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>

                                            <div className="absolute bottom-0 left-0 p-8 w-full">
                                                <div className="flex items-start justify-between mb-4">
                                                    <div className={`${tip.color} w-10 h-10 rounded-full flex items-center justify-center text-white shadow-lg backdrop-blur-sm bg-opacity-90`}>
                                                        {tip.icon}
                                                    </div>
                                                    <button className="bg-white/20 backdrop-blur-md p-2 rounded-full text-white opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white hover:text-black">
                                                        <IconArrowRight size={20} />
                                                    </button>
                                                </div>
                                                <h3 className={`font-bold text-white mb-2 leading-tight ${index === 0 ? 'text-3xl md:text-4xl' : 'text-xl'}`}>
                                                    {tip.title}
                                                </h3>
                                                {index === 0 && (
                                                    <p className="text-gray-200 text-lg line-clamp-2 max-w-lg">{tip.description}</p>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                    {/* See More Button */}
                                    <div className="md:col-span-3 flex justify-center mt-8">
                                        <a href="/edukasi/tips" className="px-8 py-3 bg-emerald-600 text-white rounded-full font-bold hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-200 hover:shadow-emerald-300 flex items-center gap-2">
                                            Lihat Semua Tips <IconArrowRight size={20} />
                                        </a>
                                    </div>
                                </motion.div>
                            )}

                            {activeTab === "diy" && (
                                <motion.div
                                    key="diy"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    transition={{ duration: 0.4 }}
                                    className="grid grid-cols-1 md:grid-cols-3 gap-6"
                                >
                                    {diyData.map((diy, index) => (
                                        <div
                                            key={diy.id}
                                            className={`group relative overflow-hidden rounded-[32px] ${index === 0 ? 'md:col-span-2 md:row-span-2 h-[500px]' : 'h-[240px]'}`}
                                        >
                                            <Image
                                                src={diy.image}
                                                alt={diy.title}
                                                fill
                                                sizes={index === 0 ? "(max-width: 768px) 100vw, 66vw" : "(max-width: 768px) 100vw, 33vw"}
                                                className="absolute inset-0 object-cover transition-transform duration-700 group-hover:scale-105"
                                            />
                                            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-300"></div>
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>

                                            <div className="absolute top-6 left-6 flex gap-2">
                                                <span className="bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-white border border-white/20">
                                                    {diy.difficulty}
                                                </span>
                                                <span className="bg-black/30 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-white border border-white/10 flex items-center gap-1">
                                                    <IconClock size={12} /> {diy.time}
                                                </span>
                                            </div>

                                            <div className="absolute bottom-0 left-0 p-8 w-full">
                                                <div className="flex items-start justify-between mb-4">
                                                    <div className="bg-emerald-500/90 w-10 h-10 rounded-full flex items-center justify-center text-white shadow-lg backdrop-blur-sm">
                                                        <IconTools size={20} />
                                                    </div>
                                                    <button className="bg-white/20 backdrop-blur-md p-2 rounded-full text-white opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white hover:text-black">
                                                        <IconArrowRight size={20} />
                                                    </button>
                                                </div>
                                                <h3 className={`font-bold text-white mb-2 leading-tight ${index === 0 ? 'text-3xl md:text-4xl' : 'text-xl'}`}>
                                                    {diy.title}
                                                </h3>
                                                {index === 0 && (
                                                    <p className="text-gray-200 text-lg line-clamp-2 max-w-lg mb-2">Project DIY seru untuk rumah yang lebih asri.</p>
                                                )}
                                                <span className="text-emerald-300 text-xs font-bold uppercase tracking-wider">{diy.category}</span>
                                            </div>
                                        </div>
                                    ))}
                                    {/* See More Button */}
                                    <div className="md:col-span-3 flex justify-center mt-8">
                                        <a href="/edukasi/diy" className="px-8 py-3 bg-white border border-gray-200 text-gray-900 rounded-full font-bold hover:bg-gray-50 transition-all shadow-sm flex items-center gap-2">
                                            Lihat Semua DIY <IconArrowRight size={20} />
                                        </a>
                                    </div>
                                </motion.div>
                            )}

                            {activeTab === "news" && (
                                <motion.div
                                    key="news"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    transition={{ duration: 0.4 }}
                                    className="grid grid-cols-1 md:grid-cols-3 gap-6"
                                >
                                    {newsData.map((news, index) => (
                                        <div
                                            key={news.id}
                                            className={`group relative overflow-hidden rounded-[32px] ${index === 0 ? 'md:col-span-2 md:row-span-2 h-[500px]' : 'h-[240px]'}`}
                                        >
                                            <Image
                                                src={news.image}
                                                alt={news.title}
                                                fill
                                                sizes={index === 0 ? "(max-width: 768px) 100vw, 66vw" : "(max-width: 768px) 100vw, 33vw"}
                                                className="absolute inset-0 object-cover transition-transform duration-700 group-hover:scale-105"
                                            />
                                            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-300"></div>
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>

                                            <div className="absolute top-6 left-6">
                                                <span className="bg-emerald-600/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-white shadow-lg">
                                                    {news.source}
                                                </span>
                                            </div>

                                            <div className="absolute bottom-0 left-0 p-8 w-full">
                                                <div className="flex items-start justify-between mb-4">
                                                    <div className="bg-white/20 w-10 h-10 rounded-full flex items-center justify-center text-white shadow-lg backdrop-blur-sm border border-white/10">
                                                        <IconNews size={20} />
                                                    </div>
                                                    <button className="bg-white/20 backdrop-blur-md p-2 rounded-full text-white opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white hover:text-black">
                                                        <IconArrowRight size={20} />
                                                    </button>
                                                </div>
                                                <h3 className={`font-bold text-white mb-2 leading-tight ${index === 0 ? 'text-3xl md:text-4xl' : 'text-xl'}`}>
                                                    {news.title}
                                                </h3>
                                                {index === 0 && (
                                                    <p className="text-gray-200 text-lg line-clamp-2 max-w-lg mb-2">{news.excerpt}</p>
                                                )}
                                                <span className="text-gray-300 text-xs font-medium uppercase tracking-wider">{news.date}</span>
                                            </div>
                                        </div>
                                    ))}
                                    {/* See More Button */}
                                    <div className="md:col-span-3 flex justify-center mt-8">
                                        <a href="/edukasi/berita" className="px-8 py-3 bg-white border border-gray-200 text-gray-900 rounded-full font-bold hover:bg-gray-50 transition-all shadow-sm flex items-center gap-2">
                                            Berita Lainnya <IconArrowRight size={20} />
                                        </a>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </div>
    );
}
