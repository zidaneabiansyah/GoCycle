"use client";

import { useParams, useRouter } from "next/navigation";
import { IconArrowLeft, IconSend, IconPaperclip, IconDotsVertical, IconCheck, IconChecks } from "@tabler/icons-react";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";

export default function ChatPage() {
    const params = useParams();
    const router = useRouter();
    const sellerId = params.sellerId as string;
    const sellerName = sellerId.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([
        { id: 1, text: "Halo, apakah produk ini masih tersedia?", sender: "me", time: "10:30", read: true },
        { id: 2, text: "Halo! Ya, produk masih tersedia kak. Silakan diorder :)", sender: "seller", time: "10:32", read: true },
    ]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSend = () => {
        if (!message.trim()) return;
        setMessages([...messages, {
            id: Date.now(),
            text: message,
            sender: "me",
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            read: false
        }]);
        setMessage("");
    };

    return (
        <div className="min-h-screen bg-[#F2F4F5] flex flex-col font-sans overflow-hidden">
            {/* Header - Animated Slide Down */}
            <motion.div
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-gray-100 px-4 py-3 flex items-center justify-between shadow-sm"
            >
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => router.back()}
                        className="p-2 -ml-2 rounded-full hover:bg-gray-100 text-gray-600 transition-all active:scale-95"
                    >
                        <IconArrowLeft size={22} />
                    </button>
                    <div className="flex items-center gap-3">
                        <div className="relative">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-400 to-teal-600 flex items-center justify-center text-white font-bold text-lg shadow-md shadow-emerald-200">
                                {sellerName.charAt(0)}
                            </div>
                            <div className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-white rounded-full animate-pulse"></div>
                        </div>
                        <div>
                            <h1 className="font-bold text-gray-900 text-sm leading-tight">{sellerName}</h1>
                            <p className="text-xs text-emerald-600 font-medium flex items-center gap-1">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block"></span>
                                Online
                            </p>
                        </div>
                    </div>
                </div>

                <button className="p-2 rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors">
                    <IconDotsVertical size={20} />
                </button>
            </motion.div>

            {/* Chat Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-6 bg-[#F2F4F5] scroll-smooth">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 }}
                    className="flex justify-center"
                >
                    <span className="bg-gray-200/60 text-gray-500 text-[10px] px-3 py-1 rounded-full font-bold uppercase tracking-wide backdrop-blur-sm">Hari ini</span>
                </motion.div>

                <AnimatePresence>
                    {messages.map((msg) => (
                        <motion.div
                            key={msg.id}
                            initial={{ opacity: 0, y: 20, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            transition={{ type: "spring", stiffness: 400, damping: 30 }}
                            className={`flex ${msg.sender === "me" ? "justify-end" : "justify-start"}`}
                        >
                            <div
                                className={`max-w-[80%] sm:max-w-[60%] px-5 py-3 rounded-[1.5rem] text-sm leading-relaxed shadow-sm relative group transition-all hover:shadow-md ${msg.sender === "me"
                                        ? "bg-gradient-to-br from-emerald-500 to-emerald-600 text-white rounded-tr-sm"
                                        : "bg-white text-gray-800 rounded-tl-sm border border-gray-100"
                                    }`}
                            >
                                <p>{msg.text}</p>
                                <div className={`text-[10px] mt-1.5 flex items-center justify-end gap-1 ${msg.sender === "me" ? "text-emerald-100" : "text-gray-400"}`}>
                                    <span>{msg.time}</span>
                                    {msg.sender === "me" && (
                                        msg.read ? <IconChecks size={14} /> : <IconCheck size={14} />
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
                <div ref={messagesEndRef} />
            </div>

            {/* Input Area - Animated Slide Up */}
            <motion.div
                initial={{ y: 100 }}
                animate={{ y: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 30, delay: 0.1 }}
                className="sticky bottom-0 bg-white/80 backdrop-blur-xl border-t border-gray-100 p-4 pb-6 sm:pb-4"
            >
                <div className="max-w-3xl mx-auto flex items-end gap-3">
                    <button className="p-3 rounded-full text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 transition-all active:scale-95">
                        <IconPaperclip size={22} />
                    </button>

                    <div className="flex-1 bg-gray-50 rounded-[1.5rem] border border-transparent focus-within:border-emerald-200 focus-within:bg-white focus-within:shadow-[0_0_0_4px_rgba(16,185,129,0.1)] transition-all duration-300 flex items-center px-2">
                        <textarea
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' && !e.shiftKey) {
                                    e.preventDefault();
                                    handleSend();
                                }
                            }}
                            placeholder="Ketik pesan..."
                            className="flex-1 bg-transparent border-none focus:ring-0 focus:outline-none text-gray-900 placeholder:text-gray-400 resize-none py-3 px-3 text-sm max-h-32"
                            rows={1}
                            style={{ minHeight: '46px' }}
                        />
                    </div>

                    <button
                        onClick={handleSend}
                        disabled={!message.trim()}
                        className="p-3 rounded-full bg-emerald-600 text-white shadow-lg shadow-emerald-200 hover:bg-emerald-700 hover:shadow-xl hover:shadow-emerald-300 disabled:opacity-50 disabled:shadow-none disabled:cursor-not-allowed transition-all active:scale-90 flex items-center justify-center group"
                    >
                        <IconSend size={20} className={`transition-transform duration-300 ${message.trim() ? "translate-x-0.5 -translate-y-0.5 group-hover:translate-x-1 group-hover:-translate-y-1" : ""}`} />
                    </button>
                </div>
            </motion.div>
        </div>
    );
}
