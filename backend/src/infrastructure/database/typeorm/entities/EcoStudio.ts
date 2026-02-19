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
import { EcoMaker } from "./EcoMaker";

@Entity({ name: "eco_studios" })
export class EcoStudio {
    @PrimaryGeneratedColumn("uuid")
    id!: string;

    @Index({ unique: true })
    @Column({ type: "uuid" })
    makerId!: string;

    @ManyToOne(() => EcoMaker, { onDelete: "CASCADE" })
    @JoinColumn({ name: "makerId" })
    maker!: EcoMaker;

    @Column({ type: "varchar", length: 255 })
    name!: string;

    @Column({ type: "text", nullable: true })
    mission?: string;

    @Column({ type: "text", nullable: true })
    description?: string;

    @Column({ type: "varchar", length: 500 })
    address!: string;

    @Column({ type: "varchar", length: 500, nullable: true })
    imagePath?: string;

    @Column({ type: "varchar", length: 255, nullable: true })
    website?: string;

    @Column({ type: "varchar", length: 100, nullable: true })
    instagram?: string;

    @CreateDateColumn({ type: "timestamptz" })
    createdAt!: Date;

    @UpdateDateColumn({ type: "timestamptz" })
    updatedAt!: Date;
}
