"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { IconRecycle, IconTrophy, IconArrowUpRight } from "@tabler/icons-react";
import { getImpactStats, getWasteComposition, getLeaderboard, ImpactStat, WasteComposition, LeaderboardUser } from "@/lib/impact-data";

export default function ImpactPage() {
    const [stats, setStats] = useState<ImpactStat[]>([]);
    const [wasteComposition, setWasteComposition] = useState<WasteComposition[]>([]);
    const [leaderboard, setLeaderboard] = useState<LeaderboardUser[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            const statsData = await getImpactStats();
            const wasteData = await getWasteComposition();
            const leaderboardData = await getLeaderboard();
            setStats(statsData);
            setWasteComposition(wasteData);
            setLeaderboard(leaderboardData);
        };
        fetchData();
    }, []);

    return (
        <div className="min-h-screen bg-[#F8FAFC] font-sans pt-28 pb-20 overflow-hidden relative">
            {/* Background Decorations */}
            <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-emerald-50/80 to-transparent pointer-events-none"></div>
            <div className="absolute -top-20 -right-20 w-[600px] h-[600px] bg-teal-200/20 rounded-full blur-[100px] pointer-events-none"></div>
            <div className="absolute top-40 -left-20 w-[400px] h-[400px] bg-emerald-200/20 rounded-full blur-[80px] pointer-events-none"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

                {/* Header Section */}
                <div className="text-center mb-20">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/80 backdrop-blur-md border border-emerald-100 text-emerald-700 text-sm font-bold uppercase tracking-widest mb-8 shadow-sm"
                    >
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                        Impact Tracker
                    </motion.div>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-5xl md:text-7xl font-black text-gray-900 mb-6 tracking-tight"
                    >
                        Dampak Nyata <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-500">GoCycle</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed"
                    >
                        Transparansi jejak lingkungan kita bersama. Setiap kilogram sampah yang Anda daur ulang membawa perubahan besar untuk bumi.
                    </motion.p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                    {stats.map((stat, index) => (
                        <motion.div
                            key={stat.label}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 + index * 0.1 }}
                            className="bg-white/60 backdrop-blur-xl rounded-[2.5rem] p-8 shadow-xl shadow-gray-200/40 border border-white/50 hover:shadow-2xl hover:shadow-emerald-900/5 transition-all duration-300 group hover:-translate-y-1"
                        >
                            <div className="flex justify-between items-start mb-8">
                                <div className={`w-16 h-16 rounded-2xl ${stat.bg} ${stat.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-inner`}>
                                    <stat.icon size={32} />
                                </div>
                                <div className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-100">
                                    <IconArrowUpRight size={14} />
                                    {stat.trend}
                                </div>
                            </div>

                            <div className="flex items-baseline gap-2 mb-2">
                                <span className="text-5xl font-black text-gray-900 tracking-tight">{stat.value}</span>
                                <span className="text-xl font-bold text-gray-400">{stat.unit}</span>
                            </div>
                            <h3 className="text-gray-500 font-medium text-lg">{stat.label}</h3>
                        </motion.div>
                    ))}
                </div>

                {/* Charts & Leaderboard Section */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* Waste Composition Chart */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.6 }}
                        className="bg-white/80 backdrop-blur-xl rounded-[2.5rem] p-10 shadow-xl shadow-gray-200/40 border border-white/50 lg:col-span-2 flex flex-col"
                    >
                        <div className="flex items-center gap-4 mb-10">
                            <div className="p-3 bg-emerald-100 rounded-xl text-emerald-600">
                                <IconRecycle size={28} />
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold text-gray-900">Komposisi Sampah</h3>
                                <p className="text-gray-500 text-sm">Distribusi jenis sampah yang didaur ulang</p>
                            </div>
                        </div>

                        <div className="space-y-8 flex-1">
                            {wasteComposition.map((item, index) => (
                                <div key={item.type}>
                                    <div className="flex justify-between text-sm font-bold text-gray-700 mb-3">
                                        <span className="flex items-center gap-2">
                                            <span className={`w-3 h-3 rounded-full ${item.color}`}></span>
                                            {item.type}
                                        </span>
                                        <span>{item.percentage}%</span>
                                    </div>
                                    <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={{ width: `${item.percentage}%` }}
                                            transition={{ duration: 1.5, delay: 0.8 + index * 0.1, ease: "easeOut" }}
                                            className={`h-full rounded-full ${item.color} shadow-sm`}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="mt-10 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-3xl border border-blue-100 flex items-start gap-4">
                            <div className="p-2 bg-blue-100 rounded-full text-blue-600 shrink-0">
                                <IconTrophy size={20} />
                            </div>
                            <div>
                                <h4 className="font-bold text-blue-900 mb-1">Insight Bulan Ini</h4>
                                <p className="text-blue-700/80 text-sm leading-relaxed">
                                    Daur ulang plastik meningkat <span className="font-bold">15%</span> dibandingkan bulan lalu. Terima kasih telah memilah botol plastik Anda!
                                </p>
                            </div>
                        </div>
                    </motion.div>

                    {/* Leaderboard */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.7 }}
                        className="bg-[#1B4D3E] rounded-[2.5rem] p-8 text-white shadow-2xl shadow-emerald-900/30 relative overflow-hidden flex flex-col"
                    >
                        {/* Decorative Background */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/20 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>
                        <div className="absolute bottom-0 left-0 w-48 h-48 bg-teal-500/20 rounded-full blur-3xl -ml-12 -mb-12 pointer-events-none"></div>

                        <div className="relative z-10 mb-8">
                            <h3 className="text-2xl font-bold flex items-center gap-3 mb-2">
                                <IconTrophy className="text-yellow-400" />
                                Top Pahlawan
                            </h3>
                            <p className="text-emerald-200/80 text-sm">Kontributor daur ulang terbanyak</p>
                        </div>

                        <div className="space-y-4 relative z-10 flex-1">
                            {leaderboard.map((user, index) => (
                                <div key={index} className="flex items-center gap-4 p-3 rounded-2xl bg-white/10 hover:bg-white/15 transition-colors border border-white/5 group cursor-pointer">
                                    <div className={`
                                        w-8 h-8 flex items-center justify-center rounded-full font-bold text-sm shadow-lg
                                        ${index === 0 ? 'bg-gradient-to-br from-yellow-300 to-yellow-500 text-yellow-900' :
                                            index === 1 ? 'bg-gradient-to-br from-gray-300 to-gray-400 text-gray-800' :
                                                index === 2 ? 'bg-gradient-to-br from-orange-300 to-orange-500 text-orange-900' : 'bg-white/20 text-white'}
                                    `}>
                                        {user.rank}
                                    </div>
                                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-400 to-teal-300 flex items-center justify-center text-emerald-900 font-bold text-sm ring-2 ring-white/20 group-hover:ring-white/40 transition-all">
                                        {user.avatar}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="font-bold truncate text-emerald-50">{user.name}</p>
                                        <p className="text-xs text-emerald-300/80 font-medium">{user.points.toLocaleString()} Poin</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <button className="w-full mt-8 py-4 bg-white text-[#1B4D3E] rounded-2xl font-bold hover:bg-emerald-50 transition-colors shadow-lg active:scale-95 duration-200">
                            Lihat Semua Peringkat
                        </button>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
