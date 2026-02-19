import { DeviceInfo } from "../dto/login.dto";
import { Request } from "express";

const parseDevice = (userAgent: string): string => {
    if (!userAgent) return "Unknown Device";

    const ua = userAgent.toLowerCase();

    if (ua.includes("iphone")) return "iPhone";
    if (ua.includes("ipad")) return "iPad";
    if (ua.includes("android")) {
        if (ua.includes("mobile")) return "Android Phone";
        return "Android Tablet";
    }

    if (ua.includes("windows")) return "Windows PC";
    if (ua.includes("macintosh") || ua.includes("mac os")) return "Mac";
    if (ua.includes("linux")) return "Linux PC";

    if (ua.includes("mobile")) return "Mobile Device";

    return "Desktop";
};

export const extractDeviceInfo = (req: Request): DeviceInfo => {
    // Use req.ip which Express parses correctly with trust proxy enabled
    // This reads X-Forwarded-For properly and gets the first (real) client IP
    let ipAddress = req.ip || req.socket.remoteAddress || "unknown";

    // Remove IPv6 prefix if present (::ffff:)
    if (ipAddress.startsWith("::ffff:")) {
        ipAddress = ipAddress.substring(7);
    }

    const userAgent = req.headers["user-agent"] || "Unknown";
    const device = parseDevice(userAgent);

    return {
        device,
        ipAddress,
        userAgent,
    };
};
