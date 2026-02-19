import { Router } from "express";
import { getProfileHandler } from "../controllers/user.controller";
import { authenticate } from "../../../../middlewares/auth.middleware";

const router = Router();

router.get("/me", authenticate, getProfileHandler);

export default router;
