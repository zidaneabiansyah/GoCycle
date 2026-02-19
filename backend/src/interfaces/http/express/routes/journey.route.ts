import { Router } from "express";
import { simulateJourneyHandler } from "../controllers/journey.controller";

const router = Router();

router.post("/simulate", simulateJourneyHandler);

export default router;
