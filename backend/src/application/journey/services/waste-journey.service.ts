import { WasteType } from "../../../domain/enums/WasteType";
import { WasteJourneyDTO, JourneyStepDTO } from "../dto/journey.dto";

export class WasteJourneyService {
    private journeyData: Record<WasteType, { DISPOSE: JourneyStepDTO[]; RECYCLE: JourneyStepDTO[] }> = {
        [WasteType.PLASTIC]: {
            DISPOSE: [
                { step: 1, title: "Dibuang ke Tempat Sampah", description: "Plastik dibuang bersama sampah lainnya", impact: "negative" },
                { step: 2, title: "Terkumpul di TPA", description: "Sampah plastik menumpuk di tempat pembuangan akhir", impact: "negative" },
                { step: 3, title: "Mencemari Tanah 450 Tahun", description: "Plastik tidak terurai dan mencemari tanah selama ratusan tahun", impact: "critical" },
                { step: 4, title: "Mikroplastik Masuk Rantai Makanan", description: "Partikel plastik masuk ke tanah, air, dan akhirnya ke makanan kita", impact: "critical" },
            ],
            RECYCLE: [
                { step: 1, title: "Dikumpulkan untuk Daur Ulang", description: "Plastik dipilah dan dikumpulkan", impact: "positive" },
                { step: 2, title: "Dibersihkan & Diproses", description: "Plastik dicuci dan dihancurkan menjadi serpihan", impact: "positive" },
                { step: 3, title: "Menjadi Produk Baru", description: "Serpihan plastik dilebur dan dibentuk menjadi produk baru", impact: "positive" },
                { step: 4, title: "Mengurangi 3.5kg CO2", description: "Setiap kg plastik yang didaur ulang menghemat 3.5kg emisi CO2", impact: "positive" },
            ],
        },
        [WasteType.METAL]: {
            DISPOSE: [
                { step: 1, title: "Dibuang ke Tempat Sampah", description: "Kaleng logam dibuang", impact: "negative" },
                { step: 2, title: "Berkarat di TPA", description: "Logam berkarat dan mencemari tanah selama 200 tahun", impact: "negative" },
                { step: 3, title: "Kontaminasi Tanah", description: "Logam berat meresap ke tanah dan air tanah", impact: "critical" },
            ],
            RECYCLE: [
                { step: 1, title: "Dikumpulkan untuk Daur Ulang", description: "Logam dipilah berdasarkan jenisnya", impact: "positive" },
                { step: 2, title: "Dilebur", description: "Logam dilebur pada suhu tinggi", impact: "positive" },
                { step: 3, title: "Dibentuk Kembali", description: "Logam cair dibentuk menjadi produk baru", impact: "positive" },
                { step: 4, title: "Hemat Energi 95%", description: "Daur ulang logam menghemat hingga 95% energi dibanding produksi baru", impact: "positive" },
            ],
        },
        [WasteType.CARDBOARD]: {
            DISPOSE: [
                { step: 1, title: "Dibuang ke Tempat Sampah", description: "Kardus dibuang bersama sampah lain", impact: "negative" },
                { step: 2, title: "Terurai dalam 2 Tahun", description: "Kardus terurai lebih cepat tapi tetap menghasilkan metana", impact: "negative" },
            ],
            RECYCLE: [
                { step: 1, title: "Dikumpulkan untuk Daur Ulang", description: "Kardus dipilah dan dikumpulkan", impact: "positive" },
                { step: 2, title: "Dihancurkan & Dicampur Air", description: "Kardus dihancurkan menjadi pulp", impact: "positive" },
                { step: 3, title: "Menjadi Kertas/Kardus Baru", description: "Pulp dibentuk menjadi produk kertas baru", impact: "positive" },
                { step: 4, title: "Selamatkan 17 Pohon", description: "Setiap ton kardus daur ulang menyelamatkan 17 pohon", impact: "positive" },
            ],
        },
        [WasteType.GLASS]: {
            DISPOSE: [
                { step: 1, title: "Dibuang ke Tempat Sampah", description: "Kaca dibuang", impact: "negative" },
                { step: 2, title: "Tidak Terurai Selamanya", description: "Kaca tidak terurai dalam jutaan tahun", impact: "critical" },
            ],
            RECYCLE: [
                { step: 1, title: "Dikumpulkan untuk Daur Ulang", description: "Kaca dipilah berdasarkan warna", impact: "positive" },
                { step: 2, title: "Dihancurkan & Dilebur", description: "Kaca dihancurkan dan dilebur", impact: "positive" },
                { step: 3, title: "Dibentuk Kembali", description: "Kaca cair dibentuk menjadi produk baru", impact: "positive" },
                { step: 4, title: "Dapat Didaur Ulang Tanpa Batas", description: "Kaca dapat didaur ulang berkali-kali tanpa kehilangan kualitas", impact: "positive" },
            ],
        },
        [WasteType.TEXTILE]: {
            DISPOSE: [
                { step: 1, title: "Dibuang ke Tempat Sampah", description: "Tekstil dibuang", impact: "negative" },
                { step: 2, title: "Terurai 40 Tahun", description: "Tekstil sintetis terurai sangat lambat", impact: "negative" },
                { step: 3, title: "Mencemari Lingkungan", description: "Pewarna dan bahan kimia meresap ke tanah", impact: "critical" },
            ],
            RECYCLE: [
                { step: 1, title: "Dikumpulkan untuk Daur Ulang", description: "Tekstil dipilah berdasarkan jenis kain", impact: "positive" },
                { step: 2, title: "Dipotong & Diolah", description: "Kain dipotong dan diolah kembali", impact: "positive" },
                { step: 3, title: "Menjadi Produk Baru", description: "Dibuat menjadi kain baru atau produk lain", impact: "positive" },
                { step: 4, title: "Kurangi Limbah Fashion", description: "Membantu mengurangi dampak industri fashion terhadap lingkungan", impact: "positive" },
            ],
        },
        [WasteType.ELECTRONIC]: {
            DISPOSE: [
                { step: 1, title: "Dibuang ke Tempat Sampah", description: "E-waste dibuang sembarangan", impact: "negative" },
                { step: 2, title: "Logam Berat Mencemari", description: "Merkuri, timbal, dan logam berat lain meresap ke tanah", impact: "critical" },
                { step: 3, title: "Bahaya Kesehatan", description: "Kontaminasi air dan tanah membahayakan kesehatan", impact: "critical" },
            ],
            RECYCLE: [
                { step: 1, title: "Dikumpulkan di Drop Point", description: "E-waste dikumpulkan di tempat khusus", impact: "positive" },
                { step: 2, title: "Dibongkar & Dipilah", description: "Komponen elektronik dipilah", impact: "positive" },
                { step: 3, title: "Ekstraksi Material Berharga", description: "Logam mulia dan material berharga diekstraksi", impact: "positive" },
                { step: 4, title: "Cegah Pencemaran", description: "Mencegah pencemaran logam berat ke lingkungan", impact: "positive" },
            ],
        },
        [WasteType.ORGANIC]: {
            DISPOSE: [
                { step: 1, title: "Dibuang ke Tempat Sampah", description: "Sampah organik tercampur dengan sampah lain", impact: "negative" },
                { step: 2, title: "Menghasilkan Gas Metana", description: "Di TPA, sampah organik menghasilkan gas metana yang berbahaya", impact: "negative" },
            ],
            RECYCLE: [
                { step: 1, title: "Dikumpulkan Terpisah", description: "Sampah organik dipilah", impact: "positive" },
                { step: 2, title: "Proses Komposting", description: "Sampah organik dikomposkan", impact: "positive" },
                { step: 3, title: "Menjadi Pupuk Alami", description: "Kompos menjadi pupuk berkualitas tinggi", impact: "positive" },
                { step: 4, title: "Subur Tanah & Tanaman", description: "Pupuk organik menyuburkan tanah tanpa bahan kimia", impact: "positive" },
            ],
        },
    };

