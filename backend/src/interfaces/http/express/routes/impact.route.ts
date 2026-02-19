import { Router } from "express";
import {
    getImpactStatsHandler,
    simulateImpactHandler,
} from "../controllers/impact.controller";

const router = Router();

router.get("/stats", getImpactStatsHandler);
router.post("/simulate", simulateImpactHandler);

export default router;
