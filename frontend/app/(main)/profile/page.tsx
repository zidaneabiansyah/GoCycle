"use client";

import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import {
    IconUser,
    IconMapPin,
    IconShoppingBag,
    IconHeart,
    IconSettings,
    IconLogout,
    IconBuildingStore,
    IconChevronRight,
    IconCheck,
    IconLoader2
} from "@tabler/icons-react";
import { getAccessToken, logoutAction } from "@/lib/auth-actions";
import { getUserProfile } from "@/lib/api";

interface UserData {
    name: string;
    email: string;
    avatar: string;
    walletBalance: string;
    points: string;
    isSeller: boolean;
}

export default function ProfilePage() {
    const [activeTab, setActiveTab] = useState("orders");
    const [user, setUser] = useState<UserData | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchProfile() {
            try {
                const token = await getAccessToken();
                if (!token) {
                    window.location.href = "/login";
                    return;
                }

                const response = await getUserProfile(token);
                setUser({
                    name: response.data.fullName,
                    email: response.data.email,
                    avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${response.data.fullName}`,
                    walletBalance: "Rp 150.000",
                    points: "2.400 Poin",
                    isSeller: response.data.accountType === "Penjual",
                });
            } catch (err) {
                if (err instanceof Error && err.message === "UNAUTHORIZED") {
                    window.location.href = "/login";
                    return;
                }
                setError("Gagal memuat profil");
            } finally {
                setIsLoading(false);
            }
        }

        fetchProfile();
    }, []);

    const handleLogout = async () => {
        await logoutAction();
    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gray-50 pt-28 flex items-center justify-center">
                <IconLoader2 className="animate-spin text-emerald-600" size={48} />
            </div>
        );
    }

    if (error || !user) {
        return (
            <div className="min-h-screen bg-gray-50 pt-28 flex items-center justify-center">
                <div className="text-center">
                    <p className="text-red-600 mb-4">{error || "Gagal memuat profil"}</p>
                    <button
                        onClick={() => window.location.reload()}
                        className="px-4 py-2 bg-emerald-600 text-white rounded-lg"
                    >
                        Coba Lagi
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 pt-28 pb-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-8">

                {/* LEFT SIDEBAR: PROFILE CARD */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="lg:col-span-1 space-y-6"
                >
                    {/* User Info Card */}
                    <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 text-center relative overflow-hidden">
                        <div className="relative w-24 h-24 mx-auto mb-4">
                            <div className="absolute inset-0 bg-emerald-100 rounded-full animate-pulse"></div>
                            <img src={user.avatar} alt="Profile" className="w-full h-full rounded-full object-cover relative z-10 border-4 border-white shadow-md" />
                            <div className="absolute bottom-1 right-1 bg-emerald-500 border-2 border-white p-1 rounded-full text-white">
                                <IconCheck size={12} stroke={4} />
                            </div>
                        </div>
                        <h2 className="text-xl font-bold text-gray-900">{user.name}</h2>
                        <p className="text-sm text-gray-500 mb-6">{user.email}</p>

                        <div className="grid grid-cols-2 gap-2 border-t border-gray-100 pt-4">
                            <div className="text-center">
                                <div className="text-xs text-gray-400 font-medium uppercase tracking-wider">Saldo</div>
                                <div className="text-sm font-bold text-gray-900">{user.walletBalance}</div>
                            </div>
                            <div className="text-center border-l border-gray-100">
                                <div className="text-xs text-gray-400 font-medium uppercase tracking-wider">Poin</div>
                                <div className="text-sm font-bold text-emerald-600">{user.points}</div>
                            </div>
                        </div>
                    </div>

                    {/* Navigation Menu */}
                    <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                        <nav className="flex flex-col">
                            <button onClick={() => setActiveTab("orders")} className={`flex items-center gap-3 px-6 py-4 text-sm font-medium transition-colors ${activeTab === "orders" ? "bg-emerald-50 text-emerald-600 border-l-4 border-emerald-500" : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"}`}>
                                <IconShoppingBag size={20} /> Pesanan Saya
                            </button>
                            <button onClick={() => setActiveTab("address")} className={`flex items-center gap-3 px-6 py-4 text-sm font-medium transition-colors ${activeTab === "address" ? "bg-emerald-50 text-emerald-600 border-l-4 border-emerald-500" : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"}`}>
                                <IconMapPin size={20} /> Alamat Pengiriman
                            </button>
                            <button onClick={() => setActiveTab("wishlist")} className={`flex items-center gap-3 px-6 py-4 text-sm font-medium transition-colors ${activeTab === "wishlist" ? "bg-emerald-50 text-emerald-600 border-l-4 border-emerald-500" : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"}`}>
                                <IconHeart size={20} /> Wishlist
                            </button>
                            <div className="h-px bg-gray-100 mx-6 my-2"></div>
                            <button className="flex items-center gap-3 px-6 py-4 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors">
                                <IconSettings size={20} /> Pengaturan Akun
                            </button>
                            <button
                                onClick={handleLogout}
                                className="flex items-center gap-3 px-6 py-4 text-sm font-medium text-red-600 hover:bg-red-50 transition-colors"
                            >
                                <IconLogout size={20} /> Keluar
                            </button>
                        </nav>
                    </div>
                </motion.div>

                {/* RIGHT CONTENT */}
                <div className="lg:col-span-3 space-y-8">

                    {/* SELLER CTA CARD - Only show for non-sellers */}
                    {!user.isSeller && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="relative bg-gradient-to-r from-emerald-900 to-teal-800 rounded-3xl p-8 overflow-hidden shadow-lg group cursor-pointer"
                            onClick={() => window.location.href = '/seller/onboarding'}
                        >
                            <div className="absolute right-0 top-0 h-full w-1/2 bg-white/5 skew-x-12 transform origin-bottom-right"></div>
                            <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-emerald-500/20 rounded-full blur-3xl"></div>

                            <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                                <div>
                                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/20 text-emerald-300 rounded-full text-xs font-bold uppercase tracking-wider mb-3 border border-emerald-500/30">
                                        <IconBuildingStore size={14} /> Gocycle Mitra
                                    </div>
                                    <h3 className="text-3xl font-bold text-white mb-2">Mulai Jualan di Gocycle?</h3>
                                    <p className="text-emerald-100 max-w-md text-sm leading-relaxed">
                                        Jadilah bagian dari ekonomi sirkular. Jual sampah terpilah atau produk daur ulangmu ke ribuan pembeli aktif.
                                    </p>
                                </div>
                                <div className="flex-shrink-0">
                                    <button className="bg-white text-emerald-900 px-8 py-3 rounded-full font-bold shadow-xl hover:bg-emerald-50 hover:shadow-2xl hover:shadow-emerald-500/30 transition-all ease-out flex items-center gap-2 group-hover:scale-105 group-hover:translate-x-1 transform duration-500">
                                        Buka Toko Gratis <IconChevronRight size={18} className="transition-transform duration-300 group-hover:translate-x-1" />
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {/* MAIN CONTENT AREA */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="bg-white rounded-3xl shadow-sm border border-gray-100 min-h-[500px] p-8"
                    >
                        {/* Orders Tab */}
                        {activeTab === "orders" && (
                            <>
                                <div className="flex items-center justify-between mb-8">
                                    <h3 className="text-2xl font-bold text-gray-900">Pesanan Saya</h3>
                                    <a href="#" className="text-sm font-bold text-emerald-600 hover:text-emerald-700">Lihat Semua Riwayat</a>
                                </div>

                                {/* Order Status Tabs */}
                                <div className="flex items-center gap-4 mb-8 overflow-x-auto pb-2">
                                    {["Semua", "Belum Bayar", "Dikemas", "Dikirim", "Selesai"].map((status, idx) => (
                                        <button key={status} className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${idx === 0 ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}>
                                            {status}
                                        </button>
                                    ))}
                                </div>

                                {/* Empty State Mockup */}
                                <div className="flex flex-col items-center justify-center py-16 text-center border-2 border-dashed border-gray-100 rounded-2xl bg-gray-50/50">
                                    <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center text-gray-300 mb-4">
                                        <IconShoppingBag size={40} />
                                    </div>
                                    <h4 className="text-lg font-bold text-gray-900 mb-2">Belum ada pesanan</h4>
                                    <p className="text-gray-500 max-w-sm mb-6">Kamu belum melakukan transaksi apapun. Yuk mulai jelajahi marketplace!</p>
                                    <button className="px-6 py-2 bg-emerald-600 text-white rounded-xl font-bold text-sm hover:bg-emerald-700 transition-colors shadow-lg shadow-emerald-500/20">
                                        Belanja Sekarang
                                    </button>
                                </div>
                            </>
                        )}

                        {/* Address Tab */}
                        {activeTab === "address" && (
                            <>
                                <div className="flex items-center justify-between mb-8">
                                    <h3 className="text-2xl font-bold text-gray-900">Alamat Pengiriman</h3>
                                    <button className="text-sm font-bold text-emerald-600 hover:text-emerald-700 flex items-center gap-1">
                                        <span>+ Tambah Alamat</span>
                                    </button>
                                </div>

                                {/* Empty State */}
                                <div className="flex flex-col items-center justify-center py-16 text-center border-2 border-dashed border-gray-100 rounded-2xl bg-gray-50/50">
                                    <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center text-gray-300 mb-4">
                                        <IconMapPin size={40} />
                                    </div>
                                    <h4 className="text-lg font-bold text-gray-900 mb-2">Belum ada alamat</h4>
                                    <p className="text-gray-500 max-w-sm mb-6">Tambahkan alamat pengiriman untuk mempermudah checkout.</p>
                                    <button className="px-6 py-2 bg-emerald-600 text-white rounded-xl font-bold text-sm hover:bg-emerald-700 transition-colors shadow-lg shadow-emerald-500/20">
                                        Tambah Alamat
                                    </button>
                                </div>
                            </>
                        )}

                        {/* Wishlist Tab */}
                        {activeTab === "wishlist" && (
                            <>
                                <div className="flex items-center justify-between mb-8">
                                    <h3 className="text-2xl font-bold text-gray-900">Wishlist Saya</h3>
                                    <span className="text-sm text-gray-500">0 produk</span>
                                </div>

                                {/* Empty State */}
                                <div className="flex flex-col items-center justify-center py-16 text-center border-2 border-dashed border-gray-100 rounded-2xl bg-gray-50/50">
                                    <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center text-red-300 mb-4">
                                        <IconHeart size={40} />
                                    </div>
                                    <h4 className="text-lg font-bold text-gray-900 mb-2">Wishlist masih kosong</h4>
                                    <p className="text-gray-500 max-w-sm mb-6">Simpan produk favoritmu di sini agar mudah ditemukan nanti!</p>
                                    <button
                                        onClick={() => window.location.href = '/marketplace'}
                                        className="px-6 py-2 bg-emerald-600 text-white rounded-xl font-bold text-sm hover:bg-emerald-700 transition-colors shadow-lg shadow-emerald-500/20"
                                    >
                                        Jelajahi Marketplace
                                    </button>
                                </div>
                            </>
                        )}

                    </motion.div>

                </div>
            </div>
        </div>
    );
}
