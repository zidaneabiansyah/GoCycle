import { IconRecycle, IconLeaf, IconBolt } from "@tabler/icons-react";

export interface ImpactStat {
    label: string;
    value: string;
    unit: string;
    icon: any;
    color: string;
    bg: string;
    trend: string;
}

export interface WasteComposition {
    type: string;
    percentage: number;
    color: string;
}

export interface LeaderboardUser {
    name: string;
    points: number;
    avatar: string;
    rank: number;
}

export async function getImpactStats(): Promise<ImpactStat[]> {
    // In the future, fetch this from API: await fetch(`${API_URL}/stats/impact`);
    return [
        {
            label: "Total Sampah Didaur Ulang",
            value: "15,420",
            unit: "kg",
            icon: IconRecycle,
            color: "text-emerald-600",
            bg: "bg-emerald-100",
            trend: "+12% bulan ini"
        },
        {
            label: "Emisi CO2 Dihemat",
            value: "8,250",
            unit: "kg",
            icon: IconLeaf,
            color: "text-teal-600",
            bg: "bg-teal-100",
            trend: "Setara 400 pohon"
        },
        {
            label: "Energi Diselamatkan",
            value: "45,000",
            unit: "kWh",
            icon: IconBolt,
            color: "text-yellow-600",
            bg: "bg-yellow-100",
            trend: "Cukup untuk 200 rumah"
        }
    ];
}

export async function getWasteComposition(): Promise<WasteComposition[]> {
    return [
        { type: "Plastik", percentage: 45, color: "bg-blue-500" },
        { type: "Kertas/Kardus", percentage: 30, color: "bg-yellow-500" },
        { type: "Logam", percentage: 15, color: "bg-gray-500" },
        { type: "Kaca", percentage: 5, color: "bg-green-500" },
        { type: "Lainnya", percentage: 5, color: "bg-red-500" },
    ];
}

export async function getLeaderboard(): Promise<LeaderboardUser[]> {
    return [
        { name: "Budi Santoso", points: 12500, avatar: "BS", rank: 1 },
        { name: "Siti Aminah", points: 9800, avatar: "SA", rank: 2 },
        { name: "Rudi Hartono", points: 8400, avatar: "RH", rank: 3 },
        { name: "Dewi Lestari", points: 7200, avatar: "DL", rank: 4 },
        { name: "Agus Pratama", points: 6500, avatar: "AP", rank: 5 },
    ];
}
