"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

interface FetchOptions extends RequestInit {
    skipAuth?: boolean;
}

/**
 * Authenticated fetch wrapper for server-side API calls.
 * Automatically attaches the access token from the httpOnly cookie.
 */
export async function authenticatedFetch(
    endpoint: string,
    options: FetchOptions = {}
): Promise<Response> {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;

    if (!accessToken && !options.skipAuth) {
        redirect("/login");
    }

    const headers: HeadersInit = {
        "Content-Type": "application/json",
        ...options.headers,
    };

    if (accessToken) {
        (headers as Record<string, string>)["Authorization"] = `Bearer ${accessToken}`;
    }

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        ...options,
        headers,
    });

    // If token is expired/invalid, redirect to login
    if (response.status === 401 && !options.skipAuth) {
        // Clear cookies
        cookieStore.delete("accessToken");
        cookieStore.delete("refreshToken");
        cookieStore.delete("userInfo");
        redirect("/login");
    }

    return response;
}

/**
 * Get current user information from cookie.
 * Can be used in client components.
 */
export async function getCurrentUser(): Promise<{
    id: string;
    email: string;
    fullName: string;
    accountType: string;
} | null> {
    const cookieStore = await cookies();
    const userInfo = cookieStore.get("userInfo")?.value;

    if (!userInfo) return null;

    try {
        return JSON.parse(userInfo);
    } catch {
        return null;
    }
}

/**
 * Check if user is authenticated.
 */
export async function isAuthenticated(): Promise<boolean> {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;
    return !!accessToken;
}

/**
 * Require authentication - redirect to login if not authenticated.
 * Use this in server components or server actions that need auth.
 */
export async function requireAuth(): Promise<string> {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;

    if (!accessToken) {
        redirect("/login");
    }

    return accessToken;
}
