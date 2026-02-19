import { Repository } from "typeorm";
import { Store } from "../../../infrastructure/database/typeorm/entities/Store";
import { AppDataSource } from "../../../infrastructure/database/typeorm/data-source";

export class StoreRepository {
    private repo: Repository<Store>;

    constructor() {
        this.repo = AppDataSource.getRepository(Store);
    }

    async findByUserId(userId: string): Promise<Store | null> {
        return await this.repo.findOne({ where: { userId } });
    }

    async findById(id: string): Promise<Store | null> {
        return await this.repo.findOne({ where: { id } });
    }

    async createAndSave(storeData: Partial<Store>): Promise<Store> {
        const store = this.repo.create(storeData);
        return await this.repo.save(store);
    }
}
