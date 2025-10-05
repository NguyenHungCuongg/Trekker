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
@UseGuards(JwtAuthGuard)
@Controller("booking")
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
  ): Promise<Booking> {
    createBookingDto.userId = req.user.userId;
    return this.bookingService.create(createBookingDto);
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
}
