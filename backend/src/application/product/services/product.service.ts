import { ProductRepository } from "../repositories/product.repository";
import { StoreRepository } from "../../store/repositories/store.repository";
import { CreateProductDTO, ProductResponseDTO } from "../dto/product.dto";
import { ImageService } from "../../../infrastructure/upload/image.service";
import { WeightUnit } from "../../../domain/enums/WeightUnit";
import logger from "../../../infrastructure/logging/logger";
import { ProductCategory } from "../../../domain/enums/ProductCategory";

export class ProductService {
    constructor(
        private readonly productRepo: ProductRepository,
        private readonly storeRepo: StoreRepository
    ) { }

    async createProduct(storeId: string, dto: CreateProductDTO): Promise<ProductResponseDTO> {
        // Verify studio exists
        const studio = await this.storeRepo.findById(storeId);
        if (!studio) {
            throw new Error("STORE_NOT_FOUND");
        }

        const productData: Partial<import("../../../infrastructure/database/typeorm/entities/EcoProduct").EcoProduct> = {
            studioId: studio.id,
            name: dto.name.trim(),
            story: dto.description || "Produk daur ulang berkualitas",
            materials: "Material daur ulang",
            category: dto.category,
            subCategoryId: dto.subCategoryId,
            estimatedPrice: dto.price,
            wasteSaved: 0.5, // Default 0.5kg
            co2Reduced: 150, // Default 150g
            imagePath: dto.imagePath,
        };

        if (dto.description) {
            productData.description = dto.description.trim();
        }

        const product = await this.productRepo.createAndSave(productData);

        logger.info(`Product created by studio ${studio.id}: ${product.id}`);

        return this.mapToDTO(product);
    }

    async getProductsByStore(storeId: string): Promise<ProductResponseDTO[]> {
        const products = await this.productRepo.findByStoreId(storeId);
        return products.map(product => this.mapToDTO(product));
    }

    async getAllProducts(category?: ProductCategory): Promise<ProductResponseDTO[]> {
        const products = category
            ? await this.productRepo.findByCategory(category)
            : await this.productRepo.findAll();

        return products.map(product => this.mapToDTO(product));
    }

    private mapToDTO(product: any): ProductResponseDTO {
        return {
            id: product.id,
            storeId: product.studioId,
            storeName: product.studio?.name || "Unknown Studio",
            name: product.name,
            description: product.description,
            category: product.category,
            subCategoryId: product.subCategoryId,
            subCategoryName: product.subCategory?.name,
            price: product.estimatedPrice,
            priceUnit: WeightUnit.KILOGRAM,
            priceUnitAmount: 1,
            stock: 100,
            stockUnit: WeightUnit.KILOGRAM,
            imagePath: product.imagePath,
            imageUrl: ImageService.getImageUrl(product.imagePath),
            createdAt: product.createdAt,
            updatedAt: product.updatedAt,
        };
    }
}
