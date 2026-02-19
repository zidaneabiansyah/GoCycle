import { ImpactCounter } from "../typeorm/entities/ImpactCounter";
import { AppDataSource } from "../typeorm/data-source";

export async function seedImpactCounter() {
    const repo = AppDataSource.getRepository(ImpactCounter);
    
    console.log("  Checking existing impact counter...");
    const existing = await repo.findOne({ where: {} });
    
    if (existing) {
        console.log("  ⚠️  Impact counter already exists, skipping...");
        return;
    }

    console.log("  Creating impact counter...");
    
    const counter = repo.create({
        totalBottlesSaved: 12540,
        totalWasteRecycled: 3420.5,
        totalDIYCreated: 540,
        totalCO2Reduced: 8900,
        communityMembers: 1247,
        totalProducts: 50,
        totalTutorials: 20,
        wasteByType: {
            plastic: 1234.5,
            metal: 567.8,
            cardboard: 890.2,
            glass: 345.6,
            textile: 382.4,
        },
    });
    
    await repo.save(counter);
    console.log("  ✅ Created impact counter with initial values");
}
