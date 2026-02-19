"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";

const features = [
    {
        id: 1,
        title: "1. Upload Limbahmu",
        description:
            "Sebagai penyedia limbah (rumah tangga/industri), cukup foto dan upload limbah terpilahmu seperti kain perca, botol, atau kertas ke marketplace GOCYCLE. Tentukan harga atau biarkan pengepul menawar.",
        image: "https://img.freepik.com/free-vector/upload-image-concept-illustration_114360-1607.jpg",
        color: "from-green-50 to-emerald-100",
    },
    {
        id: 2,
        title: "2. Match & Transaksi",
        description:
            "Pengelola kreatif (penjahit/pengrajin) akan menemukan limbahmu. Terjadi kesepakatan harga yang menguntungkan kedua pihak. Limbah tidak lagi dibuang, tapi menjadi bahan baku berharga.",
        image: "https://img.freepik.com/free-vector/online-shopping-concept-illustration_114360-1084.jpg",
        color: "from-blue-50 to-indigo-100",
    },
    {
        id: 3,
        title: "3. Kreasi & Edukasi",
        description:
            "Pengelola dapat mengakses modul edukasi untuk mengubah limbah menjadi produk bernilai jual tinggi. Ekonomi sirkular tercipta: Limbah -> Bahan Baku -> Produk Baru.",
        image: "https://img.freepik.com/free-vector/creative-process-concept-illustration_114360-3630.jpg",
        color: "from-yellow-50 to-orange-100",
    },
];

export default function ScrollFeatures() {
    const [activeCard, setActiveCard] = useState(0);
    const containerRef = useRef(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "start start"],
    });

    // Start with 15% clipped from top (subtle), animate to 0% clipped
    const clipPath = useTransform(
        scrollYProgress,
        [0, 0.9], // Finish expanding slightly before the end
        ["inset(25% 0 0 0 round 24px)", "inset(0% 0 0 0 round 24px)"]
    );

    // Text opacity: wait until image is fully expanded (0.9 -> 1)
    const textOpacity = useTransform(scrollYProgress, [0.9, 1], [0, 1]);
    // Text Y position: slide up from below (50px -> 0)
    const textY = useTransform(scrollYProgress, [0.9, 1], [50, 0]);

    return (
        <div ref={containerRef} className="bg-white font-sans w-full">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col lg:flex-row gap-10">
                    {/* Left Column: Scrolling Text */}
                    <motion.div style={{ opacity: textOpacity, y: textY }} className="w-full lg:w-1/2">
                        {features.map((feature, index) => (
                            <FeatureText
                                key={feature.id}
                                feature={feature}
                                index={index}
                                setActiveCard={setActiveCard}
                            />
                        ))}
                    </motion.div>

                    {/* Right Column: Sticky Image */}
                    <div className="hidden lg:block w-full lg:w-1/2 relative">
                        <div className="sticky top-0 h-screen flex items-center justify-center">
                            <motion.div
                                style={{ clipPath }}
                                className="relative w-full max-w-2xl aspect-[10/11] bg-gray-100 rounded-3xl overflow-hidden shadow-2xl border-4 border-white"
                            >
                                {features.map((feature, index) => (
                                    <motion.div
                                        key={feature.id}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: activeCard === index ? 1 : 0 }}
                                        transition={{ duration: 0.5 }}
                                        className="absolute inset-0 w-full h-full bg-white"
                                    >
                                        <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-30 mix-blend-multiply`} />
                                        <img
                                            src={feature.image}
                                            alt={feature.title}
                                            className="w-full h-full object-contain p-8"
                                        />
                                    </motion.div>
                                ))}
                            </motion.div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function FeatureText({ feature, index, setActiveCard }: { feature: any, index: number, setActiveCard: (i: number) => void }) {
    const ref = useRef(null);
    const isInView = useInView(ref, { margin: "-50% 0px -50% 0px" });

    useEffect(() => {
        if (isInView) {
            setActiveCard(index);
        }
    }, [isInView, index, setActiveCard]);

    return (
        <div ref={ref} className="min-h-screen flex flex-col justify-center p-8">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-20%" }}
                transition={{ duration: 0.5 }}
            >
                <div className="flex items-center gap-4 mb-4">
                    <div className="flex items-center justify-center w-12 h-12 rounded-full bg-[#2E8B57] text-white font-bold text-xl">
                        {index + 1}
                    </div>
                    <h3 className="text-3xl font-bold text-[#2E8B57]">
                        {feature.title.split(". ")[1]}
                    </h3>
                </div>

                <p className="text-xl text-gray-600 leading-relaxed ml-16">
                    {feature.description}
                </p>
            </motion.div>
        </div>
    );
}
