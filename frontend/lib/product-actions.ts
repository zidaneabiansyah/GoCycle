"use server";

import { createProduct, getMyProducts, CreateProductPayload, ProductResponse } from "./api";
import { getValidAccessToken, getForwardHeaders } from "./auth-actions";

export async function createProductAction(formData: FormData): Promise<{
    success: boolean;
    data?: ProductResponse;
    error?: string;
}> {
    const accessToken = await getValidAccessToken();

    if (!accessToken) {
        return { success: false, error: "Silakan login terlebih dahulu." };
    }

    try {
        const imageFile = formData.get("image") as File;

        if (!imageFile || imageFile.size === 0) {
            return { success: false, error: "Foto produk wajib diupload." };
        }

        const subCategoryId = formData.get("subCategoryId") as string;
        if (!subCategoryId) {
            return { success: false, error: "Sub-Kategori wajib dipilih." };
        }

        const payload: CreateProductPayload = {
            name: formData.get("name") as string,
            description: formData.get("description") as string || undefined,
            category: formData.get("category") as "Kerajinan" | "Bahan Baku",
            subCategoryId,
            price: parseInt(formData.get("price") as string),
            priceUnit: formData.get("priceUnit") as "g" | "kg",
            priceUnitAmount: parseInt(formData.get("priceUnitAmount") as string),
            stock: parseInt(formData.get("stock") as string),
            stockUnit: formData.get("stockUnit") as "g" | "kg",
            image: imageFile,
        };

        const forwardHeaders = await getForwardHeaders();
        const response = await createProduct(accessToken, payload, forwardHeaders);
        return { success: true, data: response.data };
    } catch (error: any) {
        return { success: false, error: error.message || "Terjadi kesalahan." };
    }
}

export async function getMyProductsAction(): Promise<{
    success: boolean;
    data?: ProductResponse[];
    error?: string;
}> {
    const accessToken = await getValidAccessToken();

    if (!accessToken) {
        return { success: false, error: "Silakan login terlebih dahulu." };
    }

    try {
        const forwardHeaders = await getForwardHeaders();
        const response = await getMyProducts(accessToken, forwardHeaders);
        return { success: true, data: response.data };
    } catch (error: any) {
        return { success: false, error: error.message || "Terjadi kesalahan." };
    }
}
