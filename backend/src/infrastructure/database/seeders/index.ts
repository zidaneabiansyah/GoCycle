import "reflect-metadata";
import { AppDataSource } from "../typeorm/data-source";
import { seedEcoMakers } from "./eco-makers.seeder";
import { seedEcoStudios } from "./eco-studios.seeder";
import { seedSubCategories } from "./sub-categories.seeder";
import { seedEcoProducts } from "./eco-products.seeder";
import { seedDIYTutorials } from "./diy-tutorials.seeder";
import { seedImpactCounter } from "./impact-counter.seeder";

async function runSeeders() {
    try {
        console.log("Starting database seeding...\n");
        
        // Initialize database connection
        console.log("Connecting to database...");
        await AppDataSource.initialize();
        console.log("Database connected\n");

        // Run seeders in order (respecting foreign key dependencies)
        console.log("Seeding Eco Makers...");
        await seedEcoMakers();
        console.log("");

        console.log("Seeding Eco Studios...");
        await seedEcoStudios();
        console.log("");

        console.log("Seeding Sub Categories...");
        await seedSubCategories();
        console.log("");

        console.log("Seeding Eco Products...");
        await seedEcoProducts();
        console.log("");

        console.log("Seeding DIY Tutorials...");
        await seedDIYTutorials();
        console.log("");

        console.log("Seeding Impact Counter...");
        await seedImpactCounter();
        console.log("");

        console.log("All seeders completed successfully!");
        console.log("\nDatabase Summary:");
        
        // Show summary
        const makerCount = await AppDataSource.getRepository("EcoMaker").count();
        const studioCount = await AppDataSource.getRepository("EcoStudio").count();
        const productCount = await AppDataSource.getRepository("EcoProduct").count();
        const tutorialCount = await AppDataSource.getRepository("DIYTutorial").count();
        const subCategoryCount = await AppDataSource.getRepository("SubCategory").count();
        
        console.log(`  - Eco Makers: ${makerCount}`);
        console.log(`  - Eco Studios: ${studioCount}`);
        console.log(`  - Eco Products: ${productCount}`);
        console.log(`  - DIY Tutorials: ${tutorialCount}`);
        console.log(`  - Sub Categories: ${subCategoryCount}`);
        console.log(`  - Impact Counter: 1`);
        
        await AppDataSource.destroy();
        console.log("\nSeeding process completed!");
        process.exit(0);
        
    } catch (error) {
        console.error("\nSeeding failed:", error);
        if (AppDataSource.isInitialized) {
            await AppDataSource.destroy();
        }
        process.exit(1);
    }
}

// Run seeders
runSeeders();
