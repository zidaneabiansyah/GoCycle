import { Request, Response } from "express";
import { DIYService } from "../../../../application/diy/services/diy.service";
import { DIYTutorialRepository } from "../../../../application/diy/repositories/diy-tutorial.repository";
import { DifficultyLevel } from "../../../../domain/enums/DifficultyLevel";
import logger from "../../../../infrastructure/logging/logger";

const diyRepo = new DIYTutorialRepository();
const diyService = new DIYService(diyRepo);

export async function getDIYTutorialsHandler(req: Request, res: Response) {
    try {
        const { difficulty, limit } = req.query;
        
        let difficultyLevel: DifficultyLevel | undefined;
        if (difficulty && typeof difficulty === 'string') {
            const validDifficulties = Object.values(DifficultyLevel);
            if (validDifficulties.includes(difficulty as DifficultyLevel)) {
                difficultyLevel = difficulty as DifficultyLevel;
            }
        }

        const limitNum = limit ? parseInt(limit as string) : undefined;

        const tutorials = await diyService.getTutorials(difficultyLevel, limitNum);

        return res.status(200).json({
            message: "DIY tutorials retrieved successfully",
            data: tutorials,
        });
    } catch (err: any) {
        logger.error("Get DIY tutorials failed:", { message: err.message, stack: err.stack });
        return res.status(500).json({ error: "INTERNAL_SERVER_ERROR" });
    }
}

export async function getDIYTutorialByIdHandler(req: Request, res: Response) {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({
                error: "MISSING_ID",
                message: "Tutorial ID is required",
            });
        }

        const tutorial = await diyService.getTutorialById(id);

        if (!tutorial) {
            return res.status(404).json({
                error: "TUTORIAL_NOT_FOUND",
                message: "Tutorial not found",
            });
        }

        return res.status(200).json({
            message: "Tutorial retrieved successfully",
            data: tutorial,
        });
    } catch (err: any) {
        logger.error("Get DIY tutorial by ID failed:", { message: err.message, stack: err.stack });
        return res.status(500).json({ error: "INTERNAL_SERVER_ERROR" });
    }
}

export async function incrementDIYViewHandler(req: Request, res: Response) {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({
                error: "MISSING_ID",
                message: "Tutorial ID is required",
            });
        }

        await diyService.incrementView(id);

        return res.status(200).json({
            message: "View count incremented",
        });
    } catch (err: any) {
        logger.error("Increment DIY view failed:", { message: err.message, stack: err.stack });
        return res.status(500).json({ error: "INTERNAL_SERVER_ERROR" });
    }
}

export async function markDIYCompletedHandler(req: Request, res: Response) {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({
                error: "MISSING_ID",
                message: "Tutorial ID is required",
            });
        }

        await diyService.markCompleted(id);

        return res.status(200).json({
            message: "Tutorial marked as completed",
        });
    } catch (err: any) {
        logger.error("Mark DIY completed failed:", { message: err.message, stack: err.stack });
        return res.status(500).json({ error: "INTERNAL_SERVER_ERROR" });
    }
}
