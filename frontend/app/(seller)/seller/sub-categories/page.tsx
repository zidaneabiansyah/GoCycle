"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
    IconPlus,
    IconEdit,
    IconLoader2,
    IconTag,
    IconCheck,
    IconX,
} from "@tabler/icons-react";
import {
    getAllSubCategoriesAction,
    createSubCategoryAction,
    updateSubCategoryAction
} from "@/lib/sub-category-actions";
import { SubCategoryResponse } from "@/lib/api";

export default function SubCategoriesPage() {
    const [subCategories, setSubCategories] = useState<SubCategoryResponse[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string>("");

    // New sub-category form
    const [newName, setNewName] = useState("");
    const [isCreating, setIsCreating] = useState(false);
    const [createError, setCreateError] = useState("");

    // Edit state
    const [editingId, setEditingId] = useState<string | null>(null);
    const [editName, setEditName] = useState("");
    const [isEditing, setIsEditing] = useState(false);
    const [editError, setEditError] = useState("");

    // Fetch sub-categories
    useEffect(() => {
        const fetchSubCategories = async () => {
            setIsLoading(true);
            setError("");

            const result = await getAllSubCategoriesAction();

            if (result.success && result.data) {
                setSubCategories(result.data);
            } else {
                setError(result.error || "Gagal memuat sub-kategori");
            }

            setIsLoading(false);
        };

        fetchSubCategories();
    }, []);

    // Handle create
    const handleCreate = async () => {
        if (!newName.trim()) return;

        setIsCreating(true);
        setCreateError("");

        const result = await createSubCategoryAction(newName.trim());

        if (result.success && result.data) {
            setSubCategories([result.data, ...subCategories]);
            setNewName("");
        } else {
            setCreateError(result.error || "Gagal membuat sub-kategori");
        }

        setIsCreating(false);
    };

    // Handle edit start
    const handleEditStart = (sc: SubCategoryResponse) => {
        setEditingId(sc.id);
        setEditName(sc.name);
        setEditError("");
    };

    // Handle edit cancel
    const handleEditCancel = () => {
        setEditingId(null);
        setEditName("");
        setEditError("");
    };

    // Handle edit save
    const handleEditSave = async () => {
        if (!editingId || !editName.trim()) return;

        setIsEditing(true);
        setEditError("");

        const result = await updateSubCategoryAction(editingId, editName.trim());

        if (result.success && result.data) {
            setSubCategories(subCategories.map(sc =>
                sc.id === editingId ? result.data! : sc
            ));
            setEditingId(null);
            setEditName("");
        } else {
            setEditError(result.error || "Gagal mengubah sub-kategori");
        }

        setIsEditing(false);
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-2xl font-bold text-gray-900">Sub-Kategori</h1>
                <p className="text-gray-500 text-sm">Kelola sub-kategori produk yang tersedia di GoCycle.</p>
            </div>

            {/* Create New Sub-Category */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <IconPlus size={20} className="text-emerald-600" />
                    Tambah Sub-Kategori Baru
                </h2>
                <div className="flex gap-3">
                    <input
                        type="text"
                        value={newName}
                        onChange={(e) => setNewName(e.target.value)}
                        placeholder="Masukkan nama sub-kategori..."
                        className="flex-1 px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                        onKeyDown={(e) => e.key === "Enter" && handleCreate()}
                    />
                    <button
                        onClick={handleCreate}
                        disabled={isCreating || !newName.trim()}
                        className="px-6 py-3 bg-emerald-600 text-white rounded-xl font-bold hover:bg-emerald-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                    >
                        {isCreating ? (
                            <>
                                <IconLoader2 size={20} className="animate-spin" />
                                Menyimpan...
                            </>
                        ) : (
                            <>
                                <IconPlus size={20} />
                                Tambah
                            </>
                        )}
                    </button>
                </div>
                {createError && (
                    <p className="mt-3 text-sm text-red-600 font-medium">⚠️ {createError}</p>
                )}
                <p className="mt-3 text-xs text-gray-400">
                    * Huruf depan setiap kata akan otomatis menjadi kapital
                </p>
            </div>

            {/* Loading State */}
            {isLoading && (
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 flex flex-col items-center justify-center">
                    <IconLoader2 className="w-10 h-10 text-emerald-500 animate-spin mb-4" />
                    <p className="text-gray-500">Memuat sub-kategori...</p>
                </div>
            )}

            {/* Error State */}
            {error && !isLoading && (
                <div className="bg-red-50 rounded-2xl border border-red-200 p-6 text-center">
                    <p className="text-red-600 font-medium">{error}</p>
                </div>
            )}

            {/* Sub-Categories List */}
            {!isLoading && !error && (
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="p-4 border-b border-gray-100 flex items-center justify-between">
                        <h2 className="font-bold text-gray-900 flex items-center gap-2">
                            <IconTag size={18} className="text-emerald-600" />
                            Daftar Sub-Kategori
                        </h2>
                        <span className="text-sm text-gray-500">{subCategories.length} sub-kategori</span>
                    </div>

                    {subCategories.length === 0 ? (
                        <div className="p-12 text-center">
                            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <IconTag size={28} className="text-gray-400" />
                            </div>
                            <h3 className="text-lg font-bold text-gray-900 mb-2">Belum ada sub-kategori</h3>
                            <p className="text-gray-500 text-sm">Mulai tambahkan sub-kategori untuk produkmu.</p>
                        </div>
                    ) : (
                        <div className="divide-y divide-gray-50">
                            <AnimatePresence>
                                {subCategories.map((sc) => (
                                    <motion.div
                                        key={sc.id}
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        className="p-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
                                    >
                                        {editingId === sc.id ? (
                                            // Edit Mode
                                            <div className="flex-1 flex items-center gap-3">
                                                <input
                                                    type="text"
                                                    value={editName}
                                                    onChange={(e) => setEditName(e.target.value)}
                                                    className="flex-1 px-3 py-2 bg-white border border-emerald-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                                                    autoFocus
                                                    onKeyDown={(e) => e.key === "Enter" && handleEditSave()}
                                                />
                                                <button
                                                    onClick={handleEditSave}
                                                    disabled={isEditing}
                                                    className="p-2 bg-emerald-100 text-emerald-600 rounded-lg hover:bg-emerald-200 transition-colors disabled:opacity-50"
                                                >
                                                    {isEditing ? <IconLoader2 size={18} className="animate-spin" /> : <IconCheck size={18} />}
                                                </button>
                                                <button
                                                    onClick={handleEditCancel}
                                                    className="p-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors"
                                                >
                                                    <IconX size={18} />
                                                </button>
                                            </div>
                                        ) : (
                                            // View Mode
                                            <>
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 bg-gradient-to-br from-emerald-100 to-green-100 rounded-xl flex items-center justify-center">
                                                        <IconTag size={18} className="text-emerald-600" />
                                                    </div>
                                                    <div>
                                                        <p className="font-medium text-gray-900">{sc.name}</p>
                                                        <p className="text-xs text-gray-400">
                                                            {sc.isOwner ? "Milik Anda" : "Sub-kategori publik"}
                                                        </p>
                                                    </div>
                                                </div>
                                                {sc.isOwner && (
                                                    <button
                                                        onClick={() => handleEditStart(sc)}
                                                        className="p-2 text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
                                                    >
                                                        <IconEdit size={18} />
                                                    </button>
                                                )}
                                            </>
                                        )}
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </div>
                    )}

                    {editError && (
                        <div className="p-4 border-t border-gray-100 bg-red-50">
                            <p className="text-sm text-red-600 font-medium">⚠️ {editError}</p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
