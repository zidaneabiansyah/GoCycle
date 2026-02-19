import { StoreRepository } from "../repositories/store.repository";
import { CreateStoreDTO, StoreResponseDTO } from "../dto/store.dto";
import logger from "../../../infrastructure/logging/logger";

export class StoreService {
    constructor(
        private readonly storeRepo: StoreRepository
    ) { }

    async createStore(makerId: string, dto: CreateStoreDTO): Promise<StoreResponseDTO> {
        // Check if maker already has a store
        const existingStore = await this.storeRepo.findByUserId(makerId);
        if (existingStore) {
            logger.warn(`Maker ${makerId} already has a store`);
            throw new Error("STORE_ALREADY_EXISTS");
        }

        // Create the store
        const storeData: {
            makerId: string;
            name: string;
            address: string;
            description?: string;
        } = {
            makerId,
            name: dto.name.trim(),
            address: dto.address.trim(),
        };

        if (dto.description) {
            storeData.description = dto.description.trim();
        }

        const store = await this.storeRepo.createAndSave(storeData);

        logger.info(`Store created for maker ${makerId}: ${store.id}`);

        return {
            id: store.id,
            userId: store.makerId,
            name: store.name,
            description: store.description,
            address: store.address,
            createdAt: store.createdAt,
        };
    }

    async getMyStore(makerId: string): Promise<StoreResponseDTO | null> {
        const store = await this.storeRepo.findByUserId(makerId);

        if (!store) {
            return null;
        }

        return {
            id: store.id,
            userId: store.makerId,
            name: store.name,
            description: store.description,
            address: store.address,
            createdAt: store.createdAt,
        };
    }
}
