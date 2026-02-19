import { Repository } from "typeorm";
import { User } from "../../../infrastructure/database/typeorm/entities/User";
import { AppDataSource } from "../../../infrastructure/database/typeorm/data-source";
import { UserAccountType } from "../../../domain/enums/UserAccountType";

export class UserRepository {
    private repo: Repository<User>;

    constructor() {
        this.repo = AppDataSource.getRepository(User);
    }

    async findById(id: string): Promise<User | null> {
        return await this.repo.findOne({ where: { id } });
    }

    async findByEmail(email: string): Promise<User | null> {
        return await this.repo.findOne({ where: { email } });
    }

    async updateAccountType(userId: string, accountType: UserAccountType): Promise<void> {
        await this.repo.update(userId, { accountType });
    }

    async createAndSave(userData: Partial<User>): Promise<User> {
        const user = this.repo.create(userData);
        return await this.repo.save(user);
    }
}
