import { Request, Response } from "express";
import { UserService } from "../../../../application/user/services/user.service";
import { UserRepository } from "../../../../application/user/repositories/user.repository";
import logger from "../../../../infrastructure/logging/logger";

const userRepo = new UserRepository();
const userService = new UserService(userRepo);

export async function getProfileHandler(req: Request, res: Response) {
    try {
        const userId = req.user?.id;
        if (!userId) {
            return res.status(401).json({
                error: "UNAUTHORIZED",
                message: "User not authenticated",
            });
        }

        const profile = await userService.getProfile(userId);

        return res.status(200).json({
            message: "Profile retrieved successfully",
            data: profile,
        });
    } catch (err: any) {
        if (err.message === "USER_NOT_FOUND") {
            return res.status(404).json({
                error: "USER_NOT_FOUND",
                message: "User not found",
            });
        }

        logger.error("Get profile failed:", { message: err.message, stack: err.stack });
        return res.status(500).json({ error: "INTERNAL_SERVER_ERROR" });
    }
}
