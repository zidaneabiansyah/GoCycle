import { Request, Response } from "express";
import { StoreService } from "../../../../application/store/services/store.service";
import { StoreRepository } from "../../../../application/store/repositories/store.repository";
import { UserRepository } from "../../../../application/user/repositories/user.repository";
import { createStoreSchema } from "../../../../application/store/validators/store.validator";
import logger from "../../../../infrastructure/logging/logger";

const storeRepo = new StoreRepository();
const userRepo = new UserRepository();
const storeService = new StoreService(storeRepo, userRepo);

export async function createStoreHandler(req: Request, res: Response) {
    try {
        const userId = req.user?.id;
        if (!userId) {
            return res.status(401).json({
                error: "UNAUTHORIZED",
                message: "User not authenticated",
            });
        }

        const parseResult = createStoreSchema.safeParse(req.body);
        if (!parseResult.success) {
            return res.status(400).json({
                error: "VALIDATION_ERROR",
                details: parseResult.error.flatten(),
            });
        }

        const dto = {
            name: parseResult.data.name,
            description: parseResult.data.description ?? undefined,
            address: parseResult.data.address,
        };

        const store = await storeService.createStore(userId, dto);

        return res.status(201).json({
            message: "Store created successfully",
            data: store,
        });
    } catch (err: any) {
        if (err.message === "STORE_ALREADY_EXISTS") {
            return res.status(409).json({
                error: "STORE_ALREADY_EXISTS",
                message: "You already have a store",
            });
        }

        logger.error("Create store failed:", { message: err.message, stack: err.stack });
        return res.status(500).json({ error: "INTERNAL_SERVER_ERROR" });
    }
}

export async function getMyStoreHandler(req: Request, res: Response) {
    try {
        const userId = req.user?.id;
        if (!userId) {
            return res.status(401).json({
                error: "UNAUTHORIZED",
                message: "User not authenticated",
            });
        }

        const store = await storeService.getMyStore(userId);

        if (!store) {
            return res.status(404).json({
                error: "STORE_NOT_FOUND",
                message: "You don't have a store yet",
            });
        }

        return res.status(200).json({
            message: "Store retrieved successfully",
            data: store,
        });
    } catch (err: any) {
        logger.error("Get my store failed:", { message: err.message, stack: err.stack });
        return res.status(500).json({ error: "INTERNAL_SERVER_ERROR" });
    }
}
