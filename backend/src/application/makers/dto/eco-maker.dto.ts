export interface EcoMakerResponseDTO {
    id: string;
    name: string;
    story?: string;
    location?: string;
    phone?: string;
    productsCreated: number;
    wasteRecycled: number;
    avatarPath?: string;
    avatarUrl?: string;
    createdAt: Date;
}

export interface EcoMakerWithStudioDTO extends EcoMakerResponseDTO {
    studio?: {
        id: string;
        name: string;
        mission?: string;
        address: string;
        imagePath?: string;
        imageUrl?: string;
    };
}
