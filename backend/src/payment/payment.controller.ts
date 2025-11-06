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

@Controller("payments")
@UseGuards(JwtAuthGuard)
export class PaymentController {
  constructor(private paymentService: PaymentService) {}

  // User endpoints
  @Get()
  async findAll(@Request() req): Promise<Payment[]> {
    return this.paymentService.findAll(req.user.userId);
  }

  @Get(":id")
  async findOne(
    @Param("id", ParseIntPipe) id: number,
    @Request() req,
  ): Promise<Payment> {
    return this.paymentService.findOne(id, req.user.userId);
  }

  @Post()
  async create(@Body() createPaymentDto: CreatePaymentDto): Promise<Payment> {
    return this.paymentService.create(createPaymentDto);
  }

  @Put(":id/mark-paid")
  async markAsPaid(@Param("id", ParseIntPipe) id: number): Promise<Payment> {
    return this.paymentService.markAsPaid(id);
  }

  @Put(":id/mark-failed")
  async markAsFailed(@Param("id", ParseIntPipe) id: number): Promise<Payment> {
    return this.paymentService.markAsFailed(id);
  }

  @Get("booking/:bookingId")
  async findByBookingId(
    @Param("bookingId", ParseIntPipe) bookingId: number,
  ): Promise<Payment[]> {
    return this.paymentService.findByBookingId(bookingId);
  }

  // Admin endpoints
  @Get("admin")
  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN)
  async findAllPayments(): Promise<Payment[]> {
    return this.paymentService.findAll();
  }

  @Get("admin/:id")
  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN)
  async findPaymentById(
    @Param("id", ParseIntPipe) id: number,
  ): Promise<Payment> {
    return this.paymentService.findOne(id);
  }
}
