import { Request, Response } from "express";
import { CounterService } from "../../../../application/impact/services/counter.service";
import { ImpactCalculatorService } from "../../../../application/impact/services/impact-calculator.service";
import { ImpactCounterRepository } from "../../../../application/impact/repositories/impact-counter.repository";
import logger from "../../../../infrastructure/logging/logger";

const impactRepo = new ImpactCounterRepository();
const counterService = new CounterService(impactRepo);
const calculatorService = new ImpactCalculatorService();

export async function getImpactStatsHandler(req: Request, res: Response) {
    try {
        const stats = await counterService.getCurrentStats();

        return res.status(200).json({
            message: "Impact stats retrieved successfully",
            data: stats,
        });
    } catch (err: any) {
        logger.error("Get impact stats failed:", { message: err.message, stack: err.stack });
        return res.status(500).json({ error: "INTERNAL_SERVER_ERROR" });
    }
}

export async function simulateImpactHandler(req: Request, res: Response) {
    try {
        const { action, quantity } = req.body;

        if (!action || !quantity) {
            return res.status(400).json({
                error: "VALIDATION_ERROR",
                message: "Action and quantity are required",
            });
        }

        const projection = calculatorService.calculateYearlyImpact(action);

        if (!projection) {
            return res.status(400).json({
                error: "INVALID_ACTION",
                message: "Invalid action type",
            });
        }

        // Scale by quantity
        const scaledProjection = {
            wasteSaved: projection.wasteSaved * quantity,
            co2Reduced: projection.co2Reduced * quantity,
            bottlesSaved: projection.bottlesSaved * quantity,
            equivalentTrees: Math.floor(projection.equivalentTrees * quantity),
        };

        return res.status(200).json({
            message: "Impact projection calculated",
            data: scaledProjection,
        });
    } catch (err: any) {
        logger.error("Simulate impact failed:", { message: err.message, stack: err.stack });
        return res.status(500).json({ error: "INTERNAL_SERVER_ERROR" });
    }
}
