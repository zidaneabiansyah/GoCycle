"use client";

import React, { useState } from "react";
import { IconMail, IconLock, IconBrandGoogle, IconArrowRight, IconLoader2, IconEye, IconEyeOff, IconHome } from "@tabler/icons-react";
import { motion } from "motion/react";
import Link from "next/link";
import { loginAction } from "@/lib/auth-actions";

export default function LoginPage() {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [showPassword, setShowPassword] = useState(false);

    // Form state
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setIsLoading(true);

        // Client-side validation
        if (!email.trim()) {
            setError("Email harus diisi");
            setIsLoading(false);
            return;
        }

        if (!password) {
            setError("Password harus diisi");
            setIsLoading(false);
            return;
        }

        try {
            const formData = new FormData();
            formData.append("email", email.trim());
            formData.append("password", password);

            const result = await loginAction(formData);

            if (result.success) {
                // Redirect to home page on successful login
                window.location.href = "/";
            } else {
                setError(result.error || "Login gagal. Silakan coba lagi.");
            }
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError("Terjadi kesalahan. Silakan coba lagi.");
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="relative flex h-screen overflow-hidden bg-white">
            {/* Back to Home Button */}
            <Link
                href="/"
                className="absolute top-6 right-6 lg:left-8 z-50 inline-flex w-fit items-center gap-2 px-5 py-2.5 bg-white/80 backdrop-blur-md rounded-full shadow-sm border border-gray-100 text-gray-600 hover:text-emerald-600 hover:shadow-md hover:scale-105 transition-all font-semibold text-sm group"
            >
                <IconHome size={18} className="group-hover:-translate-x-1 transition-transform" />
                <span>Beranda</span>
            </Link>

            {/* Left Side - Image/Branding 
                Target: Left Side. Animation: From Right (x: 100%) -> 0.
            */}
            <motion.div
                initial={{ x: "100%" }}
                animate={{ x: "0%" }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="hidden lg:flex w-1/2 bg-emerald-900 relative overflow-hidden items-center justify-center z-20"
            >
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?q=80&w=1000&auto=format&fit=crop')] bg-cover bg-center opacity-30"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-emerald-950 via-transparent to-transparent opacity-60"></div>

                <div className="relative z-10 p-12 text-white max-w-lg">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.6, duration: 0.8 }}
                    >
                        <div className="inline-block px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-sm font-medium text-emerald-300 mb-6">
                            👋 Welcome Back
                        </div>
                        <h1 className="text-6xl font-black mb-6 leading-tight tracking-tight">Selamat <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300">Datang!</span></h1>
                        <p className="text-xl text-emerald-50 leading-relaxed font-light">
                            Teruskan langkah kecilmu untuk bumi yang lebih bersih. Kelola sampahmu, dapatkan poinnya.
                        </p>
                    </motion.div>
                </div>
            </motion.div>

            {/* Right Side - Form
                Target: Right Side. Animation: From Left (x: -100%) -> 0.
            */}
            <motion.div
                initial={{ x: "-100%" }}
                animate={{ x: "0%" }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-white relative z-10"
            >
                <div className="max-w-md w-full">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6, duration: 0.5 }}
                    >
                        <div className="mb-5">
                            <h2 className="text-3xl font-extrabold text-gray-900 mb-1 tracking-tight">Masuk Akun</h2>
                            <p className="text-gray-500 text-sm">Lanjutkan perjalanan #ZeroWaste kamu.</p>
                        </div>

                        {error && (
                            <div className="mb-4 p-3 bg-red-50 border border-red-100 rounded-xl text-red-600 text-xs flex items-center gap-2">
                                <div className="w-1.5 h-1.5 rounded-full bg-red-500"></div>
                                {error}
                            </div>
                        )}

                        <form onSubmit={handleLogin} className="space-y-4">
                            <div className="space-y-1">
                                <label className="block text-xs font-semibold text-gray-700 ml-1">Email</label>
                                <div className="relative group">
                                    <IconMail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-emerald-500 transition-colors" size={18} />
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="Masukkan email kamu"
                                        className="w-full pl-10 pr-4 py-3 bg-gray-50/50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-emerald-500/10 focus:border-emerald-500 outline-none transition-all placeholder:text-gray-300 font-medium text-sm"
                                        required
                                        disabled={isLoading}
                                    />
                                </div>
                            </div>

                            <div className="space-y-1">
                                <div className="flex justify-between items-center mb-1 ml-1">
                                    <label className="block text-xs font-semibold text-gray-700">Password</label>
                                    <a href="#" className="text-xs font-bold text-emerald-600 hover:text-emerald-700 hover:underline">Lupa Password?</a>
                                </div>
                                <div className="relative group">
                                    <IconLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-emerald-500 transition-colors" size={18} />
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="Masukkan password kamu"
                                        className="w-full pl-10 pr-12 py-3 bg-gray-50/50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-emerald-500/10 focus:border-emerald-500 outline-none transition-all placeholder:text-gray-300 font-medium text-sm"
                                        required
                                        disabled={isLoading}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-300 hover:text-gray-600 transition-colors bg-transparent p-1"
                                    >
                                        {showPassword ? <IconEyeOff size={16} /> : <IconEye size={16} />}
                                    </button>
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={isLoading}
                                className="group w-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-bold py-3 rounded-xl hover:shadow-lg hover:shadow-emerald-500/30 hover:scale-[1.01] active:scale-[0.99] transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm"
                            >
                                {isLoading ? (
                                    <IconLoader2 className="animate-spin" size={20} />
                                ) : (
                                    <>
                                        <span>Masuk Sekarang</span>
                                        <div className="bg-white/20 p-1 rounded-full group-hover:translate-x-1 transition-transform">
                                            <IconArrowRight size={14} />
                                        </div>
                                    </>
                                )}
                            </button>
                        </form>

                        <div className="mt-6">
                            <div className="relative">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-gray-100"></div>
                                </div>
                                <div className="relative flex justify-center text-xs">
                                    <span className="px-4 bg-white text-gray-400 font-medium">atau masuk dengan</span>
                                </div>
                            </div>

                            <button className="mt-4 w-full bg-white border border-gray-200 text-gray-700 font-bold py-3 rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-all flex items-center justify-center gap-2 group text-sm">
                                <IconBrandGoogle size={18} className="text-gray-500 group-hover:text-gray-700 transition-colors" />
                                <span>Google</span>
                            </button>
                        </div>

                        <p className="mt-6 text-center text-xs text-gray-500">
                            Belum punya akun? <Link href="/register" className="font-bold text-emerald-600 hover:text-emerald-700 transition-colors hover:underline decoration-2 underline-offset-4">Daftar Gratis</Link>
                        </p>
                    </motion.div>
                </div>
            </motion.div>
        </div>
    );
}
