"use client";

import { useParams, useRouter } from "next/navigation";
import { motion } from "motion/react";
import { IconArrowLeft, IconClock, IconChartBar, IconCheck, IconShare, IconHeart, IconMessageCircle, IconSend, IconBookmark, IconTools } from "@tabler/icons-react";
import { useState } from "react";

// Mock Data
const diyDetailData = [
    {
        id: 1,
        title: "Vertical Garden dari Botol Bekas",
        image: "https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?w=800&q=80",
        difficulty: "Mudah",
        time: "1 Jam",
        category: "Gardening",
        description: "Manfaatkan botol plastik bekas menjadi taman vertikal yang cantik untuk menghijaukan dinding rumah Anda. Solusi hemat lahan dan ramah lingkungan!",
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", // Placeholder video
        materials: [
            "Botol plastik bekas (1.5L)",
            "Gunting / Cutter",
            "Tali tambang kecil",
            "Tanah humus",
            "Bibit tanaman",
            "Paku dinding"
        ],
        steps: [
            "Cuci bersih botol plastik bekas dan lepaskan labelnya.",
            "Buat lubang persegi panjang di bagian samping botol sebagai tempat menanam.",
            "Lubangi bagian bawah botol kecil-kecil untuk drainase air.",
            "Lubangi bagian leher dan pantat botol untuk jalan tali.",
            "Masukan tali dan ikat simpul untuk menahan posisi botol.",
            "Isi botol dengan tanah humus dan tanam bibit.",
            "Gantung rangkaian botol di dinding yang terkena sinar matahari."
        ]
    },
    {
        id: 2,
        title: "Organizer Meja Kaleng Susu",
        image: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=800&q=80",
        difficulty: "Mudah",
        time: "30 Menit",
        category: "Home Decor",
        description: "Rapikan meja kerjamu dengan organizer unik dari kaleng bekas. Bisa dicat warna-warni sesuai selera!",
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        materials: ["Kaleng bekas", "Cat akrilik", "Kuas", "Lem tembak", "Pita hias"],
        steps: [
            "Bersihkan kaleng dari sisa makanan dan label.",
            "Ampelas bagian tajam di bibir kaleng agar aman.",
            "Warnai kaleng dengan cat akrilik, buat pola sesuai kreasi.",
            "Tunggu kering, lalu hias dengan pita atau stiker.",
            "Gabungkan beberapa kaleng dengan lem tembak untuk organizer bertingkat."
        ]
    },
    {
        id: 3,
        title: "Tas Kece dari Jeans Lama",
        image: "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=800&q=80",
        difficulty: "Sedang",
        time: "2 Jam",
        category: "Fashion",
        description: "Jangan buang celana jeans bekasmu! Ubah menjadi tote bag keren yang kuat dan stylish untuk belanja.",
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        materials: ["Celana jeans bekas", "Gunting kain", "Benang & Jarum", "Mesin jahit (opsional)", "Resleting"],
        steps: [
            "Potong bagian kaki celana jeans, sisakan bagian atas.",
            "Jahit rapat bagian bekas potongan kaki untuk menjadi dasar tas.",
            "Gunakan potongan kaki jeans untuk membuat tali tas.",
            "Jahit tali tas ke bagian pinggang celana.",
            "Tambahkan hiasan atau lining dalam jika diinginkan."
        ]
    }
];

