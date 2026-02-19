import { ImpactCounterRepository } from "../repositories/impact-counter.repository";
import { ImpactStatsDTO } from "../dto/impact.dto";

export class CounterService {
    constructor(private impactRepo: ImpactCounterRepository) {}

    async getCurrentStats(): Promise<ImpactStatsDTO> {
        const counter = await this.impactRepo.getOrCreate();
        
        // Add small random increment for "real-time" feel
        const fakeIncrement: ImpactStatsDTO = {
            totalBottlesSaved: counter.totalBottlesSaved + Math.floor(Math.random() * 5),
            totalWasteRecycled: counter.totalWasteRecycled + (Math.random() * 0.5),
            totalDIYCreated: counter.totalDIYCreated + Math.floor(Math.random() * 2),
            totalCO2Reduced: counter.totalCO2Reduced + Math.floor(Math.random() * 3),
            communityMembers: counter.communityMembers,
            totalProducts: counter.totalProducts,
            totalTutorials: counter.totalTutorials,
            lastUpdated: new Date().toISOString(),
        };

        if (counter.wasteByType) {
            fakeIncrement.wasteByType = counter.wasteByType;
        }

        return fakeIncrement;
    }

    async incrementCounter(field: string, value: number): Promise<void> {
        const validFields = [
            'totalBottlesSaved',
            'totalWasteRecycled',
            'totalDIYCreated',
            'totalCO2Reduced',
            'communityMembers',
            'totalProducts',
            'totalTutorials',
        ];

        if (validFields.includes(field)) {
            await this.impactRepo.increment(field as any, value);
        }
    }
}
