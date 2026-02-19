import { WasteType } from "../../../domain/enums/WasteType";
import { ImpactProjectionDTO } from "../dto/impact.dto";

export class ImpactCalculatorService {
    private impactFactors = {
        [WasteType.PLASTIC]: { co2: 3.5, decompositionYears: 450 },
        [WasteType.METAL]: { co2: 2.8, decompositionYears: 200 },
        [WasteType.CARDBOARD]: { co2: 0.9, decompositionYears: 2 },
        [WasteType.GLASS]: { co2: 0.5, decompositionYears: 1000000 },
        [WasteType.TEXTILE]: { co2: 2.1, decompositionYears: 40 },
        [WasteType.ELECTRONIC]: { co2: 5.2, decompositionYears: 1000 },
        [WasteType.ORGANIC]: { co2: 0.3, decompositionYears: 0.5 },
    };

    calculateWasteImpact(wasteType: WasteType, quantity: number) {
        const factor = this.impactFactors[wasteType];
        
        return {
            co2Saved: quantity * factor.co2,
            decompositionYearsSaved: quantity * factor.decompositionYears,
            equivalentTrees: Math.floor((quantity * factor.co2) / 21), // 1 tree = 21kg CO2/year
        };
    }

    calculateYearlyImpact(action: string): ImpactProjectionDTO | null {
        const actions: Record<string, ImpactProjectionDTO> = {
            recycle_bottle: {
                wasteSaved: 365 * 0.5, // kg
                co2Reduced: 365 * 1.5,
                bottlesSaved: 365 * 2,
                equivalentTrees: Math.floor((365 * 1.5) / 21),
            },
            reduce_plastic: {
                wasteSaved: 365 * 0.3,
                co2Reduced: 365 * 1.0,
                bottlesSaved: 365 * 1,
                equivalentTrees: Math.floor((365 * 1.0) / 21),
            },
            create_diy: {
                wasteSaved: 52 * 0.8, // weekly
                co2Reduced: 52 * 2.5,
                bottlesSaved: 52 * 3,
                equivalentTrees: Math.floor((52 * 2.5) / 21),
            },
        };

        return actions[action] || null;
    }
}
