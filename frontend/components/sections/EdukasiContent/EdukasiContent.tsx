"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import {
    IconTools,
    IconRecycle,
    IconClock,
    IconArrowRight,
    IconLeaf,
    IconChartBar,
} from "@tabler/icons-react";

// Mock Data - DIY Projects
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

// Mock Data - Journey Simulator Preview
const journeyData = [
    {
        id: 1,
        title: "Pilah Sampah: Mudah Kok!",
        description: "Lihat perbedaan dampak antara membuang sampah sembarangan vs mendaur ulang.",
        icon: <IconRecycle size={32} className="text-white" />,
        color: "bg-green-500",
        image: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=800&q=80"
    },
    {
        id: 2,
        title: "Dampak Positif Daur Ulang",
        description: "Setiap pilihan kecilmu menciptakan perubahan besar untuk lingkungan.",
        icon: <IconLeaf size={32} className="text-white" />,
        color: "bg-emerald-500",
        image: "https://images.unsplash.com/photo-1611284446314-60a58ac0deb9?w=800&q=80"
    },
    {
        id: 3,
        title: "Simulasi Interaktif",
        description: "Pilih jenis sampah dan lihat perjalanannya dari rumah hingga daur ulang.",
        icon: <IconChartBar size={32} className="text-white" />,
        color: "bg-teal-500",
        image: "https://images.unsplash.com/photo-1595278069441-2cf29f8005a4?w=800&q=80"
    },
];

const tabs = [
    { id: "diy", label: "Tutorial DIY", icon: <IconTools size={18} /> },
    { id: "journey", label: "Waste Journey Simulator", icon: <IconRecycle size={18} /> },
];

export function EdukasiContent() {
    const [activeTab, setActiveTab] = useState("diy");

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
                                            className={`group relative overflow-hidden rounded-4xl ${index === 0 ? 'md:col-span-2 md:row-span-2 h-[500px]' : 'h-60'}`}
                                        >
                                            <Image
                                                src={diy.image}
                                                alt={diy.title}
                                                fill
                                                sizes={index === 0 ? "(max-width: 768px) 100vw, 66vw" : "(max-width: 768px) 100vw, 33vw"}
                                                className="absolute inset-0 object-cover transition-transform duration-700 group-hover:scale-105"
                                            />
                                            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-300"></div>
                                            <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent"></div>

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
                                                    <div className="bg-orange-500/90 w-10 h-10 rounded-full flex items-center justify-center text-white shadow-lg backdrop-blur-sm">
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
                                                    <p className="text-gray-200 text-lg line-clamp-2 max-w-lg mb-2">Panduan step-by-step membuat produk bernilai dari sampah.</p>
                                                )}
                                                <span className="text-orange-300 text-xs font-bold uppercase tracking-wider">{diy.category}</span>
                                            </div>
                                        </div>
                                    ))}
                                    {/* See More Button */}
                                    <div className="md:col-span-3 flex justify-center mt-8">
                                        <a href="/edukasi/diy" className="px-8 py-4 bg-orange-500 text-white rounded-full font-bold hover:bg-orange-600 transition-all shadow-lg hover:shadow-xl flex items-center gap-2">
                                            <IconTools size={20} />
                                            Lihat Semua Tutorial
                                            <IconArrowRight size={20} />
                                        </a>
                                    </div>
                                </motion.div>
                            )}

                            {activeTab === "journey" && (
                                <motion.div
                                    key="journey"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    transition={{ duration: 0.4 }}
                                    className="grid grid-cols-1 md:grid-cols-3 gap-6"
                                >
                                    {journeyData.map((journey, index) => (
                                        <div
                                            key={journey.id}
                                            className={`group relative overflow-hidden rounded-4xl ${index === 0 ? 'md:col-span-2 md:row-span-2 h-[500px]' : 'h-60'}`}
                                        >
                                            <Image
                                                src={journey.image}
                                                alt={journey.title}
                                                fill
                                                sizes={index === 0 ? "(max-width: 768px) 100vw, 66vw" : "(max-width: 768px) 100vw, 33vw"}
                                                className="absolute inset-0 object-cover transition-transform duration-700 group-hover:scale-105"
                                            />
                                            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-300"></div>
                                            <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent"></div>

                                            <div className="absolute bottom-0 left-0 p-8 w-full">
                                                <div className="flex items-start justify-between mb-4">
                                                    <div className={`${journey.color} w-10 h-10 rounded-full flex items-center justify-center text-white shadow-lg backdrop-blur-sm bg-opacity-90`}>
                                                        {journey.icon}
                                                    </div>
                                                    <button className="bg-white/20 backdrop-blur-md p-2 rounded-full text-white opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white hover:text-black">
                                                        <IconArrowRight size={20} />
                                                    </button>
                                                </div>
                                                <h3 className={`font-bold text-white mb-2 leading-tight ${index === 0 ? 'text-3xl md:text-4xl' : 'text-xl'}`}>
                                                    {journey.title}
                                                </h3>
                                                {index === 0 && (
                                                    <p className="text-gray-200 text-lg line-clamp-2 max-w-lg">{journey.description}</p>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                    {/* See More Button */}
                                    <div className="md:col-span-3 flex justify-center mt-8">
                                        <a href="/journey" className="px-8 py-4 bg-[#2E8B57] text-white rounded-full font-bold hover:bg-[#246e45] transition-all shadow-lg hover:shadow-xl flex items-center gap-2">
                                            <IconRecycle size={20} />
                                            Mulai Simulasi
                                            <IconArrowRight size={20} />
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
