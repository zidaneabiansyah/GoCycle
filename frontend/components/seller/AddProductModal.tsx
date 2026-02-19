"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { IconX, IconPhoto, IconPackage, IconRecycle, IconUpload, IconTrash, IconTag, IconChevronDown, IconExternalLink } from "@tabler/icons-react";
import { createProductAction } from "@/lib/product-actions";
import { getAllSubCategoriesAction } from "@/lib/sub-category-actions";
import { ProductResponse, SubCategoryResponse } from "@/lib/api";
import { useRouter } from "next/navigation";

interface AddProductModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: (product: ProductResponse) => void;
}

interface ProductFormData {
    name: string;
    description: string;
    category: "Kerajinan" | "Bahan Baku";
    price: number;
    priceUnit: "g" | "kg";
    priceUnitAmount: number; // e.g., 100 means "per 100g" or "per 100kg"
    stock: number;
    stockUnit: "g" | "kg" | "pcs";
    image: string;
}

export default function AddProductModal({ isOpen, onClose, onSuccess }: AddProductModalProps) {
    // Form state
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState<"Kerajinan" | "Bahan Baku">("Kerajinan");
    const [price, setPrice] = useState<number>(0);
    const [priceUnit, setPriceUnit] = useState<"g" | "kg">("kg");
    const [priceUnitAmount, setPriceUnitAmount] = useState<number>(1);
    const [stock, setStock] = useState<number>(0);
    const [stockUnit, setStockUnit] = useState<"g" | "kg" | "pcs">("pcs");
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string>("");
    const [imageError, setImageError] = useState<string>("");
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState<string>("");

    // Sub-category state
    const [subCategories, setSubCategories] = useState<SubCategoryResponse[]>([]);
    const [selectedSubCategoryId, setSelectedSubCategoryId] = useState<string>("");
    const [isLoadingSubCategories, setIsLoadingSubCategories] = useState(false);
    const [subCategoryDropdownOpen, setSubCategoryDropdownOpen] = useState(false);
    const router = useRouter();

    // Fetch sub-categories when modal opens
    useEffect(() => {
        if (isOpen) {
            const fetchSubCategories = async () => {
                setIsLoadingSubCategories(true);
                const result = await getAllSubCategoriesAction();
                if (result.success && result.data) {
                    setSubCategories(result.data);
                }
                setIsLoadingSubCategories(false);
            };
            fetchSubCategories();
        }
    }, [isOpen]);

    // Allowed image formats
    const ALLOWED_FORMATS = [".jpg", ".jpeg", ".png", ".webp"];
    const ALLOWED_MIME_TYPES = ["image/jpeg", "image/png", "image/webp"];

    // Validation: Check if priceUnitAmount exceeds stock
    const getStockValidationError = (): string | null => {
        if (category !== "Bahan Baku" || priceUnitAmount <= 0 || stock <= 0) {
            return null;
        }

        // Convert stock to same unit as priceUnit for comparison
        let stockInPriceUnit = stock;
        if (priceUnit === "g" && stockUnit === "kg") {
            stockInPriceUnit = stock * 1000; // Convert kg to g
        } else if (priceUnit === "kg" && stockUnit === "g") {
            stockInPriceUnit = stock / 1000; // Convert g to kg
        }

        if (priceUnitAmount > stockInPriceUnit) {
            const unitLabel = priceUnit === "g" ? "gram" : "kg";
            return `Harga satuan (${priceUnitAmount} ${unitLabel}) melebihi stok yang tersedia (${stockInPriceUnit.toFixed(stockInPriceUnit < 1 ? 2 : 0)} ${unitLabel})`;
        }

        return null;
    };

    const stockValidationError = getStockValidationError();

    // Reset form when modal opens/closes
    const resetForm = () => {
        setName("");
        setDescription("");
        setCategory("Kerajinan");
        setPrice(0);
        setPriceUnit("kg");
        setPriceUnitAmount(1);
        setStock(0);
        setStockUnit("pcs");
        setImageFile(null);
        setImagePreview("");
        setImageError("");
        setSelectedSubCategoryId("");
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    // Handle image file change
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        setImageError("");

        if (!file) {
            setImageFile(null);
            setImagePreview("");
            return;
        }

        // Check file format
        const fileExtension = "." + file.name.split(".").pop()?.toLowerCase();
        if (!ALLOWED_FORMATS.includes(fileExtension) || !ALLOWED_MIME_TYPES.includes(file.type)) {
            setImageError("Format file tidak didukung. Gunakan .jpg, .jpeg, .png, atau .webp");
            setImageFile(null);
            setImagePreview("");
            if (fileInputRef.current) {
                fileInputRef.current.value = "";
            }
            return;
        }

        setImageFile(file);
        // Create preview
        const reader = new FileReader();
        reader.onloadend = () => {
            setImagePreview(reader.result as string);
        };
        reader.readAsDataURL(file);
    };

    // Remove selected image
    const handleRemoveImage = () => {
        setImageFile(null);
        setImagePreview("");
        setImageError("");
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    // Handle category change
    const handleCategoryChange = (newCategory: "Kerajinan" | "Bahan Baku") => {
        setCategory(newCategory);
        if (newCategory === "Kerajinan") {
            setStockUnit("pcs");
            setPriceUnit("kg");
        } else {
            setStockUnit("kg");
            setPriceUnit("kg");
        }
    };

    // Handle price unit change for Bahan Baku
    const handlePriceUnitChange = (unit: "g" | "kg") => {
        setPriceUnit(unit);
        // If price unit is kg, stock unit must be kg
        if (unit === "kg") {
            setStockUnit("kg");
        }
        // If price unit is g, stock can be g or kg (default to g)
        if (unit === "g") {
            setStockUnit("g");
        }
    };

    // Handle form submit
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitError("");

        if (!imageFile) {
            setSubmitError("Foto produk wajib diupload.");
            setIsSubmitting(false);
            return;
        }

        if (!selectedSubCategoryId) {
            setSubmitError("Sub-Kategori wajib dipilih.");
            setIsSubmitting(false);
            return;
        }

        // Create FormData for server action
        const formData = new FormData();
        formData.append("name", name);
        formData.append("description", description);
        formData.append("category", category);
        formData.append("price", price.toString());
        formData.append("priceUnit", priceUnit);
        formData.append("priceUnitAmount", priceUnitAmount.toString());
        formData.append("stock", stock.toString());
        formData.append("stockUnit", stockUnit);
        formData.append("subCategoryId", selectedSubCategoryId);
        formData.append("image", imageFile);

        try {
            const result = await createProductAction(formData);

            if (result.success && result.data) {
                onSuccess(result.data);
                resetForm();
                onClose();
            } else {
                setSubmitError(result.error || "Terjadi kesalahan. Silakan coba lagi.");
            }
        } catch (error: any) {
            setSubmitError(error.message || "Terjadi kesalahan. Silakan coba lagi.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/50 z-50"
                    />

                    {/* Modal */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto"
                    >
                        <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                            {/* Header */}
                            <div className="sticky top-0 bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between z-10 rounded-t-3xl">
                                <div>
                                    <h2 className="text-xl font-bold text-gray-900">Tambah Produk Baru</h2>
                                    <p className="text-sm text-gray-500">Isi detail produk daur ulangmu</p>
                                </div>
                                <button
                                    onClick={onClose}
                                    className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-xl transition-colors"
                                >
                                    <IconX size={24} />
                                </button>
                            </div>

                            {/* Form */}
                            <form onSubmit={handleSubmit} className="p-6 space-y-6">
                                {/* Category Selection */}
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-3">Kategori Produk</label>
                                    <div className="grid grid-cols-2 gap-4">
                                        <button
                                            type="button"
                                            onClick={() => handleCategoryChange("Kerajinan")}
                                            className={`p-4 rounded-2xl border-2 transition-all flex flex-col items-center gap-2 ${category === "Kerajinan"
                                                ? "border-emerald-500 bg-emerald-50 text-emerald-700"
                                                : "border-gray-200 hover:border-gray-300 text-gray-600"
                                                }`}
                                        >
                                            <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${category === "Kerajinan" ? "bg-emerald-100" : "bg-gray-100"
                                                }`}>
                                                <IconPackage size={24} className={category === "Kerajinan" ? "text-emerald-600" : "text-gray-400"} />
                                            </div>
                                            <span className="font-bold">Kerajinan</span>
                                            <span className="text-xs text-center opacity-70">Produk jadi hasil daur ulang</span>
                                        </button>

                                        <button
                                            type="button"
                                            onClick={() => handleCategoryChange("Bahan Baku")}
                                            className={`p-4 rounded-2xl border-2 transition-all flex flex-col items-center gap-2 ${category === "Bahan Baku"
                                                ? "border-emerald-500 bg-emerald-50 text-emerald-700"
                                                : "border-gray-200 hover:border-gray-300 text-gray-600"
                                                }`}
                                        >
                                            <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${category === "Bahan Baku" ? "bg-emerald-100" : "bg-gray-100"
                                                }`}>
                                                <IconRecycle size={24} className={category === "Bahan Baku" ? "text-emerald-600" : "text-gray-400"} />
                                            </div>
                                            <span className="font-bold">Bahan Baku</span>
                                            <span className="text-xs text-center opacity-70">Sampah terpilah siap olah</span>
                                        </button>
                                    </div>
                                </div>

                                {/* Product Name */}
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Nama Produk</label>
                                    <input
                                        type="text"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        required
                                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
                                        placeholder="Contoh: Botol Plastik PET Bersih"
                                    />
                                </div>

                                {/* Description */}
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Deskripsi</label>
                                    <textarea
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                        rows={3}
                                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all resize-none"
                                        placeholder="Deskripsi kondisi dan kualitas produk..."
                                    />
                                </div>

                                {/* Price Section */}
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Harga Satuan</label>
                                    <div className="flex gap-3">
                                        <div className="relative flex-1">
                                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-medium">Rp</span>
                                            <input
                                                type="number"
                                                value={price || ""}
                                                onChange={(e) => setPrice(Number(e.target.value))}
                                                required
                                                min={0}
                                                className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
                                                placeholder="0"
                                            />
                                        </div>

                                        {/* Unit selection for Bahan Baku */}
                                        {category === "Bahan Baku" && (
                                            <>
                                                <div className="flex items-center gap-2">
                                                    <span className="text-gray-500">per</span>
                                                    <input
                                                        type="number"
                                                        value={priceUnitAmount || ""}
                                                        onChange={(e) => setPriceUnitAmount(Number(e.target.value))}
                                                        min={1}
                                                        className="w-20 px-3 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all text-center"
                                                        placeholder="1"
                                                    />
                                                </div>
                                                <div className="flex rounded-xl overflow-hidden border border-gray-200">
                                                    <button
                                                        type="button"
                                                        onClick={() => handlePriceUnitChange("g")}
                                                        className={`px-4 py-3 font-bold transition-colors ${priceUnit === "g"
                                                            ? "bg-emerald-600 text-white"
                                                            : "bg-gray-50 text-gray-600 hover:bg-gray-100"
                                                            }`}
                                                    >
                                                        g
                                                    </button>
                                                    <button
                                                        type="button"
                                                        onClick={() => handlePriceUnitChange("kg")}
                                                        className={`px-4 py-3 font-bold transition-colors ${priceUnit === "kg"
                                                            ? "bg-emerald-600 text-white"
                                                            : "bg-gray-50 text-gray-600 hover:bg-gray-100"
                                                            }`}
                                                    >
                                                        kg
                                                    </button>
                                                </div>
                                            </>
                                        )}

                                        {category === "Kerajinan" && (
                                            <div className="px-4 py-3 bg-gray-100 rounded-xl text-gray-600 font-medium flex items-center">
                                                /pcs
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Stock Section */}
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Stok</label>
                                    <div className="flex gap-3">
                                        <input
                                            type="number"
                                            value={stock || ""}
                                            onChange={(e) => setStock(Number(e.target.value))}
                                            required
                                            min={0}
                                            className="flex-1 px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
                                            placeholder="0"
                                        />

                                        {/* Stock unit for Kerajinan - always pcs */}
                                        {category === "Kerajinan" && (
                                            <div className="px-4 py-3 bg-gray-100 rounded-xl text-gray-600 font-medium flex items-center">
                                                pcs
                                            </div>
                                        )}

                                        {/* Stock unit for Bahan Baku */}
                                        {category === "Bahan Baku" && (
                                            <>
                                                {priceUnit === "kg" ? (
                                                    // If price is per kg, stock unit is locked to kg
                                                    <div className="px-4 py-3 bg-gray-100 rounded-xl text-gray-600 font-medium flex items-center">
                                                        kg
                                                    </div>
                                                ) : (
                                                    // If price is per g, user can choose g or kg for stock
                                                    <div className="flex rounded-xl overflow-hidden border border-gray-200">
                                                        <button
                                                            type="button"
                                                            onClick={() => setStockUnit("g")}
                                                            className={`px-4 py-3 font-bold transition-colors ${stockUnit === "g"
                                                                ? "bg-emerald-600 text-white"
                                                                : "bg-gray-50 text-gray-600 hover:bg-gray-100"
                                                                }`}
                                                        >
                                                            g
                                                        </button>
                                                        <button
                                                            type="button"
                                                            onClick={() => setStockUnit("kg")}
                                                            className={`px-4 py-3 font-bold transition-colors ${stockUnit === "kg"
                                                                ? "bg-emerald-600 text-white"
                                                                : "bg-gray-50 text-gray-600 hover:bg-gray-100"
                                                                }`}
                                                        >
                                                            kg
                                                        </button>
                                                    </div>
                                                )}
                                            </>
                                        )}
                                    </div>

                                    {/* Stock display preview for Bahan Baku with g unit */}
                                    {category === "Bahan Baku" && stockUnit === "g" && stock > 0 && !stockValidationError && (
                                        <div className="mt-2 text-sm text-gray-500">
                                            Stok akan ditampilkan: <span className="font-bold text-emerald-600">
                                                {(stock / 1000).toFixed(stock >= 100 ? 1 : 2)} kg
                                            </span>
                                        </div>
                                    )}

                                    {/* Validation Error */}
                                    {stockValidationError && (
                                        <div className="mt-2 p-3 bg-red-50 border border-red-200 rounded-xl text-sm text-red-600 font-medium">
                                            ⚠️ {stockValidationError}
                                        </div>
                                    )}
                                </div>

                                {/* Sub-Category Dropdown */}
                                <div className="relative">
                                    <label className="block text-sm font-bold text-gray-700 mb-2">
                                        Sub-Kategori
                                    </label>
                                    {isLoadingSubCategories ? (
                                        <div className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-400 flex items-center gap-2">
                                            <div className="w-4 h-4 border-2 border-gray-300 border-t-emerald-500 rounded-full animate-spin"></div>
                                            Memuat sub-kategori...
                                        </div>
                                    ) : subCategories.length === 0 ? (
                                        <button
                                            type="button"
                                            onClick={() => {
                                                onClose();
                                                router.push("/seller/sub-categories");
                                            }}
                                            className="w-full px-4 py-3 bg-amber-50 border border-amber-200 rounded-xl text-amber-700 font-medium flex items-center justify-center gap-2 hover:bg-amber-100 transition-colors"
                                        >
                                            <IconTag size={18} />
                                            Belum ada sub-kategori. Klik untuk membuat.
                                            <IconExternalLink size={16} />
                                        </button>
                                    ) : (
                                        <div className="relative">
                                            <button
                                                type="button"
                                                onClick={() => setSubCategoryDropdownOpen(!subCategoryDropdownOpen)}
                                                className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-left flex items-center justify-between hover:border-emerald-300 transition-colors"
                                            >
                                                <span className={selectedSubCategoryId ? "text-gray-900" : "text-gray-400"}>
                                                    {selectedSubCategoryId
                                                        ? subCategories.find(sc => sc.id === selectedSubCategoryId)?.name
                                                        : "Pilih sub-kategori (opsional)"}
                                                </span>
                                                <IconChevronDown size={18} className={`text-gray-400 transition-transform ${subCategoryDropdownOpen ? "rotate-180" : ""}`} />
                                            </button>

                                            <AnimatePresence>
                                                {subCategoryDropdownOpen && (
                                                    <motion.div
                                                        initial={{ opacity: 0, y: -10 }}
                                                        animate={{ opacity: 1, y: 0 }}
                                                        exit={{ opacity: 0, y: -10 }}
                                                        className="absolute z-50 w-full mt-2 bg-white border border-gray-200 rounded-xl shadow-lg max-h-48 overflow-y-auto"
                                                    >
                                                        <button
                                                            type="button"
                                                            onClick={() => {
                                                                setSelectedSubCategoryId("");
                                                                setSubCategoryDropdownOpen(false);
                                                            }}
                                                            className="w-full px-4 py-3 text-left text-gray-400 hover:bg-gray-50 transition-colors border-b border-gray-100"
                                                        >
                                                            Tidak ada sub-kategori
                                                        </button>
                                                        {subCategories.map((sc) => (
                                                            <button
                                                                key={sc.id}
                                                                type="button"
                                                                onClick={() => {
                                                                    setSelectedSubCategoryId(sc.id);
                                                                    setSubCategoryDropdownOpen(false);
                                                                }}
                                                                className={`w-full px-4 py-3 text-left hover:bg-emerald-50 transition-colors flex items-center gap-2 ${selectedSubCategoryId === sc.id ? "bg-emerald-50 text-emerald-700" : "text-gray-700"
                                                                    }`}
                                                            >
                                                                <IconTag size={16} className="text-emerald-500" />
                                                                {sc.name}
                                                            </button>
                                                        ))}
                                                        <button
                                                            type="button"
                                                            onClick={() => {
                                                                onClose();
                                                                router.push("/seller/sub-categories");
                                                            }}
                                                            className="w-full px-4 py-3 text-left text-emerald-600 hover:bg-emerald-50 transition-colors border-t border-gray-100 flex items-center gap-2 font-medium"
                                                        >
                                                            <IconTag size={16} />
                                                            + Tambah Sub-Kategori Baru
                                                        </button>
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </div>
                                    )}
                                </div>

                                {/* Image Upload */}
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">
                                        Foto Produk <span className="text-red-500">*</span>
                                    </label>

                                    {/* Image Preview or Upload Area */}
                                    {imagePreview ? (
                                        <div className="relative w-full h-48 rounded-xl overflow-hidden border-2 border-emerald-200 bg-gray-50">
                                            <img
                                                src={imagePreview}
                                                alt="Preview"
                                                className="w-full h-full object-contain"
                                            />
                                            <button
                                                type="button"
                                                onClick={handleRemoveImage}
                                                className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors shadow-lg"
                                            >
                                                <IconTrash size={18} />
                                            </button>
                                        </div>
                                    ) : (
                                        <div
                                            onClick={() => fileInputRef.current?.click()}
                                            className={`w-full h-48 border-2 border-dashed rounded-xl flex flex-col items-center justify-center cursor-pointer transition-all ${imageError
                                                ? "border-red-300 bg-red-50"
                                                : "border-gray-300 hover:border-emerald-400 hover:bg-emerald-50"
                                                }`}
                                        >
                                            <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-3 ${imageError ? "bg-red-100" : "bg-gray-100"
                                                }`}>
                                                <IconUpload size={28} className={imageError ? "text-red-400" : "text-gray-400"} />
                                            </div>
                                            <p className={`text-sm font-medium ${imageError ? "text-red-600" : "text-gray-600"}`}>
                                                Klik untuk upload foto
                                            </p>
                                            <p className="text-xs text-gray-400 mt-1">
                                                Format: JPG, JPEG, PNG, WebP
                                            </p>
                                        </div>
                                    )}

                                    {/* Hidden file input */}
                                    <input
                                        ref={fileInputRef}
                                        type="file"
                                        accept=".jpg,.jpeg,.png,.webp"
                                        onChange={handleImageChange}
                                        className="hidden"
                                    />

                                    {/* Error message */}
                                    {imageError && (
                                        <p className="mt-2 text-sm text-red-600 font-medium">
                                            ⚠️ {imageError}
                                        </p>
                                    )}
                                </div>

                                {/* Actions */}
                                <div className="flex gap-3 pt-4 border-t border-gray-100">
                                    <button
                                        type="button"
                                        onClick={() => {
                                            resetForm();
                                            onClose();
                                        }}
                                        className="flex-1 py-3 px-6 bg-gray-100 text-gray-700 rounded-xl font-bold hover:bg-gray-200 transition-colors"
                                    >
                                        Batal
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={isSubmitting || !name || price <= 0 || stock <= 0 || !imageFile || !selectedSubCategoryId || !!stockValidationError}
                                        className="flex-1 py-3 px-6 bg-emerald-600 text-white rounded-xl font-bold hover:bg-emerald-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                    >
                                        {isSubmitting ? (
                                            <>
                                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                                Menyimpan...
                                            </>
                                        ) : (
                                            "Tambah Produk"
                                        )}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
