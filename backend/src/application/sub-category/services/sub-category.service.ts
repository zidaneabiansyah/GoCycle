import { SubCategoryRepository } from "../repositories/sub-category.repository";
import { StoreRepository } from "../../store/repositories/store.repository";
import { CreateSubCategoryDTO, UpdateSubCategoryDTO, SubCategoryResponseDTO } from "../dto/sub-category.dto";
import logger from "../../../infrastructure/logging/logger";

export class SubCategoryService {
    constructor(
        private readonly subCategoryRepo: SubCategoryRepository,
        private readonly storeRepo: StoreRepository
    ) { }

    private capitalizeWords(str: string): string {
        return str
            .split(" ")
            .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
            .join(" ");
    }

    async createSubCategory(storeId: string, dto: CreateSubCategoryDTO): Promise<SubCategoryResponseDTO> {
        const store = await this.storeRepo.findById(storeId);
        if (!store) {
            throw new Error("STORE_NOT_FOUND");
        }

        const capitalizedName = this.capitalizeWords(dto.name.trim());

        const existing = await this.subCategoryRepo.findByNameCaseInsensitive(capitalizedName);
        if (existing) {
            throw new Error("DUPLICATE_NAME");
        }

        const subCategory = await this.subCategoryRepo.createAndSave({
            studioId: store.id,
            name: capitalizedName,
        });

        logger.info(`Sub-category created by studio ${store.id}: ${subCategory.id}`);

        return {
            id: subCategory.id,
            storeId: subCategory.studioId,
            name: subCategory.name,
            isOwner: true,
            createdAt: subCategory.createdAt,
            updatedAt: subCategory.updatedAt,
        };
    }

    async updateSubCategory(storeId: string, subCategoryId: string, dto: UpdateSubCategoryDTO): Promise<SubCategoryResponseDTO> {
        const store = await this.storeRepo.findById(storeId);
        if (!store) {
            throw new Error("STORE_NOT_FOUND");
        }

        const subCategory = await this.subCategoryRepo.findById(subCategoryId);
        if (!subCategory) {
            throw new Error("SUB_CATEGORY_NOT_FOUND");
        }

        if (subCategory.studioId !== store.id) {
            logger.warn(`Studio ${store.id} attempted to edit sub-category ${subCategoryId} owned by studio ${subCategory.studioId}`);
            throw new Error("NOT_OWNER");
        }

        const capitalizedName = this.capitalizeWords(dto.name.trim());

        const existing = await this.subCategoryRepo.findByNameCaseInsensitive(capitalizedName);
        if (existing && existing.id !== subCategoryId) {
            throw new Error("DUPLICATE_NAME");
        }

        const updated = await this.subCategoryRepo.update(subCategoryId, {
            name: capitalizedName,
        });

        if (!updated) {
            throw new Error("UPDATE_FAILED");
        }

        logger.info(`Sub-category updated by studio ${store.id}: ${subCategoryId}`);

        return {
            id: updated.id,
            storeId: updated.studioId,
            name: updated.name,
            isOwner: true,
            createdAt: updated.createdAt,
            updatedAt: updated.updatedAt,
        };
    }

    async getAllSubCategories(): Promise<SubCategoryResponseDTO[]> {
        const subCategories = await this.subCategoryRepo.findAll();

        return subCategories.map(sc => ({
            id: sc.id,
            storeId: sc.studioId,
            name: sc.name,
            isOwner: false,
            createdAt: sc.createdAt,
            updatedAt: sc.updatedAt,
        }));
    }

    async getMySubCategories(storeId: string): Promise<SubCategoryResponseDTO[]> {
        const store = await this.storeRepo.findById(storeId);
        if (!store) {
            throw new Error("STORE_NOT_FOUND");
        }

        const subCategories = await this.subCategoryRepo.findByStoreId(store.id);

        return subCategories.map(sc => ({
            id: sc.id,
            storeId: sc.studioId,
            name: sc.name,
            isOwner: true,
            createdAt: sc.createdAt,
            updatedAt: sc.updatedAt,
        }));
    }
}
