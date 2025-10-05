import { InvoiceService } from "./invoice.service";
import { Invoice } from "./invoice.entity";
export declare class InvoiceController {
    private invoiceService;
    constructor(invoiceService: InvoiceService);
    findAll(req: any): Promise<Invoice[]>;
    findOne(id: number, req: any): Promise<Invoice>;
    findByBookingId(bookingId: number, req: any): Promise<Invoice[]>;
}
