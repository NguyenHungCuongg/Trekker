import { ServiceType } from "src/common/enums";
export declare class CreateBookingDto {
    userId: number;
    serviceType: ServiceType;
    serviceId: number;
    startDate: Date;
    endDate: Date;
    quantity: number;
    totalPrice: number;
}
