"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import RevealOnScroll from "@/components/animations/RevealOnScroll/RevealOnScroll";
import { getDIYTutorials, type DIYTutorial, type DifficultyLevel, type WasteType } from "@/lib/showcase-api";

const difficulties: { value: DifficultyLevel | 'ALL'; label: string; color: string }[] = [
    { value: 'ALL', label: 'Semua Level', color: 'gray' },
    { value: 'EASY', label: 'Mudah', color: 'green' },
    { value: 'MEDIUM', label: 'Sedang', color: 'yellow' },
    { value: 'HARD', label: 'Sulit', color: 'red' },
];

const wasteTypes: { value: WasteType | 'ALL'; label: string; icon: string }[] = [
    { value: 'ALL', label: 'Semua Jenis', icon: '🔄' },
    { value: 'PLASTIC', label: 'Plastik', icon: '♻️' },
    { value: 'GLASS', label: 'Kaca', icon: '🍾' },
    { value: 'METAL', label: 'Logam', icon: '🔩' },
    { value: 'CARDBOARD', label: 'Kardus', icon: '📦' },
    { value: 'TEXTILE', label: 'Tekstil', icon: '👕' },
    { value: 'ORGANIC', label: 'Organik', icon: '🌱' },
    { value: 'ELECTRONIC', label: 'Elektronik', icon: '💻' },
];

