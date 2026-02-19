"use client";

import { motion } from "motion/react";
import { IconArrowLeft, IconCalendar, IconNews, IconArrowRight, IconTrendingUp, IconShare } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { PlaceholdersAndVanishInput } from "@/components/ui/placeholder/placeholders-and-vanish-input";
import { EducationTabs } from "@/components/feature/education/EducationTabs";

const newsData = [
    {
        id: 1,
        title: "Gen Z Driving Indonesia's Waste Revolution",
        date: "28 Nov, 2024",
        source: "EcoTrend",
        image: "https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?w=800&q=80",
        excerpt: "Generasi muda Indonesia memimpin gerakan daur ulang digital dan bank sampah komunitas.",
        featured: true
    },
    {
        id: 2,
        title: "Plastik Jadi Bahan Bakar: Terobosan Baru ITS",
        date: "22 Nov, 2024",
        source: "Tech Green",
        image: "https://images.unsplash.com/photo-1581093588401-fbb62a02f120?w=800&q=80",
        excerpt: "Mahasiswa ITS berhasil ubah sampah plastik menjadi bahan bakar alternatif.",
        tag: "Innovation"
    },
    {
        id: 3,
        title: "Bali Wajibkan Sedotan Bambu",
        date: "15 Nov, 2024",
        source: "Eco Policy",
        image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&q=80",
        excerpt: "Pemerintah Bali terapkan regulasi baru melarang sedotan plastik.",
        tag: "Policy"
    },
    {
        id: 4,
        title: "Hutan Kota Jakarta: Paru-paru Baru",
        date: "10 Nov, 2024",
        source: "Urban Nature",
        image: "https://images.unsplash.com/photo-1448375240586-dfd8d395ea6c?w=800&q=80",
        excerpt: "Penambahan area hijau di tengah Jakarta terbukti menurunkan polusi.",
        tag: "Urban"
    },
    {
        id: 5,
        title: "Startup 'SampahKita' Raih Pendanaan",
        date: "05 Nov, 2024",
        source: "BizGreen",
        image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=80",
        excerpt: "Platform manajemen sampah digital ini siap ekspansi ke 10 kota.",
        tag: "Business"
    },
    {
        id: 6,
        title: "Festival Musik Bebas Sampah",
        date: "01 Nov, 2024",
        source: "Culture Pop",
        image: "https://images.unsplash.com/photo-1533174072545-e8d4aa97edf9?w=800&q=80",
        excerpt: "Synchronize Fest tahun ini berhasil mencapai target zero waste.",
        tag: "Event"
    }
];

export default function BeritaPage() {
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
                                THE <span className="text-emerald-600">DAILY</span><br /> PLANET.
                            </h1>
                            <p className="text-gray-500 font-medium text-lg">Curated news for the eco-conscious citizen.</p>
                        </div>
                        <div className="text-right hidden md:block">
                            <p className="text-gray-900 font-bold text-xl">{new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</p>
                            <p className="text-emerald-600 text-sm font-bold uppercase tracking-wider">Jakarta, Indonesia</p>
                        </div>
                    </div>

                    {/* Featured Article (Hero) */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        onClick={() => router.push(`/edukasi/berita/${newsData[0].id}`)}
                        className="relative h-[500px] w-full rounded-[2rem] overflow-hidden group cursor-pointer border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-500"
                    >
                        <img src={newsData[0].image} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" alt="Featured" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                        <div className="absolute bottom-0 left-0 p-8 md:p-12 max-w-4xl">
                            <span className="bg-emerald-600 text-white px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-4 inline-block">
                                Featured Story
                            </span>
                            <h2 className="text-3xl md:text-5xl font-black text-white mb-4 leading-tight group-hover:underline decoration-emerald-500 decoration-4 underline-offset-8 transition-all">
                                {newsData[0].title}
                            </h2>
                            <p className="text-gray-200 text-lg md:text-xl line-clamp-2 max-w-2xl">
                                {newsData[0].excerpt}
                            </p>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Search & Sort Section */}
            <div className="max-w-4xl mx-auto px-6 lg:px-12 mt-12 mb-8">
                <PlaceholdersAndVanishInput
                    placeholders={["Search news topics...", "Waste management updates...", "Environmental policy...", "Green innovations..."]}
                    onChange={(e) => console.log(e.target.value)}
                    onSubmit={(e) => e.preventDefault()}
                />
                <div className="flex flex-wrap items-center justify-center gap-2 mt-6">
                    {["Latest", "Popular", "Innovation", "Policy", "Urban", "Business", "Event"].map((cat) => (
                        <button key={cat} className="px-4 py-1.5 rounded-full border border-gray-200 text-gray-500 text-xs font-bold uppercase tracking-wide hover:bg-emerald-600 hover:text-white hover:border-emerald-600 transition-all">
                            {cat}
                        </button>
                    ))}
                </div>
            </div>

            {/* News Feed */}
            <div className="max-w-7xl mx-auto px-6 lg:px-12 mt-16">
                <div className="flex items-center gap-3 mb-10 border-b border-gray-200 pb-4">
                    <IconTrendingUp className="text-emerald-600" />
                    <h3 className="text-xl font-bold text-gray-900 uppercase tracking-wider">Trending Now</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
                    {newsData.slice(1).map((news, index) => (
                        <motion.div
                            key={news.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            onClick={() => router.push(`/edukasi/berita/${news.id}`)}
                            className="group cursor-pointer flex flex-col h-full"
                        >
                            <div className="relative h-60 rounded-2xl overflow-hidden mb-6">
                                <img src={news.image} alt={news.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                                <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-3 py-1 rounded-md text-[10px] font-bold uppercase tracking-wide text-gray-900">
                                    {news.tag}
                                </div>
                            </div>

                            <div className="flex-1 flex flex-col">
                                <div className="flex items-center gap-2 text-xs font-bold text-emerald-600 uppercase tracking-wider mb-2">
                                    {news.source} • {news.date}
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-3 leading-snug group-hover:text-emerald-600 transition-colors">
                                    {news.title}
                                </h3>
                                <p className="text-gray-500 text-sm leading-relaxed line-clamp-2 mb-4">
                                    {news.excerpt}
                                </p>
                                <div className="mt-auto flex items-center justify-between border-t border-gray-100 pt-4">
                                    <span className="text-xs font-bold text-gray-400">3 Min Read</span>
                                    <div className="p-2 rounded-full hover:bg-gray-100 transition-colors text-gray-400 hover:text-emerald-600">
                                        <IconShare size={18} />
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
