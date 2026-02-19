"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { IconArrowLeft, IconHome } from "@tabler/icons-react";

export default function NotFound() {
    return (
        <div className="min-h-screen bg-[#F8FAFC] flex flex-col items-center justify-center p-4 relative overflow-hidden font-sans">
            {/* Background Blobs */}
            <div className="absolute top-10 left-10 w-72 h-72 bg-emerald-100/40 rounded-full blur-3xl -z-10 animate-pulse"></div>
            <div className="absolute bottom-10 right-10 w-96 h-96 bg-teal-100/40 rounded-full blur-3xl -z-10 animate-pulse delay-1000"></div>

            <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center relative z-10">

                {/* Left Side: Text Content */}
                <div className="text-center md:text-left order-2 md:order-1">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center justify-center md:justify-start gap-1 mb-6"
                    >
                        <span className="text-8xl md:text-9xl font-black text-gray-900 tracking-tighter">4</span>
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                            className="w-20 h-20 md:w-28 md:h-28 relative mx-2"
                        >
                            <img
                                src="/foto/Group 31.png"
                                alt="0"
                                className="w-full h-full object-contain"
                            />
                        </motion.div>
                        <span className="text-8xl md:text-9xl font-black text-gray-900 tracking-tighter">4</span>
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-3xl md:text-4xl font-bold text-gray-800 mb-6"
                    >
                        Waduh, Nyasar Bang?
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-gray-500 text-lg mb-10 leading-relaxed max-w-md mx-auto md:mx-0"
                    >
                        Halaman ini sepertinya sudah didaur ulang menjadi kenangan. Yuk, kita fokus selamatkan bumi aja!
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4"
                    >
                        <Link
                            href="/"
                            className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 bg-emerald-600 text-white rounded-2xl font-bold hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-200 hover:shadow-emerald-300 hover:-translate-y-1"
                        >
                            <IconHome size={20} />
                            Balik ke Home
                        </Link>
                        <button
                            onClick={() => window.history.back()}
                            className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 bg-white text-gray-600 rounded-2xl font-bold hover:bg-gray-50 border border-gray-200 transition-all hover:-translate-y-1"
                        >
                            <IconArrowLeft size={20} />
                            Kembali Aja
                        </button>
                    </motion.div>
                </div>

                {/* Right Side: SayGoodbye Image with Question Marks */}
                <div className="flex justify-center order-1 md:order-2">
                    <div className="relative w-64 h-64 md:w-80 md:h-80">
                        {/* Floating Question Marks */}
                        <motion.div
                            animate={{ y: [-10, -20, -10], opacity: [0, 1, 0], rotate: [0, 10, -10] }}
                            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute -top-8 -right-8 text-6xl font-bold text-emerald-500 z-30"
                        >
                            ?
                        </motion.div>
                        <motion.div
                            animate={{ y: [-5, -15, -5], opacity: [0, 1, 0], rotate: [0, -10, 10] }}
                            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                            className="absolute -top-4 -left-8 text-5xl font-bold text-teal-400 z-30"
                        >
                            ?
                        </motion.div>

                        {/* The Main Image - SayGoodbye */}
                        <motion.div
                            animate={{ y: [0, -10, 0] }}
                            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                            className="relative z-20 w-full h-full"
                        >
                            <img
                                src="/foto/SayGoodbye.png"
                                alt="Say Goodbye"
                                className="w-full h-full object-contain drop-shadow-2xl"
                            />
                        </motion.div>

                        {/* Shadow */}
                        <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-40 h-4 bg-black/10 rounded-full blur-sm"></div>
                    </div>
                </div>

            </div>
        </div>
    );
}
