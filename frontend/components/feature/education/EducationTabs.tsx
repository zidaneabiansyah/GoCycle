"use client";

import { usePathname, useRouter } from "next/navigation";
import { IconBulb, IconTools, IconNews } from "@tabler/icons-react";
import { motion } from "motion/react";

const tabs = [
    { name: "Tips & Trik", path: "/edukasi/tips", icon: IconBulb },
    { name: "DIY Projects", path: "/edukasi/diy", icon: IconTools },
    { name: "Berita Terkini", path: "/edukasi/berita", icon: IconNews },
];

export function EducationTabs() {
    const pathname = usePathname();
    const router = useRouter();

    return (
        <div className="flex justify-center mb-12">
            <div className="bg-white p-1.5 rounded-full shadow-sm border border-gray-100 inline-flex gap-2">
                {tabs.map((tab) => {
                    const isActive = pathname.includes(tab.path);
                    const Icon = tab.icon;
                    return (
                        <button
                            key={tab.path}
                            onClick={() => router.push(tab.path)}
                            className={`relative px-6 py-2.5 rounded-full text-sm font-bold transition-all duration-300 flex items-center gap-2 ${isActive
                                ? "text-white shadow-md bg-emerald-500"
                                : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
                                }`}
                        >
                            <Icon size={18} />
                            {tab.name}
                        </button>
                    );
                })}
            </div>
        </div>
    );
}
