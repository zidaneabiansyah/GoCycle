"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { IconPlus, IconMinus } from "@tabler/icons-react";

const faqs = [
    {
        question: "Apa itu Go Cycle?",
        answer: "Go Cycle adalah platform yang menghubungkan masyarakat dengan solusi pengelolaan sampah yang berkelanjutan. Kami menyediakan edukasi, marketplace produk daur ulang, dan komunitas peduli lingkungan."
    },
    {
        question: "Bagaimana cara bergabung dengan tim Go Cycle?",
        answer: "Kami selalu mencari talenta berbakat yang peduli lingkungan. Pantau halaman karir kami atau kirimkan CV Anda melalui email ke careers@gocycle.id."
    },
    {
        question: "Apakah saya bisa menjual sampah anorganik saya?",
        answer: "Tentu! Melalui fitur Marketplace kami, Anda bisa menjual sampah anorganik yang sudah terpilah atau membeli produk hasil daur ulang dari mitra kami."
    },
    {
        question: "Di mana lokasi kantor Go Cycle?",
        answer: "Kantor pusat kami berlokasi di Jakarta Selatan. Namun, kami beroperasi secara digital dan melayani seluruh wilayah Indonesia."
    },
    {
        question: "Bagaimana cara berkolaborasi dengan Go Cycle?",
        answer: "Silakan hubungi tim partnership kami melalui formulir kontak di atas atau email langsung ke partnership@gocycle.id."
    }
];

export function FAQ() {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    return (
        <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Sering Ditanyakan</h2>
                <p className="text-gray-500">Jawaban untuk pertanyaan yang sering diajukan tentang Go Cycle.</p>
            </div>

            <div className="space-y-4">
                {faqs.map((faq, index) => (
                    <div
                        key={index}
                        className="border border-gray-200 rounded-2xl bg-white overflow-hidden transition-all duration-300 hover:border-emerald-200 hover:shadow-md"
                    >
                        <button
                            onClick={() => setActiveIndex(activeIndex === index ? null : index)}
                            className="w-full flex items-center justify-between p-6 text-left"
                        >
                            <span className="font-bold text-gray-900 text-lg">{faq.question}</span>
                            <span className={`p-2 rounded-full transition-colors ${activeIndex === index ? 'bg-emerald-100 text-emerald-600' : 'bg-gray-100 text-gray-500'}`}>
                                {activeIndex === index ? <IconMinus size={20} /> : <IconPlus size={20} />}
                            </span>
                        </button>

                        <AnimatePresence>
                            {activeIndex === index && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: "auto", opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <div className="px-6 pb-6 text-gray-600 leading-relaxed border-t border-gray-100 pt-4">
                                        {faq.answer}
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                ))}
            </div>
        </div>
    );
}
