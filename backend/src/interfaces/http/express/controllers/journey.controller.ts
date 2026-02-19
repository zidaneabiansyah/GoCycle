import { Request, Response } from "express";
import { WasteJourneyService } from "../../../../application/journey/services/waste-journey.service";
import { WasteType } from "../../../../domain/enums/WasteType";
import logger from "../../../../infrastructure/logging/logger";

const journeyService = new WasteJourneyService();

export async function simulateJourneyHandler(req: Request, res: Response) {
    try {
        const { wasteType, action } = req.body;

        if (!wasteType || !action) {
            return res.status(400).json({
                error: "VALIDATION_ERROR",
                message: "Waste type and action are required",
            });
        }

        const validWasteTypes = Object.values(WasteType);
        if (!validWasteTypes.includes(wasteType)) {
            return res.status(400).json({
                error: "INVALID_WASTE_TYPE",
                message: "Invalid waste type",
            });
        }

        if (action !== "DISPOSE" && action !== "RECYCLE") {
            return res.status(400).json({
                error: "INVALID_ACTION",
                message: "Action must be DISPOSE or RECYCLE",
            });
        }

        const journey = journeyService.simulateJourney(wasteType, action);

        return res.status(200).json({
            message: "Journey simulated successfully",
            data: journey,
        });
    } catch (err: any) {
        logger.error("Simulate journey failed:", { message: err.message, stack: err.stack });
        return res.status(500).json({ error: "INTERNAL_SERVER_ERROR" });
    }
}
