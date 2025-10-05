import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  UseGuards,
  Request,
} from "@nestjs/common";
import { InvoiceService } from "./invoice.service";
import { Invoice } from "./invoice.entity";
import { JwtAuthGuard } from "../auth/jwt.authguard";
@Controller("invoice")
@UseGuards(JwtAuthGuard)
export class InvoiceController {
  constructor(private invoiceService: InvoiceService) {}

  @Get()
  async findAll(@Request() req): Promise<Invoice[]> {
    return this.invoiceService.findAll(req.user.userId);
  }

  @Get(":id")
  async findOne(
    @Param("id", ParseIntPipe) id: number,
    @Request() req,
  ): Promise<Invoice> {
    return this.invoiceService.findOne(id, req.user.userId);
  }

  @Get("booking/:bookingId")
  async findByBookingId(
    @Param("bookingId", ParseIntPipe) bookingId: number,
    @Request() req,
  ): Promise<Invoice[]> {
    return this.invoiceService.findByBookingId(bookingId, req.user.userId);
  }
}
