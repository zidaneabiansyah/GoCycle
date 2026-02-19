"use client";

import { useParams, useRouter } from "next/navigation";
import { motion } from "motion/react";
import { IconArrowLeft, IconShare, IconBulb, IconQuote, IconHeart, IconMessageCircle, IconSend, IconBookmark, IconCalendar, IconClock } from "@tabler/icons-react";
import { useState } from "react";

const tipsDetailData = [
    {
        id: 1,
        title: "5 Cara Mulai Zero Waste",
        image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&q=80",
        date: "20 Nov 2024",
        readTime: "5 Menit Baca",
        content: `
            <p class="lead text-lg font-medium text-emerald-900/80 mb-6">Memulai gaya hidup zero waste (minim sampah) mungkin terdengar menakutkan, tapi sebenarnya bisa dimulai dari langkah-langkah kecil di rumah. Kuncinya adalah konsistensi!</p>
            
            <h3 class="text-2xl font-bold text-gray-900 mt-8 mb-4">1. Tolak Plastik Sekali Pakai</h3>
            <p class="mb-4 text-gray-600">Langkah paling mudah adalah membiasakan diri membawa tas belanja sendiri, botol minum, dan wadah makan. Katakan "tidak" pada sedotan plastik dan kantong kresek saat berbelanja.</p>

            <h3 class="text-2xl font-bold text-gray-900 mt-8 mb-4">2. Ganti Produk Sekali Pakai</h3>
            <p class="mb-4 text-gray-600">Beralihlah ke alternatif yang bisa dipakai ulang. Ganti kapas wajah dengan reusable cotton pad, sikat gigi plastik dengan sikat gigi bambu, dan pembalut sekali pakai dengan menstrual cup atau kain.</p>

            <h3 class="text-2xl font-bold text-gray-900 mt-8 mb-4">3. Habiskan Makananmu</h3>
            <p class="mb-4 text-gray-600">Sampah makanan adalah salah satu penyumbang emisi gas rumah kaca terbesar. Masak secukupnya dan simpan sisa makanan dengan baik agar tidak terbuang sia-sia.</p>

            <h3 class="text-2xl font-bold text-gray-900 mt-8 mb-4">4. Beli dalam Jumlah Besar (Bulk)</h3>
            <p class="mb-4 text-gray-600">Membeli produk kebutuhan pokok dalam kemasan besar atau di toko bulk store bisa mengurangi drastis jumlah sampah kemasan sachet yang kamu hasilkan.</p>

            <h3 class="text-2xl font-bold text-gray-900 mt-8 mb-4">5. Kompos Sisa Organik</h3>
            <p class="mb-4 text-gray-600">Jangan biarkan sisa sayuran dan buah masuk ke TPA. Olah menjadi kompos untuk menyuburkan tanaman di rumahmu. Ini menutup siklus makanan kembali ke alam.</p>
        `
    },
    // Fallback data
    {
        id: 2,
        title: "Pilah Sampah: Mudah Kok!",
        image: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=800&q=80",
        date: "18 Nov 2024",
        readTime: "4 Menit Baca",
        content: `
            <p class="lead text-lg font-medium text-emerald-900/80 mb-6">Memilah sampah adalah pondasi dari daur ulang. Tanpa pemilahan, sampah hanya akan menumpuk di TPA. Berikut panduan warna tempat sampah yang umum:</p>
            <ul class="space-y-4 mt-6">
                <li class="flex gap-4 items-start bg-emerald-50 p-4 rounded-xl list-none">
                    <span className="w-4 h-4 rounded-full bg-green-500 mt-1 shrink-0"></span>
                    <div>
                        <strong className="text-gray-900 block mb-1">Hijau (Organik)</strong>
                        <span className="text-gray-600">Sisa makanan, daun, ranting. Bisa dikompos.</span>
                    </div>
                </li>
                <li class="flex gap-4 items-start bg-yellow-50 p-4 rounded-xl list-none">
                    <span className="w-4 h-4 rounded-full bg-yellow-500 mt-1 shrink-0"></span>
                    <div>
                        <strong className="text-gray-900 block mb-1">Kuning (Anorganik)</strong>
                        <span className="text-gray-600">Plastik, kaleng, styrofoam. Bisa didaur ulang.</span>
                    </div>
                </li>
                 <li class="flex gap-4 items-start bg-blue-50 p-4 rounded-xl list-none">
                    <span className="w-4 h-4 rounded-full bg-blue-500 mt-1 shrink-0"></span>
                     <div>
                        <strong className="text-gray-900 block mb-1">Biru (Kertas)</strong>
                        <span className="text-gray-600">Kertas, kardus, karton. Jaga agar tetap kering.</span>
                    </div>
                </li>
            </ul>
        `
    }
];

