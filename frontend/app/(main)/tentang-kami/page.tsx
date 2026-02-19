"use client";

import { motion } from "motion/react";
import { PinContainer } from "@/components/ui/PinContainer/PinContainer";
import { GridBackground } from "@/components/ui/GridBackground/GridBackground";
import { FAQ } from "@/components/sections/FAQ/FAQ";
import { IconMail, IconPhone, IconMapPin, IconBrandInstagram, IconBrandLinkedin, IconBrandTwitter, IconSend, IconTelescope, IconRocket } from "@tabler/icons-react";

const teamMembers = [
    {
        id: 1,
        name: "Rajib",
        role: "Founder & CEO",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&auto=format&fit=crop&q=60",
        link: "https://linkedin.com/in/rajib",
        linkTitle: "linkedin.com/in/rajib"
    },
    {
        id: 2,
        name: "Sarah",
        role: "Head of Sustainability",
        image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800&auto=format&fit=crop&q=60",
        link: "https://linkedin.com/in/sarah",
        linkTitle: "linkedin.com/in/sarah"
    },
    {
        id: 3,
        name: "Budi",
        role: "Tech Lead",
        image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800&auto=format&fit=crop&q=60",
        link: "https://github.com/budi",
        linkTitle: "github.com/budi"
    }
];

