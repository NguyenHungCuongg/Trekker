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
  Delete,
} from "@nestjs/common";
import { BookingService } from "./booking.service";
import { Booking } from "./booking.entity";
import { CreateBookingDto } from "./dto/create-booking.dto";
import { JwtAuthGuard } from "../auth/jwt.authguard";
import { RolesGuard } from "../auth/guards/roles.guard";
import { Roles } from "../auth/decorators/roles.decorator";
import { UserRole, BookingStatus, PaymentMethod } from "../common/enums";

@UseGuards(JwtAuthGuard)
@Controller("bookings")
export class BookingController {
  constructor(private bookingService: BookingService) {}

  @Get()
  async findAll(@Request() req): Promise<Booking[]> {
    return this.bookingService.findAll(req.user.userId);
  }

  @Get(":id")
  async findOne(
    @Param("id", ParseIntPipe) id: number,
    @Request() req,
  ): Promise<Booking> {
    return this.bookingService.findOne(id, req.user.userId);
  }

  @Post()
  async create(
    @Body() createBookingDto: CreateBookingDto,
    @Request() req,
  ): Promise<{ booking: Booking; message: string }> {
    createBookingDto.userId = req.user.userId;
    const booking = await this.bookingService.create(createBookingDto);

    let message: string;
    if (createBookingDto.paymentMethod === PaymentMethod.CASH) {
      message =
        "Đặt chỗ thành công! Vui lòng thanh toán tiền mặt khi gặp hướng dẫn viên.";
    } else {
      message = "Đặt chỗ thành công! Đang chuyển đến trang thanh toán.";
    }

    return { booking, message };
  }

  @Put(":id/cancel")
  async cancel(
    @Param("id", ParseIntPipe) id: number,
    @Request() req,
  ): Promise<Booking> {
    return this.bookingService.cancel(id, req.user.userId);
  }

  @Delete(":id")
  async remove(
    @Param("id", ParseIntPipe) id: number,
    @Request() req,
  ): Promise<{ message: string }> {
    await this.bookingService.remove(id, req.user.userId);
    return { message: "Chỗ đặt đã được xóa thành công" };
  }

  // Admin endpoints
  @Get("admin")
  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN)
  async findAllBookings(): Promise<Booking[]> {
    return this.bookingService.findAll();
  }

  @Get("admin/:id")
  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN)
  async findBookingById(
    @Param("id", ParseIntPipe) id: number,
  ): Promise<Booking> {
    return this.bookingService.findOne(id);
  }

  @Put("admin/:id/status")
  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN)
  async updateBookingStatus(
    @Param("id", ParseIntPipe) id: number,
    @Body("status") status: BookingStatus,
  ): Promise<Booking> {
    return this.bookingService.updateStatus(id, status);
  }

  @Delete("admin/:id")
  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN)
  async deleteBooking(
    @Param("id", ParseIntPipe) id: number,
  ): Promise<{ message: string }> {
    await this.bookingService.remove(id);
    return { message: "Đặt chỗ đã được xóa thành công" };
  }
}
