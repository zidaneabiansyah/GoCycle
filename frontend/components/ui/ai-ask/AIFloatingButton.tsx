"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
    IconRobot,
    IconX,
    IconSend,
    IconPhoto,
    IconLoader2,
    IconSparkles,
    IconMessageChatbot
} from "@tabler/icons-react";

// Types
type Message = {
    id: string;
    role: "user" | "ai";
    content: string;
    image?: string;
    timestamp: Date;
};

export const AIFloatingButton = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        {
            id: "1",
            role: "ai",
            content: "Halo! Saya Gocycle AI. 🌿\n\nBingung memilah sampah? Kirim foto sampahmu atau tanya apa saja tentang daur ulang, saya siap bantu!",
            timestamp: new Date()
        }
    ]);
    const [inputValue, setInputValue] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    // Auto-scroll to bottom
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        if (isOpen) {
            scrollToBottom();
        }
    }, [messages, isTyping, isOpen]);

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setSelectedImage(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSendMessage = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!inputValue.trim() && !selectedImage) return;

        const newUserMessage: Message = {
            id: Date.now().toString(),
            role: "user",
            content: inputValue,
            image: selectedImage || undefined,
            timestamp: new Date()
        };

        setMessages(prev => [...prev, newUserMessage]);
        setInputValue("");
        setSelectedImage(null);
        setIsTyping(true);

        // Mock AI Response
        setTimeout(() => {
            let aiResponse = "Maaf, saya kurang paham. Bisa coba tanya tentang jenis sampah?";
            const lowerInput = newUserMessage.content.toLowerCase();

            if (newUserMessage.image) {
                aiResponse = "Hmm, saya sedang menganalisis foto ini... 🔍\n\nSepertinya ini **Botol Plastik (PET)**. \n\n✅ **Bisa Didaur Ulang!**\nPastikan botol bersih, remas, dan buang ke tempat sampah warna **Kuning** (Anorganik).";
            } else if (lowerInput.includes("plastik")) {
                aiResponse = "Plastik biasanya masuk kategori **Anorganik**. Jika bersih, bisa didaur ulang. Jangan lupa bersihkan sisa makanan sebelum dibuang ya!";
            } else if (lowerInput.includes("kertas") || lowerInput.includes("kardus")) {
                aiResponse = "Kertas dan kardus masuk tong sampah **Biru**. Pastikan kering dan tidak berminyak agar bisa didaur ulang.";
            } else if (lowerInput.includes("makanan") || lowerInput.includes("sisa")) {
                aiResponse = "Sisa makanan adalah **Organik** (Tong Hijau). Kamu bisa mengolahnya menjadi kompos untuk tanaman di rumah! 🌱";
            } else if (lowerInput.includes("halo") || lowerInput.includes("hai")) {
                aiResponse = "Halo juga! Ada sampah yang bikin kamu bingung hari ini? Foto aja, biar aku bantu identifikasi! 📸";
            }

            const newAiMessage: Message = {
                id: (Date.now() + 1).toString(),
                role: "ai",
                content: aiResponse,
                timestamp: new Date()
            };

            setMessages(prev => [...prev, newAiMessage]);
            setIsTyping(false);
        }, 2000);
    };

    return (
        <>
            <AnimatePresence>
                {isOpen && (

                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="fixed bottom-28 right-4 md:right-8 z-50 w-[90vw] md:w-[450px] h-[650px] max-h-[80vh] bg-white rounded-2xl shadow-2xl border border-gray-100 flex flex-col overflow-hidden"
                    >
                        {/* Header */}
                        <div className="p-4 bg-gradient-to-r from-emerald-500 to-teal-500 flex items-center justify-between text-white shrink-0">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm overflow-hidden">
                                    <img src="/foto/ai_ask.png" alt="AI" className="w-full h-full object-cover" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg leading-tight">Gocycle AI</h3>
                                    <div className="flex items-center gap-1.5 opacity-90">
                                        <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse border border-white/50"></span>
                                        <span className="text-xs font-medium">Online</span>
                                    </div>
                                </div>
                            </div>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="p-2 hover:bg-white/10 rounded-full transition-colors"
                            >
                                <IconX size={20} />
                            </button>
                        </div>

                        {/* Chat Area */}
                        <div className="flex-1 overflow-y-auto p-4 bg-slate-50 scroll-smooth">
                            <div className="space-y-4">
                                {messages.map((msg) => (
                                    <motion.div
                                        key={msg.id}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                                    >
                                        <div className={`flex items-end gap-2 max-w-[85%] ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}>
                                            <div className={`w-6 h-6 rounded-full flex-shrink-0 flex items-center justify-center overflow-hidden shadow-sm ${msg.role === 'ai' ? 'bg-emerald-100 text-emerald-600' : 'bg-gray-200'}`}>
                                                {msg.role === 'ai' ? <IconRobot size={14} /> : <div className="text-[10px] font-bold text-gray-500">ME</div>}
                                            </div>

                                            <div className={`p-3 rounded-2xl shadow-sm text-sm ${msg.role === "user"
                                                ? "bg-emerald-600 text-white rounded-tr-none"
                                                : "bg-white text-gray-800 border border-gray-100 rounded-tl-none"
                                                }`}>
                                                {msg.image && (
                                                    <div className="mb-2 rounded-lg overflow-hidden border border-white/20">
                                                        <img src={msg.image} alt="Uploaded" className="w-full h-auto max-h-40 object-cover" />
                                                    </div>
                                                )}
                                                <p className="whitespace-pre-wrap leading-relaxed">{msg.content}</p>
                                                <span className="text-[10px] block mt-1 opacity-70 text-right">
                                                    {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                                </span>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}

                                {isTyping && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="flex justify-start"
                                    >
                                        <div className="flex items-end gap-2">
                                            <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shadow-sm">
                                                <IconRobot size={14} />
                                            </div>
                                            <div className="bg-white p-3 rounded-2xl rounded-tl-none border border-gray-100 shadow-sm flex gap-1">
                                                <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                                                <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                                                <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-bounce"></span>
                                            </div>
                                        </div>
                                    </motion.div>
                                )}
                                <div ref={messagesEndRef} />
                            </div>
                        </div>

                        {/* Input Area */}
                        <div className="p-3 bg-white border-t border-gray-100 shrink-0">
                            <AnimatePresence>
                                {selectedImage && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        exit={{ opacity: 0, height: 0 }}
                                        className="mb-2 relative"
                                    >
                                        <div className="w-16 h-16 rounded-lg overflow-hidden border border-emerald-100 relative group">
                                            <img src={selectedImage} alt="Preview" className="w-full h-full object-cover" />
                                            <button
                                                onClick={() => setSelectedImage(null)}
                                                className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                                            >
                                                <IconX size={16} className="text-white" />
                                            </button>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            <form onSubmit={handleSendMessage} className="flex gap-2 items-end">
                                <div className="flex-1 relative bg-gray-50 rounded-xl border border-gray-200 focus-within:ring-2 focus-within:ring-emerald-500/20 focus-within:border-emerald-500 transition-all">
                                    <input
                                        type="file"
                                        accept="image/*"
                                        className="hidden"
                                        id="popup-image-upload"
                                        onChange={handleImageUpload}
                                    />
                                    <label
                                        htmlFor="popup-image-upload"
                                        className="absolute left-2 bottom-2 p-1.5 text-gray-400 hover:text-emerald-500 hover:bg-emerald-50 rounded-lg cursor-pointer transition-colors"
                                    >
                                        <IconPhoto size={20} />
                                    </label>

                                    <textarea
                                        value={inputValue}
                                        onChange={(e) => setInputValue(e.target.value)}
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter' && !e.shiftKey) {
                                                e.preventDefault();
                                                handleSendMessage(e);
                                            }
                                        }}
                                        placeholder="Tanya sesuatu..."
                                        className="w-full py-3 pl-10 pr-3 bg-transparent border-none focus:ring-0 resize-none max-h-24 text-sm text-gray-700 placeholder:text-gray-400 rounded-xl"
                                        rows={1}
                                    />
                                </div>

                                <button
                                    type="submit"
                                    disabled={!inputValue.trim() && !selectedImage}
                                    className="p-3 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg transition-all flex-shrink-0"
                                >
                                    {isTyping ? <IconLoader2 className="animate-spin" size={20} /> : <IconSend size={20} />}
                                </button>
                            </form>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <motion.button
                onClick={() => setIsOpen(!isOpen)}
                initial={{ scale: 0, rotate: 180 }}
                animate={{ scale: 1, rotate: 0 }}
                whileHover={{ scale: 1.1, rotate: -10 }}
                whileTap={{ scale: 0.9 }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
                className="fixed bottom-8 right-8 z-50 flex items-center justify-center w-20 h-20 bg-white text-emerald-600 rounded-full shadow-[0_8px_30px_rgb(0,0,0,0.12)] border-4 border-emerald-500 group cursor-pointer"
            >
                {isOpen ? <IconX size={32} className="text-emerald-600" /> : <img src="/foto/ai_ask.png" alt="AI" className="w-14 h-14 object-cover rounded-full" />}

                {!isOpen && (
                    <>
                        <span className="absolute top-0 right-0 w-4 h-4 bg-red-500 border-2 border-white rounded-full animate-bounce"></span>
                    </>
                )}
            </motion.button>
        </>
    );
};
