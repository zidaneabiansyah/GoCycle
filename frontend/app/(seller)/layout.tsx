import { Plus_Jakarta_Sans } from "next/font/google";
import "@/app/globals.css";

const jakarta = Plus_Jakarta_Sans({ subsets: ["latin"] });

export default function SellerLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className={`min-h-screen bg-gray-50 font-sans ${jakarta.className}`}>
            {/* Note: No Standard Header/Footer here for focused workspace */}
            {children}
        </div>
    );
}
