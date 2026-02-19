"use client";
import Link from "next/link";
import Image from "next/image";
import ScrollFeatures from "@/components/animations/ScrollFeatures/ScrollFeatures";
import RevealOnScroll from "@/components/animations/RevealOnScroll/RevealOnScroll";
import Hero from "@/components/sections/Hero/Hero";
import ReduceRecycleReuse from "@/components/sections/ReduceRecycleReuse/ReduceRecycleReuse";
import TestimonialsSection from "@/components/sections/Testimonials/Testimonials";
import MarketplacePreview from "@/components/sections/MarketplacePreview/MarketplacePreview";


export default function Home() {
  return (
    <div className="bg-white font-sans">
      {/* Hero Section */}
      <Hero />

      {/* Reduce, Recycle, Reuse Section */}
      <ReduceRecycleReuse />


      {/* Next Section: Bagaimana kerja marketplace */}
      <div className="bg-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <RevealOnScroll direction="up" className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-50 text-[#2E8B57] text-sm font-bold tracking-wide uppercase mb-4 border border-green-100">
              <span className="w-2 h-2 rounded-full bg-[#2E8B57] animate-pulse"></span>
              Cara Kerja GOCYCLE
            </div>
            <h3 className="text-4xl sm:text-5xl font-black text-gray-900 tracking-tight mb-6">
              Ubah Limbah Jadi <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2E8B57] to-[#4ADE80]">Cuan & Karya</span>
            </h3>
            <p className="text-lg text-gray-600 leading-relaxed">
              Proses yang mudah, transparan, dan menguntungkan bagi semua pihak. Bergabunglah dalam ekosistem ekonomi sirkular kami.
            </p>
          </RevealOnScroll>

          {/* Scroll Features Section */}
          <div className="mt-8">
            <ScrollFeatures />
          </div>
        </div>
      </div>

      {/* Marketplace Preview Section */}
      <MarketplacePreview />

      {/* Testimonials Section */}
      <TestimonialsSection />
    </div>
  );
}
