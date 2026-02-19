"use server";

import {
    getAllSubCategories,
    getMySubCategories,
    createSubCategory,
    updateSubCategory,
    SubCategoryResponse
} from "./api";
import { getValidAccessToken, getForwardHeaders } from "./auth-actions";

export async function getAllSubCategoriesAction(): Promise<{
    success: boolean;
    data?: SubCategoryResponse[];
    error?: string;
}> {
    const accessToken = await getValidAccessToken();
    const forwardHeaders = await getForwardHeaders();

    try {
        const response = await getAllSubCategories(accessToken || undefined, forwardHeaders);
        return { success: true, data: response.data };
    } catch (error: any) {
        return { success: false, error: error.message || "Terjadi kesalahan." };
    }
}

export async function getMySubCategoriesAction(): Promise<{
    success: boolean;
    data?: SubCategoryResponse[];
    error?: string;
}> {
    const accessToken = await getValidAccessToken();

    if (!accessToken) {
        return { success: false, error: "Silakan login terlebih dahulu." };
    }

    try {
        const forwardHeaders = await getForwardHeaders();
        const response = await getMySubCategories(accessToken, forwardHeaders);
        return { success: true, data: response.data };
    } catch (error: any) {
        return { success: false, error: error.message || "Terjadi kesalahan." };
    }
}

export async function createSubCategoryAction(name: string): Promise<{
    success: boolean;
    data?: SubCategoryResponse;
    error?: string;
}> {
    const accessToken = await getValidAccessToken();

    if (!accessToken) {
        return { success: false, error: "Silakan login terlebih dahulu." };
    }

    try {
        const forwardHeaders = await getForwardHeaders();
        const response = await createSubCategory(accessToken, name, forwardHeaders);
        return { success: true, data: response.data };
    } catch (error: any) {
        return { success: false, error: error.message || "Terjadi kesalahan." };
    }
}

export async function updateSubCategoryAction(id: string, name: string): Promise<{
    success: boolean;
    data?: SubCategoryResponse;
    error?: string;
}> {
    const accessToken = await getValidAccessToken();

    if (!accessToken) {
        return { success: false, error: "Silakan login terlebih dahulu." };
    }

    try {
        const forwardHeaders = await getForwardHeaders();
        const response = await updateSubCategory(accessToken, id, name, forwardHeaders);
        return { success: true, data: response.data };
    } catch (error: any) {
        return { success: false, error: error.message || "Terjadi kesalahan." };
    }
}
