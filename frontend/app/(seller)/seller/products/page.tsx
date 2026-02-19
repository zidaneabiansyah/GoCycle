"use client";

import { useState, useEffect } from "react";
import { motion } from "motion/react";
import {
    IconPlus,
    IconSearch,
    IconFilter,
    IconEdit,
    IconTrash,
    IconLoader2,
} from "@tabler/icons-react";
import AddProductModal from "@/components/seller/AddProductModal";
import { getMyProductsAction } from "@/lib/product-actions";
import { ProductResponse } from "@/lib/api";

interface DisplayProduct {
    id: string;
    name: string;
    price: string;
    stock: string;
    category: string;
    subCategory: string;
    status: "Aktif" | "Stok Habis" | "Arsip";
    image: string;
}

export default function SellerProductsPage() {
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [products, setProducts] = useState<DisplayProduct[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string>("");

    // Format product for display
    const formatProductForDisplay = (product: ProductResponse): DisplayProduct => {
        let displayPrice = "";
        let displayStock = "";

        if (product.category === "Kerajinan") {
            displayPrice = `Rp ${product.price.toLocaleString("id-ID")}`;
            displayStock = `${product.stock} pcs`;
        } else {
            // Bahan Baku - display in the same unit as input
            const unit = product.priceUnit;
            const unitAmount = product.priceUnitAmount;

            if (unitAmount === 1) {
                displayPrice = `Rp ${product.price.toLocaleString("id-ID")}/${unit}`;
            } else {
                displayPrice = `Rp ${product.price.toLocaleString("id-ID")}/${unitAmount}${unit}`;
            }

            displayStock = `${product.stock} ${product.stockUnit}`;
        }

        return {
            id: product.id,
            name: product.name,
            price: displayPrice,
            stock: displayStock,
            category: product.category,
            subCategory: product.subCategoryName || "-",
            status: product.stock > 0 ? "Aktif" : "Stok Habis",
            image: product.imageUrl,
        };
    };

    // Fetch products on mount
    useEffect(() => {
        const fetchProducts = async () => {
            setIsLoading(true);
            setError("");

            const result = await getMyProductsAction();

            if (result.success && result.data) {
                const displayProducts = result.data.map(formatProductForDisplay);
                setProducts(displayProducts);
            } else {
                setError(result.error || "Gagal memuat produk");
            }

            setIsLoading(false);
        };

        fetchProducts();
    }, []);

    // Handle add product success from modal
    const handleProductSuccess = (product: ProductResponse) => {
        const displayProduct = formatProductForDisplay(product);
        setProducts([displayProduct, ...products]);
    };

    return (
        <div className="space-y-6">
            {/* Header & Actions */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Produk Saya</h1>
                    <p className="text-gray-500 text-sm">Kelola semua barang daur ulang yang kamu jual.</p>
                </div>
                <button
                    onClick={() => setIsAddModalOpen(true)}
                    className="flex items-center gap-2 bg-emerald-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-emerald-700 transition-colors shadow-lg shadow-emerald-500/20"
                >
                    <IconPlus size={20} /> Tambah Produk
                </button>
            </div>

            {/* Filters */}
            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                    <IconSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    <input
                        type="text"
                        placeholder="Cari nama produk..."
                        className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                </div>
                <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-gray-600 font-medium hover:bg-gray-50">
                    <IconFilter size={20} /> Filter Kategori
                </button>
            </div>

            {/* Loading State */}
            {isLoading && (
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 flex flex-col items-center justify-center">
                    <IconLoader2 className="w-10 h-10 text-emerald-500 animate-spin mb-4" />
                    <p className="text-gray-500">Memuat produk...</p>
                </div>
            )}

            {/* Error State */}
            {error && !isLoading && (
                <div className="bg-red-50 rounded-2xl border border-red-200 p-6 text-center">
                    <p className="text-red-600 font-medium">{error}</p>
                </div>
            )}

            {/* Empty State */}
            {!isLoading && !error && products.length === 0 && (
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 flex flex-col items-center justify-center">
                    <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                        <IconPlus size={32} className="text-gray-400" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">Belum ada produk</h3>
                    <p className="text-gray-500 text-center mb-6">Mulai tambahkan produk daur ulangmu untuk dijual.</p>
                    <button
                        onClick={() => setIsAddModalOpen(true)}
                        className="flex items-center gap-2 bg-emerald-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-emerald-700 transition-colors"
                    >
                        <IconPlus size={20} /> Tambah Produk Pertama
                    </button>
                </div>
            )}

            {/* Product Table */}
            {!isLoading && !error && products.length > 0 && (
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="bg-gray-50 border-b border-gray-100 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                    <th className="px-6 py-4">Produk</th>
                                    <th className="px-6 py-4">Harga Satuan</th>
                                    <th className="px-6 py-4">Stok</th>
                                    <th className="px-6 py-4">Kategori</th>
                                    <th className="px-6 py-4">Sub-Kategori</th>
                                    <th className="px-6 py-4">Status</th>
                                    <th className="px-6 py-4 text-right">Aksi</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {products.map((product) => (
                                    <motion.tr
                                        key={product.id}
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="hover:bg-gray-50 transition-colors group"
                                    >
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-4">
                                                <div className="w-12 h-12 rounded-lg bg-gray-100 overflow-hidden flex-shrink-0">
                                                    <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                                                </div>
                                                <div>
                                                    <div className="font-bold text-gray-900 line-clamp-1">{product.name}</div>
                                                    <div className="text-xs text-gray-400">ID: {product.id.slice(0, 8)}...</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 font-medium text-emerald-600">{product.price}</td>
                                        <td className="px-6 py-4 text-gray-600">{product.stock}</td>
                                        <td className="px-6 py-4">
                                            <span className={`px-2 py-1 rounded-md text-xs font-medium border ${product.category === "Kerajinan"
                                                ? "bg-purple-50 text-purple-600 border-purple-200"
                                                : product.category === "Bahan Baku"
                                                    ? "bg-amber-50 text-amber-600 border-amber-200"
                                                    : "bg-gray-100 text-gray-600 border-gray-200"
                                                }`}>
                                                {product.category}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-gray-600 text-sm">
                                            {product.subCategory}
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${product.status === "Aktif" ? "bg-green-50 text-green-600 border border-green-100" :
                                                product.status === "Stok Habis" ? "bg-red-50 text-red-600 border border-red-100" :
                                                    "bg-gray-100 text-gray-500 border border-gray-200"
                                                }`}>
                                                <span className={`w-1.5 h-1.5 rounded-full ${product.status === "Aktif" ? "bg-green-500" :
                                                    product.status === "Stok Habis" ? "bg-red-500" :
                                                        "bg-gray-400"
                                                    }`}></span>
                                                {product.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex items-center justify-end gap-2 actions opacity-0 group-hover:opacity-100 transition-opacity">
                                                <button className="p-2 text-gray-400 hover:text-emerald-600 bg-white hover:bg-emerald-50 rounded-lg border border-transparent hover:border-emerald-200 transition-all">
                                                    <IconEdit size={18} />
                                                </button>
                                                <button className="p-2 text-gray-400 hover:text-red-600 bg-white hover:bg-red-50 rounded-lg border border-transparent hover:border-red-200 transition-all">
                                                    <IconTrash size={18} />
                                                </button>
                                            </div>
                                        </td>
                                    </motion.tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination (Static) */}
                    <div className="border-t border-gray-100 p-4 flex items-center justify-between">
                        <span className="text-sm text-gray-500">Menampilkan 1-{products.length} dari {products.length} produk</span>
                        <div className="flex gap-2">
                            <button className="px-4 py-2 border border-gray-200 rounded-lg text-sm text-gray-500 hover:bg-gray-50 disabled:opacity-50" disabled>Sebelumnya</button>
                            <button className="px-4 py-2 border border-gray-200 rounded-lg text-sm text-gray-900 hover:bg-gray-50">Selanjutnya</button>
                        </div>
                    </div>
                </div>
            )}

            {/* Add Product Modal */}
            <AddProductModal
                isOpen={isAddModalOpen}
                onClose={() => setIsAddModalOpen(false)}
                onSuccess={handleProductSuccess}
            />
        </div>
    );
}
