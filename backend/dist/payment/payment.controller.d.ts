import { PaymentService } from "./payment.service";
import { Payment } from "./payment.entity";
import { CreatePaymentDto } from "./dto/create-payment.dto";
export declare class PaymentController {
    private paymentService;
    constructor(paymentService: PaymentService);
    findAll(req: any): Promise<Payment[]>;
    findOne(id: number, req: any): Promise<Payment>;
    create(createPaymentDto: CreatePaymentDto): Promise<Payment>;
    markAsPaid(id: number): Promise<Payment>;
    markAsFailed(id: number): Promise<Payment>;
    findByBookingId(bookingId: number): Promise<Payment[]>;
}
