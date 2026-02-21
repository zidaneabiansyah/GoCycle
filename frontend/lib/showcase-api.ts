// GoCycle Showcase API Client
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

// ============================================
// TYPES & INTERFACES
// ============================================

export type ProductCategory =
    | 'HOME_DECOR'
    | 'FASHION'
    | 'FURNITURE'
    | 'ACCESSORIES'
    | 'TOYS'
    | 'STORAGE'
    | 'GARDEN'
    | 'LIGHTING';

export type DifficultyLevel = 'EASY' | 'MEDIUM' | 'HARD';

export type WasteType =
    | 'PLASTIC'
    | 'GLASS'
    | 'METAL'
    | 'CARDBOARD'
    | 'TEXTILE'
    | 'ORGANIC'
    | 'ELECTRONIC';

export type JourneyAction = 'RECYCLE' | 'DISPOSE';

export interface ShowcaseProduct {
    id: string;
    name: string;
    story: string;
    description?: string;
    materials: string;
    category: ProductCategory;
    estimatedPrice: number;
    wasteSaved: number;
    co2Reduced: number;
    impactMetrics: Record<string, number>;
    imagePath: string;
    imageUrl: string;
    viewCount: number;
    likeCount: number;
    studio: {
        id: string;
        name: string;
        location: string;
    };
    maker: {
        id: string;
        name: string;
        story: string;
    };
    createdAt: string;
}

export interface DIYTutorial {
    id: string;
    title: string;
    description: string;
    difficulty: DifficultyLevel;
    estimatedTime: number;
    thumbnailPath: string;
    thumbnailUrl: string;
    primaryWasteType: WasteType;
    wasteSaved: number;
    viewCount: number;
    completedCount: number;
    materials?: string[];
    tools?: string[];
    steps?: TutorialStep[];
    tips?: string[];
}

export interface TutorialStep {
    stepNumber: number;
    title: string;
    description: string;
    imagePath?: string;
    imageUrl?: string;
}

export interface ImpactStats {
    totalBottlesSaved: number;
    totalWasteRecycled: number;
    totalDIYCreated: number;
    totalCO2Reduced: number;
    communityMembers: number;
    totalProducts: number;
    totalTutorials: number;
    lastUpdated: string;
    wasteByType: {
        glass: number;
        metal: number;
        plastic: number;
        textile: number;
        cardboard: number;
    };
}

export interface WasteJourneyStep {
    step: number;
    title: string;
    description: string;
    impact: 'positive' | 'negative' | 'neutral';
}

export interface WasteJourney {
    wasteType: WasteType;
    action: JourneyAction;
    steps: WasteJourneyStep[];
    summary: {
        totalSteps: number;
        co2Impact: number;
        recommendation: string;
    };
}

export interface EcoMaker {
    id: string;
    name: string;
    story: string;
    location: string;
    phone: string;
    productsCreated: number;
    wasteRecycled: number;
    avatarPath?: string;
    avatarUrl?: string;
    createdAt: string;
}

// ============================================
// API FUNCTIONS
// ============================================

// Showcase Products
export async function getShowcaseProducts(params?: {
    category?: ProductCategory;
    limit?: number;
    offset?: number;
}): Promise<ShowcaseProduct[]> {
    const queryParams = new URLSearchParams();
    if (params?.category) queryParams.append('category', params.category);
    if (params?.limit) queryParams.append('limit', params.limit.toString());
    if (params?.offset) queryParams.append('offset', params.offset.toString());

    const url = `${API_BASE_URL}/api/showcase/products${queryParams.toString() ? '?' + queryParams.toString() : ''}`;

    const response = await fetch(url, { cache: 'no-store' });

    if (!response.ok) {
        throw new Error('Failed to fetch showcase products');
    }

    const data = await response.json();
    return data.data;
}

export async function getShowcaseProductById(id: string): Promise<ShowcaseProduct> {
    const response = await fetch(`${API_BASE_URL}/api/showcase/products/${id}`, {
        cache: 'no-store'
    });

    if (!response.ok) {
        throw new Error('Failed to fetch product');
    }

    const data = await response.json();
    return data.data;
}

export async function getFeaturedProducts(): Promise<ShowcaseProduct[]> {
    const response = await fetch(`${API_BASE_URL}/api/showcase/featured`, {
        cache: 'no-store'
    });

    if (!response.ok) {
        throw new Error('Failed to fetch featured products');
    }

    const data = await response.json();
    return data.data;
}

// Impact Counter
export async function getImpactStats(): Promise<ImpactStats> {
    const response = await fetch(`${API_BASE_URL}/api/impact/stats`, {
        cache: 'no-store'
    });

    if (!response.ok) {
        throw new Error('Failed to fetch impact stats');
    }

    const data = await response.json();
    return data.data;
}

export async function incrementImpactCounter(field: string, value: number): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/api/impact/increment`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ field, value }),
    });

    if (!response.ok) {
        throw new Error('Failed to increment counter');
    }
}

// DIY Tutorials
export async function getDIYTutorials(params?: {
    difficulty?: DifficultyLevel;
    wasteType?: WasteType;
    limit?: number;
    offset?: number;
}): Promise<DIYTutorial[]> {
    const queryParams = new URLSearchParams();
    if (params?.difficulty) queryParams.append('difficulty', params.difficulty);
    if (params?.wasteType) queryParams.append('wasteType', params.wasteType);
    if (params?.limit) queryParams.append('limit', params.limit.toString());
    if (params?.offset) queryParams.append('offset', params.offset.toString());

    const url = `${API_BASE_URL}/api/diy/tutorials${queryParams.toString() ? '?' + queryParams.toString() : ''}`;

    const response = await fetch(url, { cache: 'no-store' });

    if (!response.ok) {
        throw new Error('Failed to fetch tutorials');
    }

    const data = await response.json();
    return data.data;
}

export async function getDIYTutorialById(id: string): Promise<DIYTutorial> {
    const response = await fetch(`${API_BASE_URL}/api/diy/tutorials/${id}`, {
        cache: 'no-store'
    });

    if (!response.ok) {
        throw new Error('Failed to fetch tutorial');
    }

    const data = await response.json();
    return data.data;
}

export async function markTutorialCompleted(id: string): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/api/diy/tutorials/${id}/complete`, {
        method: 'POST',
    });

    if (!response.ok) {
        throw new Error('Failed to mark tutorial as completed');
    }
}

// Waste Journey
export async function simulateWasteJourney(
    wasteType: WasteType,
    action: JourneyAction
): Promise<WasteJourney> {
    const response = await fetch(`${API_BASE_URL}/api/journey/simulate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ wasteType, action }),
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to simulate journey');
    }

    const data = await response.json();
    return data.data;
}

// Eco Makers
export async function getEcoMakers(): Promise<EcoMaker[]> {
    const response = await fetch(`${API_BASE_URL}/api/makers`, {
        cache: 'no-store'
    });

    if (!response.ok) {
        throw new Error('Failed to fetch eco makers');
    }

    const data = await response.json();
    return data.data;
}

export async function getEcoMakerById(id: string): Promise<EcoMaker> {
    const response = await fetch(`${API_BASE_URL}/api/makers/${id}`, {
        cache: 'no-store'
    });

    if (!response.ok) {
        throw new Error('Failed to fetch maker');
    }

    const data = await response.json();
    return data.data;
}
