import { UserAccountType } from "../../../domain/enums/UserAccountType";

export interface UserProfileDTO {
    id: string;
    fullName: string;
    email: string;
    accountType: UserAccountType;
    createdAt: Date;
}
