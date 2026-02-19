import { Router } from "express";
import {
    createSubCategoryHandler,
    updateSubCategoryHandler,
    getAllSubCategoriesHandler,
    getMySubCategoriesHandler,
} from "../controllers/sub-category.controller";
import { authenticate, optionalAuthenticate } from "../../../../middlewares/auth.middleware";

const router = Router();

router.get("/", optionalAuthenticate, getAllSubCategoriesHandler);

router.get("/my-sub-categories", authenticate, getMySubCategoriesHandler);

router.post("/", authenticate, createSubCategoryHandler);

router.put("/:id", authenticate, updateSubCategoryHandler);

export default router;
