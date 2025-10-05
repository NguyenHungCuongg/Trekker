import { ServiceType } from "src/common/enums";
export declare class CreateReviewDto {
    userId: number;
    serviceType: ServiceType;
    serviceId: number;
    rating: number;
    comment?: string;
}
