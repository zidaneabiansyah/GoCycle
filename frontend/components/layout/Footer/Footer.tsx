"use client";

import { IconBrandInstagram, IconBrandLinkedin, IconBrandTwitter, IconBrandYoutube, IconMail, IconMapPin, IconPhone, IconArrowRight } from "@tabler/icons-react";
import Link from "next/link";

const Footer = () => {
    return (
        <footer className="bg-emerald-950 text-white pt-20 pb-10 relative overflow-hidden">
            {/* Background Decorations */}
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-emerald-400 via-teal-500 to-emerald-600"></div>
            <div className="absolute -top-24 -right-24 w-96 h-96 bg-emerald-900/30 rounded-full blur-3xl pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-teal-900/20 rounded-full blur-2xl pointer-events-none"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 mb-16">

                    {/* 1. Brand Section (Large) */}
                    <div className="lg:col-span-5 space-y-8 pr-0 lg:pr-12">
                        <Link href="/" className="flex items-center gap-3 group w-fit">
                            <img
                                src="/foto/logo_footer.png"
                                alt="Go Cycle Logo"
                                className="h-12 w-auto object-contain brightness-0 invert transition-transform group-hover:scale-105"
                            />
                            <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-teal-300">
                                Go Cycle
                            </span>
                        </Link>
                        <p className="text-emerald-100/80 leading-relaxed text-lg font-light">
                            Platform digital inovatif untuk masa depan Indonesia yang lebih hijau. Kami membantu Anda mengelola sampah dengan bijak dan mengubahnya menjadi peluang yang bernilai.
                        </p>
                        <div className="flex gap-4">
                            {[
                                { icon: IconBrandInstagram, href: "#" },
                                { icon: IconBrandTwitter, href: "#" },
                                { icon: IconBrandLinkedin, href: "#" },
                                { icon: IconBrandYoutube, href: "#" }
                            ].map((social, i) => (
                                <a
                                    key={i}
                                    href={social.href}
                                    className="w-12 h-12 rounded-full bg-emerald-900/50 border border-emerald-800 flex items-center justify-center text-emerald-300 hover:bg-emerald-500 hover:text-white hover:border-emerald-400 transition-all duration-300 transform hover:-translate-y-1"
                                >
                                    <social.icon size={22} stroke={1.5} />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* 2. Quick Links */}
                    <div className="lg:col-span-3">
                        <h3 className="text-xl font-bold mb-8 text-white flex items-center gap-2">
                            <span className="w-8 h-1 bg-emerald-500 rounded-full"></span>
                            Menu Utama
                        </h3>
                        <ul className="space-y-4">
                            {[
                                { name: "Beranda", href: "/" },
                                { name: "EcoMarket", href: "/marketplace" },
                                { name: "Edukasi Lingkungan", href: "/edukasi" },
                                { name: "Tentang Kami", href: "/tentang-kami" },
                                { name: "Daftar Sekarang", href: "/register" },
                            ].map((link) => (
                                <li key={link.name}>
                                    <Link
                                        href={link.href}
                                        className="text-emerald-100/70 hover:text-white transition-colors flex items-center gap-2 group"
                                    >
                                        <IconArrowRight size={16} className="text-emerald-500 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300" />
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* 3. Contact Info */}
                    <div className="lg:col-span-4">
                        <h3 className="text-xl font-bold mb-8 text-white flex items-center gap-2">
                            <span className="w-8 h-1 bg-emerald-500 rounded-full"></span>
                            Hubungi Kami
                        </h3>
                        <div className="bg-emerald-900/30 p-8 rounded-3xl border border-emerald-800/50 backdrop-blur-sm">
                            <ul className="space-y-6">
                                <li className="flex items-start gap-4">
                                    <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center flex-shrink-0 text-emerald-400">
                                        <IconMapPin size={20} />
                                    </div>
                                    <span className="text-emerald-100/80 leading-relaxed">
                                        Green Office Park 9, BSD City,<br />Tangerang Selatan, Banten
                                    </span>
                                </li>
                                <li className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center flex-shrink-0 text-emerald-400">
                                        <IconMail size={20} />
                                    </div>
                                    <a href="mailto:hello@gocycle.id" className="text-emerald-100/80 hover:text-white transition-colors">
                                        hello@gocycle.id
                                    </a>
                                </li>
                                <li className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center flex-shrink-0 text-emerald-400">
                                        <IconPhone size={20} />
                                    </div>
                                    <a href="tel:+6281234567890" className="text-emerald-100/80 hover:text-white transition-colors">
                                        +62 812 3456 7890
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-emerald-900/50 flex flex-col md:flex-row items-center justify-between gap-6">
                    <p className="text-emerald-200/50 text-sm font-medium">
                        &copy; {new Date().getFullYear()} Go Cycle Indonesia. All rights reserved.
                    </p>
                    <div className="flex gap-8 text-sm text-emerald-200/50">
                        <Link href="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link>
                        <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
                        <Link href="#" className="hover:text-white transition-colors">Sitemap</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
