"use client";

import { useState } from "react";
import RevealOnScroll from "@/components/animations/RevealOnScroll/RevealOnScroll";
import { motion, AnimatePresence } from "framer-motion";
import { simulateWasteJourney, type WasteType, type JourneyAction, type WasteJourney } from "@/lib/showcase-api";

const wasteTypes: { value: WasteType; label: string; icon: string; color: string; description: string }[] = [
    { value: 'PLASTIC', label: 'Plastik', icon: '♻️', color: 'blue', description: 'Botol, kantong, kemasan' },
    { value: 'GLASS', label: 'Kaca', icon: '🍾', color: 'cyan', description: 'Botol kaca, toples' },
    { value: 'METAL', label: 'Logam', icon: '🔩', color: 'gray', description: 'Kaleng, besi, aluminium' },
    { value: 'CARDBOARD', label: 'Kardus', icon: '📦', color: 'amber', description: 'Kotak, kertas tebal' },
    { value: 'TEXTILE', label: 'Tekstil', icon: '👕', color: 'purple', description: 'Kain, pakaian bekas' },
    { value: 'ORGANIC', label: 'Organik', icon: '🌱', color: 'green', description: 'Sisa makanan, daun' },
    { value: 'ELECTRONIC', label: 'Elektronik', icon: '💻', color: 'indigo', description: 'Gadget, kabel, baterai' },
];

