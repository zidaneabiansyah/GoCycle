"use client";

import { motion } from "motion/react";
import {
    IconCurrencyDollar,
    IconWallet,
    IconDownload,
    IconCalendar,
    IconChartLine,
    IconBuildingBank
} from "@tabler/icons-react";

export default function SellerFinancePage() {
    // Mock Transaction Data
    const transactions = [
        { id: "TRX-001", date: "10 Des 2024", desc: "Penjualan - ORD-2024-001", amount: "+Rp 35.000", status: "Selesai", type: "income" },
        { id: "TRX-002", date: "09 Des 2024", desc: "Penarikan Dana ke BCA", amount: "-Rp 500.000", status: "Selesai", type: "outcome" },
        { id: "TRX-003", date: "09 Des 2024", desc: "Penjualan - ORD-2024-004", amount: "+Rp 450.000", status: "Selesai", type: "income" },
    ];

    return (
        <div className="space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Keuangan Toko</h1>
                    <p className="text-gray-500 text-sm">Kelola saldo dan riwayat transaksi.</p>
                </div>
                <button className="flex items-center gap-2 bg-emerald-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-emerald-700 transition-colors shadow-lg shadow-emerald-500/20">
                    <IconBuildingBank size={20} /> Tarik Dana
                </button>
            </div>

            {/* Wallet Card */}
            <div className="bg-gradient-to-r from-emerald-800 to-teal-900 rounded-3xl p-8 text-white relative overflow-hidden shadow-xl">
                <div className="absolute right-0 top-0 h-full w-1/2 bg-white/5 skew-x-12 transform origin-bottom-right"></div>
                <div className="relative z-10">
                    <div className="flex items-center gap-2 text-emerald-200 text-sm font-medium mb-2">
                        <IconWallet size={20} /> Saldo Aktif
                    </div>
                    <div className="text-4xl font-bold mb-6">Rp 1.250.000</div>
                    <div className="grid grid-cols-2 gap-8 border-t border-white/10 pt-6">
                        <div>
                            <div className="text-xs text-emerald-200 mb-1">Pemasukan Bulan Ini</div>
                            <div className="text-xl font-bold">+Rp 4.500.000</div>
                        </div>
                        <div>
                            <div className="text-xs text-emerald-200 mb-1">Sedang Diproses</div>
                            <div className="text-xl font-bold text-yellow-300">Rp 150.000</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Transaction History with Export */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <div className="flex flex-col sm:flex-row items-center justify-between mb-6 gap-4">
                    <h3 className="font-bold text-gray-900 flex items-center gap-2">
                        <IconChartLine size={20} className="text-emerald-600" /> Riwayat Transaksi
                    </h3>
                    <div className="flex gap-2">
                        <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg text-gray-600 font-medium hover:bg-gray-50 text-sm">
                            <IconCalendar size={18} /> Filter Tanggal
                        </button>
                        <button
                            onClick={() => alert("Fitur: Download Laporan Excel (.xlsx)")}
                            className="flex items-center gap-2 px-4 py-2 bg-emerald-50 text-emerald-700 border border-emerald-100 rounded-lg font-bold hover:bg-emerald-100 text-sm"
                        >
                            <IconDownload size={18} /> Export Excel
                        </button>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="text-left text-xs text-gray-400 uppercase tracking-wider border-b border-gray-100">
                                <th className="pb-3 font-medium">No. Transaksi</th>
                                <th className="pb-3 font-medium">Tanggal</th>
                                <th className="pb-3 font-medium">Deskripsi</th>
                                <th className="pb-3 font-medium">Jumlah</th>
                                <th className="pb-3 font-medium">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {transactions.map((trx) => (
                                <tr key={trx.id} className="text-sm">
                                    <td className="py-4 font-mono text-gray-500">{trx.id}</td>
                                    <td className="py-4 text-gray-600">{trx.date}</td>
                                    <td className="py-4 font-medium text-gray-900">{trx.desc}</td>
                                    <td className={`py-4 font-bold ${trx.type === 'income' ? 'text-green-600' : 'text-red-600'}`}>
                                        {trx.amount}
                                    </td>
                                    <td className="py-4">
                                        <span className="px-3 py-1 bg-green-50 text-green-600 rounded-full text-xs font-bold">
                                            {trx.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
