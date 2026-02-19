import { Router } from "express";
import {
    createProductHandler,
    getMyProductsHandler,
    getAllProductsHandler,
    handleMulterError,
} from "../controllers/product.controller";
import { productImageUpload } from "../../../../infrastructure/upload/upload.config";

const router = Router();

// Public endpoints - no authentication required for showcase
router.post(
    "/",
    productImageUpload.single("image"),
    handleMulterError,
    createProductHandler
);

router.get("/my-products", getMyProductsHandler);

router.get("/", getAllProductsHandler);

export default router;