export default function DIYTutorialsPage() {
    const [tutorials, setTutorials] = useState<DIYTutorial[]>([]);
    const [filteredTutorials, setFilteredTutorials] = useState<DIYTutorial[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedDifficulty, setSelectedDifficulty] = useState<DifficultyLevel | 'ALL'>('ALL');
    const [selectedWasteType, setSelectedWasteType] = useState<WasteType | 'ALL'>('ALL');
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        async function loadTutorials() {
            try {
                const data = await getDIYTutorials();
                setTutorials(data);
                setFilteredTutorials(data);
            } catch (error) {
                console.error('Failed to load tutorials:', error);
            } finally {
                setLoading(false);
            }
        }
        loadTutorials();
    }, []);

    useEffect(() => {
        let filtered = tutorials;

        if (selectedDifficulty !== 'ALL') {
            filtered = filtered.filter(t => t.difficulty === selectedDifficulty);
        }

        if (selectedWasteType !== 'ALL') {
            filtered = filtered.filter(t => t.primaryWasteType === selectedWasteType);
        }

        if (searchQuery) {
            filtered = filtered.filter(t =>
                t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                t.description.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        setFilteredTutorials(filtered);
    }, [selectedDifficulty, selectedWasteType, searchQuery, tutorials]);

    const getDifficultyColor = (difficulty: DifficultyLevel) => {
        switch (difficulty) {
            case 'EASY': return 'bg-green-100 text-green-700 border-green-200';
            case 'MEDIUM': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
            case 'HARD': return 'bg-red-100 text-red-700 border-red-200';
        }
    };

    const getDifficultyLabel = (difficulty: DifficultyLevel) => {
        switch (difficulty) {
            case 'EASY': return 'Mudah';
            case 'MEDIUM': return 'Sedang';
            case 'HARD': return 'Sulit';
        }
    };

    return (
        <div className="bg-white min-h-screen pt-32 pb-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <RevealOnScroll direction="up" className="text-center mb-12">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-50 text-orange-600 text-sm font-bold tracking-wide uppercase mb-4 border border-orange-100">
                        <span className="w-2 h-2 rounded-full bg-orange-600 animate-pulse"></span>
                        Tutorial DIY
                    </div>
                    <h1 className="text-5xl sm:text-6xl font-black text-gray-900 mb-6">
                        Belajar{" "}
                        <span className="text-transparent bg-clip-text bg-linear-to-r from-orange-500 to-amber-500">
                            Daur Ulang
                        </span>
                    </h1>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Panduan step-by-step membuat produk bernilai dari sampah. Mudah diikuti, ramah lingkungan.
                    </p>
                </RevealOnScroll>

                {/* Search & Filters */}
                <div className="mb-12 space-y-6">
                    {/* Search Bar */}
                    <div className="relative max-w-2xl mx-auto">
                        <input
                            type="text"
                            placeholder="Cari tutorial..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full px-6 py-4 rounded-full border-2 border-gray-200 focus:border-orange-500 focus:outline-none text-gray-900 placeholder-gray-400 transition-colors"
                        />
                        <svg
                            className="absolute right-6 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </div>

                    {/* Difficulty Filter */}
                    <div>
                        <h3 className="text-sm font-semibold text-gray-700 mb-3 text-center">Tingkat Kesulitan</h3>
                        <div className="flex flex-wrap gap-3 justify-center">
                            {difficulties.map((diff) => (
                                <button
                                    key={diff.value}
                                    onClick={() => setSelectedDifficulty(diff.value)}
                                    className={`
                    px-6 py-3 rounded-full font-semibold text-sm transition-all duration-300
                    ${selectedDifficulty === diff.value
                                            ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/30'
                                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}
                  `}
                                >
                                    {diff.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Waste Type Filter */}
                    <div>
                        <h3 className="text-sm font-semibold text-gray-700 mb-3 text-center">Jenis Sampah</h3>
                        <div className="flex flex-wrap gap-3 justify-center">
                            {wasteTypes.map((type) => (
                                <button
                                    key={type.value}
                                    onClick={() => setSelectedWasteType(type.value)}
                                    className={`
                    px-5 py-3 rounded-full font-semibold text-sm transition-all duration-300 flex items-center gap-2
                    ${selectedWasteType === type.value
                                            ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/30'
                                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}
                  `}
                                >
                                    <span>{type.icon}</span>
                                    {type.label}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Results Count */}
                <div className="mb-8 text-center">
                    <p className="text-gray-600">
                        Menampilkan <span className="font-bold text-gray-900">{filteredTutorials.length}</span> tutorial
                    </p>
                </div>

                {/* Tutorials Grid */}
                {loading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[1, 2, 3, 4, 5, 6].map((i) => (
                            <div key={i} className="bg-gray-100 rounded-4xl h-[420px] animate-pulse"></div>
                        ))}
                    </div>
                ) : filteredTutorials.length === 0 ? (
                    <div className="text-center py-20">
                        <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                            <svg className="w-12 h-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">Tidak ada tutorial ditemukan</h3>
                        <p className="text-gray-600 mb-6">Coba ubah filter atau kata kunci pencarian</p>
                        <button
                            onClick={() => {
                                setSelectedDifficulty('ALL');
                                setSelectedWasteType('ALL');
                                setSearchQuery('');
                            }}
                            className="px-6 py-3 bg-orange-500 text-white rounded-full font-semibold hover:bg-orange-600 transition-colors"
                        >
                            Reset Filter
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredTutorials.map((tutorial, index) => (
                            <RevealOnScroll key={tutorial.id} direction="up" delay={index * 0.05}>
                                <Link
                                    href={`/edukasi/diy/${tutorial.id}`}
                                    className="group bg-white rounded-4xl shadow-sm hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 hover:border-orange-200 block"
                                >
                                    <div className="aspect-video bg-gray-100 relative overflow-hidden">
                                        <img
                                            src={tutorial.thumbnailUrl}
                                            alt={tutorial.title}
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                        />
                                        <div className={`absolute top-4 left-4 px-4 py-2 rounded-full text-xs font-bold border ${getDifficultyColor(tutorial.difficulty)}`}>
                                            {getDifficultyLabel(tutorial.difficulty)}
                                        </div>
                                        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                                            <svg className="w-3 h-3 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                            {tutorial.estimatedTime} menit
                                        </div>
                                    </div>

                                    <div className="p-6">
                                        <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-orange-500 transition-colors line-clamp-2">
                                            {tutorial.title}
                                        </h3>
                                        <p className="text-gray-600 text-sm mb-4 line-clamp-2 leading-relaxed">
                                            {tutorial.description}
                                        </p>

                                        <div className="flex items-center justify-between mb-4">
                                            <div className="flex items-center gap-2">
                                                <div className="w-8 h-8 rounded-full bg-green-50 flex items-center justify-center">
                                                    <svg className="w-4 h-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                    </svg>
                                                </div>
                                                <div>
                                                    <div className="text-sm font-bold text-gray-900">{tutorial.wasteSaved} kg</div>
                                                    <div className="text-xs text-gray-500">Sampah</div>
                                                </div>
                                            </div>
                                            <div className="text-2xl">
                                                {wasteTypes.find(t => t.value === tutorial.primaryWasteType)?.icon}
                                            </div>
                                        </div>

                                        <div className="pt-4 border-t border-gray-100 flex items-center justify-between text-sm text-gray-500">
                                            <div className="flex items-center gap-1">
                                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                                </svg>
                                                {tutorial.viewCount}
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                                </svg>
                                                {tutorial.completedCount} selesai
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </RevealOnScroll>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
