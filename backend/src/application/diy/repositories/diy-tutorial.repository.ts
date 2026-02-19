import { Repository } from "typeorm";
import { DIYTutorial } from "../../../infrastructure/database/typeorm/entities/DIYTutorial";
import { AppDataSource } from "../../../infrastructure/database/typeorm/data-source";
import { DifficultyLevel } from "../../../domain/enums/DifficultyLevel";

export class DIYTutorialRepository {
    private repo: Repository<DIYTutorial>;

    constructor() {
        this.repo = AppDataSource.getRepository(DIYTutorial);
    }

    async findById(id: string): Promise<DIYTutorial | null> {
        return await this.repo.findOne({ where: { id } });
    }

    async findAll(limit?: number): Promise<DIYTutorial[]> {
        const options: any = {
            order: { createdAt: "DESC" },
        };
        if (limit) {
            options.take = limit;
        }
        return await this.repo.find(options);
    }

    async findByDifficulty(difficulty: DifficultyLevel, limit?: number): Promise<DIYTutorial[]> {
        const options: any = {
            where: { difficulty },
            order: { createdAt: "DESC" },
        };
        if (limit) {
            options.take = limit;
        }
        return await this.repo.find(options);
    }

    async incrementViewCount(id: string): Promise<void> {
        await this.repo.increment({ id }, "viewCount", 1);
    }

    async incrementCompletedCount(id: string): Promise<void> {
        await this.repo.increment({ id }, "completedCount", 1);
    }

    async createAndSave(data: Partial<DIYTutorial>): Promise<DIYTutorial> {
        const tutorial = this.repo.create(data);
        return await this.repo.save(tutorial);
    }
}
