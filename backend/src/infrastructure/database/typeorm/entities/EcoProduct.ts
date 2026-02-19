import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    JoinColumn,
    Index
} from "typeorm";
import { EcoStudio } from "./EcoStudio";
import { SubCategory } from "./SubCategory";
import { ProductCategory } from "../../../../domain/enums/ProductCategory";

@Entity({ name: "eco_products" })
export class EcoProduct {
    @PrimaryGeneratedColumn("uuid")
    id!: string;

    @Index()
    @Column({ type: "uuid" })
    studioId!: string;

    @ManyToOne(() => EcoStudio, { onDelete: "CASCADE" })
    @JoinColumn({ name: "studioId" })
    studio!: EcoStudio;

    @Column({ type: "varchar", length: 255 })
    name!: string;

    @Column({ type: "text" })
    story!: string;

    @Column({ type: "text", nullable: true })
    description?: string;

    @Column({ type: "text" })
    materials!: string; // Materials used (e.g., "3 plastic bottles, cardboard, glue")

    @Column({ type: "text", nullable: true })
    process?: string; // How it's made

    @Index()
    @Column({ type: "enum", enum: ProductCategory })
    category!: ProductCategory;

    @Index()
    @Column({ type: "uuid" })
    subCategoryId!: string;

    @ManyToOne(() => SubCategory, { onDelete: "RESTRICT" })
    @JoinColumn({ name: "subCategoryId" })
    subCategory!: SubCategory;

    @Column({ type: "integer" })
    estimatedPrice!: number; // Estimated price, not for real transaction

    @Column({ type: "float" })
    wasteSaved!: number; // Waste saved in kg

    @Column({ type: "integer" })
    co2Reduced!: number; // CO2 reduced in grams

    @Column({ type: "jsonb", nullable: true })
    impactMetrics?: {
        plasticBottles?: number;
        metalCans?: number;
        cardboardKg?: number;
        glassBottles?: number;
        textileKg?: number;
    };

    @Column({ type: "varchar", length: 500 })
    imagePath!: string;

    @Column({ type: "integer", default: 0 })
    viewCount!: number;

    @Column({ type: "integer", default: 0 })
    likeCount!: number;

    @CreateDateColumn({ type: "timestamptz" })
    createdAt!: Date;

    @UpdateDateColumn({ type: "timestamptz" })
    updatedAt!: Date;
}
