import { EcoProduct } from "../typeorm/entities/EcoProduct";
import { EcoStudio } from "../typeorm/entities/EcoStudio";
import { SubCategory } from "../typeorm/entities/SubCategory";
import { AppDataSource } from "../typeorm/data-source";
import { ProductCategory } from "../../../domain/enums/ProductCategory";

const productsData = [
    {
        name: "Pot Tanaman dari Botol Plastik",
        story: "Dibuat dari 3 botol plastik bekas yang dikumpulkan dari TPA. Setiap pot menyelamatkan plastik dari mencemari lingkungan selama 450 tahun.",
        materials: "3 botol plastik 1.5L, cat akrilik ramah lingkungan, tanah",
        process: "Botol dipotong dengan presisi, dicat dengan motif menarik, diberi lubang drainase untuk kesehatan tanaman",
        category: ProductCategory.GARDEN,
        estimatedPrice: 25000,
        wasteSaved: 0.15,
        co2Reduced: 450,
        impactMetrics: { plasticBottles: 3 },
    },
    {
        name: "Lampu Gantung dari Kaleng Bekas",
        story: "Transformasi 5 kaleng minuman bekas menjadi lampu hias yang unik. Setiap lampu adalah karya seni yang mengurangi limbah logam.",
        materials: "5 kaleng aluminium bekas, kabel lampu LED, cat semprot metalik",
        process: "Kaleng dibersihkan, dibuat pola lubang artistik, dicat, dan dipasang sistem lampu LED hemat energi",
        category: ProductCategory.HOME_DECOR,
        estimatedPrice: 150000,
        wasteSaved: 0.25,
        co2Reduced: 700,
        impactMetrics: { metalCans: 5 },
    },
    {
        name: "Tas Belanja dari Banner Bekas",
        story: "Banner advertising yang sudah tidak terpakai diubah menjadi tas belanja stylish dan tahan lama. Mengurangi penggunaan plastik sekali pakai.",
        materials: "Banner vinyl bekas, tali webbing, jahitan kuat",
        process: "Banner dicuci, dipotong sesuai pola, dijahit dengan mesin industrial untuk ketahanan maksimal",
        category: ProductCategory.FASHION,
        estimatedPrice: 75000,
        wasteSaved: 0.8,
        co2Reduced: 1680,
        impactMetrics: { textileKg: 0.8 },
    },
    {
        name: "Meja Kopi dari Palet Kayu",
        story: "Palet kayu bekas pengiriman barang diubah menjadi meja kopi industrial yang kokoh. Menyelamatkan kayu dari pembakaran.",
        materials: "2 palet kayu bekas, cat wood stain, roda industrial",
        process: "Palet dibersihkan, diamplas halus, dicat dengan finishing natural, dipasang roda untuk mobilitas",
        category: ProductCategory.FURNITURE,
        estimatedPrice: 450000,
        wasteSaved: 15.0,
        co2Reduced: 13500,
        impactMetrics: { cardboardKg: 15.0 },
    },
    {
        name: "Dompet dari Kemasan Kopi",
        story: "Kemasan kopi aluminium foil yang biasanya dibuang, kini menjadi dompet unik dan waterproof. Setiap dompet adalah statement fashion berkelanjutan.",
        materials: "10 kemasan kopi bekas, kain furing, resleting",
        process: "Kemasan dicuci, disetrika, dijahit dengan pola origami untuk kekuatan ekstra",
        category: ProductCategory.ACCESSORIES,
        estimatedPrice: 35000,
        wasteSaved: 0.05,
        co2Reduced: 140,
        impactMetrics: { metalCans: 10 },
    },
    {
        name: "Mainan Robot dari Kaleng",
        story: "Kaleng bekas susu dan minuman diubah menjadi mainan robot yang aman untuk anak. Mengajarkan nilai daur ulang sejak dini.",
        materials: "3 kaleng berbagai ukuran, cat non-toxic, kawat untuk sambungan",
        process: "Kaleng dibersihkan, dicat dengan warna cerah, disambung dengan sistem engsel sederhana",
        category: ProductCategory.TOYS,
        estimatedPrice: 45000,
        wasteSaved: 0.18,
        co2Reduced: 504,
        impactMetrics: { metalCans: 3 },
    },
    {
        name: "Hiasan Dinding dari CD Bekas",
        story: "CD/DVD yang sudah tidak terpakai diubah menjadi hiasan dinding yang memantulkan cahaya indah. Seni dari teknologi lama.",
        materials: "20 CD/DVD bekas, papan kayu, lem kuat",
        process: "CD dipotong menjadi bentuk geometris, disusun dalam pola mosaik, ditempel pada papan kayu",
        category: ProductCategory.ART,
        estimatedPrice: 120000,
        wasteSaved: 0.4,
        co2Reduced: 2080,
        impactMetrics: { plasticBottles: 20 },
    },
    {
        name: "Tempat Pensil dari Botol Shampo",
        story: "Botol shampo bekas yang kokoh diubah menjadi tempat pensil lucu untuk anak sekolah. Praktis dan ramah lingkungan.",
        materials: "1 botol shampo 500ml, stiker dekoratif, cat akrilik",
        process: "Botol dipotong, tepi dihaluskan untuk keamanan, dihias dengan motif karakter favorit anak",
        category: ProductCategory.ACCESSORIES,
        estimatedPrice: 15000,
        wasteSaved: 0.08,
        co2Reduced: 280,
        impactMetrics: { plasticBottles: 1 },
    },
    {
        name: "Kursi Taman dari Ban Bekas",
        story: "Ban mobil bekas diubah menjadi kursi taman yang unik dan tahan cuaca. Mengurangi limbah karet yang sulit terurai.",
        materials: "1 ban mobil bekas, tali tambang, bantal outdoor",
        process: "Ban dibersihkan, dicat dengan cat khusus karet, ditambah tali untuk gantungan, dilengkapi bantal empuk",
        category: ProductCategory.FURNITURE,
        estimatedPrice: 350000,
        wasteSaved: 8.5,
        co2Reduced: 17850,
        impactMetrics: { textileKg: 8.5 },
    },
    {
        name: "Vas Bunga dari Botol Kaca",
        story: "Botol kaca bekas wine dan juice diubah menjadi vas bunga elegan. Setiap vas adalah unik dengan warna dan bentuk berbeda.",
        materials: "1 botol kaca bekas, cat kaca, tali rami dekoratif",
        process: "Botol dibersihkan, dicat dengan teknik ombre, dililit tali rami untuk sentuhan rustic",
        category: ProductCategory.HOME_DECOR,
        estimatedPrice: 40000,
        wasteSaved: 0.5,
        co2Reduced: 250,
        impactMetrics: { glassBottles: 1 },
    },
];

