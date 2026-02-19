import { EcoMaker } from "../typeorm/entities/EcoMaker";
import { AppDataSource } from "../typeorm/data-source";

export const ecoMakersData = [
    {
        name: "Budi Santoso",
        story: "Mantan pemulung yang kini mengubah sampah plastik menjadi furniture berkualitas. Memulai dari garasi rumah, kini memiliki workshop dengan 5 karyawan.",
        location: "Jakarta Selatan",
        phone: "081234567890",
        productsCreated: 47,
        wasteRecycled: 230.5,
    },
    {
        name: "Siti Nurhaliza",
        story: "Ibu rumah tangga yang mengajarkan DIY daur ulang ke komunitas. Aktif di 3 kelurahan dengan 200+ peserta workshop.",
        location: "Bandung",
        phone: "082345678901",
        productsCreated: 89,
        wasteRecycled: 156.8,
    },
    {
        name: "Ahmad Hidayat",
        story: "Desainer muda yang fokus pada fashion berkelanjutan dari tekstil bekas. Produknya sudah dijual ke 5 negara.",
        location: "Yogyakarta",
        phone: "083456789012",
        productsCreated: 124,
        wasteRecycled: 342.3,
    },
    {
        name: "Dewi Lestari",
        story: "Guru SD yang mengajarkan anak-anak membuat kerajinan dari sampah. Sudah melatih 500+ anak dalam 2 tahun.",
        location: "Surabaya",
        phone: "084567890123",
        productsCreated: 67,
        wasteRecycled: 98.4,
    },
    {
        name: "Eko Prasetyo",
        story: "Pengusaha muda yang membangun bisnis furniture dari kayu palet bekas. Omzet 50 juta/bulan dengan 10 karyawan.",
        location: "Semarang",
        phone: "085678901234",
        productsCreated: 156,
        wasteRecycled: 567.9,
    },
    {
        name: "Rina Wijaya",
        story: "Aktivis lingkungan yang fokus pada pengolahan sampah organik menjadi kompos. Melayani 50+ rumah tangga.",
        location: "Malang",
        phone: "086789012345",
        productsCreated: 34,
        wasteRecycled: 1234.6,
    },
    {
        name: "Fajar Ramadhan",
        story: "Mahasiswa teknik yang menciptakan produk elektronik dari e-waste. Sudah patenkan 3 inovasi.",
        location: "Depok",
        phone: "087890123456",
        productsCreated: 23,
        wasteRecycled: 45.7,
    },
    {
        name: "Maya Kusuma",
        story: "Seniman yang mengubah sampah menjadi karya seni bernilai tinggi. Pameran di 10+ galeri nasional.",
        location: "Bali",
        phone: "088901234567",
        productsCreated: 78,
        wasteRecycled: 123.4,
    },
    {
        name: "Rudi Hartono",
        story: "Pensiunan yang mendedikasikan waktu untuk mengajarkan daur ulang di panti asuhan. Sudah bantu 15 panti.",
        location: "Solo",
        phone: "089012345678",
        productsCreated: 45,
        wasteRecycled: 89.2,
    },
    {
        name: "Lina Marlina",
        story: "Ibu muda yang memulai bisnis tas dari banner bekas. Produknya viral di social media dengan 50K followers.",
        location: "Tangerang",
        phone: "081123456789",
        productsCreated: 234,
        wasteRecycled: 178.5,
    },
];

export async function seedEcoMakers() {
    const repo = AppDataSource.getRepository(EcoMaker);
    
    console.log("  Checking existing makers...");
    const existingCount = await repo.count();
    
    if (existingCount > 0) {
        console.log(`  ⚠️  Found ${existingCount} existing makers, skipping...`);
        return;
    }

    console.log("  Creating eco makers...");
    for (const data of ecoMakersData) {
        const maker = repo.create(data);
        await repo.save(maker);
    }
    
    console.log(`  ✅ Created ${ecoMakersData.length} eco makers`);
}
