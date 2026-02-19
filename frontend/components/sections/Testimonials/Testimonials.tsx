import { AnimatedTestimonials } from "@/components/ui/AnimatedTestimonials/AnimatedTestimonials";

export default function TestimonialsSection() {
    const testimonials = [
        {
            quote:
                "Saya sangat terbantu dengan platform GOCYCLE. Limbah kain perca dari konveksi saya yang tadinya menumpuk, sekarang bisa dijual dan menghasilkan uang tambahan. Prosesnya mudah dan cepat!",
            name: "Ibu Siti Nurhaliza",
            designation: "Pemilik Konveksi Berkah Jaya",
            src: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=3560&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        },
        {
            quote:
                "Sebagai pengrajin tas daur ulang, GOCYCLE memudahkan saya menemukan bahan baku berkualitas dengan harga terjangkau. Edukasi yang diberikan juga sangat membantu meningkatkan skill saya.",
            name: "Bapak Ahmad Hidayat",
            designation: "Pengrajin Tas Ramah Lingkungan",
            src: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        },
        {
            quote:
                "Platform yang luar biasa! Saya bisa berkontribusi untuk lingkungan sambil mendapatkan penghasilan. Komunitas di GOCYCLE juga sangat supportif dan saling membantu.",
            name: "Ibu Dewi Lestari",
            designation: "Pengelola Limbah Rumah Tangga",
            src: "https://images.unsplash.com/photo-1623582854588-d60de57fa33f?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        },
        {
            quote:
                "GOCYCLE mengubah cara saya memandang limbah. Sekarang saya tahu bahwa limbah bisa menjadi sumber penghasilan dan membantu menjaga lingkungan. Terima kasih GOCYCLE!",
            name: "Bapak Rudi Hartono",
            designation: "Pengusaha UMKM Produk Daur Ulang",
            src: "https://images.unsplash.com/photo-1636041293178-808a6762ab39?q=80&w=3464&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        },
    ];

    return (
        <div className="bg-white py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-50 text-[#2E8B57] text-sm font-bold tracking-wide uppercase mb-4 border border-green-100">
                        <span className="w-2 h-2 rounded-full bg-[#2E8B57] animate-pulse"></span>
                        Testimoni Pengguna
                    </div>
                    <h2 className="text-4xl sm:text-5xl font-black text-gray-900 tracking-tight mb-4">
                        Apa Kata <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2E8B57] to-[#4ADE80]">Mereka</span>
                    </h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Dengarkan pengalaman nyata dari pengguna GOCYCLE yang telah merasakan manfaat platform kami
                    </p>
                </div>

                {/* Animated Testimonials */}
                <AnimatedTestimonials testimonials={testimonials} autoplay={true} />
            </div>
        </div>
    );
}
