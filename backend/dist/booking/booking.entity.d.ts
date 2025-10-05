import { User } from "../user/user.entity";
import { Payment } from "../payment/payment.entity";
import { Invoice } from "../invoice/invoice.entity";
import { BookingStatus, ServiceType } from "../common/enums";
export declare class Booking {
    id: number;
    userId: number;
    serviceType: ServiceType;
    serviceId: number;
    startDate: Date;
    endDate: Date;
    quantity: number;
    totalPrice: number;
    status: BookingStatus;
    createdAt: Date;
    user: User;
    payments: Payment[];
    invoices: Invoice[];
}
