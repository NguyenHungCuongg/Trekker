import { Repository } from "typeorm";
import { Payment } from "./payment.entity";
import { CreatePaymentDto } from "./dto/create-payment.dto";
export declare class PaymentService {
    private paymentRepository;
    constructor(paymentRepository: Repository<Payment>);
    findAll(userId?: number): Promise<Payment[]>;
    findOne(id: number, userId?: number): Promise<Payment>;
    create(createPaymentDto: CreatePaymentDto): Promise<Payment>;
    markAsPaid(id: number): Promise<Payment>;
    markAsFailed(id: number): Promise<Payment>;
    findByBookingId(bookingId: number): Promise<Payment[]>;
    count(userId?: number): Promise<number>;
}
