"use client";

import { motion } from "motion/react";
import { IconArrowLeft, IconTools, IconClock, IconChartBar, IconArrowRight, IconHammer } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { PlaceholdersAndVanishInput } from "@/components/ui/placeholder/placeholders-and-vanish-input";
import { EducationTabs } from "@/components/feature/education/EducationTabs";

const diyData = [
    {
        id: 1,
        title: "Vertical Garden dari Botol Bekas",
        difficulty: "Easy",
        time: "1H",
        category: "Gardening",
        image: "https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?w=800&q=80",
    },
    {
        id: 2,
        title: "Organizer Meja Kaleng Susu",
        difficulty: "Easy",
        time: "30M",
        category: "Home Decor",
        image: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=800&q=80",
    },
    {
        id: 3,
        title: "Tas Kece dari Jeans Lama",
        difficulty: "Medium",
        time: "2H",
        category: "Fashion",
        image: "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=800&q=80",
    },
    {
        id: 4,
        title: "Pot Bunga dari Ban Bekas",
        difficulty: "Hard",
        time: "3H",
        category: "Outdoor",
        image: "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=800&q=80",
    },
    {
        id: 5,
        title: "Lampu Hias Kardus Bekas",
        difficulty: "Medium",
        time: "1.5H",
        category: "Decor",
        image: "https://images.unsplash.com/photo-1513506003011-3b644ab497e6?w=800&q=80",
    },
    {
        id: 6,
        title: "Rak Buku dari Peti Buah",
        difficulty: "Easy",
        time: "1H",
        category: "Furniture",
        image: "https://images.unsplash.com/photo-1594620302200-9a76bc320f77?w=800&q=80",
    }
];

export default function DiyPage() {
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
                                CRAFT <span className="text-emerald-600">&</span><br /> CREATE.
                            </h1>
                            <p className="text-gray-500 font-medium text-lg">Detailed projects for the creative soul.</p>
                        </div>
                        <div className="text-right hidden md:block">
                            <p className="text-gray-900 font-bold text-xl">Studio</p>
                            <p className="text-emerald-600 text-sm font-bold uppercase tracking-wider">Workshop Volume 1</p>
                        </div>
                    </div>

                    {/* Featured DIY (Hero) */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        onClick={() => router.push(`/edukasi/diy/${diyData[0].id}`)}
                        className="relative h-[500px] w-full rounded-[2rem] overflow-hidden group cursor-pointer border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-500"
                    >
                        <img src={diyData[0].image} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" alt="Featured" />
                        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-transparent to-transparent"></div>
                        <div className="absolute bottom-0 left-0 p-8 md:p-12 max-w-4xl">
                            <div className="flex items-center gap-3 mb-4">
                                <span className="bg-white text-gray-900 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider inline-block">
                                    Project of the Month
                                </span>
                                <span className="flex items-center gap-1 text-white/80 font-bold uppercase tracking-widest text-xs border border-white/20 px-3 py-1.5 rounded-full">
                                    <IconClock size={12} /> {diyData[0].time}
                                </span>
                            </div>
                            <h2 className="text-3xl md:text-5xl font-black text-white mb-4 leading-tight group-hover:underline decoration-emerald-400 decoration-4 underline-offset-8 transition-all">
                                {diyData[0].title}
                            </h2>
                            <p className="text-gray-300 text-lg md:text-xl font-light">
                                Turn plastic bottles into a beautiful vertical garden for your home.
                            </p>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Search & Sort Section */}
            <div className="max-w-4xl mx-auto px-6 lg:px-12 mt-12 mb-8">
                <PlaceholdersAndVanishInput
                    placeholders={["Find DIY projects...", "Upcycling ideas...", "Gardening crafts...", "Furniture repair..."]}
                    onChange={(e) => console.log(e.target.value)}
                    onSubmit={(e) => e.preventDefault()}
                />
                <div className="flex flex-wrap items-center justify-center gap-2 mt-6">
                    {["All", "Gardening", "Home Decor", "Fashion", "Outdoor", "Furniture"].map((cat) => (
                        <button key={cat} className="px-4 py-1.5 rounded-full border border-gray-200 text-gray-500 text-xs font-bold uppercase tracking-wide hover:bg-emerald-600 hover:text-white hover:border-emerald-600 transition-all">
                            {cat}
                        </button>
                    ))}
                    <div className="h-6 w-px bg-gray-300 mx-2 hidden md:block"></div>
                    <button className="px-4 py-1.5 rounded-full border border-gray-200 text-gray-500 text-xs font-bold uppercase tracking-wide hover:bg-gray-100 transition-all flex items-center gap-1">
                        Easy
                    </button>
                    <button className="px-4 py-1.5 rounded-full border border-gray-200 text-gray-500 text-xs font-bold uppercase tracking-wide hover:bg-gray-100 transition-all flex items-center gap-1">
                        Hard
                    </button>
                </div>
            </div>

            {/* DIY Grid */}
            <div className="max-w-7xl mx-auto px-6 lg:px-12 mt-16">
                <div className="flex items-center gap-3 mb-10 border-b border-gray-200 pb-4">
                    <IconTools className="text-emerald-600" />
                    <h3 className="text-xl font-bold text-gray-900 uppercase tracking-wider">Latest Projects</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
                    {diyData.slice(1).map((diy, index) => (
                        <motion.div
                            key={diy.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            onClick={() => router.push(`/edukasi/diy/${diy.id}`)}
                            className="group cursor-pointer flex flex-col h-full"
                        >
                            <div className="relative h-60 rounded-2xl overflow-hidden mb-6">
                                <img src={diy.image} alt={diy.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                                <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-3 py-1 rounded-md text-[10px] font-bold uppercase tracking-wide text-gray-900">
                                    {diy.category}
                                </div>
                            </div>

                            <div className="flex-1 flex flex-col">
                                <div className="flex items-center gap-2 text-xs font-bold text-emerald-600 uppercase tracking-wider mb-2">
                                    LEVEL: {diy.difficulty} • {diy.time}
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-3 leading-snug group-hover:text-emerald-600 transition-colors">
                                    {diy.title}
                                </h3>
                                <div className="mt-auto flex items-center justify-between border-t border-gray-100 pt-4">
                                    <span className="text-xs font-bold text-gray-400">Start Project</span>
                                    <div className="p-2 rounded-full hover:bg-gray-100 transition-colors text-gray-400 hover:text-emerald-600">
                                        <IconTools size={18} />
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
