import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    Index
} from "typeorm";
import { DifficultyLevel } from "../../../../domain/enums/DifficultyLevel";
import { WasteType } from "../../../../domain/enums/WasteType";

interface TutorialStep {
    stepNumber: number;
    instruction: string;
    imagePath?: string;
    tips?: string;
}

@Entity({ name: "diy_tutorials" })
export class DIYTutorial {
    @PrimaryGeneratedColumn("uuid")
    id!: string;

    @Column({ type: "varchar", length: 255 })
    title!: string;

    @Column({ type: "text" })
    description!: string;

    @Index()
    @Column({ type: "enum", enum: DifficultyLevel })
    difficulty!: DifficultyLevel;

    @Column({ type: "integer" })
    estimatedTime!: number; // in minutes

    @Column({ type: "jsonb" })
    materials!: string[]; // ["2 plastic bottles", "scissors", "glue"]

    @Column({ type: "jsonb" })
    tools!: string[]; // ["scissors", "drill", "paintbrush"]

    @Column({ type: "jsonb" })
    steps!: TutorialStep[];

    @Column({ type: "varchar", length: 500 })
    thumbnailPath!: string;

    @Index()
    @Column({ type: "enum", enum: WasteType })
    primaryWasteType!: WasteType;

    @Column({ type: "float" })
    wasteSaved!: number; // in kg

    @Column({ type: "integer" })
    co2Reduced!: number; // in grams

    @Column({ type: "integer", default: 0 })
    viewCount!: number;

    @Column({ type: "integer", default: 0 })
    completedCount!: number; // How many people completed this

    @Column({ type: "varchar", length: 255, nullable: true })
    videoUrl?: string;

    @Column({ type: "text", nullable: true })
    safetyNotes?: string;

    @CreateDateColumn({ type: "timestamptz" })
    createdAt!: Date;

    @UpdateDateColumn({ type: "timestamptz" })
    updatedAt!: Date;
}
