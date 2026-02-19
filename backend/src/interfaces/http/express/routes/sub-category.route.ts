import { Router } from "express";
import {
    createSubCategoryHandler,
    updateSubCategoryHandler,
    getAllSubCategoriesHandler,
    getMySubCategoriesHandler,
} from "../controllers/sub-category.controller";

const router = Router();

// Public endpoints - no authentication required for showcase
router.get("/", getAllSubCategoriesHandler);

router.get("/my-sub-categories", getMySubCategoriesHandler);

router.post("/", createSubCategoryHandler);

router.put("/:id", updateSubCategoryHandler);

export default router;
