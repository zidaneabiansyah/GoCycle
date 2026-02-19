"use client";

import { motion } from "motion/react";
import { IconArrowLeft, IconBulb, IconLeaf, IconRecycle, IconArrowRight, IconBolt } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { PlaceholdersAndVanishInput } from "@/components/ui/placeholder/placeholders-and-vanish-input";

const tipsData = [
    {
        id: 1,
        title: "5 Cara Mulai Zero Waste",
        category: "Lifestyle",
        date: "20 NOV 2024",
        image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&q=80",
        description: "Langkah mudah memulai hidup minim sampah dari rumah.",
        featured: true
    },
    {
        id: 2,
        title: "Pilah Sampah: Mudah Kok!",
        category: "Guide",
        date: "18 NOV 2024",
        image: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=800&q=80",
        description: "Panduan warna tong sampah yang benar."
    },
    {
        id: 3,
        title: "Kompos: Sampah Jadi Harta",
        category: "Gardening",
        date: "15 NOV 2024",
        image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800&q=80",
        description: "Bikin pupuk sendiri di halaman rumah."
    },
    {
        id: 4,
        title: "Hemat Energi di Rumah",
        category: "Energy",
        date: "12 NOV 2024",
        image: "https://images.unsplash.com/photo-1510563800743-aed236490d08?w=800&q=80",
        description: "Listrik hemat, dompet selamat."
    },
    {
        id: 5,
        title: "Belanja Tanpa Plastik",
        category: "Shopping",
        date: "08 NOV 2024",
        image: "https://images.unsplash.com/photo-1550989460-0adf9ea622e2?w=800&q=80",
        description: "Trik belanja pasar bebas kresek."
    },
    {
        id: 6,
        title: "Fashion Berkelanjutan",
        category: "Fashion",
        date: "01 NOV 2024",
        image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&q=80",
        description: "Tampil keren tanpa merusak alam."
    }
];

export default function TipsPage() {
    const router = useRouter();

    return (
        <div className="min-h-screen bg-[#FDFBF7] pb-20 font-sans">
            {/* Editorial Header */}
            <div className="pt-28 pb-12 px-6 lg:px-12 border-b border-gray-200 bg-white">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-6">
                        <div>
                            <button
                                onClick={() => router.back()}
                                className="mb-8 flex items-center gap-2 text-gray-400 hover:text-emerald-600 transition-colors group text-xs font-bold uppercase tracking-widest"
                            >
                                <IconArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                                Education Hub
                            </button>
                            <h1 className="text-6xl md:text-8xl font-black text-gray-900 tracking-tighter leading-none mb-2">
                                SMART <span className="text-emerald-600">LIVING</span><br /> GUIDE.
                            </h1>
                            <p className="text-gray-500 font-medium text-lg">Practical hacks for a sustainable lifestyle.</p>
                        </div>
                        <div className="text-right hidden md:block">
                            <p className="text-gray-900 font-bold text-xl">Issue #{new Date().getMonth() + 1}</p>
                            <p className="text-emerald-600 text-sm font-bold uppercase tracking-wider">Weekly Edition</p>
                        </div>
                    </div>

                    {/* Featured Tip (Hero) */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        onClick={() => router.push(`/edukasi/tips/${tipsData[0].id}`)}
                        className="relative h-[500px] w-full rounded-[2rem] overflow-hidden group cursor-pointer border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-500"
                    >
                        <img src={tipsData[0].image} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" alt="Featured" />
                        <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/90 via-transparent to-transparent"></div>
                        <div className="absolute bottom-0 left-0 p-8 md:p-12 max-w-4xl">
                            <div className="flex items-center gap-3 mb-4">
                                <span className="bg-emerald-500 text-white px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider inline-block">
                                    Editor's Pick
                                </span>
                                <span className="text-emerald-100 font-bold uppercase tracking-widest text-xs">
                                    {tipsData[0].category}
                                </span>
                            </div>
                            <h2 className="text-3xl md:text-5xl font-black text-white mb-4 leading-tight group-hover:underline decoration-emerald-400 decoration-4 underline-offset-8 transition-all">
                                {tipsData[0].title}
                            </h2>
                            <p className="text-emerald-50 text-lg md:text-xl line-clamp-2 max-w-2xl font-light">
                                {tipsData[0].description}
                            </p>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Search & Sort Section */}
            <div className="max-w-4xl mx-auto px-6 lg:px-12 mt-12 mb-8">
                <PlaceholdersAndVanishInput
                    placeholders={["Find zero waste tips...", "How to compost...", "Recycling guides...", "Energy saving hacks..."]}
                    onChange={(e) => console.log(e.target.value)}
                    onSubmit={(e) => e.preventDefault()}
                />
                <div className="flex flex-wrap items-center justify-center gap-2 mt-6">
                    {["All", "Lifestyle", "Guide", "Gardening", "Energy", "Shopping", "Fashion"].map((cat) => (
                        <button key={cat} className="px-4 py-1.5 rounded-full border border-gray-200 text-gray-500 text-xs font-bold uppercase tracking-wide hover:bg-emerald-600 hover:text-white hover:border-emerald-600 transition-all">
                            {cat}
                        </button>
                    ))}
                </div>
            </div>

            {/* Tips Grid */}
            <div className="max-w-7xl mx-auto px-6 lg:px-12 mt-16">
                <div className="flex items-center gap-3 mb-10 border-b border-gray-200 pb-4">
                    <IconBulb className="text-emerald-600" />
                    <h3 className="text-xl font-bold text-gray-900 uppercase tracking-wider">Essential Tips</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
                    {tipsData.slice(1).map((tip, index) => (
                        <motion.div
                            key={tip.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            onClick={() => router.push(`/edukasi/tips/${tip.id}`)}
                            className="group cursor-pointer flex flex-col h-full"
                        >
                            <div className="relative h-60 rounded-2xl overflow-hidden mb-6">
                                <img src={tip.image} alt={tip.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                                <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-3 py-1 rounded-md text-[10px] font-bold uppercase tracking-wide text-gray-900">
                                    {tip.category}
                                </div>
                            </div>

                            <div className="flex-1 flex flex-col">
                                <div className="flex items-center gap-2 text-xs font-bold text-emerald-600 uppercase tracking-wider mb-2">
                                    TIPS • {tip.date}
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-3 leading-snug group-hover:text-emerald-600 transition-colors">
                                    {tip.title}
                                </h3>
                                <p className="text-gray-500 text-sm leading-relaxed line-clamp-2 mb-4">
                                    {tip.description}
                                </p>
                                <div className="mt-auto flex items-center justify-between border-t border-gray-100 pt-4">
                                    <span className="text-xs font-bold text-gray-400">3 Min Read</span>
                                    <div className="p-2 rounded-full hover:bg-gray-100 transition-colors text-gray-400 hover:text-emerald-600">
                                        <IconArrowRight size={18} />
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}
