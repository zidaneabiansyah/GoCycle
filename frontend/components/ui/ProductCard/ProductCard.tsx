"use client";

import { useRouter } from "next/navigation";
import { IconStar, IconShoppingCart, IconHeart } from "@tabler/icons-react";

interface ProductCardProps {
    id: string;
    name: string;
    price: number;
    storeName: string;
    image: string;
    subCategoryName?: string;
    tag?: string | null;
    rating?: number;
    sold?: string;
}

export default function ProductCard({
    id,
    name,
    price,
    storeName,
    image,
    subCategoryName,
    tag,
    rating = 4.5 + Math.random() * 0.5, // Random rating between 4.5-5.0
    sold = "50+"
}: ProductCardProps) {
    const router = useRouter();

    return (
        <div
            onClick={() => router.push(`/marketplace/${id}`)}
            className="group cursor-pointer bg-white rounded-[2rem] p-3 shadow-[0_2px_20px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] hover:-translate-y-2 transition-all duration-500 ease-out h-full flex flex-col border border-gray-100/50"
        >
            {/* Image Section */}
            <div className="relative aspect-square rounded-[1.5rem] overflow-hidden bg-gray-50 mb-4">
                <img
                    src={image}
                    alt={name}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                />

                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Top Badges */}
                <div className="absolute top-3 left-3 flex flex-col gap-2 items-start">
                    {tag && (
                        <span className="px-3 py-1.5 bg-white/90 backdrop-blur-md rounded-full text-[10px] font-bold uppercase tracking-wider text-gray-900 shadow-sm border border-white/20">
                            {tag}
                        </span>
                    )}
                </div>

                {/* Wishlist Button (Optional - appears on hover) */}
                <button className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center text-gray-400 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300 hover:text-red-500 hover:bg-white shadow-sm">
                    <IconHeart size={16} />
                </button>
            </div>

            {/* Content Section */}
            <div className="px-2 pb-2 flex flex-col flex-grow">
                {/* Sub-Category & Rating */}
                <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-lg">
                        {subCategoryName || "Produk"}
                    </span>
                    <div className="flex items-center gap-1">
                        <IconStar size={14} className="text-amber-400 fill-amber-400" />
                        <span className="text-xs font-bold text-gray-700">{rating.toFixed(1)}</span>
                    </div>
                </div>

                {/* Title */}
                <h3 className="font-bold text-lg text-gray-900 leading-tight mb-1 line-clamp-2 group-hover:text-emerald-700 transition-colors">
                    {name}
                </h3>

                {/* Seller & Sold */}
                <div className="flex items-center gap-2 text-xs text-gray-400 mb-4">
                    <span>{storeName}</span>
                    <span>•</span>
                    <span>Terjual {sold}</span>
                </div>

                {/* Price & Action */}
                <div className="mt-auto flex items-center justify-between gap-3">
                    <div className="flex flex-col">
                        <span className="text-[10px] text-gray-400 font-medium uppercase tracking-wider">Harga</span>
                        <p className="font-black text-xl text-gray-900">
                            <span className="text-sm font-bold text-emerald-600 mr-0.5">Rp</span>
                            {price.toLocaleString('id-ID')}
                        </p>
                    </div>

                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            console.log("Add to cart:", id);
                        }}
                        className="h-10 px-4 rounded-xl bg-gray-900 text-white font-bold text-sm flex items-center gap-2 group-hover:bg-emerald-600 transition-colors shadow-lg shadow-gray-200 group-hover:shadow-emerald-200"
                    >
                        <IconShoppingCart size={16} />
                        <span>Add</span>
                    </button>
                </div>
            </div>
        </div>
    );
}
