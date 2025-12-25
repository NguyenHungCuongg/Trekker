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
import { ApiBearerAuth, ApiOperation, ApiResponse } from "@nestjs/swagger";

@UseGuards(JwtAuthGuard)
@ApiBearerAuth("JWT-auth")
@Controller("bookings")
export class BookingController {
  constructor(private bookingService: BookingService) {}

  @Get()
  @ApiOperation({
    summary: "Lấy danh sách tất cả các chỗ đặt của người dùng hiện tại",
  })
  @ApiResponse({
    status: 200,
    description: "Trả về danh sách các chỗ đặt.",
    type: [Booking],
  })
  async findAll(@Request() req): Promise<any[]> {
    return this.bookingService.findAll(req.user.userId);
  }

  @Get("confirmed-services/list")
  @ApiOperation({
    summary:
      "Lấy danh sách các dịch vụ đã được xác nhận của người dùng hiện tại",
  })
  @ApiResponse({
    status: 200,
    description: "Trả về danh sách các dịch vụ đã được xác nhận.",
  })
  async findConfirmedServices(@Request() req): Promise<any[]> {
    return this.bookingService.findConfirmedServices(req.user.userId);
  }

  @Get(":id")
  @ApiOperation({
    summary: "Lấy chi tiết chỗ đặt theo ID cho người dùng hiện tại",
  })
  @ApiResponse({
    status: 200,
    description: "Trả về chi tiết chỗ đặt.",
    type: Booking,
  })
  async findOne(
    @Param("id", ParseIntPipe) id: number,
    @Request() req,
  ): Promise<Booking> {
    return this.bookingService.findOne(id, req.user.userId);
  }

  @Post()
  @ApiOperation({ summary: "Tạo chỗ đặt mới cho người dùng hiện tại" })
  @ApiResponse({
    status: 201,
    description: "Trả về chỗ đặt đã được tạo.",
    type: Booking,
  })
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
  @ApiOperation({ summary: "Hủy chỗ đặt cho người dùng hiện tại" })
  @ApiResponse({
    status: 200,
    description: "Trả về chỗ đặt đã được hủy.",
    type: Booking,
  })
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
  @ApiOperation({ summary: "Lấy danh sách tất cả các chỗ đặt (Admin)" })
  @ApiResponse({
    status: 200,
    description: "Trả về danh sách tất cả các chỗ đặt.",
    type: [Booking],
  })
  @Roles(UserRole.ADMIN)
  async findAllBookings(): Promise<Booking[]> {
    return this.bookingService.findAll();
  }

  @Get("admin/:id")
  @UseGuards(RolesGuard)
  @ApiOperation({ summary: "Lấy chi tiết chỗ đặt theo ID (Admin)" })
  @ApiResponse({
    status: 200,
    description: "Trả về chi tiết chỗ đặt.",
    type: Booking,
  })
  @Roles(UserRole.ADMIN)
  async findBookingById(
    @Param("id", ParseIntPipe) id: number,
  ): Promise<Booking> {
    return this.bookingService.findOne(id);
  }

  @Put("admin/:id/status")
  @UseGuards(RolesGuard)
  @ApiOperation({ summary: "Cập nhật trạng thái chỗ đặt (Admin)" })
  @ApiResponse({
    status: 200,
    description: "Trả về chỗ đặt đã được cập nhật trạng thái.",
    type: Booking,
  })
  @Roles(UserRole.ADMIN)
  async updateBookingStatus(
    @Param("id", ParseIntPipe) id: number,
    @Body("status") status: BookingStatus,
  ): Promise<Booking> {
    return this.bookingService.updateStatus(id, status);
  }

  @Delete("admin/:id")
  @UseGuards(RolesGuard)
  @ApiOperation({ summary: "Xóa chỗ đặt (Admin)" })
  @ApiResponse({
    status: 200,
    description: "Trả về thông báo chỗ đặt đã được xóa.",
  })
  @Roles(UserRole.ADMIN)
  async deleteBooking(
    @Param("id", ParseIntPipe) id: number,
  ): Promise<{ message: string }> {
    await this.bookingService.remove(id);
    return { message: "Đặt chỗ đã được xóa thành công" };
  }
}
