import { Repository } from "typeorm";
import { EcoProduct } from "../../../infrastructure/database/typeorm/entities/EcoProduct";
import { AppDataSource } from "../../../infrastructure/database/typeorm/data-source";
import { ProductCategory } from "../../../domain/enums/ProductCategory";

export class ProductRepository {
    private repo: Repository<EcoProduct>;

    constructor() {
        this.repo = AppDataSource.getRepository(EcoProduct);
    }

    async findById(id: string): Promise<EcoProduct | null> {
        return await this.repo.findOne({
            where: { id },
            relations: ["subCategory", "studio", "studio.maker"],
        });
    }

    async findByStoreId(studioId: string): Promise<EcoProduct[]> {
        return await this.repo.find({
            where: { studioId },
            relations: ["subCategory", "studio", "studio.maker"],
            order: { createdAt: "DESC" },
        });
    }

    async findAll(): Promise<EcoProduct[]> {
        return await this.repo.find({
            relations: ["subCategory", "studio", "studio.maker"],
            order: { createdAt: "DESC" },
        });
    }

    async findByCategory(category: ProductCategory): Promise<EcoProduct[]> {
        return await this.repo.find({
            where: { category },
            relations: ["subCategory", "studio", "studio.maker"],
            order: { createdAt: "DESC" },
        });
    }

    async createAndSave(productData: Partial<EcoProduct>): Promise<EcoProduct> {
        const product = this.repo.create(productData);
        const saved = await this.repo.save(product);
        // Reload with relations
        return await this.findById(saved.id) as EcoProduct;
    }
}
