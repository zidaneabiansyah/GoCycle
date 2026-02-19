import { DIYTutorialRepository } from "../repositories/diy-tutorial.repository";
import { DIYTutorialResponseDTO, DIYTutorialListDTO } from "../dto/diy-tutorial.dto";
import { DifficultyLevel } from "../../../domain/enums/DifficultyLevel";
import { ImageService } from "../../../infrastructure/upload/image.service";

export class DIYService {
    constructor(private diyRepo: DIYTutorialRepository) {}

    async getTutorials(difficulty?: DifficultyLevel, limit?: number): Promise<DIYTutorialListDTO[]> {
        const tutorials = difficulty
            ? await this.diyRepo.findByDifficulty(difficulty, limit)
            : await this.diyRepo.findAll(limit);

        return tutorials.map(tutorial => this.mapToListDTO(tutorial));
    }

    async getTutorialById(id: string): Promise<DIYTutorialResponseDTO | null> {
        const tutorial = await this.diyRepo.findById(id);
        if (!tutorial) {
            return null;
        }
        return this.mapToFullDTO(tutorial);
    }

    async incrementView(id: string): Promise<void> {
        await this.diyRepo.incrementViewCount(id);
    }

    async markCompleted(id: string): Promise<void> {
        await this.diyRepo.incrementCompletedCount(id);
    }

    private mapToListDTO(tutorial: any): DIYTutorialListDTO {
        return {
            id: tutorial.id,
            title: tutorial.title,
            description: tutorial.description,
            difficulty: tutorial.difficulty,
            estimatedTime: tutorial.estimatedTime,
            thumbnailPath: tutorial.thumbnailPath,
            thumbnailUrl: ImageService.getImageUrl(tutorial.thumbnailPath),
            primaryWasteType: tutorial.primaryWasteType,
            wasteSaved: tutorial.wasteSaved,
            viewCount: tutorial.viewCount || 0,
            completedCount: tutorial.completedCount || 0,
        };
    }

    private mapToFullDTO(tutorial: any): DIYTutorialResponseDTO {
        return {
            id: tutorial.id,
            title: tutorial.title,
            description: tutorial.description,
            difficulty: tutorial.difficulty,
            estimatedTime: tutorial.estimatedTime,
            materials: tutorial.materials,
            tools: tutorial.tools,
            steps: tutorial.steps,
            thumbnailPath: tutorial.thumbnailPath,
            thumbnailUrl: ImageService.getImageUrl(tutorial.thumbnailPath),
            primaryWasteType: tutorial.primaryWasteType,
            wasteSaved: tutorial.wasteSaved,
            co2Reduced: tutorial.co2Reduced,
            viewCount: tutorial.viewCount || 0,
            completedCount: tutorial.completedCount || 0,
            videoUrl: tutorial.videoUrl,
            safetyNotes: tutorial.safetyNotes,
            createdAt: tutorial.createdAt,
            updatedAt: tutorial.updatedAt,
        };
    }
}
