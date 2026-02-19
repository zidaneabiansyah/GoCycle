import { Router } from "express";
import {
    getMakersHandler,
    getMakerByIdHandler,
} from "../controllers/makers.controller";

const router = Router();

router.get("/", getMakersHandler);
router.get("/:id", getMakerByIdHandler);

export default router;
