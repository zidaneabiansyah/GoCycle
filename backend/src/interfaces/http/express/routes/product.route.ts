import { Router } from "express";
import {
    createProductHandler,
    getMyProductsHandler,
    getAllProductsHandler,
    handleMulterError,
} from "../controllers/product.controller";
import { authenticate } from "../../../../middlewares/auth.middleware";
import { productImageUpload } from "../../../../infrastructure/upload/upload.config";

const router = Router();

router.post(
    "/",
    authenticate,
    productImageUpload.single("image"),
    handleMulterError,
    createProductHandler
);

router.get("/my-products", authenticate, getMyProductsHandler);

router.get("/", getAllProductsHandler);

export default router;
