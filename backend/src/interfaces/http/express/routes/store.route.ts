import { Router } from "express";
import { createStoreHandler, getMyStoreHandler } from "../controllers/store.controller";
import { authenticate } from "../../../../middlewares/auth.middleware";

const router = Router();

router.post("/", authenticate, createStoreHandler);
router.get("/my-store", authenticate, getMyStoreHandler);

export default router;
