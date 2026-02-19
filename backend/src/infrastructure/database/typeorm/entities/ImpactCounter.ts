import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    UpdateDateColumn
} from "typeorm";

@Entity({ name: "impact_counters" })
export class ImpactCounter {
    @PrimaryGeneratedColumn("uuid")
    id!: string;

    @Column({ type: "integer", default: 0 })
    totalBottlesSaved!: number;

    @Column({ type: "float", default: 0 })
    totalWasteRecycled!: number; // in kg

    @Column({ type: "integer", default: 0 })
    totalDIYCreated!: number;

    @Column({ type: "integer", default: 0 })
    totalCO2Reduced!: number; // in kg

    @Column({ type: "integer", default: 0 })
    communityMembers!: number;

    @Column({ type: "integer", default: 0 })
    totalProducts!: number;

    @Column({ type: "integer", default: 0 })
    totalTutorials!: number;

    @Column({ type: "jsonb", nullable: true })
    wasteByType?: {
        plastic: number;
        metal: number;
        cardboard: number;
        glass: number;
        textile: number;
    };

    @UpdateDateColumn({ type: "timestamptz" })
    updatedAt!: Date;
}
