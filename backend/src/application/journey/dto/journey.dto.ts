import { WasteType } from "../../../domain/enums/WasteType";

export interface JourneyStepDTO {
    step: number;
    title: string;
    description: string;
    impact: "negative" | "positive" | "critical" | "neutral";
    icon?: string;
}

export interface WasteJourneyDTO {
    wasteType: WasteType;
    action: "DISPOSE" | "RECYCLE";
    steps: JourneyStepDTO[];
    summary: {
        totalSteps: number;
        estimatedYears?: number;
        co2Impact: number;
        recommendation: string;
    };
}

export interface SimulateJourneyRequestDTO {
    wasteType: WasteType;
    action: "DISPOSE" | "RECYCLE";
}