    simulateJourney(wasteType: WasteType, action: "DISPOSE" | "RECYCLE"): WasteJourneyDTO {
        const steps = this.journeyData[wasteType][action];
        
        const summary = action === "DISPOSE" 
            ? {
                totalSteps: steps.length,
                estimatedYears: this.getDecompositionYears(wasteType),
                co2Impact: this.getCO2Impact(wasteType, false),
                recommendation: "Daur ulang untuk mengurangi dampak negatif terhadap lingkungan",
            }
            : {
                totalSteps: steps.length,
                co2Impact: this.getCO2Impact(wasteType, true),
                recommendation: "Terus lakukan daur ulang untuk masa depan yang lebih hijau!",
            };

        return {
            wasteType,
            action,
            steps,
            summary,
        };
    }

    private getDecompositionYears(wasteType: WasteType): number {
        const years: Record<WasteType, number> = {
            [WasteType.PLASTIC]: 450,
            [WasteType.METAL]: 200,
            [WasteType.CARDBOARD]: 2,
            [WasteType.GLASS]: 1000000,
            [WasteType.TEXTILE]: 40,
            [WasteType.ELECTRONIC]: 1000,
            [WasteType.ORGANIC]: 0.5,
        };
        return years[wasteType];
    }

    private getCO2Impact(wasteType: WasteType, isRecycle: boolean): number {
        const impact: Record<WasteType, number> = {
            [WasteType.PLASTIC]: 3.5,
            [WasteType.METAL]: 2.8,
            [WasteType.CARDBOARD]: 0.9,
            [WasteType.GLASS]: 0.5,
            [WasteType.TEXTILE]: 2.1,
            [WasteType.ELECTRONIC]: 5.2,
            [WasteType.ORGANIC]: 0.3,
        };
        return isRecycle ? -impact[wasteType] : impact[wasteType];
    }
}
