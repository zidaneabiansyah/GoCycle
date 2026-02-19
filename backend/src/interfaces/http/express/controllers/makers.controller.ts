import { Request, Response } from "express";
import { MakerService } from "../../../../application/makers/services/maker.service";
import { EcoMakerRepository } from "../../../../application/makers/repositories/eco-maker.repository";
import { StoreRepository } from "../../../../application/store/repositories/store.repository";
import { ProductRepository } from "../../../../application/product/repositories/product.repository";
import logger from "../../../../infrastructure/logging/logger";

const makerRepo = new EcoMakerRepository();
const studioRepo = new StoreRepository();
const productRepo = new ProductRepository();
const makerService = new MakerService(makerRepo, studioRepo, productRepo);

export async function getMakersHandler(req: Request, res: Response) {
    try {
        const { limit } = req.query;
        const limitNum = limit ? parseInt(limit as string) : undefined;

        const makers = await makerService.getMakers(limitNum);

        return res.status(200).json({
            message: "Eco makers retrieved successfully",
            data: makers,
        });
    } catch (err: any) {
        logger.error("Get makers failed:", { message: err.message, stack: err.stack });
        return res.status(500).json({ error: "INTERNAL_SERVER_ERROR" });
    }
}

export async function getMakerByIdHandler(req: Request, res: Response) {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({
                error: "MISSING_ID",
                message: "Maker ID is required",
            });
        }

        const maker = await makerService.getMakerById(id);

        if (!maker) {
            return res.status(404).json({
                error: "MAKER_NOT_FOUND",
                message: "Maker not found",
            });
        }

        return res.status(200).json({
            message: "Maker retrieved successfully",
            data: maker,
        });
    } catch (err: any) {
        logger.error("Get maker by ID failed:", { message: err.message, stack: err.stack });
        return res.status(500).json({ error: "INTERNAL_SERVER_ERROR" });
    }
}
