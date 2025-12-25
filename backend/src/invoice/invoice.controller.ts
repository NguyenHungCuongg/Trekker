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
import { ApiBearerAuth, ApiOperation, ApiResponse } from "@nestjs/swagger";

@Controller("invoices")
@UseGuards(JwtAuthGuard)
@ApiBearerAuth("JWT-auth")
export class InvoiceController {
  constructor(private invoiceService: InvoiceService) {}

  @Get()
  @ApiOperation({
    summary: "Lấy danh sách tất cả các hóa đơn của người dùng hiện tại",
  })
  @ApiResponse({
    status: 200,
    description: "Trả về danh sách các hóa đơn.",
    type: [Invoice],
  })
  async findAll(@Request() req): Promise<Invoice[]> {
    return this.invoiceService.findAll(req.user.userId);
  }

  @Get(":id")
  @ApiOperation({
    summary: "Lấy chi tiết hóa đơn theo ID cho người dùng hiện tại",
  })
  @ApiResponse({
    status: 200,
    description: "Trả về chi tiết hóa đơn.",
    type: Invoice,
  })
  async findOne(
    @Param("id", ParseIntPipe) id: number,
    @Request() req,
  ): Promise<Invoice> {
    return this.invoiceService.findOne(id, req.user.userId);
  }

  @Get("booking/:bookingId")
  @ApiOperation({
    summary:
      "Lấy danh sách các hóa đơn theo ID chỗ đặt cho người dùng hiện tại",
  })
  @ApiResponse({
    status: 200,
    description: "Trả về danh sách các hóa đơn.",
    type: [Invoice],
  })
  async findByBookingId(
    @Param("bookingId", ParseIntPipe) bookingId: number,
    @Request() req,
  ): Promise<Invoice[]> {
    return this.invoiceService.findByBookingId(bookingId, req.user.userId);
  }

  // Admin endpoints
  @Get("admin")
  @UseGuards(RolesGuard)
  @ApiOperation({ summary: "Lấy danh sách tất cả các hóa đơn (Admin)" })
  @ApiResponse({
    status: 200,
    description: "Trả về danh sách tất cả các hóa đơn.",
    type: [Invoice],
  })
  @Roles(UserRole.ADMIN)
  async findAllInvoices(): Promise<Invoice[]> {
    return this.invoiceService.findAll();
  }

  @Get("admin/:id")
  @UseGuards(RolesGuard)
  @ApiOperation({ summary: "Lấy chi tiết hóa đơn theo ID (Admin)" })
  @ApiResponse({
    status: 200,
    description: "Trả về chi tiết hóa đơn.",
    type: Invoice,
  })
  @Roles(UserRole.ADMIN)
  async findInvoiceById(
    @Param("id", ParseIntPipe) id: number,
  ): Promise<Invoice> {
    return this.invoiceService.findOne(id);
  }
}
