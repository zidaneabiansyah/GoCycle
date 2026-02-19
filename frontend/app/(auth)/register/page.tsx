"use client";

import React, { useState } from "react";
import { IconMail, IconLock, IconUser, IconArrowRight, IconLoader2, IconBrandGoogle, IconCheck, IconEye, IconEyeOff, IconHome } from "@tabler/icons-react";
import { motion } from "motion/react";
import Link from "next/link";
import { registerUser } from "@/lib/api";

export default function RegisterPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Form state
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    // Client-side validation
    if (password !== passwordConfirm) {
      setError("Konfirmasi password tidak cocok");
      setIsLoading(false);
      return;
    }

    if (password.length < 8) {
      setError("Password minimal 8 karakter");
      setIsLoading(false);
      return;
    }

    if (fullName.trim().length < 3) {
      setError("Nama lengkap minimal 3 karakter");
      setIsLoading(false);
      return;
    }

    try {
      await registerUser({
        fullName: fullName.trim(),
        email: email.trim(),
        password,
        passwordConfirm,
      });

      setSuccess(true);
      // Redirect to login after successful registration
      setTimeout(() => {
        window.location.href = "/login";
      }, 2000);
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

  if (success) {
    return (
      <div className="flex h-screen overflow-hidden items-center justify-center bg-white">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <IconCheck className="text-emerald-600" size={40} />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Pendaftaran Berhasil!</h2>
          <p className="text-gray-500">Mengalihkan ke halaman login...</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="relative flex h-screen overflow-hidden bg-white">
      {/* Back to Home Button */}
      <Link
        href="/"
        className="absolute top-6 left-6 z-50 inline-flex w-fit items-center gap-2 px-5 py-2.5 bg-white/80 backdrop-blur-md rounded-full shadow-sm border border-gray-100 text-gray-600 hover:text-emerald-600 hover:shadow-md hover:scale-105 transition-all font-semibold text-sm lg:hidden group"
      >
        <IconHome size={18} className="group-hover:-translate-x-1 transition-transform" />
        <span>Beranda</span>
      </Link>

      {/* Desktop Back Button */}
      <Link
        href="/"
        className="hidden lg:inline-flex absolute top-8 right-8 z-50 w-fit items-center gap-2 px-6 py-3 bg-black/20 backdrop-blur-md rounded-full text-white hover:bg-black/30 transition-all font-semibold text-sm group border border-white/10"
      >
        <IconHome size={18} className="group-hover:-translate-x-1 transition-transform" />
        <span>Beranda</span>
      </Link>

      {/* Right Side - Form (Swapped for Register: Starts Right->Moves Left)
          Target: Left Side (order-1). Animation: From Right (x: 100%) -> 0.
      */}
      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: "0%" }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }} // smooth bezier
        className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-white order-2 lg:order-1 relative z-10"
      >
        <div className="max-w-md w-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            <div className="mb-5">
              <h2 className="text-3xl font-extrabold text-gray-900 mb-1 tracking-tight">Buat Akun Baru</h2>
              <p className="text-gray-500 text-sm">Bergabung dengan 10.000+ pahlawan lingkungan.</p>
            </div>

            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-100 rounded-xl text-red-600 text-xs flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-red-500"></div>
                {error}
              </div>
            )}

            <form onSubmit={handleRegister} className="space-y-3">
              <div className="space-y-1">
                <label className="block text-xs font-semibold text-gray-700 ml-1">Nama Lengkap</label>
                <div className="relative group">
                  <IconUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-emerald-500 transition-colors" size={18} />
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-gray-50/50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-emerald-500/10 focus:border-emerald-500 outline-none transition-all placeholder:text-gray-300 font-medium text-sm"
                    placeholder="Nama Kamu"
                    required
                    disabled={isLoading}
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-semibold text-gray-700 ml-1">Email</label>
                <div className="relative group">
                  <IconMail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-emerald-500 transition-colors" size={18} />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-gray-50/50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-emerald-500/10 focus:border-emerald-500 outline-none transition-all placeholder:text-gray-300 font-medium text-sm"
                    placeholder="nama@email.com"
                    required
                    disabled={isLoading}
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-semibold text-gray-700 ml-1">Password</label>
                <div className="relative group">
                  <IconLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-emerald-500 transition-colors" size={18} />
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-12 py-3 bg-gray-50/50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-emerald-500/10 focus:border-emerald-500 outline-none transition-all placeholder:text-gray-300 font-medium text-sm"
                    placeholder="Min 8 karakter"
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

              <div className="space-y-1">
                <label className="block text-xs font-semibold text-gray-700 ml-1">Konfirmasi Password</label>
                <div className="relative group">
                  <IconLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-emerald-500 transition-colors" size={18} />
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    value={passwordConfirm}
                    onChange={(e) => setPasswordConfirm(e.target.value)}
                    className="w-full pl-10 pr-12 py-3 bg-gray-50/50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-emerald-500/10 focus:border-emerald-500 outline-none transition-all placeholder:text-gray-300 font-medium text-sm"
                    placeholder="Ulangi password"
                    required
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-300 hover:text-gray-600 transition-colors bg-transparent p-1"
                  >
                    {showConfirmPassword ? <IconEyeOff size={16} /> : <IconEye size={16} />}
                  </button>
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="group w-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-bold py-3 rounded-xl hover:shadow-lg hover:shadow-emerald-500/30 hover:scale-[1.01] active:scale-[0.99] transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm"
                >
                  {isLoading ? (
                    <IconLoader2 className="animate-spin" size={20} />
                  ) : (
                    <>
                      <span>Daftar Sekarang</span>
                      <div className="bg-white/20 p-1 rounded-full group-hover:translate-x-1 transition-transform">
                        <IconArrowRight size={14} />
                      </div>
                    </>
                  )}
                </button>
              </div>
            </form>

            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-100"></div>
                </div>
                <div className="relative flex justify-center text-xs">
                  <span className="px-4 bg-white text-gray-400 font-medium">atau daftar dengan</span>
                </div>
              </div>

              <button className="mt-4 w-full bg-white border border-gray-200 text-gray-700 font-bold py-3 rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-all flex items-center justify-center gap-2 group text-sm">
                <IconBrandGoogle size={18} className="text-gray-500 group-hover:text-gray-700 transition-colors" />
                <span>Google</span>
              </button>
            </div>

            <p className="mt-6 text-center text-xs text-gray-500">
              Sudah punya akun? <Link href="/login" className="font-bold text-emerald-600 hover:text-emerald-700 transition-colors hover:underline decoration-2 underline-offset-4">Masuk Saja</Link>
            </p>
          </motion.div>
        </div>
      </motion.div>

      {/* Left Side - Image/Branding (Swapped for Register: Starts Left->Moves Right)
          Target: Right Side (order-2). Animation: From Left (x: -100%) -> 0.
      */}
      <motion.div
        initial={{ x: "-100%" }}
        animate={{ x: "0%" }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }} // smooth bezier
        className="hidden lg:flex w-1/2 bg-gray-900 relative overflow-hidden items-center justify-center order-1 lg:order-2 z-20"
      >
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1611284446314-60a58ac0deb9?q=80&w=1000&auto=format&fit=crop')] bg-cover bg-center opacity-40"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent opacity-80"></div>

        <div className="relative z-10 p-12 text-white max-w-lg text-right">
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            <div className="inline-block px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-sm font-medium text-emerald-300 mb-6">
              🚀 Join #ZeroWaste Movement
            </div>
            <h1 className="text-6xl font-black mb-6 leading-tight tracking-tight">Mulai <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300">Perubahan!</span></h1>
            <p className="text-xl text-gray-300 leading-relaxed font-light">
              Bergabung dengan gerakan peduli lingkungan. Satu langkah kecil dari kamu, satu lompatan besar untuk bumi.
            </p>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