export default function TipsDetailPage() {
    const params = useParams();
    const router = useRouter();
    const id = Number(params.id);
    const tip = tipsDetailData.find(t => t.id === id) || tipsDetailData[0];

    // Interaction States
    const [isLiked, setIsLiked] = useState(false);
    const [likeCount, setLikeCount] = useState(245);
    const [isBookmarked, setIsBookmarked] = useState(false);
    const [comment, setComment] = useState("");
    const [comments, setComments] = useState([
        { id: 1, user: "Rina Nose", text: "Tips nomor 3 sering banget kelupaan nih. Makasih diingetin!", time: "1 hari yang lalu", avatar: "RN" }
    ]);

    const handleLike = () => {
        setIsLiked(!isLiked);
        setLikeCount(prev => isLiked ? prev - 1 : prev + 1);
    };

    const handleShare = () => {
        if (navigator.share) {
            navigator.share({
                title: tip.title,
                text: "Tips zero waste menarik nih!",
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
            {/* Hero Image */}
            <div className="sticky top-0 h-[70vh] w-full overflow-hidden">
                <motion.img
                    initial={{ scale: 1.1 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 1.5 }}
                    src={tip.image}
                    alt={tip.title}
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-[#FDFBF7]"></div>

                <div className="absolute top-0 left-0 w-full p-6 flex justify-between items-center z-10">
                    <button
                        onClick={() => router.back()}
                        className="p-3 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-white/40 transition-all border border-white/30 group"
                    >
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
                        <div className="flex items-center gap-2 text-emerald-500 text-sm font-bold uppercase tracking-wider mb-4">
                            <IconBulb size={20} className="fill-emerald-100" />
                            <span>Quick Tips</span>
                        </div>

                        <h1 className="text-3xl md:text-5xl font-black text-gray-900 mb-6 leading-tight">
                            {tip.title}
                        </h1>

                        <div className="flex items-center gap-4 text-gray-500 font-medium text-sm border-b border-gray-100 pb-8 mb-8">
                            <span className="flex items-center gap-1.5 bg-gray-50 px-3 py-1 rounded-lg">
                                <IconCalendar size={16} /> {tip.date}
                            </span>
                            <span className="flex items-center gap-1.5 bg-gray-50 px-3 py-1 rounded-lg">
                                <IconClock size={16} /> {tip.readTime}
                            </span>
                        </div>

                        <div className="prose prose-lg prose-emerald hover:prose-a:text-emerald-500 font-normal text-gray-600 leading-relaxed max-w-none">
                            <div dangerouslySetInnerHTML={{ __html: tip.content }} />
                        </div>

                        {/* Quote Box */}
                        <div className="my-10 p-8 bg-emerald-50/80 rounded-3xl border border-emerald-100 relative overflow-hidden group hover:shadow-lg transition-shadow">
                            <IconQuote className="absolute top-4 right-6 text-emerald-200 rotate-180 group-hover:scale-110 transition-transform" size={80} />
                            <p className="text-emerald-900 text-xl font-medium italic relative z-10 font-serif leading-relaxed">
                                "Kita tidak butuh satu orang melakukan zero waste dengan sempurna. Kita butuh jutaan orang melakukannya dengan tidak sempurna."
                            </p>
                            <div className="mt-6 flex items-center gap-3 relative z-10">
                                <div className="w-8 h-1 bg-emerald-300 rounded-full"></div>
                                <p className="text-emerald-700 font-bold text-sm uppercase tracking-widest">Anne Marie Bonneau</p>
                            </div>
                        </div>


                        {/* Interaction Section */}
                        <div className="mt-12 mb-12">
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

                            <form onSubmit={handleCommentSubmit} className="relative mb-10 group">
                                <input
                                    type="text"
                                    placeholder="Bagikan tipsmu juga di sini..."
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
