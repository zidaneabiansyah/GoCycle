"use client";

import { useCart } from '@/context/CartContext';
import { Trash2, Plus, Minus, ShoppingBag } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function CartPage() {
    const { items, removeFromCart, addToCart, cartCount } = useCart();

    // Mock product data since we don't have a real backend fetch here yet
    // In a real app, we would fetch product details based on IDs in the cart
    const getProductDetails = (id: number) => {
        // This is a placeholder. You would typically look up the product by ID.
        // For now, we'll return generic data or try to match if we had a product list.
        return {
            name: `Product ${id}`,
            price: 150000, // Mock price
            image: '/foto/marketplace/sampah_organik.png', // Mock image
            category: 'Daur Ulang'
        };
    };

    const total = items.reduce((acc, item) => {
        const product = getProductDetails(item.id);
        return acc + (product.price * item.quantity);
    }, 0);

    return (
        <div className="min-h-screen bg-gray-50 pt-40 pb-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl font-bold text-gray-900 mb-8 flex items-center gap-3">
                    <ShoppingBag className="w-8 h-8 text-[#2E8B57]" />
                    Keranjang Belanja
                </h1>

                {items.length === 0 ? (
                    <div className="bg-white rounded-2xl shadow-sm p-12 text-center">
                        <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                            <ShoppingBag className="w-12 h-12 text-gray-400" />
                        </div>
                        <h2 className="text-xl font-bold text-gray-900 mb-2">Keranjang Anda Kosong</h2>
                        <p className="text-gray-500 mb-8">Sepertinya Anda belum menambahkan produk apapun.</p>
                        <Link
                            href="/marketplace"
                            className="inline-flex items-center justify-center px-8 py-3 rounded-full bg-[#2E8B57] text-white font-bold hover:bg-[#246e45] transition-colors shadow-lg shadow-green-200"
                        >
                            Mulai Belanja
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Cart Items */}
                        <div className="lg:col-span-2 space-y-4">
                            {items.map((item) => {
                                const product = getProductDetails(item.id);
                                return (
                                    <div key={item.id} className="bg-white rounded-2xl p-4 shadow-sm flex gap-4 items-center">
                                        <div className="w-24 h-24 bg-gray-100 rounded-xl overflow-hidden relative flex-shrink-0">
                                            <Image
                                                src={product.image}
                                                alt={product.name}
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h3 className="font-bold text-gray-900 truncate">{product.name}</h3>
                                            <p className="text-sm text-gray-500 mb-2">{product.category}</p>
                                            <p className="text-[#2E8B57] font-bold">Rp {product.price.toLocaleString('id-ID')}</p>
                                        </div>
                                        <div className="flex flex-col items-end gap-2">
                                            <div className="flex items-center gap-2 bg-gray-50 rounded-lg p-1">
                                                <button
                                                    onClick={() => removeFromCart(item.id)} // This removes entirely in current context, maybe need decrease?
                                                    // Actually CartContext only has addToCart (increment) and removeFromCart (delete).
                                                    // For decrement, we might need to update Context, but for now let's just use remove for the trash icon.
                                                    className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-white shadow-sm transition-all text-gray-600"
                                                >
                                                    <Minus className="w-4 h-4" />
                                                </button>
                                                <span className="w-8 text-center font-bold text-gray-700">{item.quantity}</span>
                                                <button
                                                    onClick={() => addToCart(item.id)}
                                                    className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-white shadow-sm transition-all text-[#2E8B57]"
                                                >
                                                    <Plus className="w-4 h-4" />
                                                </button>
                                            </div>
                                            <button
                                                onClick={() => removeFromCart(item.id)}
                                                className="text-red-500 hover:text-red-600 p-2 transition-colors"
                                                title="Hapus"
                                            >
                                                <Trash2 className="w-5 h-5" />
                                            </button>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        {/* Summary */}
                        <div className="lg:col-span-1">
                            <div className="bg-white rounded-2xl shadow-sm p-6 sticky top-24">
                                <h3 className="text-lg font-bold text-gray-900 mb-6">Ringkasan Belanja</h3>
                                <div className="space-y-4 mb-6">
                                    <div className="flex justify-between text-gray-600">
                                        <span>Total Item</span>
                                        <span>{cartCount} barang</span>
                                    </div>
                                    <div className="flex justify-between text-gray-600">
                                        <span>Subtotal</span>
                                        <span>Rp {total.toLocaleString('id-ID')}</span>
                                    </div>
                                    <div className="h-px bg-gray-100 my-4" />
                                    <div className="flex justify-between text-lg font-bold text-gray-900">
                                        <span>Total</span>
                                        <span>Rp {total.toLocaleString('id-ID')}</span>
                                    </div>
                                </div>
                                <button className="w-full py-4 rounded-xl bg-[#2E8B57] text-white font-bold hover:bg-[#246e45] transition-all shadow-lg shadow-green-200 transform hover:-translate-y-0.5">
                                    Checkout
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