export default function WasteJourneyPage() {
    const [selectedWaste, setSelectedWaste] = useState<WasteType | null>(null);
    const [selectedAction, setSelectedAction] = useState<JourneyAction | null>(null);
    const [journey, setJourney] = useState<WasteJourney | null>(null);
    const [loading, setLoading] = useState(false);
    const [currentStep, setCurrentStep] = useState(0);

    const handleSimulate = async () => {
        if (!selectedWaste || !selectedAction) return;

        setLoading(true);
        setCurrentStep(0);
        try {
            const result = await simulateWasteJourney(selectedWaste, selectedAction);
            setJourney(result);
        } catch (error) {
            console.error('Failed to simulate journey:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleReset = () => {
        setSelectedWaste(null);
        setSelectedAction(null);
        setJourney(null);
        setCurrentStep(0);
    };

    const getColorClasses = (color: string) => {
        const colors: Record<string, { bg: string; border: string; text: string; hover: string }> = {
            blue: { bg: 'bg-blue-50', border: 'border-blue-200', text: 'text-blue-700', hover: 'hover:border-blue-400' },
            cyan: { bg: 'bg-cyan-50', border: 'border-cyan-200', text: 'text-cyan-700', hover: 'hover:border-cyan-400' },
            gray: { bg: 'bg-gray-50', border: 'border-gray-200', text: 'text-gray-700', hover: 'hover:border-gray-400' },
            amber: { bg: 'bg-amber-50', border: 'border-amber-200', text: 'text-amber-700', hover: 'hover:border-amber-400' },
            purple: { bg: 'bg-purple-50', border: 'border-purple-200', text: 'text-purple-700', hover: 'hover:border-purple-400' },
            green: { bg: 'bg-green-50', border: 'border-green-200', text: 'text-green-700', hover: 'hover:border-green-400' },
            indigo: { bg: 'bg-indigo-50', border: 'border-indigo-200', text: 'text-indigo-700', hover: 'hover:border-indigo-400' },
        };
        return colors[color] || colors.blue;
    };

    const getImpactColor = (impact: string) => {
        switch (impact) {
            case 'positive': return 'text-green-600';
            case 'negative': return 'text-red-600';
            default: return 'text-gray-600';
        }
    };

    const getImpactIcon = (impact: string) => {
        switch (impact) {
            case 'positive':
                return (
                    <svg className="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                );
            case 'negative':
                return (
                    <svg className="w-6 h-6 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                );
            default:
                return (
                    <svg className="w-6 h-6 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                );
        }
    };

    return (
        <div className="bg-white min-h-screen pt-32 pb-20">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <RevealOnScroll direction="up" className="text-center mb-12">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-50 text-[#2E8B57] text-sm font-bold tracking-wide uppercase mb-4 border border-green-100">
                        <span className="w-2 h-2 rounded-full bg-[#2E8B57] animate-pulse"></span>
                        Waste Journey Simulator
                    </div>
                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-gray-900 mb-6 tracking-tight">
                        Perjalanan{" "}
                        <span className="text-transparent bg-clip-text bg-linear-to-r from-[#2E8B57] to-[#4ADE80]">
                            Sampahmu
                        </span>
                    </h1>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
                        Lihat perbedaan dampak antara membuang sampah sembarangan vs mendaur ulang. Pilihan kecilmu, dampak besar!
                    </p>
                </RevealOnScroll>

                {!journey ? (
                    <>
                        {/* Step 1: Select Waste Type */}
                        <RevealOnScroll direction="up">
                            <div className="mb-12">
                                <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                                    1. Pilih Jenis Sampah
                                </h2>
                                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
                                    {wasteTypes.map((waste) => {
                                        const colors = getColorClasses(waste.color);
                                        const isSelected = selectedWaste === waste.value;
                                        return (
                                            <button
                                                key={waste.value}
                                                onClick={() => setSelectedWaste(waste.value)}
                                                className={`
                          p-6 rounded-[2rem] border-2 transition-all duration-300 text-center
                          ${isSelected
                                                        ? 'border-[#2E8B57] bg-green-50 shadow-lg scale-105'
                                                        : `${colors.border} ${colors.bg} ${colors.hover} hover:shadow-md`}
                        `}
                                            >
                                                <div className="text-4xl mb-3">{waste.icon}</div>
                                                <div className={`font-bold text-sm mb-1 ${isSelected ? 'text-[#2E8B57]' : colors.text}`}>
                                                    {waste.label}
                                                </div>
                                                <div className="text-xs text-gray-500">{waste.description}</div>
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>
                        </RevealOnScroll>

                        {/* Step 2: Select Action */}
                        {selectedWaste && (
                            <RevealOnScroll direction="up">
                                <div className="mb-12">
                                    <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                                        2. Pilih Aksi
                                    </h2>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
                                        <button
                                            onClick={() => setSelectedAction('RECYCLE')}
                                            className={`
                        p-8 rounded-[2.5rem] border-2 transition-all duration-300
                        ${selectedAction === 'RECYCLE'
                                                    ? 'border-green-500 bg-green-50 shadow-xl scale-105'
                                                    : 'border-gray-200 bg-white hover:border-green-300 hover:shadow-lg'}
                      `}
                                        >
                                            <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                                                <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                                </svg>
                                            </div>
                                            <h3 className="text-xl font-bold text-gray-900 mb-2">Daur Ulang</h3>
                                            <p className="text-gray-600 text-sm">
                                                Pilah dan daur ulang sampah untuk dampak positif
                                            </p>
                                        </button>

                                        <button
                                            onClick={() => setSelectedAction('DISPOSE')}
                                            className={`
                        p-8 rounded-[2.5rem] border-2 transition-all duration-300
                        ${selectedAction === 'DISPOSE'
                                                    ? 'border-red-500 bg-red-50 shadow-xl scale-105'
                                                    : 'border-gray-200 bg-white hover:border-red-300 hover:shadow-lg'}
                      `}
                                        >
                                            <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-4">
                                                <svg className="w-8 h-8 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                </svg>
                                            </div>
                                            <h3 className="text-xl font-bold text-gray-900 mb-2">Buang Biasa</h3>
                                            <p className="text-gray-600 text-sm">
                                                Buang ke tempat sampah biasa tanpa pemilahan
                                            </p>
                                        </button>
                                    </div>
                                </div>
                            </RevealOnScroll>
                        )}

                        {/* Simulate Button */}
                        {selectedWaste && selectedAction && (
                            <RevealOnScroll direction="up">
                                <div className="text-center">
                                    <button
                                        onClick={handleSimulate}
                                        disabled={loading}
                                        className="inline-flex items-center gap-3 px-10 py-5 bg-linear-to-r from-[#2E8B57] to-[#4ADE80] text-white rounded-full font-bold text-lg hover:shadow-2xl hover:shadow-green-500/30 transition-all duration-300 transform hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {loading ? (
                                            <>
                                                <svg className="animate-spin w-6 h-6" fill="none" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                </svg>
                                                Memproses...
                                            </>
                                        ) : (
                                            <>
                                                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                                </svg>
                                                Mulai Simulasi
                                            </>
                                        )}
                                    </button>
                                </div>
                            </RevealOnScroll>
                        )}
                    </>
                ) : (
                    <>
                        {/* Journey Results */}
                        <div className="mb-12">
                            {/* Journey Header */}
                            <RevealOnScroll direction="up">
                                <div className={`
                  p-8 rounded-[2.5rem] mb-8 text-center
                  ${journey.action === 'RECYCLE'
                                        ? 'bg-linear-to-br from-green-50 to-emerald-50 border-2 border-green-200'
                                        : 'bg-linear-to-br from-red-50 to-orange-50 border-2 border-red-200'}
                `}>
                                    <div className="text-5xl mb-4">
                                        {wasteTypes.find(w => w.value === journey.wasteType)?.icon}
                                    </div>
                                    <h2 className="text-3xl font-bold text-gray-900 mb-2">
                                        {wasteTypes.find(w => w.value === journey.wasteType)?.label}
                                    </h2>
                                    <p className={`text-lg font-semibold ${journey.action === 'RECYCLE' ? 'text-green-700' : 'text-red-700'}`}>
                                        {journey.action === 'RECYCLE' ? '♻️ Didaur Ulang' : '🗑️ Dibuang Biasa'}
                                    </p>
                                </div>
                            </RevealOnScroll>

                            {/* Journey Steps */}
                            <div className="space-y-6 mb-12">
                                {journey.steps.map((step, index) => (
                                    <RevealOnScroll key={step.step} direction="up" delay={index * 0.1}>
                                        <motion.div
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: index * 0.2 }}
                                            className="flex gap-6 items-start"
                                        >
                                            <div className="shrink-0">
                                                <div className={`
                          w-14 h-14 rounded-full flex items-center justify-center shadow-lg
                          ${step.impact === 'positive' ? 'bg-green-500' : step.impact === 'negative' ? 'bg-red-500' : 'bg-gray-500'}
                        `}>
                                                    <span className="text-white font-bold text-xl">{step.step}</span>
                                                </div>
                                            </div>
                                            <div className="flex-1 bg-white rounded-[2rem] p-6 shadow-sm border border-gray-100">
                                                <div className="flex items-start justify-between mb-3">
                                                    <h3 className="text-xl font-bold text-gray-900">{step.title}</h3>
                                                    {getImpactIcon(step.impact)}
                                                </div>
                                                <p className="text-gray-600 leading-relaxed">{step.description}</p>
                                            </div>
                                        </motion.div>
                                    </RevealOnScroll>
                                ))}
                            </div>

                            {/* Summary */}
                            <RevealOnScroll direction="up">
                                <div className={`
                  p-10 rounded-[2.5rem] text-center
                  ${journey.summary.co2Impact < 0
                                        ? 'bg-linear-to-br from-green-500 to-emerald-600'
                                        : 'bg-linear-to-br from-red-500 to-orange-600'}
                `}>
                                    <h2 className="text-3xl font-bold text-white mb-6">Ringkasan Dampak</h2>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                                        <div className="bg-white/20 backdrop-blur-sm rounded-[2rem] p-6">
                                            <div className="text-5xl font-black text-white mb-2">
                                                {journey.summary.totalSteps}
                                            </div>
                                            <div className="text-white/90 font-semibold">Langkah Proses</div>
                                        </div>
                                        <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6">
                                            <div className="text-5xl font-black text-white mb-2">
                                                {journey.summary.co2Impact > 0 ? '+' : ''}{journey.summary.co2Impact} kg
                                            </div>
                                            <div className="text-white/90 font-semibold">Dampak CO2</div>
                                        </div>
                                    </div>

                                    <p className="text-xl text-white mb-8 max-w-2xl mx-auto leading-relaxed">
                                        {journey.summary.recommendation}
                                    </p>

                                    <button
                                        onClick={handleReset}
                                        className="inline-flex items-center gap-2 px-8 py-4 bg-white text-gray-900 rounded-full font-bold hover:bg-gray-50 transition-all duration-300 shadow-xl"
                                    >
                                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                        </svg>
                                        Coba Lagi
                                    </button>
                                </div>
                            </RevealOnScroll>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
