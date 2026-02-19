import { Request, Response } from "express";
import { StoreService } from "../../../../application/store/services/store.service";
import { StoreRepository } from "../../../../application/store/repositories/store.repository";
import { createStoreSchema } from "../../../../application/store/validators/store.validator";
import logger from "../../../../infrastructure/logging/logger";

const storeRepo = new StoreRepository();
const storeService = new StoreService(storeRepo);

export async function createStoreHandler(req: Request, res: Response) {
    try {
        // For showcase: accept makerId from request body
        const { makerId } = req.body;
        if (!makerId) {
            return res.status(400).json({
                error: "MAKER_ID_REQUIRED",
                message: "Maker ID is required",
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

        const store = await storeService.createStore(makerId, dto);

        return res.status(201).json({
            message: "Store created successfully",
            data: store,
        });
    } catch (err: any) {
        if (err.message === "STORE_ALREADY_EXISTS") {
            return res.status(409).json({
                error: "STORE_ALREADY_EXISTS",
                message: "This maker already has a store",
            });
        }

        logger.error("Create store failed:", { message: err.message, stack: err.stack });
        return res.status(500).json({ error: "INTERNAL_SERVER_ERROR" });
    }
}

export async function getMyStoreHandler(req: Request, res: Response) {
    try {
        // For showcase: accept makerId from query param
        const { makerId } = req.query;
        if (!makerId || typeof makerId !== 'string') {
            return res.status(400).json({
                error: "MAKER_ID_REQUIRED",
                message: "Maker ID is required as query parameter",
            });
        }

        const store = await storeService.getMyStore(makerId);

        if (!store) {
            return res.status(404).json({
                error: "STORE_NOT_FOUND",
                message: "Store not found for this maker",
            });
        }

        return res.status(200).json({
            message: "Store retrieved successfully",
            data: store,
        });
    } catch (err: any) {
        logger.error("Get store failed:", { message: err.message, stack: err.stack });
        return res.status(500).json({ error: "INTERNAL_SERVER_ERROR" });
    }
}
