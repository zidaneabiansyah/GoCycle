import { StoreRepository } from "../repositories/store.repository";
import { UserRepository } from "../../user/repositories/user.repository";
import { CreateStoreDTO, StoreResponseDTO } from "../dto/store.dto";
import { UserAccountType } from "../../../domain/enums/UserAccountType";
import logger from "../../../infrastructure/logging/logger";

export class StoreService {
    constructor(
        private readonly storeRepo: StoreRepository,
        private readonly userRepo: UserRepository
    ) { }

    async createStore(userId: string, dto: CreateStoreDTO): Promise<StoreResponseDTO> {
        // Check if user already has a store
        const existingStore = await this.storeRepo.findByUserId(userId);
        if (existingStore) {
            logger.warn(`User ${userId} already has a store`);
            throw new Error("STORE_ALREADY_EXISTS");
        }

        // Create the store - build data object explicitly
        const storeData: {
            userId: string;
            name: string;
            address: string;
            description?: string;
        } = {
            userId,
            name: dto.name.trim(),
            address: dto.address.trim(),
        };

        if (dto.description) {
            storeData.description = dto.description.trim();
        }

        const store = await this.storeRepo.createAndSave(storeData);

        // Update user's accountType to Penjual
        await this.userRepo.updateAccountType(userId, UserAccountType.PENJUAL);

        logger.info(`Store created for user ${userId}: ${store.id}`);

        return {
            id: store.id,
            userId: store.userId,
            name: store.name,
            description: store.description,
            address: store.address,
            createdAt: store.createdAt,
        };
    }

    async getMyStore(userId: string): Promise<StoreResponseDTO | null> {
        const store = await this.storeRepo.findByUserId(userId);

        if (!store) {
            return null;
        }

        return {
            id: store.id,
            userId: store.userId,
            name: store.name,
            description: store.description,
            address: store.address,
            createdAt: store.createdAt,
        };
    }
}
