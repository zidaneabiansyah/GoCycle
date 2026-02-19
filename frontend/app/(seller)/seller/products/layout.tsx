"use client";

import React from "react";
import { IconBuildingStore } from "@tabler/icons-react";
import SellerSidebar from "@/components/layout/SellerSidebar/SellerSidebar";

export default function SellerProductsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex h-screen bg-gray-100 overflow-hidden">
            {/* SIDEBAR COMPONENT */}
            <SellerSidebar />

            {/* MAIN CONTENT AREA */}
            <main className="flex-1 overflow-y-auto relative">
                {/* Mobile Header (Visible only on small screens) */}
                <header className="bg-white border-b border-gray-200 p-4 flex md:hidden items-center justify-between sticky top-0 z-20">
                    <div className="font-bold text-gray-900 flex items-center gap-2">
                        <IconBuildingStore className="text-emerald-600" /> Seller Centre
                    </div>
                </header>

                <div className="p-6 md:p-10 max-w-7xl mx-auto">
                    {children}
                </div>
            </main>
        </div>
    );
}
