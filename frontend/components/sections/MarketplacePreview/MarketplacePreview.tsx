"use client";

import { useState, useEffect } from "react";
import { motion } from "motion/react";
import Link from "next/link";
import { IconArrowRight } from "@tabler/icons-react";
import ProductCard from "@/components/ui/ProductCard/ProductCard";
import { getPublicProductsAction } from "@/lib/public-product-actions";
import { ProductResponse } from "@/lib/api";

export default function MarketplacePreview() {
    const [products, setProducts] = useState<ProductResponse[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function fetchProducts() {
            const result = await getPublicProductsAction();
            if (result.success && result.data) {
                // Show max 4 products
                setProducts(result.data.slice(0, 4));
            }
            setIsLoading(false);
        }
        fetchProducts();
    }, []);

    // Random tags for visual variety
    const getTags = (index: number): string | null => {
        const tags = ["Best Seller", "New", null, "Limited"];
        return tags[index % tags.length];
    };

    return (
        <section className="bg-gradient-to-br from-white via-green-50/30 to-white py-24 relative overflow-hidden">
            {/* Subtle Background Pattern */}
            <div className="absolute inset-0 opacity-[0.03]">
                <div className="absolute inset-0" style={{
                    backgroundImage: 'radial-gradient(circle at 1px 1px, #2E8B57 1px, transparent 0)',
                    backgroundSize: '40px 40px'
                }}></div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                {/* Header */}
                <div className="text-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#2E8B57]/10 text-[#2E8B57] text-sm font-semibold mb-4"
                    >
                        <span className="w-2 h-2 bg-[#2E8B57] rounded-full animate-pulse"></span>
                        Marketplace
                    </motion.div>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-5xl font-bold text-gray-900 mb-4"
                    >
                        Produk <span className="text-[#2E8B57]">Terpopuler</span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-gray-600 max-w-2xl mx-auto text-lg"
                    >
                        Temukan produk berkualitas dari limbah daur ulang pilihan
                    </motion.p>
                </div>

                {/* Products Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                    {isLoading ? (
                        // Skeleton loading
                        [...Array(4)].map((_, index) => (
                            <div key={index} className="bg-gray-100 rounded-[2rem] h-[400px] animate-pulse" />
                        ))
                    ) : products.length === 0 ? (
                        <div className="col-span-4 text-center py-12 text-gray-500">
                            Belum ada produk tersedia
                        </div>
                    ) : (
                        products.map((product, index) => (
                            <motion.div
                                key={product.id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <ProductCard
                                    id={product.id}
                                    name={product.name}
                                    price={product.price}
                                    storeName={product.storeName}
                                    image={product.imageUrl}
                                    subCategoryName={product.subCategoryName}
                                    tag={getTags(index)}
                                />
                            </motion.div>
                        ))
                    )}
                </div>

                {/* View All CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center"
                >
                    <Link
                        href="/marketplace"
                        className="inline-flex items-center gap-2 px-8 py-4 bg-[#2E8B57] text-white rounded-xl font-bold shadow-lg hover:bg-[#246e45] hover:shadow-xl transition-all hover:gap-3"
                    >
                        Lihat Semua Produk
                        <IconArrowRight size={20} />
                    </Link>
                </motion.div>
            </div>
        </section>
    );
}
