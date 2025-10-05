import { Repository } from "typeorm";
import { Invoice } from "./invoice.entity";
export declare class InvoiceService {
    private invoiceRepository;
    constructor(invoiceRepository: Repository<Invoice>);
    findAll(userId?: number): Promise<Invoice[]>;
    findOne(id: number, userId?: number): Promise<Invoice>;
    findByBookingId(bookingId: number, userId?: number): Promise<Invoice[]>;
    create(bookingId: number, totalAmount: number, details?: string): Promise<Invoice>;
}
