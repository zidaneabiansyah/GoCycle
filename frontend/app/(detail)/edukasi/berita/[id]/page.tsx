"use client";

import { useParams, useRouter } from "next/navigation";
import { motion } from "motion/react";
import { IconArrowLeft, IconShare, IconCalendar, IconUser, IconHeart, IconSend, IconBookmark } from "@tabler/icons-react";
import { useState } from "react";

// Mock Data
const newsDetailData = [
    {
        id: 1,
        title: "Gen Z Driving Indonesia's Waste Revolution",
        image: "https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?w=800&q=80",
        source: "EcoTrend",
        date: "28 Nov 2024",
        author: "Sarah Wijaya",
        content: `
            <p class="lead text-lg font-medium text-emerald-900/80 mb-6">Generasi Z di Indonesia kini berada di garis depan pertempuran melawan sampah. Dengan memanfaatkan media sosial dan teknologi digital, mereka mengubah cara pandang masyarakat terhadap daur ulang.</p>
            
            <p class="mb-4">Studi terbaru menunjukkan peningkatan signifikan dalam partisipasi anak muda pada program bank sampah digital. Mereka tidak hanya memilah sampah di rumah, tetapi juga aktif mengedukasi lingkungan sekitar melalui konten kreatif di TikTok dan Instagram.</p>

            <blockquote class="border-l-4 border-emerald-500 pl-4 italic my-8 text-gray-700 bg-emerald-50/50 py-4 pr-4 rounded-r-xl">"Kami tidak ingin mewarisi bumi yang rusak. Daur ulang bukan lagi pilihan, tapi keharusan." <footer class="text-sm mt-2 not-italic font-bold text-emerald-600">— Rina (19), Aktivis Lingkungan</footer></blockquote>

            <h3 class="text-2xl font-bold text-gray-900 mt-8 mb-4">Inovasi Digital</h3>
            <p class="mb-4">Aplikasi penjemputan sampah anorganik menjamur, memudahkan siapa saja untuk menyetor sampah terpilah. Startup seperti Gocycle menjadi jembatan vital antara rumah tangga dan industri daur ulang, menciptakan ekonomi sirkular yang nyata.</p>
            
            <p>Tantangan ke depan masih besar, terutama soal infrastruktur pengolahan sampah di daerah terpencil. Namun, semangat kolaborasi antar komunitas memberikan harapan baru bagi masa depan Indonesia yang lebih bersih.</p>
        `
    },
    {
        id: 2,
        title: "Plastik Jadi Bahan Bakar: Terobosan Baru ITS",
        image: "https://images.unsplash.com/photo-1581093588401-fbb62a02f120?w=800&q=80",
        source: "Tech Green",
        date: "22 Nov 2024",
        author: "Budi Santoso",
        content: `
            <p class="lead text-lg font-medium text-emerald-900/80 mb-6">Tim mahasiswa Institut Teknologi Sepuluh Nopember (ITS) Surabaya kembali menorehkan prestasi gemilang. Mereka berhasil mengembangkan reaktor pirolisis skala rumah tangga yang mampu mengubah sampah plastik menjadi bahan bakar cair setara bensin.</p>
            
            <p class="mb-4">Teknologi ini diharapkan bisa menjadi solusi tumpukan sampah plastik di TPA. Dengan proses pemanasan tanpa oksigen, rantai polimer plastik dipecah menjadi senyawa hidrokarbon yang lebih sederhana.</p>
        `
    },
    { id: 3, title: "Bali Wajibkan Sedotan Bambu", image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&q=80", source: "Eco Policy", date: "15 Nov 2024", author: "Putu Ayu", content: "<p>Konten berita selengkapnya...</p>" },
    { id: 4, title: "Hutan Kota Jakarta", image: "https://images.unsplash.com/photo-1448375240586-dfd8d395ea6c?w=800&q=80", source: "Urban Nature", date: "10 Nov 2024", author: "Joko", content: "<p>Konten berita selengkapnya...</p>" },
    { id: 5, title: "Startup 'SampahKita'", image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=80", source: "BizGreen", date: "05 Nov 2024", author: "Andi", content: "<p>Konten berita selengkapnya...</p>" },
    { id: 6, title: "Festival Musik Bebas Sampah", image: "https://images.unsplash.com/photo-1533174072545-e8d4aa97edf9?w=800&q=80", source: "Culture Pop", date: "01 Nov 2024", author: "Citra", content: "<p>Konten berita selengkapnya...</p>" }
];

export default function NewsDetailPage() {
    const params = useParams();
    const router = useRouter();
    const id = Number(params.id);
    const news = newsDetailData.find(n => n.id === id) || newsDetailData[0];

    // Interaction States
    const [isLiked, setIsLiked] = useState(false);
    const [likeCount, setLikeCount] = useState(124);
    const [isBookmarked, setIsBookmarked] = useState(false);
    const [comment, setComment] = useState("");
    const [comments, setComments] = useState([
        { id: 1, user: "Rudi Hartono", text: "Wah, sangat menginspirasi! Semoga makin banyak anak muda yang peduli.", time: "2 jam yang lalu", avatar: "RH" },
        { id: 2, user: "Siti Aminah", text: "Keren banget ITS! Ditunggu implementasi massalnya.", time: "5 jam yang lalu", avatar: "SA" }
    ]);

    const handleLike = () => {
        setIsLiked(!isLiked);
        setLikeCount(prev => isLiked ? prev - 1 : prev + 1);
    };

    const handleShare = () => {
        if (navigator.share) {
            navigator.share({
                title: news.title,
                text: "Cek berita keren ini di Gocycle!",
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
            {/* Immersive Header Image */}
            <div className="sticky top-0 h-[70vh] w-full overflow-hidden">
                <motion.img
                    initial={{ scale: 1.1 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 1.5 }}
                    src={news.image}
                    alt={news.title}
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/10 to-[#FDFBF7]"></div>

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
                        {/* Meta Info */}
                        <div className="flex flex-wrap gap-4 items-center text-sm font-medium text-gray-400 mb-6">
                            <span className="px-3 py-1 bg-emerald-50 text-emerald-700 rounded-full border border-emerald-100 flex items-center gap-1.5 shadow-sm">
                                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                                {news.source}
                            </span>
                            <span className="flex items-center gap-1.5">
                                <IconCalendar size={16} /> {news.date}
                            </span>
                        </div>

                        <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-gray-900 mb-8 leading-tight tracking-tight">
                            {news.title}
                        </h1>

                        <div className="flex items-center gap-4 mb-10 pb-8 border-b border-gray-100">
                            <div className="w-12 h-12 bg-gradient-to-tr from-emerald-400 to-teal-500 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-md shadow-emerald-200">
                                {news.author.charAt(0)}
                            </div>
                            <div>
                                <p className="font-bold text-gray-900">{news.author}</p>
                                <p className="text-xs text-gray-500">Jurnalis Lingkungan</p>
                            </div>
                        </div>

                        <div className="prose prose-lg prose-emerald hover:prose-a:text-emerald-500 font-normal text-gray-600 leading-relaxed max-w-none">
                            <div dangerouslySetInnerHTML={{ __html: news.content }} />
                        </div>

                        {/* Tags */}
                        <div className="mt-12 flex flex-wrap gap-2">
                            {["Lingkungan", "Daur Ulang", "Inovasi"].map(tag => (
                                <span key={tag} className="px-4 py-2 bg-gray-50 text-gray-500 rounded-xl text-sm font-semibold hover:bg-gray-100 cursor-pointer transition-colors border border-gray-100">
                                    #{tag}
                                </span>
                            ))}
                        </div>


                        {/* Interaction Section */}
                        <div className="mt-8 mb-12">
                            <div className="flex items-center justify-between mb-8">
                                <h3 className="font-bold text-xl text-gray-900 flex items-center gap-2">
                                    Komentar <span className="text-gray-400 text-base font-normal">({comments.length})</span>
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

                            {/* Comment Form */}
                            <form onSubmit={handleCommentSubmit} className="relative mb-10 group">
                                <input
                                    type="text"
                                    placeholder="Tulis pendapatmu..."
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

                            {/* Comments List */}
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
                                        <div className="flex-1 bg-white p-5 rounded-2xl rounded-tl-none border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
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
