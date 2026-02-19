import { z } from "zod";

export const createStoreSchema = z.object({
    name: z.string().min(3, "Store name must be at least 3 characters").max(255, "Store name too long"),
    description: z.string().max(1000, "Description too long").optional(),
    address: z.string().min(5, "Address must be at least 5 characters").max(500, "Address too long"),
});
