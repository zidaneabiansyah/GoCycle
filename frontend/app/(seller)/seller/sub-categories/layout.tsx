import SellerSidebar from "@/components/layout/SellerSidebar/SellerSidebar";
import { ReactNode } from "react";

export default function SubCategoriesLayout({ children }: { children: ReactNode }) {
    return (
        <div className="flex h-screen pt-16 bg-gray-50">
            <SellerSidebar />
            <main className="flex-1 overflow-y-auto p-8">
                {children}
            </main>
        </div>
    );
}