export async function seedEcoProducts() {
    const productRepo = AppDataSource.getRepository(EcoProduct);
    const studioRepo = AppDataSource.getRepository(EcoStudio);
    const subCategoryRepo = AppDataSource.getRepository(SubCategory);
    
    console.log("  Checking existing products...");
    const existingCount = await productRepo.count();
    
    if (existingCount > 0) {
        console.log(`  ⚠️  Found ${existingCount} existing products, skipping...`);
        return;
    }

    const studios = await studioRepo.find();
    const subCategories = await subCategoryRepo.find();
    
    if (studios.length === 0 || subCategories.length === 0) {
        console.log("  ⚠️  Need studios and sub-categories first");
        return;
    }

    console.log("  Creating eco products...");
    let created = 0;
    
    // Create multiple products per template
    for (let i = 0; i < 50; i++) {
        const template = productsData[i % productsData.length];
        if (!template) continue;
        
        const randomStudio = studios[Math.floor(Math.random() * studios.length)];
        const randomSubCategory = subCategories[Math.floor(Math.random() * subCategories.length)];
        
        if (!randomStudio || !randomSubCategory) continue;
        
        const product = productRepo.create({
            ...template,
            name: i >= productsData.length ? `${template.name} #${Math.floor(i / productsData.length) + 1}` : template.name,
            studioId: randomStudio.id,
            subCategoryId: randomSubCategory.id,
            imagePath: `products/product-${i + 1}.jpg`,
            viewCount: Math.floor(Math.random() * 500),
            likeCount: Math.floor(Math.random() * 100),
        });
        
        await productRepo.save(product);
        created++;
    }
    
    console.log(`  ✅ Created ${created} eco products`);
}
