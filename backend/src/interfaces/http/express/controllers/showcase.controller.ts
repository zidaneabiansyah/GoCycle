import { Request, Response } from "express";
import { ShowcaseService } from "../../../../application/showcase/services/showcase.service";
import { ProductRepository } from "../../../../application/product/repositories/product.repository";
import { ProductCategory } from "../../../../domain/enums/ProductCategory";
import logger from "../../../../infrastructure/logging/logger";

const productRepo = new ProductRepository();
const showcaseService = new ShowcaseService(productRepo);

export async function getShowcaseProductsHandler(req: Request, res: Response) {
    try {
        const { category, limit } = req.query;
        
        let productCategory: ProductCategory | undefined;
        if (category && typeof category === 'string') {
            const validCategories = Object.values(ProductCategory);
            if (validCategories.includes(category as ProductCategory)) {
                productCategory = category as ProductCategory;
            }
        }

        const limitNum = limit ? parseInt(limit as string) : undefined;

        const products = await showcaseService.getProducts(productCategory, limitNum);

        return res.status(200).json({
            message: "Showcase products retrieved successfully",
            data: products,
        });
    } catch (err: any) {
        logger.error("Get showcase products failed:", { message: err.message, stack: err.stack });
        return res.status(500).json({ error: "INTERNAL_SERVER_ERROR" });
    }
}

export async function getShowcaseProductByIdHandler(req: Request, res: Response) {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({
                error: "MISSING_ID",
                message: "Product ID is required",
            });
        }

        const product = await showcaseService.getProductById(id);

        if (!product) {
            return res.status(404).json({
                error: "PRODUCT_NOT_FOUND",
                message: "Product not found",
            });
        }

        return res.status(200).json({
            message: "Product retrieved successfully",
            data: product,
        });
    } catch (err: any) {
        logger.error("Get showcase product by ID failed:", { message: err.message, stack: err.stack });
        return res.status(500).json({ error: "INTERNAL_SERVER_ERROR" });
    }
}

export async function getFeaturedProductsHandler(req: Request, res: Response) {
    try {
        const { limit } = req.query;
        const limitNum = limit ? parseInt(limit as string) : 6;

        const products = await showcaseService.getFeaturedProducts(limitNum);

        return res.status(200).json({
            message: "Featured products retrieved successfully",
            data: products,
        });
    } catch (err: any) {
        logger.error("Get featured products failed:", { message: err.message, stack: err.stack });
        return res.status(500).json({ error: "INTERNAL_SERVER_ERROR" });
    }
}
