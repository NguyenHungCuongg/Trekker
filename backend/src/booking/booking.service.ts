import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Booking } from "./booking.entity";
import { CreateBookingDto } from "./dto/create-booking.dto";
import { BookingStatus } from "src/common/enums";

@Injectable()
export class BookingService {
  constructor(
    @InjectRepository(Booking)
    private bookingRepository: Repository<Booking>,
  ) {}

  async findAll(userId?: number): Promise<Booking[]> {
    const whereCondition = userId ? { userId } : {};
    return this.bookingRepository.find({
      where: whereCondition,
      relations: ["user", "payments", "invoices"],
      order: { createdAt: "DESC" },
    });
  }

  async findOne(id: number, userId?: number): Promise<Booking> {
    const whereCondition = userId ? { id, userId } : { id };
    const booking = await this.bookingRepository.findOne({
      where: whereCondition,
      relations: ["user", "payments", "invoices"],
    });
    if (!booking) {
      throw new NotFoundException(`Không tìm thấy đặt chỗ với id ${id}`);
    }
    return booking;
  }

  async create(createBookingDto: CreateBookingDto): Promise<Booking> {
    if (createBookingDto.startDate >= createBookingDto.endDate) {
      throw new BadRequestException("Ngày kết thúc phải sau ngày bắt đầu");
    }
    const booking = this.bookingRepository.create({
      ...createBookingDto,
      status: BookingStatus.CONFIRMED,
    });
    return this.bookingRepository.save(booking);
  }

  async remove(id: number, userId?: number): Promise<void> {
    const booking = await this.findOne(id, userId);
    await this.bookingRepository.remove(booking);
  }

  async cancel(id: number, userId?: number): Promise<Booking> {
    const booking = await this.findOne(id, userId);
    if (booking.status === BookingStatus.CANCELLED) {
      throw new BadRequestException("Đặt chỗ đã bị hủy");
    }
    booking.status = BookingStatus.CANCELLED;
    return this.bookingRepository.save(booking);
  }

  async findByUserId(userId: number): Promise<Booking[]> {
    return this.findAll(userId);
  }

  async count(userId?: number): Promise<number> {
    const whereCondition = userId ? { userId } : {};
    return this.bookingRepository.count({ where: whereCondition });
  }

  async updateStatus(id: number, status: BookingStatus): Promise<Booking> {
    const booking = await this.findOne(id);
    booking.status = status;
    return this.bookingRepository.save(booking);
  }
}
