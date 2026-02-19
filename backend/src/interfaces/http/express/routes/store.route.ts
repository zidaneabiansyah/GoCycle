import { Router } from "express";
import { createStoreHandler, getMyStoreHandler } from "../controllers/store.controller";

const router = Router();

// Public endpoints - no authentication required for showcase
router.post("/", createStoreHandler);
router.get("/my-store", getMyStoreHandler);

export default router;
