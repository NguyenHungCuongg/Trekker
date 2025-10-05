import { PaymentMethod } from "src/common/enums";
export declare class CreatePaymentDto {
    bookingId: number;
    amount: number;
    method: PaymentMethod;
}
