import { Repository } from "typeorm";
import { ImpactCounter } from "../../../infrastructure/database/typeorm/entities/ImpactCounter";
import { AppDataSource } from "../../../infrastructure/database/typeorm/data-source";

export class ImpactCounterRepository {
    private repo: Repository<ImpactCounter>;

    constructor() {
        this.repo = AppDataSource.getRepository(ImpactCounter);
    }

    async getLatest(): Promise<ImpactCounter | null> {
        return await this.repo.find({
            order: { updatedAt: "DESC" },
            take: 1,
        }).then(results => results[0] || null);
    }

    async getOrCreate(): Promise<ImpactCounter> {
        let counter = await this.getLatest();
        
        if (!counter) {
            counter = this.repo.create({
                totalBottlesSaved: 0,
                totalWasteRecycled: 0,
                totalDIYCreated: 0,
                totalCO2Reduced: 0,
                communityMembers: 0,
                totalProducts: 0,
                totalTutorials: 0,
            });
            counter = await this.repo.save(counter);
        }

        return counter;
    }

    async increment(field: keyof ImpactCounter, value: number): Promise<void> {
        const counter = await this.getOrCreate();
        await this.repo.increment({ id: counter.id }, field, value);
    }

    async update(id: string, data: Partial<ImpactCounter>): Promise<ImpactCounter | null> {
        await this.repo.update(id, data);
        return await this.repo.findOne({ where: { id } });
    }
}
