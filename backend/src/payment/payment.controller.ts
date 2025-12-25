import {
  Controller,
  Get,
  Post,
  Put,
  Body,
  Param,
  ParseIntPipe,
  UseGuards,
  Request,
} from "@nestjs/common";
import { PaymentService } from "./payment.service";
import { Payment } from "./payment.entity";
import { CreatePaymentDto } from "./dto/create-payment.dto";
import { JwtAuthGuard } from "../auth/jwt.authguard";
import { RolesGuard } from "../auth/guards/roles.guard";
import { Roles } from "../auth/decorators/roles.decorator";
import { UserRole } from "../common/enums";
import { ApiBearerAuth, ApiOperation, ApiResponse } from "@nestjs/swagger";

@Controller("payments")
@UseGuards(JwtAuthGuard)
@ApiBearerAuth("JWT-auth")
export class PaymentController {
  constructor(private paymentService: PaymentService) {}

  // User endpoints
  @Get()
  @ApiOperation({
    summary:
      "Lấy danh sách tất cả các khoản thanh toán của người dùng hiện tại",
  })
  @ApiResponse({
    status: 200,
    description: "Trả về danh sách các khoản thanh toán.",
    type: [Payment],
  })
  async findAll(@Request() req): Promise<Payment[]> {
    return this.paymentService.findAll(req.user.userId);
  }

  @Get(":id")
  @ApiOperation({
    summary: "Lấy chi tiết khoản thanh toán theo ID cho người dùng hiện tại",
  })
  @ApiResponse({
    status: 200,
    description: "Trả về chi tiết khoản thanh toán.",
    type: Payment,
  })
  async findOne(
    @Param("id", ParseIntPipe) id: number,
    @Request() req,
  ): Promise<Payment> {
    return this.paymentService.findOne(id, req.user.userId);
  }

  @Post()
  @ApiOperation({ summary: "Tạo khoản thanh toán mới" })
  @ApiResponse({
    status: 201,
    description: "Trả về khoản thanh toán đã được tạo.",
    type: Payment,
  })
  async create(@Body() createPaymentDto: CreatePaymentDto): Promise<Payment> {
    return this.paymentService.create(createPaymentDto);
  }

  @Put(":id/mark-paid")
  @ApiOperation({ summary: "Đánh dấu khoản thanh toán là đã thanh toán" })
  @ApiResponse({
    status: 200,
    description: "Trả về khoản thanh toán đã được đánh dấu là đã thanh toán.",
    type: Payment,
  })
  async markAsPaid(@Param("id", ParseIntPipe) id: number): Promise<Payment> {
    return this.paymentService.markAsPaid(id);
  }

  @Put(":id/mark-failed")
  @ApiOperation({ summary: "Đánh dấu khoản thanh toán là thất bại" })
  @ApiResponse({
    status: 200,
    description: "Trả về khoản thanh toán đã được đánh dấu là thất bại.",
    type: Payment,
  })
  async markAsFailed(@Param("id", ParseIntPipe) id: number): Promise<Payment> {
    return this.paymentService.markAsFailed(id);
  }

  @Get("booking/:bookingId")
  @ApiOperation({
    summary:
      "Lấy danh sách các khoản thanh toán theo ID chỗ đặt cho người dùng hiện tại",
  })
  @ApiResponse({
    status: 200,
    description: "Trả về danh sách các khoản thanh toán.",
    type: [Payment],
  })
  async findByBookingId(
    @Param("bookingId", ParseIntPipe) bookingId: number,
  ): Promise<Payment[]> {
    return this.paymentService.findByBookingId(bookingId);
  }

  // Admin endpoints
  @Get("admin")
  @UseGuards(RolesGuard)
  @ApiOperation({ summary: "Lấy danh sách tất cả các khoản thanh toán (Admin)" })
  @ApiResponse({
    status: 200,
    description: "Trả về danh sách tất cả các khoản thanh toán.",
    type: [Payment],
  })
  @Roles(UserRole.ADMIN)
  async findAllPayments(): Promise<Payment[]> {
    return this.paymentService.findAll();
  }

  @Get("admin/:id")
  @UseGuards(RolesGuard)
  @ApiOperation({ summary: "Lấy chi tiết khoản thanh toán theo ID (Admin)" })
  @ApiResponse({
    status: 200,
    description: "Trả về chi tiết khoản thanh toán.",
    type: Payment,
  })
  @Roles(UserRole.ADMIN)
  async findPaymentById(
    @Param("id", ParseIntPipe) id: number,
  ): Promise<Payment> {
    return this.paymentService.findOne(id);
  }

  @Put("admin/:id/mark-paid")
  @UseGuards(RolesGuard)
  @ApiOperation({ summary: "Đánh dấu khoản thanh toán là đã thanh toán (Admin)" })
  @ApiResponse({
    status: 200,
    description: "Trả về khoản thanh toán đã được đánh dấu là đã thanh toán.",
    type: Payment,
  })
  @Roles(UserRole.ADMIN)
  async adminMarkAsPaid(
    @Param("id", ParseIntPipe) id: number,
  ): Promise<Payment> {
    return this.paymentService.markAsPaid(id);
  }

  @Put("admin/:id/mark-failed")
  @UseGuards(RolesGuard)
  @ApiOperation({ summary: "Đánh dấu khoản thanh toán là thất bại (Admin)" })
  @ApiResponse({
    status: 200,
    description: "Trả về khoản thanh toán đã được đánh dấu là thất bại.",
    type: Payment,
  })
  @Roles(UserRole.ADMIN)
  async adminMarkAsFailed(
    @Param("id", ParseIntPipe) id: number,
  ): Promise<Payment> {
    return this.paymentService.markAsFailed(id);
  }
}
