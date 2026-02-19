"use client";

import { motion } from "motion/react";
import {
    IconCurrencyDollar,
    IconShoppingBag,
    IconUsers,
    IconTrendingUp,
    IconPackage,
    IconClock,
    IconDownload
} from "@tabler/icons-react";

export default function SellerDashboardPage() {
    // Mock Analytics Data
    const stats = [
        { title: "Pendapatan Bulan Ini", value: "Rp 12.500.000", change: "+12%", icon: IconCurrencyDollar, color: "bg-emerald-500" },
        { title: "Pesanan Baru", value: "48", change: "+5", icon: IconShoppingBag, color: "bg-blue-500" },
        { title: "Pengunjung Toko", value: "1,240", change: "+18%", icon: IconUsers, color: "bg-purple-500" },
        { title: "Total Produk", value: "14", change: "2 Baru", icon: IconPackage, color: "bg-orange-500" },
    ];

    const recentOrders = [
        { id: "ORD-001", customer: "Budi Santoso", item: "Botol Plastik PET (5kg)", status: "Perlu Dikirim", date: "Hari ini, 10:30" },
        { id: "ORD-002", customer: "Siti Aminah", item: "Kardus Bekas (10kg)", status: "Selesai", date: "Kemarin, 14:20" },
        { id: "ORD-003", customer: "CV Daur Ulang Jaya", item: "Tutup Botol (2kg)", status: "Dikirim", date: "Kemarin, 09:15" },
    ];

    return (
        <div className="space-y-8">
            {/* Header */}
            <div>
                <h1 className="text-2xl font-bold text-gray-900">Dashboard Toko</h1>
                <p className="text-gray-500 text-sm">Ringkasan aktivitas tokomu hari ini.</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, idx) => (
                    <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100"
                    >
                        <div className="flex items-center justify-between mb-4">
                            <div className={`${stat.color} w-10 h-10 rounded-xl flex items-center justify-center text-white shadow-lg shadow-gray-200`}>
                                <stat.icon size={20} />
                            </div>
                            <span className={`text-xs font-bold px-2 py-1 rounded-full ${stat.change.includes('+') ? 'bg-green-50 text-green-600' : 'bg-gray-100 text-gray-600'}`}>
                                {stat.change}
                            </span>
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</h3>
                        <p className="text-xs text-gray-500 font-medium">{stat.title}</p>
                    </motion.div>
                ))}
            </div>

            {/* Recent Activity Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* Recent Orders Chart/Table */}
                <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="font-bold text-gray-900">Pesanan Terbaru</h3>
                        <div className="flex gap-2">
                            <button
                                onClick={() => alert("Fitur: Download Laporan Excel (.xlsx)")}
                                className="flex items-center gap-2 px-3 py-1.5 bg-emerald-50 text-emerald-700 border border-emerald-100 rounded-lg font-bold hover:bg-emerald-100 text-xs"
                            >
                                <IconDownload size={16} /> Export
                            </button>
                            <a href="/seller/orders" className="text-sm font-medium text-emerald-600 hover:text-emerald-700 flex items-center">Lihat Semua</a>
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="text-left text-xs text-gray-400 uppercase tracking-wider border-b border-gray-100">
                                    <th className="pb-3 font-medium">ID Order</th>
                                    <th className="pb-3 font-medium">Pelanggan</th>
                                    <th className="pb-3 font-medium">Item</th>
                                    <th className="pb-3 font-medium">Status</th>
                                    <th className="pb-3 font-medium">Waktu</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {recentOrders.map((order) => (
                                    <tr key={order.id} className="text-sm">
                                        <td className="py-4 font-medium text-gray-900">{order.id}</td>
                                        <td className="py-4 text-gray-600">{order.customer}</td>
                                        <td className="py-4 text-gray-600">{order.item}</td>
                                        <td className="py-4">
                                            <span className={`px-3 py-1 rounded-full text-xs font-bold ${order.status === "Perlu Dikirim" ? "bg-yellow-50 text-yellow-600" :
                                                order.status === "Selesai" ? "bg-green-50 text-green-600" :
                                                    "bg-blue-50 text-blue-600"
                                                }`}>
                                                {order.status}
                                            </span>
                                        </td>
                                        <td className="py-4 text-gray-400 text-xs">{order.date}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Notifications / Tasks */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                    <h3 className="font-bold text-gray-900 mb-6">Perlu Diproses</h3>
                    <div className="space-y-4">
                        <div className="flex items-start gap-4 p-4 rounded-xl bg-orange-50 border border-orange-100">
                            <div className="bg-orange-100 p-2 rounded-lg text-orange-600">
                                <IconClock size={20} />
                            </div>
                            <div>
                                <h4 className="text-sm font-bold text-gray-900">5 Pesanan Baru</h4>
                                <p className="text-xs text-gray-600 mt-1">Segera kemas dan kirim pesanan sebelum jam 14.00.</p>
                                <button className="mt-3 text-xs font-bold bg-white px-3 py-1.5 rounded-lg shadow-sm text-orange-600 border border-orange-200 hover:bg-orange-50 transition-colors">
                                    Proses Sekarang
                                </button>
                            </div>
                        </div>

                        <div className="flex items-start gap-4 p-4 rounded-xl bg-gray-50 border border-gray-100 border-dashed">
                            <div className="bg-gray-200 p-2 rounded-lg text-gray-500">
                                <IconPackage size={20} />
                            </div>
                            <div>
                                <h4 className="text-sm font-bold text-gray-900">Stok Menipis</h4>
                                <p className="text-xs text-gray-500 mt-1">Stok "Kardus Bekas" sisa 5kg. Tambah stok segera.</p>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