export default function DiyDetailPage() {
    const params = useParams();
    const router = useRouter();
    const id = Number(params.id);
    const diy = diyDetailData.find(d => d.id === id) || diyDetailData[0];

    // Interaction States
    const [isLiked, setIsLiked] = useState(false);
    const [likeCount, setLikeCount] = useState(89);
    const [isBookmarked, setIsBookmarked] = useState(false);
    const [comment, setComment] = useState("");
    const [comments, setComments] = useState([
        { id: 1, user: "Budi Santoso", text: "Tutorialnya jelas banget, makasih min!", time: "1 jam yang lalu", avatar: "BS" },
        { id: 2, user: "Ani Wijaya", text: "Botol bekas di rumah jadi bermanfaat deh.", time: "3 jam yang lalu", avatar: "AW" }
    ]);

    const handleLike = () => {
        setIsLiked(!isLiked);
        setLikeCount(prev => isLiked ? prev - 1 : prev + 1);
    };

    const handleShare = () => {
        if (navigator.share) {
            navigator.share({
                title: diy.title,
                text: "Yuk bikin DIY keren ini!",
                url: window.location.href,
            });
        } else {
            alert("Tautan disalin ke clipboard!");
        }
    };

    const handleCommentSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!comment.trim()) return;
        setComments(prev => [
            { id: Date.now(), user: "Anda", text: comment, time: "Baru saja", avatar: "ME" },
            ...prev
        ]);
        setComment("");
    };

    return (
        <div className="min-h-screen bg-[#FDFBF7] font-sans pb-32">
            {/* Header / Hero Image */}
            <div className="sticky top-0 h-[70vh] w-full overflow-hidden">
                <motion.img
                    initial={{ scale: 1.1 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 1.5 }}
                    src={diy.image}
                    alt={diy.title}
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-[#FDFBF7]"></div>

                {/* Navbar Overlay */}
                <div className="absolute top-0 left-0 right-0 p-6 flex justify-between items-center z-10">
                    <button onClick={() => router.back()} className="p-3 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-white/40 transition-all border border-white/30 group">
                        <IconArrowLeft size={24} className="group-hover:-translate-x-1 transition-transform" />
                    </button>
                    <div className="flex gap-3">
                        <button onClick={handleShare} className="p-3 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-white/40 transition-all border border-white/30 hover:scale-105 active:scale-95">
                            <IconShare size={24} />
                        </button>
                        <button
                            onClick={() => setIsBookmarked(!isBookmarked)}
                            className={`p-3 backdrop-blur-md rounded-full transition-all border border-white/30 hover:scale-105 active:scale-95 ${isBookmarked ? 'bg-emerald-500 text-white' : 'bg-white/20 text-white hover:bg-white/40'}`}
                        >
                            <IconBookmark size={24} fill={isBookmarked ? "currentColor" : "none"} />
                        </button>
                    </div>
                </div>
            </div>

            <main className="relative z-10 -mt-24 w-full">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="bg-white rounded-t-[3rem] min-h-screen shadow-[0_-10px_40px_rgba(0,0,0,0.05)] border-t border-gray-100 relative overflow-hidden"
                >
                    <div className="max-w-7xl mx-auto px-6 md:px-12 py-16">
                        {/* Header Info */}
                        <div className="text-center mb-10">
                            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-emerald-100 text-emerald-700 rounded-full text-xs font-bold uppercase tracking-wider mb-6 border border-emerald-200">
                                {diy.category}
                            </div>
                            <h1 className="text-3xl md:text-5xl font-black text-gray-900 mb-6 leading-tight">
                                {diy.title}
                            </h1>
                            <div className="flex flex-wrap items-center justify-center gap-4 md:gap-8 text-gray-500 font-medium">
                                <span className="flex items-center gap-2 bg-gray-50 px-4 py-2 rounded-xl border border-gray-100">
                                    <IconChartBar size={20} className="text-emerald-500" />
                                    {diy.difficulty}
                                </span>
                                <span className="flex items-center gap-2 bg-gray-50 px-4 py-2 rounded-xl border border-gray-100">
                                    <IconClock size={20} className="text-emerald-500" />
                                    {diy.time}
                                </span>
                            </div>
                        </div>

                        {/* Video Embed */}
                        <div className="rounded-[2rem] overflow-hidden shadow-2xl shadow-emerald-200/50 border-4 border-white bg-black mb-12 aspect-video relative">
                            <iframe
                                className="w-full h-full"
                                src={diy.videoUrl}
                                title="YouTube video player"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            ></iframe>
                        </div>

                        <div className="grid lg:grid-cols-3 gap-10">
                            {/* Materials Sidebar */}
                            <div className="lg:col-span-1">
                                <div className="bg-emerald-50/50 p-6 rounded-3xl border border-emerald-100 sticky top-24">
                                    <h3 className="font-bold text-lg text-emerald-900 mb-4 flex items-center gap-2">
                                        <span className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 border border-emerald-200">
                                            <IconTools size={16} />
                                        </span>
                                        Alat & Bahan
                                    </h3>
                                    <ul className="space-y-3">
                                        {diy.materials?.map((item, i) => (
                                            <li key={i} className="flex items-start gap-3 text-sm text-gray-700 font-medium">
                                                <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0"></div>
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="lg:col-span-2 space-y-8">
                                <div>
                                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Deskripsi Project</h2>
                                    <p className="text-gray-600 leading-relaxed text-lg">
                                        {diy.description}
                                    </p>
                                </div>

                                <div>
                                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Langkah - Langkah</h2>
                                    <div className="space-y-6">
                                        {diy.steps?.map((step, i) => (
                                            <div key={i} className="flex gap-4 group">
                                                <div className="flex-shrink-0 w-12 h-12 bg-white text-emerald-600 border-2 border-emerald-100 rounded-2xl flex items-center justify-center font-bold text-xl shadow-sm group-hover:bg-emerald-500 group-hover:text-white group-hover:border-emerald-500 transition-all duration-300">
                                                    {i + 1}
                                                </div>
                                                <div className="pt-2 pb-6 border-b border-gray-50 flex-1">
                                                    <p className="text-gray-700 text-lg leading-relaxed font-medium group-hover:text-gray-900 transition-colors">
                                                        {step}
                                                    </p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>


                        {/* Interaction Section */}
                        <div className="mt-12 max-w-3xl mx-auto">
                            <div className="flex items-center justify-between mb-8">
                                <h3 className="font-bold text-xl text-gray-900 flex items-center gap-2">
                                    Diskusi & Pertanyaan <span className="text-gray-400 text-base font-normal">({comments.length})</span>
                                </h3>
                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={handleLike}
                                        className={`flex items-center gap-2 px-6 py-3 rounded-full font-bold transition-all shadow-sm active:scale-95 ${isLiked ? 'bg-red-50 text-red-500 border border-red-200 shadow-red-100' : 'bg-white text-gray-500 border border-gray-200 hover:bg-gray-50'}`}
                                    >
                                        <IconHeart size={20} fill={isLiked ? "currentColor" : "none"} className={isLiked ? "animate-bounce" : ""} />
                                        {likeCount}
                                    </button>
                                </div>
                            </div>

                            <form onSubmit={handleCommentSubmit} className="relative mb-10 group">
                                <input
                                    type="text"
                                    placeholder="Ada pertanyaan tentang project ini?"
                                    value={comment}
                                    onChange={(e) => setComment(e.target.value)}
                                    className="w-full pl-6 pr-14 py-4 bg-white border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 shadow-sm transition-all text-gray-700 placeholder:text-gray-400"
                                />
                                <button
                                    type="submit"
                                    className="absolute right-2 top-2 p-2 bg-emerald-500 text-white rounded-xl hover:bg-emerald-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-md shadow-emerald-200 hover:scale-105 active:scale-95"
                                    disabled={!comment.trim()}
                                >
                                    <IconSend size={20} />
                                </button>
                            </form>

                            <div className="space-y-6">
                                {comments.map(c => (
                                    <motion.div
                                        key={c.id}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="flex gap-4"
                                    >
                                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center text-gray-500 font-bold text-xs shrink-0 border border-gray-200 shadow-sm">
                                            {c.avatar}
                                        </div>
                                        <div className="flex-1 bg-white p-5 rounded-2xl rounded-tl-none border border-gray-100 shadow-sm">
                                            <div className="flex items-center justify-between mb-2">
                                                <span className="font-bold text-gray-900 text-sm">{c.user}</span>
                                                <span className="text-xs text-gray-400 font-medium">{c.time}</span>
                                            </div>
                                            <p className="text-gray-600 text-sm leading-relaxed">{c.text}</p>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </div>
                </motion.div>
            </main>
        </div>
    );
}
