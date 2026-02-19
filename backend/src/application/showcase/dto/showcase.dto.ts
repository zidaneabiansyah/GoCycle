import { ProductCategory } from "../../../domain/enums/ProductCategory";

export interface ShowcaseProductDTO {
    id: string;
    name: string;
    story: string;
    description?: string;
    materials: string;
    category: ProductCategory;
    estimatedPrice: number;
    wasteSaved: number;
    co2Reduced: number;
    impactMetrics?: {
        plasticBottles?: number;
        metalCans?: number;
        cardboardKg?: number;
        glassBottles?: number;
        textileKg?: number;
    };
    imagePath: string;
    imageUrl: string;
    viewCount: number;
    likeCount: number;
    studio: {
        id: string;
        name: string;
        location?: string;
    };
    maker: {
        id: string;
        name: string;
        story?: string;
    };
    createdAt: Date;
}
