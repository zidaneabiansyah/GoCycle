"use client";

import Link from "next/link";
import RevealOnScroll from "@/components/animations/RevealOnScroll/RevealOnScroll";
import { motion, useScroll, useTransform, useSpring } from "motion/react";

export default function Hero() {
    const { scrollY } = useScroll();
    const smoothScrollY = useSpring(scrollY, { damping: 50, stiffness: 400 });

    const borderRadius = useTransform(smoothScrollY, [0, 500], [40, 0]);
    const scale = useTransform(smoothScrollY, [0, 500], [1, 1.02]);
    const width = useTransform(smoothScrollY, [0, 500], ["95%", "100%"]);

    return (
        <div className="relative bg-white py-0 overflow-hidden">
            <div className="w-full flex justify-center" style={{ paddingTop: '10px', paddingBottom: '10px' }}>
                <motion.div
                    style={{
                        borderRadius,
                        scale,
                        width
                    }}
                    className="relative overflow-hidden bg-black min-h-[660px] flex items-center mx-auto w-full"
                >
                    {/* Background Image & Overlay */}
                    <div className="absolute inset-0 z-0">
                        <img
                            src="/foto/hero.jpg"
                            alt="Hero Background"
                            className="w-full h-full object-cover opacity-70"
                            style={{ objectPosition: "center 40%" }}
                        />
                        <div className="absolute inset-0 bg-linear-to-b from-black/70 via-black/50 to-black/70"></div>
                    </div>

                    {/* Centered Content */}
                    <div className="relative z-10 w-full flex items-center justify-center p-8 sm:p-16">
                        <RevealOnScroll className="text-center max-w-4xl mx-auto" direction="up">
                            <div className="flex items-center justify-center gap-2 mb-6">
                                <span className="h-px w-8 bg-[#74B78D]"></span>
                                <span className="text-[#74B78D] font-bold text-sm tracking-widest uppercase">Platform Edukasi Daur Ulang</span>
                                <span className="h-px w-8 bg-[#74B78D]"></span>
                            </div>
                            <h1 className="text-4xl tracking-tight font-extrabold text-white sm:text-5xl md:text-6xl lg:text-7xl leading-tight mb-6">
                                Dari Sampah Jadi<br />
                                <span className="text-transparent bg-clip-text bg-linear-to-r from-[#74B78D] to-white">Karya Inspiratif</span>
                            </h1>
                            <p className="text-base text-gray-300 sm:text-lg md:text-xl mb-8 leading-relaxed max-w-2xl mx-auto">
                                Temukan inspirasi dari karya <strong>eco-makers Indonesia</strong>. Pelajari cara mengubah sampah menjadi produk bernilai dengan <strong>tutorial DIY</strong> yang mudah diikuti.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Link
                                    href="/showcase"
                                    className="inline-flex items-center justify-center px-8 py-4 border border-transparent text-base font-bold rounded-full text-white bg-[#2E8B57] hover:bg-[#246e45] transition-all duration-300 shadow-lg hover:shadow-[#2E8B57]/50"
                                >
                                    Lihat Showcase
                                </Link>
                                <Link
                                    href="/edukasi/diy"
                                    className="inline-flex items-center justify-center px-8 py-4 border border-white/20 text-base font-bold rounded-full text-white bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-all duration-300"
                                >
                                    Tutorial DIY
                                </Link>
                            </div>
                        </RevealOnScroll>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
