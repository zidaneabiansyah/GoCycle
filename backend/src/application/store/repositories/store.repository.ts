import { Repository } from "typeorm";
import { EcoStudio } from "../../../infrastructure/database/typeorm/entities/EcoStudio";
import { AppDataSource } from "../../../infrastructure/database/typeorm/data-source";

export class StoreRepository {
    private repo: Repository<EcoStudio>;

    constructor() {
        this.repo = AppDataSource.getRepository(EcoStudio);
    }

    async findByUserId(makerId: string): Promise<EcoStudio | null> {
        return await this.repo.findOne({ 
            where: { makerId },
            relations: ["maker"]
        });
    }

    async findById(id: string): Promise<EcoStudio | null> {
        return await this.repo.findOne({ 
            where: { id },
            relations: ["maker"]
        });
    }

    async createAndSave(studioData: Partial<EcoStudio>): Promise<EcoStudio> {
        const studio = this.repo.create(studioData);
        return await this.repo.save(studio);
    }
}
