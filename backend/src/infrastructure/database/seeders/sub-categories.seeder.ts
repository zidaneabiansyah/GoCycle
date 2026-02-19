import { SubCategory } from "../typeorm/entities/SubCategory";
import { EcoStudio } from "../typeorm/entities/EcoStudio";
import { AppDataSource } from "../typeorm/data-source";

export async function seedSubCategories() {
    const subCategoryRepo = AppDataSource.getRepository(SubCategory);
    const studioRepo = AppDataSource.getRepository(EcoStudio);
    
    console.log("  Checking existing sub-categories...");
    const existingCount = await subCategoryRepo.count();
    
    if (existingCount > 0) {
        console.log(`Found ${existingCount} existing sub-categories, skipping...`);
        return;
    }

    const studios = await studioRepo.find();
    if (studios.length === 0) {
        console.log("No studios found, please seed studios first");
        return;
    }

    const subCategoriesData = [
        "Pot Tanaman", "Lampu Hias", "Vas Bunga", "Tempat Pensil",
        "Tas Belanja", "Dompet", "Tempat Tisu", "Kotak Penyimpanan",
        "Meja Kecil", "Kursi", "Rak Buku", "Hiasan Dinding",
        "Mainan Anak", "Boneka", "Aksesoris Rambut", "Gelang",
        "Kalung", "Bros", "Gantungan Kunci", "Bingkai Foto",
    ];

    console.log("  Creating sub-categories...");
    let created = 0;
    
    for (const name of subCategoriesData) {
        const randomStudio = studios[Math.floor(Math.random() * studios.length)];
        if (!randomStudio) continue;
        
        const subCategory = subCategoryRepo.create({
            name,
            studioId: randomStudio.id,
        });
        await subCategoryRepo.save(subCategory);
        created++;
    }
    
    console.log(`Created ${created} sub-categories`);
}
