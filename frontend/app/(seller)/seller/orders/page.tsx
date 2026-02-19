"use client";

import { useState } from "react";
import { motion } from "motion/react";
import {
    IconSearch,
    IconFilter,
    IconEye,
    IconTruckDelivery,
    IconCheck,
    IconPrinter
} from "@tabler/icons-react";

export default function SellerOrdersPage() {
    const [activeTab, setActiveTab] = useState("perlu_dikirim");

    // Mock Order Data
    const orders = [
        { id: "ORD-2024-001", customer: "Rian Hidayat", item: "Botol Plastik PET (10kg)", total: "Rp 35.000", status: "Perlu Dikirim", date: "10 Des 2024, 09:00", courier: "JNE Regular" },
        { id: "ORD-2024-002", customer: "Bank Sampah Melati", item: "Kardus Bekas (50kg)", total: "Rp 100.000", status: "Perlu Dikirim", date: "10 Des 2024, 10:15", courier: "Pickup Sendiri" },
        { id: "ORD-2024-003", customer: "Susi Susanti", item: "Tutup Botol (2kg)", total: "Rp 10.000", status: "Dikirim", date: "09 Des 2024, 14:30", courier: "J&T Express", resi: "JP77881122" },
        { id: "ORD-2024-004", customer: "PT Daur Ulang Maju", item: "Besi Tua (100kg)", total: "Rp 450.000", status: "Selesai", date: "08 Des 2024, 11:00", courier: "Cargo" },
    ];

    const tabs = [
        { id: "semua", label: "Semua" },
        { id: "perlu_dikirim", label: "Perlu Dikirim", count: 2 },
        { id: "dikirim", label: "Dikirim", count: 1 },
        { id: "selesai", label: "Selesai", count: 1 },
        { id: "dibatalkan", label: "Dibatalkan" },
    ];

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Pesanan Masuk</h1>
                    <p className="text-gray-500 text-sm">Kelola dan proses pesanan dari pelanggan.</p>
                </div>
            </div>

            {/* Tabs */}
            <div className="border-b border-gray-200 overflow-x-auto">
                <div className="flex gap-6 min-w-max">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`pb-4 text-sm font-medium relative ${activeTab === tab.id
                                    ? "text-emerald-600"
                                    : "text-gray-500 hover:text-gray-700"
                                }`}
                        >
                            {tab.label} {tab.count && <span className="ml-1 px-2 py-0.5 bg-gray-100 text-gray-600 rounded-full text-xs">{tab.count}</span>}
                            {activeTab === tab.id && (
                                <motion.div layoutId="underline" className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-600" />
                            )}
                        </button>
                    ))}
                </div>
            </div>

            {/* Filters */}
            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                    <IconSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    <input
                        type="text"
                        placeholder="Cari No. Pesanan atau Nama Pembeli..."
                        className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                </div>
                <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-gray-600 font-medium hover:bg-gray-50">
                    <IconFilter size={20} /> Filter Tanggal
                </button>
            </div>

            {/* Orders List */}
            <div className="space-y-4">
                {orders.map((order) => (
                    <div key={order.id} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:border-emerald-200 transition-colors">
                        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">

                            {/* Order Info */}
                            <div className="flex-1 space-y-4">
                                <div className="flex items-center gap-3 text-sm text-gray-500">
                                    <span className="font-bold text-gray-900">{order.customer}</span>
                                    <span>•</span>
                                    <span>{order.date}</span>
                                    <span>•</span>
                                    <span className="text-emerald-600 font-mono">{order.id}</span>
                                </div>
                                <div className="flex items-start gap-4">
                                    <div className="w-16 h-16 bg-gray-100 rounded-lg flex-shrink-0 overflow-hidden">
                                        <div className="w-full h-full bg-emerald-50 flex items-center justify-center text-emerald-200">
                                            <IconCheck size={32} />
                                        </div>
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-gray-900 text-lg">{order.item}</h4>
                                        <div className="text-gray-500 text-sm">Kurir: {order.courier}</div>
                                        {order.resi && <div className="text-xs text-blue-600 bg-blue-50 px-2 py-0.5 rounded inline-block mt-1 font-mono">Resi: {order.resi}</div>}
                                    </div>
                                </div>
                            </div>

                            {/* Status & Total */}
                            <div className="flex flex-col items-end gap-1 min-w-[150px]">
                                <div className="text-sm text-gray-500">Total Belanja</div>
                                <div className="text-xl font-bold text-emerald-600">{order.total}</div>
                                <div className={`mt-2 px-3 py-1 rounded-full text-xs font-bold ${order.status === "Perlu Dikirim" ? "bg-yellow-100 text-yellow-700" :
                                        order.status === "Dikirim" ? "bg-blue-100 text-blue-700" :
                                            "bg-green-100 text-green-700"
                                    }`}>
                                    {order.status}
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="flex lg:flex-col gap-3 lg:border-l lg:border-gray-100 lg:pl-6">
                                {order.status === "Perlu Dikirim" && (
                                    <button className="flex items-center justify-center gap-2 px-6 py-2 bg-emerald-600 text-white rounded-lg font-bold hover:bg-emerald-700 transition-colors shadow-sm">
                                        <IconTruckDelivery size={18} /> Atur Pengiriman
                                    </button>
                                )}
                                <div className="flex gap-2">
                                    <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2 border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 font-medium text-sm">
                                        <IconPrinter size={18} /> Label
                                    </button>
                                    <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2 border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 font-medium text-sm">
                                        <IconEye size={18} /> Detail
                                    </button>
                                </div>
                            </div>

                        </div>
                    </div>
                ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-center pt-8">
                <nav className="flex items-center gap-2">
                    <button className="w-10 h-10 flex items-center justify-center rounded-lg border border-gray-200 md:hover:bg-gray-50 disabled:opacity-50" disabled>&lt;</button>
                    <button className="w-10 h-10 flex items-center justify-center rounded-lg bg-emerald-600 text-white shadow-lg shadow-emerald-500/30">1</button>
                    <button className="w-10 h-10 flex items-center justify-center rounded-lg border border-gray-200 hover:bg-gray-50">2</button>
                    <button className="w-10 h-10 flex items-center justify-center rounded-lg border border-gray-200 hover:bg-gray-50">3</button>
                    <button className="w-10 h-10 flex items-center justify-center rounded-lg border border-gray-200 hover:bg-gray-50">&gt;</button>
                </nav>
            </div>
        </div>
    );
}
