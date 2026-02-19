import { EcoStudio } from "../typeorm/entities/EcoStudio";
import { EcoMaker } from "../typeorm/entities/EcoMaker";
import { AppDataSource } from "../typeorm/data-source";

export async function seedEcoStudios() {
    const studioRepo = AppDataSource.getRepository(EcoStudio);
    const makerRepo = AppDataSource.getRepository(EcoMaker);
    
    console.log("  Checking existing studios...");
    const existingCount = await studioRepo.count();
    
    if (existingCount > 0) {
        console.log(`Found ${existingCount} existing studios, skipping...`);
        return;
    }

    const makers = await makerRepo.find();
    if (makers.length === 0) {
        console.log("No makers found, please seed makers first");
        return;
    }

    const studiosData = [
        {
            name: "Plastik Jadi Berkah",
            mission: "Mengubah sampah plastik menjadi furniture fungsional dan estetik",
            description: "Workshop yang fokus pada pengolahan plastik bekas menjadi produk bernilai tinggi",
            address: "Jl. Raya Cilandak No. 123, Jakarta Selatan",
            website: "plastikjadiberkah.com",
            instagram: "@plastikjadiberkah",
        },
        {
            name: "Kreasi Hijau Bandung",
            mission: "Edukasi dan produksi kerajinan ramah lingkungan",
            description: "Komunitas yang mengajarkan cara membuat kerajinan dari bahan daur ulang",
            address: "Jl. Dago No. 45, Bandung",
            instagram: "@kreasihijaubdg",
        },
        {
            name: "Eco Fashion Studio",
            mission: "Fashion berkelanjutan dari tekstil daur ulang",
            description: "Studio desain yang menciptakan produk fashion dari bahan bekas berkualitas",
            address: "Jl. Malioboro No. 78, Yogyakarta",
            website: "ecofashionstudio.id",
            instagram: "@ecofashionstudio",
        },
        {
            name: "Tangan Kreatif",
            mission: "Memberdayakan anak-anak melalui kerajinan daur ulang",
            description: "Program edukasi untuk anak-anak membuat kerajinan dari sampah",
            address: "Jl. Pemuda No. 234, Surabaya",
            instagram: "@tangankreatif",
        },
        {
            name: "Palet Furniture",
            mission: "Furniture premium dari kayu palet bekas",
            description: "Produksi furniture berkualitas tinggi dari kayu palet yang tidak terpakai",
            address: "Jl. Pandanaran No. 56, Semarang",
            website: "paletfurniture.co.id",
            instagram: "@paletfurniture",
        },
        {
            name: "Kompos Nusantara",
            mission: "Solusi pengolahan sampah organik rumah tangga",
            description: "Layanan pengolahan sampah organik menjadi kompos berkualitas",
            address: "Jl. Ijen No. 89, Malang",
            instagram: "@komposnusantara",
        },
        {
            name: "E-Waste Innovation",
            mission: "Inovasi produk dari limbah elektronik",
            description: "Riset dan pengembangan produk baru dari komponen elektronik bekas",
            address: "Jl. Margonda No. 123, Depok",
            website: "ewasteinnovation.id",
        },
        {
            name: "Art from Waste Bali",
            mission: "Karya seni dari sampah untuk dunia",
            description: "Galeri dan workshop seni dari material daur ulang",
            address: "Jl. Sunset Road No. 45, Bali",
            website: "artfromwastebali.com",
            instagram: "@artfromwastebali",
        },
        {
            name: "Daur Ulang Untuk Semua",
            mission: "Edukasi daur ulang untuk masyarakat kurang mampu",
            description: "Program sosial mengajarkan keterampilan daur ulang",
            address: "Jl. Slamet Riyadi No. 67, Solo",
            instagram: "@daurulanguntuksemua",
        },
        {
            name: "Banner Bag Studio",
            mission: "Tas stylish dari banner bekas",
            description: "Produksi tas dan aksesoris dari banner advertising bekas",
            address: "Jl. BSD Raya No. 234, Tangerang",
            website: "bannerbag.id",
            instagram: "@bannerbagstudio",
        },
    ];

    console.log("  Creating eco studios...");
    for (let i = 0; i < studiosData.length && i < makers.length; i++) {
        const maker = makers[i];
        if (!maker) continue;
        
        const studio = studioRepo.create({
            ...studiosData[i],
            makerId: maker.id,
        });
        await studioRepo.save(studio);
    }
    
    console.log(`Created ${Math.min(studiosData.length, makers.length)} eco studios`);
}
