import { ProductRepository } from "../../product/repositories/product.repository";
import { ShowcaseProductDTO } from "../dto/showcase.dto";
import { ProductCategory } from "../../../domain/enums/ProductCategory";
import { ImageService } from "../../../infrastructure/upload/image.service";

export class ShowcaseService {
    constructor(private productRepo: ProductRepository) {}

    async getProducts(category?: ProductCategory, limit?: number): Promise<ShowcaseProductDTO[]> {
        const products = category
            ? await this.productRepo.findByCategory(category)
            : await this.productRepo.findAll();

        const limitedProducts = limit ? products.slice(0, limit) : products;

        return limitedProducts.map(product => this.mapToShowcaseDTO(product));
    }

    async getProductById(id: string): Promise<ShowcaseProductDTO | null> {
        const product = await this.productRepo.findById(id);
        if (!product) {
            return null;
        }
        return this.mapToShowcaseDTO(product);
    }

    async getFeaturedProducts(limit: number = 6): Promise<ShowcaseProductDTO[]> {
        const products = await this.productRepo.findAll();
        
        // Sort by impact (wasteSaved + co2Reduced)
        const sorted = products.sort((a, b) => {
            const impactA = a.wasteSaved + (a.co2Reduced / 1000);
            const impactB = b.wasteSaved + (b.co2Reduced / 1000);
            return impactB - impactA;
        });

        return sorted.slice(0, limit).map(product => this.mapToShowcaseDTO(product));
    }

    private mapToShowcaseDTO(product: any): ShowcaseProductDTO {
        return {
            id: product.id,
            name: product.name,
            story: product.story,
            description: product.description,
            materials: product.materials,
            category: product.category,
            estimatedPrice: product.estimatedPrice,
            wasteSaved: product.wasteSaved,
            co2Reduced: product.co2Reduced,
            impactMetrics: product.impactMetrics,
            imagePath: product.imagePath,
            imageUrl: ImageService.getImageUrl(product.imagePath),
            viewCount: product.viewCount || 0,
            likeCount: product.likeCount || 0,
            studio: {
                id: product.studio?.id || "",
                name: product.studio?.name || "Unknown Studio",
                location: product.studio?.maker?.location,
            },
            maker: {
                id: product.studio?.maker?.id || "",
                name: product.studio?.maker?.name || "Unknown Maker",
                story: product.studio?.maker?.story,
            },
            createdAt: product.createdAt,
        };
    }
}
