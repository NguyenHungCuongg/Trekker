import { User } from "../user/user.entity";
import { ServiceType } from "../common/enums";
export declare class Review {
    id: number;
    userId: number;
    serviceType: ServiceType;
    serviceId: number;
    rating: number;
    comment: string;
    createdAt: Date;
    user: User;
}
