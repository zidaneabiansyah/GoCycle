import { DifficultyLevel } from "../../../domain/enums/DifficultyLevel";
import { WasteType } from "../../../domain/enums/WasteType";

export interface DIYTutorialResponseDTO {
    id: string;
    title: string;
    description: string;
    difficulty: DifficultyLevel;
    estimatedTime: number;
    materials: string[];
    tools: string[];
    steps: {
        stepNumber: number;
        instruction: string;
        imagePath?: string;
        tips?: string;
    }[];
    thumbnailPath: string;
    thumbnailUrl: string;
    primaryWasteType: WasteType;
    wasteSaved: number;
    co2Reduced: number;
    viewCount: number;
    completedCount: number;
    videoUrl?: string;
    safetyNotes?: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface DIYTutorialListDTO {
    id: string;
    title: string;
    description: string;
    difficulty: DifficultyLevel;
    estimatedTime: number;
    thumbnailPath: string;
    thumbnailUrl: string;
    primaryWasteType: WasteType;
    wasteSaved: number;
    viewCount: number;
    completedCount: number;
}
