import { 
    Entity, 
    PrimaryGeneratedColumn, 
    Column, 
    CreateDateColumn, 
    UpdateDateColumn 
} from "typeorm";

@Entity({ name: "eco_makers" })
export class EcoMaker {
    @PrimaryGeneratedColumn("uuid")
    id!: string;

    @Column({ type: "varchar", length: 255 })
    name!: string;

    @Column({ type: "text", nullable: true })
    story?: string;

    @Column({ type: "varchar", length: 255, nullable: true })
    location?: string;

    @Column({ type: "varchar", length: 20, nullable: true })
    phone?: string;

    @Column({ type: "integer", default: 0 })
    productsCreated!: number;

    @Column({ type: "float", default: 0 })
    wasteRecycled!: number; // in kg

    @Column({ type: "varchar", length: 500, nullable: true })
    avatarPath?: string;

    @CreateDateColumn({ type: "timestamptz" })
    createdAt!: Date;

    @UpdateDateColumn({ type: "timestamptz" })
    updatedAt!: Date;
}
