import "@/app/globals.css";
import { Plus_Jakarta_Sans } from "next/font/google";

const jakarta = Plus_Jakarta_Sans({ subsets: ["latin"] });

export const metadata = {
    title: "Authentication - Gocycle",
    description: "Masuk atau Daftar ke Gocycle",
};

export default function AuthLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className={`min-h-screen bg-white ${jakarta.className}`}>
            {children}
        </div>
    );
}
