import { EcoMakerRepository } from "../repositories/eco-maker.repository";
import { StoreRepository } from "../../store/repositories/store.repository";
import { ProductRepository } from "../../product/repositories/product.repository";
import { EcoMakerResponseDTO, EcoMakerWithStudioDTO } from "../dto/eco-maker.dto";
import { ImageService } from "../../../infrastructure/upload/image.service";

export class MakerService {
    constructor(
        private makerRepo: EcoMakerRepository,
        private studioRepo: StoreRepository,
        private productRepo: ProductRepository
    ) {}

    async getMakers(limit?: number): Promise<EcoMakerResponseDTO[]> {
        const makers = await this.makerRepo.findAll(limit);
        return makers.map(maker => this.mapToDTO(maker));
    }

    async getMakerById(id: string): Promise<EcoMakerWithStudioDTO | null> {
        const maker = await this.makerRepo.findById(id);
        if (!maker) {
            return null;
        }

        const studio = await this.studioRepo.findByUserId(id);
        const products = studio ? await this.productRepo.findByStoreId(studio.id) : [];

        const result: EcoMakerWithStudioDTO = {
            ...this.mapToDTO(maker),
        };

        if (studio) {
            result.studio = {
                id: studio.id,
                name: studio.name,
                address: studio.address,
            };
            if (studio.mission) {
                result.studio.mission = studio.mission;
            }
            if (studio.imagePath) {
                result.studio.imagePath = studio.imagePath;
                result.studio.imageUrl = ImageService.getImageUrl(studio.imagePath);
            }
        }

        return result;
    }

    private mapToDTO(maker: any): EcoMakerResponseDTO {
        const dto: EcoMakerResponseDTO = {
            id: maker.id,
            name: maker.name,
            story: maker.story,
            location: maker.location,
            phone: maker.phone,
            productsCreated: maker.productsCreated || 0,
            wasteRecycled: maker.wasteRecycled || 0,
            avatarPath: maker.avatarPath,
            createdAt: maker.createdAt,
        };

        if (maker.avatarPath) {
            dto.avatarUrl = ImageService.getImageUrl(maker.avatarPath);
        }

        return dto;
    }
}