export default function TentangKami() {
    return (
        <div className="min-h-screen bg-gray-50 font-sans">
            {/* 1. HERO SECTION WITH GRID BACKGROUND - FORCED WHITE */}
            <GridBackground className="h-[50rem]" containerClassName="h-auto min-h-[60vh] flex items-center justify-center py-32 bg-white">
                <div className="relative max-w-4xl mx-auto px-4 text-center z-10">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6 }}
                        className="inline-block mb-6 px-4 py-1.5 rounded-full bg-emerald-100 text-emerald-700 font-bold text-sm tracking-wide border border-emerald-200"
                    >
                        TENTANG KAMI
                    </motion.div>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="text-5xl md:text-7xl font-black text-gray-900 mb-8 tracking-tight leading-tight"
                    >
                        Membangun Masa Depan <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-500">
                            Yang Lebih Hijau
                        </span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed"
                    >
                        Kami adalah sekumpulan pemimpi dan penggerak yang percaya bahwa sampah bisa menjadi berkah jika dikelola dengan bijak.
                    </motion.p>
                </div>
            </GridBackground>

            {/* 2. VISI & MISI - PREMIUM GLASSMORPHISM */}
            <div className="relative z-20 -mt-24 max-w-7xl mx-auto px-4 pb-24">
                <div className="grid md:grid-cols-2 gap-8">
                    {/* Visi Card */}
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        whileHover={{ y: -10 }}
                        className="relative group overflow-hidden bg-white p-10 rounded-[2.5rem] shadow-[0_10px_40px_rgba(0,0,0,0.04)] border border-gray-100 hover:border-emerald-100 transition-all duration-500"
                    >
                        <div className="relative z-10">
                            <div className="w-20 h-20 rounded-3xl bg-emerald-50 flex items-center justify-center mb-8 group-hover:bg-emerald-100 transition-colors duration-500">
                                <IconTelescope size={40} className="text-emerald-600" stroke={1.5} />
                            </div>
                            <h2 className="text-4xl font-black text-gray-900 mb-6 tracking-tight">Visi Kami</h2>
                            <p className="text-lg text-gray-500 leading-relaxed font-medium">
                                Menjadi ekosistem digital nomor satu di Indonesia yang mengubah cara pandang dan perilaku masyarakat terhadap pengelolaan limbah menuju ekonomi sirkular.
                            </p>
                        </div>
                    </motion.div>

                    {/* Misi Card */}
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        whileHover={{ y: -10 }}
                        className="relative group overflow-hidden bg-white p-10 rounded-[2.5rem] shadow-[0_10px_40px_rgba(0,0,0,0.04)] border border-gray-100 hover:border-teal-100 transition-all duration-500"
                    >
                        <div className="relative z-10">
                            <div className="w-20 h-20 rounded-3xl bg-teal-50 flex items-center justify-center mb-8 group-hover:bg-teal-100 transition-colors duration-500">
                                <IconRocket size={40} className="text-teal-600" stroke={1.5} />
                            </div>
                            <h2 className="text-4xl font-black text-gray-900 mb-6 tracking-tight">Misi Kami</h2>
                            <ul className="space-y-5">
                                {[
                                    "Edukasi masif tentang pemilahan sampah.",
                                    "Digitalisasi bank sampah dan pengepul.",
                                    "Menciptakan pasar produk daur ulang yang adil."
                                ].map((item, index) => (
                                    <li key={index} className="flex items-center gap-4 text-gray-500 font-medium group/item">
                                        <div className="w-8 h-8 rounded-full bg-teal-50 flex items-center justify-center group-hover/item:bg-teal-100 transition-colors">
                                            <div className="w-2.5 h-2.5 rounded-full bg-teal-500"></div>
                                        </div>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* 3. TIM KAMI (3D PIN) - Light & Premium */}
            <div className="relative py-32 bg-white overflow-hidden">
                {/* Clean Grid Background (Light) */}
                <div className="absolute inset-0 z-0 opacity-[0.03]">
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#000000_1px,transparent_1px),linear-gradient(to_bottom,#000000_1px,transparent_1px)] bg-[size:24px_24px]"></div>
                </div>

                {/* Subtle Gradient Mesh */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-gradient-to-b from-emerald-50/50 to-transparent rounded-[100%] blur-[80px] pointer-events-none"></div>

                <div className="relative z-10 max-w-7xl mx-auto px-4">
                    <div className="text-center mb-24">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            <span className="text-emerald-600 font-bold tracking-wider text-sm uppercase mb-3 block">Profesional & Berdedikasi</span>
                            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6 tracking-tight">Tim Gocycle</h2>
                            <p className="text-gray-500 text-lg max-w-2xl mx-auto leading-relaxed">
                                Kami adalah tim yang berkomitmen penuh untuk menghadirkan inovasi teknologi dalam pengelolaan lingkungan yang berkelanjutan.
                            </p>
                        </motion.div>
                    </div>

                    <div className="flex flex-wrap items-center justify-center gap-10">
                        {teamMembers.map((member, index) => (
                            <motion.div
                                key={member.id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="group relative"
                            >
                                <PinContainer title={member.linkTitle} href={member.link}>
                                    <div className="flex flex-col h-[28rem] w-[22rem] bg-white rounded-[2.5rem] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-slate-100 relative z-10 group-hover:shadow-[0_30px_80px_rgba(16,185,129,0.15)] transition-all duration-500">

                                        {/* Image Section with Modern Overlay */}
                                        <div className="relative h-full w-full overflow-hidden">
                                            <img
                                                src={member.image}
                                                alt={member.name}
                                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                            />

                                            {/* Modern Glass Overlay at Bottom */}
                                            <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-90"></div>

                                            {/* Content Overlay */}
                                            <div className="absolute bottom-0 left-0 right-0 p-8 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                                <div className="flex items-center justify-between mb-2">
                                                    <div className="bg-emerald-500/20 backdrop-blur-md border border-emerald-500/30 px-3 py-1 rounded-full">
                                                        <span className="text-emerald-300 text-xs font-bold tracking-wider uppercase">{member.role}</span>
                                                    </div>
                                                    <div className="w-10 h-10 rounded-full bg-white text-slate-900 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 hover:bg-emerald-500 hover:text-white cursor-pointer shadow-lg transform translate-y-4 group-hover:translate-y-0">
                                                        <IconBrandLinkedin size={20} />
                                                    </div>
                                                </div>

                                                <h3 className="text-3xl font-black text-white mb-2 tracking-tight">{member.name}</h3>
                                                <div className="h-1 w-12 bg-emerald-500 rounded-full mb-4 group-hover:w-full transition-all duration-700"></div>

                                                <p className="text-gray-300 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100 line-clamp-2">
                                                    Passionate about creating sustainable solutions for a better tomorrow.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </PinContainer>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>

            {/* 4. KONTAK KAMI */}
            <div className="py-24 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="bg-white rounded-[3rem] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] overflow-hidden border border-gray-100">
                        <div className="grid lg:grid-cols-5 min-h-[600px]">
                            <div className="lg:col-span-2 bg-gray-900 p-12 text-white flex flex-col justify-between relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                                <div className="absolute bottom-0 left-0 w-64 h-64 bg-teal-500/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>

                                <div className="relative z-10">
                                    <h2 className="text-3xl font-bold mb-2">Hubungi Kami</h2>
                                    <p className="text-gray-400 mb-12">Siap berdiskusi untuk solusi lingkungan Anda.</p>

                                    <div className="space-y-8">
                                        <div className="flex items-start gap-4 group">
                                            <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center group-hover:bg-emerald-500 transition-colors duration-300">
                                                <IconMail size={24} />
                                            </div>
                                            <div>
                                                <h3 className="font-bold text-sm text-gray-400 mb-1 uppercase tracking-wider">Email</h3>
                                                <p className="text-white font-medium">hello@gocycle.id</p>
                                            </div>
                                        </div>
                                        <div className="flex items-start gap-4 group">
                                            <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center group-hover:bg-emerald-500 transition-colors duration-300">
                                                <IconPhone size={24} />
                                            </div>
                                            <div>
                                                <h3 className="font-bold text-sm text-gray-400 mb-1 uppercase tracking-wider">Telepon</h3>
                                                <p className="text-white font-medium">+62 812 3456 7890</p>
                                            </div>
                                        </div>
                                        <div className="flex items-start gap-4 group">
                                            <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center group-hover:bg-emerald-500 transition-colors duration-300">
                                                <IconMapPin size={24} />
                                            </div>
                                            <div>
                                                <h3 className="font-bold text-sm text-gray-400 mb-1 uppercase tracking-wider">Lokasi</h3>
                                                <p className="text-white font-medium">Jakarta Selatan, Indonesia</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="relative z-10 mt-12">
                                    <p className="text-gray-500 text-sm mb-4">Temukan kami di sosial media:</p>
                                    <div className="flex gap-4">
                                        {[IconBrandInstagram, IconBrandLinkedin, IconBrandTwitter].map((Icon, i) => (
                                            <a key={i} href="#" className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-white hover:text-gray-900 transition-all duration-300">
                                                <Icon size={18} />
                                            </a>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="lg:col-span-3 p-12 lg:p-16 bg-white">
                                <div className="max-w-lg">
                                    <h2 className="text-3xl font-bold text-gray-900 mb-2">Kirim Pesan</h2>
                                    <p className="text-gray-500 mb-10">Kami akan membalas pesan Anda sesegera mungkin.</p>

                                    <form className="space-y-6">
                                        <div className="grid md:grid-cols-2 gap-6">
                                            <div className="space-y-2">
                                                <label className="text-sm font-bold text-gray-700">Nama Depan</label>
                                                <input type="text" className="w-full px-4 py-3.5 rounded-xl bg-gray-50 border border-gray-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 outline-none transition-all font-medium" placeholder="John" />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-sm font-bold text-gray-700">Nama Belakang</label>
                                                <input type="text" className="w-full px-4 py-3.5 rounded-xl bg-gray-50 border border-gray-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 outline-none transition-all font-medium" placeholder="Doe" />
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-bold text-gray-700">Email</label>
                                            <input type="email" className="w-full px-4 py-3.5 rounded-xl bg-gray-50 border border-gray-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 outline-none transition-all font-medium" placeholder="john@example.com" />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-bold text-gray-700">Pesan</label>
                                            <textarea rows={4} className="w-full px-4 py-3.5 rounded-xl bg-gray-50 border border-gray-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 outline-none transition-all resize-none font-medium" placeholder="Ceritakan kebutuhan Anda..."></textarea>
                                        </div>
                                        <button className="w-full bg-gray-900 text-white font-bold py-4 rounded-xl hover:bg-emerald-600 transition-all shadow-lg hover:shadow-emerald-500/30 flex items-center justify-center gap-2 group">
                                            <span>Kirim Pesan</span>
                                            <IconSend size={20} className="group-hover:translate-x-1 transition-transform" />
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* 5. FAQ SECTION */}
            <div className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-4">
                    <FAQ />
                </div>
            </div>
        </div>
    );
}
