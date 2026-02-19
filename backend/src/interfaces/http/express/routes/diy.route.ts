import { Router } from "express";
import {
    getDIYTutorialsHandler,
    getDIYTutorialByIdHandler,
    incrementDIYViewHandler,
    markDIYCompletedHandler,
} from "../controllers/diy.controller";

const router = Router();

router.get("/tutorials", getDIYTutorialsHandler);
router.get("/tutorials/:id", getDIYTutorialByIdHandler);
router.post("/tutorials/:id/view", incrementDIYViewHandler);
router.post("/tutorials/:id/complete", markDIYCompletedHandler);

export default router;
