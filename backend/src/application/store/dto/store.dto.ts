export interface CreateStoreDTO {
    name: string;
    description: string | undefined;
    address: string;
}

export interface StoreResponseDTO {
    id: string;
    userId: string;
    name: string;
    description: string | undefined;
    address: string;
    createdAt: Date;
}
