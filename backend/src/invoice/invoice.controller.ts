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
import { RolesGuard } from "../auth/guards/roles.guard";
import { Roles } from "../auth/decorators/roles.decorator";
import { UserRole } from "../common/enums";

@Controller("invoices")
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

  // Admin endpoints
  @Get("admin/all")
  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN)
  async findAllInvoices(): Promise<Invoice[]> {
    return this.invoiceService.findAll();
  }

  @Get("admin/:id")
  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN)
  async findInvoiceById(
    @Param("id", ParseIntPipe) id: number,
  ): Promise<Invoice> {
    return this.invoiceService.findOne(id);
  }
}
