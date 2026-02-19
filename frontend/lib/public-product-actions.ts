"use server";

import { getAllProducts, ProductResponse } from "./api";

export async function getPublicProductsAction(category?: string): Promise<{
    success: boolean;
    data?: ProductResponse[];
    error?: string;
}> {
    try {
        const response = await getAllProducts(category);
        return { success: true, data: response.data };
    } catch (error: any) {
        return { success: false, error: error.message || "Terjadi kesalahan." };
    }
}
