import { UserRepository } from "../repositories/user.repository";
import { UserProfileDTO } from "../dto/user.dto";
import logger from "../../../infrastructure/logging/logger";

export class UserService {
    constructor(private readonly userRepo: UserRepository) { }

    async getProfile(userId: string): Promise<UserProfileDTO> {
        const user = await this.userRepo.findById(userId);

        if (!user) {
            logger.warn(`User profile not found: ${userId}`);
            throw new Error("USER_NOT_FOUND");
        }

        return {
            id: user.id,
            fullName: user.fullName,
            email: user.email,
            accountType: user.accountType,
            createdAt: user.createdAt,
        };
    }
}
