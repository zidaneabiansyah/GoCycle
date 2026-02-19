"use client";

import { motion } from "motion/react";
import Image from "next/image";
import { IconArrowRight, IconLeaf, IconRecycle, IconPlant, IconRobot, IconSparkles, IconSearch, IconScan, IconMessageChatbot, IconCamera, IconSend, IconBulb, IconVideo } from "@tabler/icons-react";

import { AnimatedFacts } from "@/components/ui/AnimatedFacts/AnimatedFacts";
import dynamic from "next/dynamic";


const Timeline = dynamic(() => import("@/components/ui/Timeline/Timeline").then((mod) => mod.Timeline), {
    loading: () => <div className="h-screen w-full bg-white animate-pulse" />,
    ssr: false
});

const EdukasiContent = dynamic(() => import("@/components/sections/EdukasiContent/EdukasiContent").then((mod) => mod.EdukasiContent), {
    loading: () => <div className="h-96 w-full bg-gray-50 animate-pulse" />,
    ssr: false
});

const factsData = [
    {
        name: "64 Juta Ton",
        designation: "Sampah Per Tahun",
        quote: "Indonesia menghasilkan timbulan sampah yang luar biasa besar setiap tahunnya. Sebagian besar berakhir di TPA tanpa pengolahan lebih lanjut, menciptakan gunung sampah yang mencemari tanah dan air kita.",
        src: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?q=80&w=1000&auto=format&fit=crop"
    },
    {
        name: "Hanya 7%",
        designation: "Yang Didaur Ulang",
        quote: "Dari jutaan ton sampah plastik yang dihasilkan, hanya sebagian kecil yang berhasil didaur ulang. Sisanya mencemari lautan, membunuh biota laut, dan masuk ke rantai makanan kita sebagai mikroplastik.",
        src: "https://images.unsplash.com/photo-1611284446314-60a58ac0deb9?q=80&w=1000&auto=format&fit=crop"
    },
    {
        name: "450 Tahun",
        designation: "Plastik Terurai",
        quote: "Botol plastik yang kita buang sembarangan hari ini akan tetap ada hingga 5 generasi mendatang. Plastik tidak benar-benar hilang, hanya terpecah menjadi partikel kecil yang berbahaya bagi ekosistem.",
        src: "https://images.unsplash.com/photo-1595278069441-2cf29f8005a4?q=80&w=1000&auto=format&fit=crop"
    }
];

const timelineData = [
    {
        title: "Pemilahan",
        content: (
            <div>
                <p className="text-neutral-800 text-xs md:text-sm font-normal mb-8">
                    Langkah pertama dimulai dari rumah. Memisahkan sampah organik, anorganik, dan residu adalah kunci utama dalam rantai daur ulang.
                </p>
                <div className="grid grid-cols-2 gap-4">
                    <div className="relative h-20 md:h-44 lg:h-60 w-full rounded-lg overflow-hidden shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]">
                        <Image
                            src="https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=500&q=80"
                            alt="sorting waste"
                            fill
                            sizes="(max-width: 768px) 50vw, 25vw"
                            className="object-cover"
                        />
                    </div>
                    <div className="relative h-20 md:h-44 lg:h-60 w-full rounded-lg overflow-hidden shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]">
                        <Image
                            src="https://images.unsplash.com/photo-1611284446314-60a58ac0deb9?w=500&q=80"
                            alt="recycling bins"
                            fill
                            sizes="(max-width: 768px) 50vw, 25vw"
                            className="object-cover"
                        />
                    </div>
                </div>
            </div>
        ),
    },
    {
        title: "Pengumpulan",
        content: (
            <div>
                <p className="text-neutral-800 text-xs md:text-sm font-normal mb-8">
                    Sampah yang terpilah dikumpulkan oleh petugas kebersihan atau bank sampah. Di sini, nilai ekonomi sampah mulai terlihat.
                </p>
                <div className="grid grid-cols-2 gap-4">
                    <div className="relative h-20 md:h-44 lg:h-60 w-full rounded-lg overflow-hidden shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]">
                        <Image
                            src="https://images.unsplash.com/photo-1595278069441-2cf29f8005a4?w=500&q=80"
                            alt="waste collection"
                            fill
                            sizes="(max-width: 768px) 50vw, 25vw"
                            className="object-cover"
                        />
                    </div>
                </div>
            </div>
        ),
    },
    {
        title: "Pengolahan",
        content: (
            <div>
                <p className="text-neutral-800 text-xs md:text-sm font-normal mb-8">
                    Sampah diolah menjadi bahan baku baru. Plastik dicacah menjadi bijih plastik, kertas didaur ulang menjadi bubur kertas.
                </p>
                <div className="grid grid-cols-2 gap-4">
                    <div className="relative h-20 md:h-44 lg:h-60 w-full rounded-lg overflow-hidden shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]">
                        <Image
                            src="/foto/Pengolahan sampah.jpg"
                            alt="recycling plant"
                            fill
                            sizes="(max-width: 768px) 50vw, 25vw"
                            className="object-cover"
                        />
                    </div>
                </div>
            </div>
        ),
    },
    {
        title: "Produk Baru",
        content: (
            <div>
                <p className="text-neutral-800 text-xs md:text-sm font-normal mb-8">
                    Hasil daur ulang lahir kembali menjadi produk baru yang bermanfaat, menutup siklus ekonomi sirkular.
                </p>
                <div className="grid grid-cols-2 gap-4">
                    <div className="relative h-20 md:h-44 lg:h-60 w-full rounded-lg overflow-hidden shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]">
                        <Image
                            src="https://img.freepik.com/free-photo/eco-bag-mockup_1108-287.jpg"
                            alt="recycled product"
                            fill
                            sizes="(max-width: 768px) 50vw, 25vw"
                            className="object-cover"
                        />
                    </div>
                </div>
            </div>
        ),
    },
];

