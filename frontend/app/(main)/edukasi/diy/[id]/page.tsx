"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import RevealOnScroll from "@/components/animations/RevealOnScroll/RevealOnScroll";
import { getDIYTutorialById, markTutorialCompleted, type DIYTutorial } from "@/lib/showcase-api";

export default function DIYTutorialDetailPage() {
    const params = useParams();
    const [tutorial, setTutorial] = useState<DIYTutorial | null>(null);
    const [loading, setLoading] = useState(true);
    const [isCompleting, setIsCompleting] = useState(false);
    const [isCompleted, setIsCompleted] = useState(false);

    useEffect(() => {
        async function loadTutorial() {
            try {
                const data = await getDIYTutorialById(params.id as string);
                setTutorial(data);
            } catch (error) {
                console.error('Failed to load tutorial:', error);
            } finally {
                setLoading(false);
            }
        }
        loadTutorial();
    }, [params.id]);

    const handleComplete = async () => {
        if (!tutorial || isCompleting) return;

        setIsCompleting(true);
        try {
            await markTutorialCompleted(tutorial.id);
            setIsCompleted(true);
            // Update local count
            setTutorial({
                ...tutorial,
                completedCount: tutorial.completedCount + 1
            });
        } catch (error) {
            console.error('Failed to mark as completed:', error);
        } finally {
            setIsCompleting(false);
        }
    };

    const getDifficultyColor = (difficulty: string) => {
        switch (difficulty) {
            case 'EASY': return 'bg-green-100 text-green-700 border-green-200';
            case 'MEDIUM': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
            case 'HARD': return 'bg-red-100 text-red-700 border-red-200';
            default: return 'bg-gray-100 text-gray-700 border-gray-200';
        }
    };

    const getDifficultyLabel = (difficulty: string) => {
        switch (difficulty) {
            case 'EASY': return 'Mudah';
            case 'MEDIUM': return 'Sedang';
            case 'HARD': return 'Sulit';
            default: return difficulty;
        }
    };

    if (loading) {
        return (
            <div className="bg-white min-h-screen pt-32 pb-20">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="animate-pulse">
                        <div className="h-96 bg-gray-200 rounded-4xl mb-8"></div>
                        <div className="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
                        <div className="h-4 bg-gray-200 rounded w-1/2 mb-8"></div>
                        <div className="space-y-4">
                            <div className="h-32 bg-gray-200 rounded-2xl"></div>
                            <div className="h-32 bg-gray-200 rounded-2xl"></div>
                            <div className="h-32 bg-gray-200 rounded-2xl"></div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (!tutorial) {
        return (
            <div className="bg-white min-h-screen pt-32 pb-20">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">Tutorial tidak ditemukan</h1>
                    <Link href="/edukasi/diy" className="text-orange-500 hover:underline">
                        Kembali ke Tutorial DIY
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white min-h-screen pt-32 pb-20">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Back Button */}
                <Link
                    href="/edukasi/diy"
                    className="inline-flex items-center gap-2 text-gray-600 hover:text-orange-500 mb-8 transition-colors"
                >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    Kembali ke Tutorial DIY
                </Link>

                {/* Header */}
                <RevealOnScroll direction="up">
                    <div className="mb-8">
                        <div className="flex flex-wrap items-center gap-3 mb-4">
                            <span className={`px-4 py-2 rounded-full text-sm font-bold border ${getDifficultyColor(tutorial.difficulty)}`}>
                                {getDifficultyLabel(tutorial.difficulty)}
                            </span>
                            <span className="px-4 py-2 rounded-full text-sm font-semibold bg-gray-100 text-gray-700 flex items-center gap-2">
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                {tutorial.estimatedTime} menit
                            </span>
                            <span className="px-4 py-2 rounded-full text-sm font-semibold bg-green-50 text-green-700 flex items-center gap-2">
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                                {tutorial.wasteSaved} kg sampah
                            </span>
                        </div>

                        <h1 className="text-4xl sm:text-5xl font-black text-gray-900 mb-4">
                            {tutorial.title}
                        </h1>

                        <p className="text-xl text-gray-600 leading-relaxed mb-6">
                            {tutorial.description}
                        </p>

                        <div className="flex items-center gap-6 text-sm text-gray-500">
                            <div className="flex items-center gap-2">
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                </svg>
                                <span className="font-semibold">{tutorial.viewCount}</span> dilihat
                            </div>
                            <div className="flex items-center gap-2">
                                <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                                <span className="font-semibold">{tutorial.completedCount}</span> selesai
                            </div>
                        </div>
                    </div>
                </RevealOnScroll>

                {/* Thumbnail */}
                <RevealOnScroll direction="up">
                    <div className="relative aspect-video rounded-4xl overflow-hidden shadow-2xl mb-12">
                        <img
                            src={tutorial.thumbnailUrl}
                            alt={tutorial.title}
                            className="w-full h-full object-cover"
                        />
                    </div>
                </RevealOnScroll>

                {/* Materials & Tools */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                    {/* Materials */}
                    {tutorial.materials && tutorial.materials.length > 0 && (
                        <RevealOnScroll direction="left">
                            <div className="bg-linear-to-br from-blue-50 to-cyan-50 rounded-4xl p-8 border border-blue-100">
                                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-xl bg-blue-500 flex items-center justify-center">
                                        <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                                        </svg>
                                    </div>
                                    Bahan yang Dibutuhkan
                                </h2>
                                <ul className="space-y-3">
                                    {tutorial.materials.map((material, index) => (
                                        <li key={index} className="flex items-start gap-3">
                                            <svg className="w-5 h-5 text-blue-600 mt-0.5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                            </svg>
                                            <span className="text-gray-700">{material}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </RevealOnScroll>
                    )}

                    {/* Tools */}
                    {tutorial.tools && tutorial.tools.length > 0 && (
                        <RevealOnScroll direction="right">
                            <div className="bg-linear-to-br from-purple-50 to-pink-50 rounded-4xl p-8 border border-purple-100">
                                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-xl bg-purple-500 flex items-center justify-center">
                                        <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                    </div>
                                    Alat yang Dibutuhkan
                                </h2>
                                <ul className="space-y-3">
                                    {tutorial.tools.map((tool, index) => (
                                        <li key={index} className="flex items-start gap-3">
                                            <svg className="w-5 h-5 text-purple-600 mt-0.5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                            </svg>
                                            <span className="text-gray-700">{tool}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </RevealOnScroll>
                    )}
                </div>

                {/* Steps */}
                {tutorial.steps && tutorial.steps.length > 0 && (
                    <RevealOnScroll direction="up">
                        <div className="mb-12">
                            <h2 className="text-3xl font-bold text-gray-900 mb-8">Langkah-Langkah</h2>
                            <div className="space-y-8">
                                {tutorial.steps.map((step, index) => (
                                    <div key={step.stepNumber} className="flex gap-6">
                                        <div className="shrink-0">
                                            <div className="w-12 h-12 rounded-full bg-linear-to-br from-orange-500 to-amber-500 flex items-center justify-center text-white font-bold text-lg shadow-lg">
                                                {step.stepNumber}
                                            </div>
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="text-xl font-bold text-gray-900 mb-3">{step.title}</h3>
                                            <p className="text-gray-600 leading-relaxed mb-4">{step.description}</p>
                                            {step.imageUrl && (
                                                <div className="aspect-video rounded-2xl overflow-hidden shadow-lg">
                                                    <img
                                                        src={step.imageUrl}
                                                        alt={`Step ${step.stepNumber}`}
                                                        className="w-full h-full object-cover"
                                                    />
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </RevealOnScroll>
                )}

                {/* Tips */}
                {tutorial.tips && tutorial.tips.length > 0 && (
                    <RevealOnScroll direction="up">
                        <div className="bg-linear-to-br from-green-50 to-emerald-50 rounded-4xl p-8 border border-green-100 mb-12">
                            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-green-500 flex items-center justify-center">
                                    <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                                    </svg>
                                </div>
                                Tips & Trik
                            </h2>
                            <ul className="space-y-3">
                                {tutorial.tips.map((tip, index) => (
                                    <li key={index} className="flex items-start gap-3">
                                        <svg className="w-5 h-5 text-green-600 mt-0.5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                        </svg>
                                        <span className="text-gray-700">{tip}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </RevealOnScroll>
                )}

                {/* Complete Button */}
                <RevealOnScroll direction="up">
                    <div className="bg-linear-to-br from-orange-500 to-amber-500 rounded-4xl p-12 text-center">
                        {isCompleted ? (
                            <div>
                                <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-6">
                                    <svg className="w-12 h-12 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                <h2 className="text-3xl font-bold text-white mb-4">Selamat! 🎉</h2>
                                <p className="text-orange-50 text-lg mb-8">
                                    Kamu telah menyelesaikan tutorial ini. Terus berkarya untuk lingkungan yang lebih baik!
                                </p>
                                <Link
                                    href="/edukasi/diy"
                                    className="inline-flex items-center gap-2 px-8 py-4 bg-white text-orange-600 rounded-full font-bold hover:bg-gray-50 transition-all duration-300 shadow-xl"
                                >
                                    Lihat Tutorial Lainnya
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                    </svg>
                                </Link>
                            </div>
                        ) : (
                            <div>
                                <h2 className="text-3xl font-bold text-white mb-4">
                                    Sudah Selesai Membuat?
                                </h2>
                                <p className="text-orange-50 text-lg mb-8 max-w-2xl mx-auto">
                                    Tandai tutorial ini sebagai selesai dan bantu kami menghitung dampak positif yang kamu buat!
                                </p>
                                <button
                                    onClick={handleComplete}
                                    disabled={isCompleting}
                                    className="inline-flex items-center gap-2 px-8 py-4 bg-white text-orange-600 rounded-full font-bold hover:bg-gray-50 transition-all duration-300 shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {isCompleting ? (
                                        <>
                                            <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            Menyimpan...
                                        </>
                                    ) : (
                                        <>
                                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                            </svg>
                                            Tandai Selesai
                                        </>
                                    )}
                                </button>
                            </div>
                        )}
                    </div>
                </RevealOnScroll>
            </div>
        </div>
    );
}
