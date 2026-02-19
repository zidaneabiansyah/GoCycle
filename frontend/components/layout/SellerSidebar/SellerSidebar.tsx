"use client";

import React from "react";
import {
    IconLayoutDashboard,
    IconPackage,
    IconClipboardList,
    IconWallet,
    IconLogout,
    IconBuildingStore,
    IconTag
} from "@tabler/icons-react";
import { usePathname } from "next/navigation";

export default function SellerSidebar() {
    const pathname = usePathname();

    const menuItems = [
        { icon: IconLayoutDashboard, label: "Dashboard", href: "/seller/dashboard" },
        { icon: IconPackage, label: "Produk Saya", href: "/seller/products" },
        { icon: IconTag, label: "Sub-Kategori", href: "/seller/sub-categories" },
        { icon: IconClipboardList, label: "Pesanan", href: "/seller/orders" },
        { icon: IconWallet, label: "Keuangan", href: "/seller/finance" },
    ];

    return (
        <aside className="w-64 bg-white border-r border-gray-200 hidden md:flex flex-col">
            <div className="p-6 border-b border-gray-100 flex items-center gap-3">
                <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center text-white">
                    <IconBuildingStore size={20} />
                </div>
                <span className="font-bold text-gray-900">Seller Centre</span>
            </div>

            <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
                {menuItems.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <a
                            key={item.label}
                            href={item.href}
                            className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${isActive
                                ? "bg-emerald-50 text-emerald-700"
                                : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                                }`}
                        >
                            <item.icon size={20} />
                            {item.label}
                        </a>
                    );
                })}
            </nav>

            <div className="p-4 border-t border-gray-100">
                <button
                    onClick={() => window.location.href = '/profile'}
                    className="flex items-center gap-3 px-4 py-3 w-full text-left text-sm font-medium text-red-600 hover:bg-red-50 rounded-xl transition-colors"
                >
                    <IconLogout size={20} />
                    Keluar Toko
                </button>
                <a href="/profile" className="flex items-center justify-center mt-4 text-xs font-bold text-gray-500 hover:text-emerald-600">
                    &larr; Kembali ke Mode Pembeli
                </a>
            </div>
        </aside>
    );
}