export default function Edukasi() {
    return (
        <div className="min-h-screen font-sans bg-white">

            {/* 1. HERO SECTION */}
            <div className="relative h-[100vh] flex items-center justify-center overflow-hidden sticky top-0 z-0">
                <div className="absolute inset-0 z-0">
                    <Image
                        src="/foto/edukasi_hero.jpg"
                        alt="Masalah Sampah Lingkungan"
                        fill
                        priority
                        className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-black/60"></div>
                </div>

                <div className="relative z-10 text-center px-4 max-w-5xl mx-auto -mt-24">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h1 className="text-5xl md:text-7xl font-black text-white mb-6 leading-tight tracking-tight drop-shadow-2xl">
                            Kelola Sampah, <br />
                            <span className="text-[#4ADE80]">Jaga Masa Depan</span>
                        </h1>
                        <p className="text-lg md:text-2xl text-white/90 leading-relaxed max-w-3xl mx-auto font-medium drop-shadow-lg">
                            Langkah kecilmu hari ini menentukan nasib bumi esok hari. <br className="hidden md:block" />
                            Mari belajar mengolah sampah dengan bijak.
                        </p>
                    </motion.div>
                </div>

                <motion.div
                    className="absolute bottom-32 left-1/2 -translate-x-1/2 text-white/70 flex flex-col items-center gap-2 z-20"
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                >
                    <span className="text-xs uppercase tracking-widest drop-shadow">Scroll untuk Lebih Lanjut</span>
                    <IconArrowRight className="rotate-90" />
                </motion.div>
            </div>

            {/* 2. PROBLEM AWARENESS */}
            <div className="bg-white relative z-10 rounded-t-[60px] shadow-[0_-20px_50px_rgba(0,0,0,0.2)] pt-10 pb-20 -mt-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-0 pt-10">
                        <h2 className="text-3xl md:text-5xl font-black text-gray-900 mb-4 tracking-tight">Realita Yang Memprihatinkan</h2>
                        <p className="text-gray-500 text-lg max-w-2xl mx-auto">
                            Angka-angka ini bukan sekadar statistik. Ini adalah cerminan krisis lingkungan yang sedang kita hadapi bersama.
                        </p>
                    </div>
                    <AnimatedFacts facts={factsData} autoplay={true} />
                </div>
            </div>

            {/* 3. TIMELINE */}
            <div className="bg-white relative z-10">
                <Timeline data={timelineData} />
            </div>

            {/* 4. AI SPOTLIGHT SECTION - "GOGO" SHOWCASE */}
            <div className="relative py-32 overflow-hidden bg-white">
                {/* Clean Background Decoration */}
                <div className="absolute top-1/2 left-0 w-[800px] h-[800px] bg-emerald-50/80 blur-[120px] rounded-full -translate-y-1/2 -translate-x-1/4"></div>
                <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-blue-50/80 blur-[100px] rounded-full translate-y-1/3 translate-x-1/4"></div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="grid lg:grid-cols-2 gap-20 items-center">

                        {/* LEFT: Mascot (Gogo) - CLEAN */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="relative h-[600px] flex items-center justify-center order-2 lg:order-1"
                        >
                            {/* Decorative Elements */}
                            <div className="absolute inset-0 bg-gradient-to-tr from-emerald-100/30 to-blue-50/30 rounded-[3rem] rotate-3 scale-95 border border-white/50"></div>
                            <div className="absolute inset-0 bg-white/40 backdrop-blur-sm rounded-[3rem] -rotate-2 scale-95 shadow-2xl shadow-emerald-100/50"></div>

                            {/* Main Circle */}
                            <div className="absolute w-[450px] h-[450px] bg-gradient-to-b from-emerald-50 to-white rounded-full border border-white shadow-inner z-0"></div>

                            {/* MASCOT IMAGE */}
                            <div className="relative z-10 w-[420px] md:w-[520px] h-full drop-shadow-2xl hover:scale-105 transition-transform duration-500 ease-in-out">
                                <Image
                                    src="/foto/SayHai.png"
                                    alt="Gogo Mascot"
                                    fill
                                    priority
                                    className="object-contain"
                                />
                            </div>
                        </motion.div>

                        {/* RIGHT: Copywriting & Features */}
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="space-y-8 order-1 lg:order-2"
                        >
                            <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-50 text-emerald-700 rounded-full text-xs font-bold uppercase tracking-wider border border-emerald-100">
                                <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
                                Meet Your New Bestie
                            </div>

                            <h2 className="text-5xl md:text-7xl font-black text-gray-900 leading-none tracking-tight">
                                Kenalan sama <br />
                                <span className="text-emerald-600">Gogo.</span>
                            </h2>

                            <p className="text-xl text-gray-500 leading-relaxed max-w-lg font-normal">
                                Asisten pintar yang siap bantuin kamu pilah sampah. Cukup foto, Gogo langsung kasih tau:
                            </p>

                            {/* Feature List */}
                            <div className="space-y-6 pt-2">
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 rounded-2xl bg-emerald-100 flex items-center justify-center text-emerald-600 flex-shrink-0">
                                        <IconScan size={24} />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold text-gray-900">Cek Jenis Sampah</h3>
                                        <p className="text-gray-500 leading-relaxed">Bingung ini organik atau anorganik? Foto aja, Gogo tau jawabannya.</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 rounded-2xl bg-orange-100 flex items-center justify-center text-orange-600 flex-shrink-0">
                                        <IconBulb size={24} />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold text-gray-900">Ide DIY Project</h3>
                                        <p className="text-gray-500 leading-relaxed">Punya botol bekas? Gogo kasih ide kerajinan tangan yang keren.</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 rounded-2xl bg-blue-100 flex items-center justify-center text-blue-600 flex-shrink-0">
                                        <IconVideo size={24} />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold text-gray-900">Rekomendasi Video</h3>
                                        <p className="text-gray-500 leading-relaxed">Tonton tutorial cara daur ulang langsung pilihan Gogo.</p>
                                    </div>
                                </div>
                            </div>

                            <div className="pt-6">
                                <a href="/edukasi/ask-ai" className="group flex w-fit items-center justify-center gap-3 bg-gray-900 text-white px-8 py-4 rounded-full font-bold shadow-xl shadow-gray-200 transition-all hover:scale-105 active:scale-95">
                                    <IconMessageChatbot size={20} /> Chat Sekarang
                                </a>
                            </div>
                        </motion.div>

                    </div>
                </div>
            </div>

            {/* 5. ACTIONABLE CONTENT */}
            <EdukasiContent />

            {/* AI Assistant Floating Button */}


        </div>
    );
}
