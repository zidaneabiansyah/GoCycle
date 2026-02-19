import { Router } from "express";
import {
    getShowcaseProductsHandler,
    getShowcaseProductByIdHandler,
    getFeaturedProductsHandler,
} from "../controllers/showcase.controller";

const router = Router();

router.get("/products", getShowcaseProductsHandler);
router.get("/products/:id", getShowcaseProductByIdHandler);
router.get("/featured", getFeaturedProductsHandler);

export default router;
