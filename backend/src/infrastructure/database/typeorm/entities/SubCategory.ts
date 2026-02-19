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

@Entity({ name: "sub_categories" })
export class SubCategory {
    @PrimaryGeneratedColumn("uuid")
    id!: string;

    @Index()
    @Column({ type: "uuid" })
    studioId!: string;

    @ManyToOne(() => EcoStudio, { onDelete: "CASCADE" })
    @JoinColumn({ name: "studioId" })
    studio!: EcoStudio;

    @Column({ type: "varchar", length: 100 })
    name!: string;

    @CreateDateColumn({ type: "timestamptz" })
    createdAt!: Date;

    @UpdateDateColumn({ type: "timestamptz" })
    updatedAt!: Date;
}
