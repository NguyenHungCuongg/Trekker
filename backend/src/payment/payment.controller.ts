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
@Controller("payments")
@UseGuards(JwtAuthGuard)
export class PaymentController {
  constructor(private paymentService: PaymentService) {}

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
}
