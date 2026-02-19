import { Repository } from "typeorm";
import { EcoMaker } from "../../../infrastructure/database/typeorm/entities/EcoMaker";
import { AppDataSource } from "../../../infrastructure/database/typeorm/data-source";

export class EcoMakerRepository {
    private repo: Repository<EcoMaker>;

    constructor() {
        this.repo = AppDataSource.getRepository(EcoMaker);
    }

    async findById(id: string): Promise<EcoMaker | null> {
        return await this.repo.findOne({ where: { id } });
    }

    async findAll(limit?: number): Promise<EcoMaker[]> {
        const options: any = {
            order: { wasteRecycled: "DESC" },
        };
        if (limit) {
            options.take = limit;
        }
        return await this.repo.find(options);
    }

    async createAndSave(data: Partial<EcoMaker>): Promise<EcoMaker> {
        const maker = this.repo.create(data);
        return await this.repo.save(maker);
    }

    async update(id: string, data: Partial<EcoMaker>): Promise<EcoMaker | null> {
        await this.repo.update(id, data);
        return await this.findById(id);
    }
}
