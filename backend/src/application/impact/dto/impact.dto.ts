export interface ImpactStatsDTO {
    totalBottlesSaved: number;
    totalWasteRecycled: number;
    totalDIYCreated: number;
    totalCO2Reduced: number;
    communityMembers: number;
    totalProducts: number;
    totalTutorials: number;
    wasteByType?: {
        plastic: number;
        metal: number;
        cardboard: number;
        glass: number;
        textile: number;
    };
    lastUpdated: string;
}

export interface SimulateImpactDTO {
    action: "recycle_bottle" | "reduce_plastic" | "create_diy";
    quantity: number;
}

export interface ImpactProjectionDTO {
    wasteSaved: number;
    co2Reduced: number;
    bottlesSaved: number;
    equivalentTrees: number;
}
