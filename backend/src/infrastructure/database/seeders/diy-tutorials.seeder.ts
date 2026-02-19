import { DIYTutorial } from "../typeorm/entities/DIYTutorial";
import { AppDataSource } from "../typeorm/data-source";
import { DifficultyLevel } from "../../../domain/enums/DifficultyLevel";
import { WasteType } from "../../../domain/enums/WasteType";

const tutorialsData = [
    {
        title: "Membuat Pot Tanaman dari Botol Plastik",
        description: "Tutorial lengkap membuat pot tanaman cantik dari botol plastik bekas. Cocok untuk pemula dan bisa dikerjakan bersama anak-anak.",
        difficulty: DifficultyLevel.EASY,
        estimatedTime: 30,
        materials: ["2 botol plastik 1.5L", "Gunting/cutter", "Cat akrilik", "Kuas", "Tanah dan tanaman"],
        tools: ["Gunting", "Cutter", "Kuas cat"],
        steps: [
            { stepNumber: 1, instruction: "Cuci bersih botol plastik dan keringkan", tips: "Pastikan label sudah dilepas semua" },
            { stepNumber: 2, instruction: "Potong botol menjadi dua bagian, gunakan bagian bawah", tips: "Potong dengan hati-hati, haluskan tepi dengan amplas" },
            { stepNumber: 3, instruction: "Buat 3-4 lubang kecil di bagian bawah untuk drainase", tips: "Gunakan paku panas untuk hasil rapi" },
            { stepNumber: 4, instruction: "Cat bagian luar dengan warna favorit", tips: "Gunakan cat akrilik yang tahan air" },
            { stepNumber: 5, instruction: "Tunggu cat kering, isi dengan tanah dan tanaman", tips: "Pilih tanaman yang sesuai ukuran pot" },
        ],
        primaryWasteType: WasteType.PLASTIC,
        wasteSaved: 0.1,
        co2Reduced: 300,
        safetyNotes: "Hati-hati saat memotong plastik. Gunakan gunting yang tajam dan potong menjauhi tubuh.",
    },
    {
        title: "Lampu Hias dari Kaleng Bekas",
        description: "Ciptakan lampu hias unik dengan pola lubang yang indah dari kaleng bekas. Proyek DIY yang menghasilkan pencahayaan ambient cantik.",
        difficulty: DifficultyLevel.MEDIUM,
        estimatedTime: 60,
        materials: ["3 kaleng bekas berbagai ukuran", "Bor listrik", "Cat semprot", "Kabel lampu LED", "Fitting lampu"],
        tools: ["Bor listrik", "Mata bor 3mm dan 5mm", "Tang", "Obeng"],
        steps: [
            { stepNumber: 1, instruction: "Bersihkan kaleng dan lepas label", tips: "Rendam dalam air panas untuk mudah melepas label" },
            { stepNumber: 2, instruction: "Gambar pola lubang dengan spidol", tips: "Buat pola geometris atau bunga untuk hasil menarik" },
            { stepNumber: 3, instruction: "Bor lubang sesuai pola yang sudah digambar", tips: "Mulai dengan mata bor kecil, lalu perbesar" },
            { stepNumber: 4, instruction: "Cat kaleng dengan warna metalik", tips: "Semprot dari jarak 20cm untuk hasil merata" },
            { stepNumber: 5, instruction: "Pasang kabel dan fitting lampu LED", tips: "Gunakan LED untuk hemat energi dan tidak panas" },
            { stepNumber: 6, instruction: "Gantung dan test lampu", tips: "Pastikan kabel terpasang aman" },
        ],
        primaryWasteType: WasteType.METAL,
        wasteSaved: 0.2,
        co2Reduced: 560,
        safetyNotes: "Gunakan kacamata pelindung saat mengebor. Pastikan kaleng terpasang kuat saat dibor.",
    },
    {
        title: "Tas Belanja dari Kaos Bekas",
        description: "Ubah kaos lama yang sudah tidak terpakai menjadi tas belanja yang kuat dan stylish. Tidak perlu mesin jahit!",
        difficulty: DifficultyLevel.EASY,
        estimatedTime: 20,
        materials: ["1 kaos bekas ukuran L/XL", "Gunting", "Penggaris"],
        tools: ["Gunting kain", "Penggaris", "Spidol"],
        steps: [
            { stepNumber: 1, instruction: "Potong lengan kaos", tips: "Potong mengikuti jahitan untuk hasil rapi" },
            { stepNumber: 2, instruction: "Perlebar lubang leher untuk pegangan tas", tips: "Jangan terlalu lebar agar kuat" },
            { stepNumber: 3, instruction: "Balik kaos, tandai bagian bawah dengan garis 10cm", tips: "Gunakan penggaris untuk garis lurus" },
            { stepNumber: 4, instruction: "Buat potongan fringe sepanjang 10cm dengan lebar 2cm", tips: "Potong depan dan belakang sekaligus" },
            { stepNumber: 5, instruction: "Ikat setiap pasang fringe dengan simpul kuat", tips: "Ikat dua kali untuk kekuatan ekstra" },
            { stepNumber: 6, instruction: "Balik tas, siap digunakan!", tips: "Cuci sebelum digunakan pertama kali" },
        ],
        primaryWasteType: WasteType.TEXTILE,
        wasteSaved: 0.3,
        co2Reduced: 630,
        safetyNotes: "Gunakan gunting yang tajam untuk hasil potongan yang rapi.",
    },
    {
        title: "Tempat Pensil dari Kaleng Susu",
        description: "Proyek cepat dan mudah untuk mengubah kaleng susu bekas menjadi tempat pensil lucu untuk anak-anak.",
        difficulty: DifficultyLevel.EASY,
        estimatedTime: 25,
        materials: ["Kaleng susu bekas", "Kertas kado/origami", "Lem putih", "Stiker dekoratif"],
        tools: ["Gunting", "Kuas lem"],
        steps: [
            { stepNumber: 1, instruction: "Bersihkan kaleng dan keringkan", tips: "Pastikan tidak ada sisa susu" },
            { stepNumber: 2, instruction: "Ukur dan potong kertas sesuai tinggi kaleng", tips: "Tambah 1cm untuk overlap" },
            { stepNumber: 3, instruction: "Oleskan lem pada kaleng", tips: "Oleskan tipis dan merata" },
            { stepNumber: 4, instruction: "Tempel kertas mengelilingi kaleng", tips: "Ratakan agar tidak ada gelembung" },
            { stepNumber: 5, instruction: "Hias dengan stiker favorit", tips: "Biarkan anak memilih stiker sendiri" },
        ],
        primaryWasteType: WasteType.METAL,
        wasteSaved: 0.08,
        co2Reduced: 224,
    },
    {
        title: "Rak Buku dari Kardus Bekas",
        description: "Buat rak buku sederhana namun kuat dari kardus bekas. Solusi penyimpanan murah dan ramah lingkungan.",
        difficulty: DifficultyLevel.MEDIUM,
        estimatedTime: 90,
        materials: ["5 kardus tebal bekas", "Lem tembak", "Cat akrilik", "Penggaris panjang", "Cutter"],
        tools: ["Cutter", "Penggaris", "Lem tembak", "Kuas"],
        steps: [
            { stepNumber: 1, instruction: "Buka dan ratakan semua kardus", tips: "Pilih kardus yang masih kuat" },
            { stepNumber: 2, instruction: "Potong kardus menjadi panel dengan ukuran sama", tips: "Ukuran standar: 30x80cm untuk rak 3 tingkat" },
            { stepNumber: 3, instruction: "Tumpuk 3 lapis kardus untuk setiap panel, rekatkan dengan lem", tips: "Tekan kuat agar menempel sempurna" },
            { stepNumber: 4, instruction: "Buat slot pada panel vertikal untuk menyisipkan rak", tips: "Ukur dengan teliti agar pas" },
            { stepNumber: 5, instruction: "Rakit rak dengan menyisipkan panel horizontal ke slot", tips: "Tambah lem untuk kekuatan ekstra" },
            { stepNumber: 6, instruction: "Cat seluruh rak dengan warna pilihan", tips: "2-3 lapis cat untuk hasil maksimal" },
        ],
        primaryWasteType: WasteType.CARDBOARD,
        wasteSaved: 2.5,
        co2Reduced: 2250,
        safetyNotes: "Gunakan cutter dengan hati-hati. Selalu potong menjauhi tubuh.",
    },
];

export async function seedDIYTutorials() {
    const repo = AppDataSource.getRepository(DIYTutorial);
    
    console.log("  Checking existing tutorials...");
    const existingCount = await repo.count();
    
    if (existingCount > 0) {
        console.log(`Found ${existingCount} existing tutorials, skipping...`);
        return;
    }

    console.log("Creating DIY tutorials...");
    
    for (let i = 0; i < tutorialsData.length; i++) {
        const tutorial = repo.create({
            ...tutorialsData[i],
            thumbnailPath: `tutorials/tutorial-${i + 1}.jpg`,
            viewCount: Math.floor(Math.random() * 1000),
            completedCount: Math.floor(Math.random() * 200),
        });
        await repo.save(tutorial);
    }
    
    console.log(`Created ${tutorialsData.length} DIY tutorials`);
}
