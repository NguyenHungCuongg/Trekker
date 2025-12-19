import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Booking } from "./booking.entity";
import { Payment } from "../payment/payment.entity";
import { CreateBookingDto } from "./dto/create-booking.dto";
import { BookingStatus, PaymentStatus, ServiceType } from "src/common/enums";
import { Tour } from "../tour/tour.entity";
import { Accommodation } from "../accommodation/accommodation.entity";

@Injectable()
export class BookingService {
  constructor(
    @InjectRepository(Booking)
    private bookingRepository: Repository<Booking>,
    @InjectRepository(Payment)
    private paymentRepository: Repository<Payment>,
    @InjectRepository(Tour)
    private tourRepository: Repository<Tour>,
    @InjectRepository(Accommodation)
    private accommodationRepository: Repository<Accommodation>,
  ) {}

  async findAll(userId?: number): Promise<any[]> {
    const whereCondition = userId ? { userId } : {};
    const bookings = await this.bookingRepository.find({
      where: whereCondition,
      relations: ["user", "payment", "invoices"],
      order: { createdAt: "DESC" },
    });

    // Load tour or accommodation data for each booking
    const bookingsWithDetails = await Promise.all(
      bookings.map(async (booking) => {
        // Flatten payment data
        const payment = booking.payment;

        let serviceData: any = null;
        if (booking.serviceType === ServiceType.TOUR) {
          serviceData = await this.tourRepository.findOne({
            where: { id: booking.serviceId },
            relations: ["location"],
          });
        } else if (booking.serviceType === ServiceType.ACCOMMODATION) {
          serviceData = await this.accommodationRepository.findOne({
            where: { id: booking.serviceId },
          });
        }

        const result: any = {
          ...booking,
          paymentMethod: payment?.method || null,
          paymentStatus: payment?.status || null,
          paidAt: payment?.paidAt || null,
        };

        if (booking.serviceType === ServiceType.TOUR) {
          result.tour = serviceData;
        } else if (booking.serviceType === ServiceType.ACCOMMODATION) {
          result.accommodation = serviceData;
        }

        return result;
      }),
    );

    return bookingsWithDetails;
  }

  async findOne(id: number, userId?: number): Promise<Booking> {
    const whereCondition = userId ? { id, userId } : { id };
    const booking = await this.bookingRepository.findOne({
      where: whereCondition,
      relations: ["user", "payment", "invoices"],
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

    // Tạo booking
    const booking = this.bookingRepository.create({
      userId: createBookingDto.userId,
      serviceType: createBookingDto.serviceType,
      serviceId: createBookingDto.serviceId,
      startDate: createBookingDto.startDate,
      endDate: createBookingDto.endDate,
      quantity: createBookingDto.quantity,
      totalPrice: createBookingDto.totalPrice,
      customerName: createBookingDto.customerName || "",
      customerEmail: createBookingDto.customerEmail || "",
      customerPhone: createBookingDto.customerPhone || "",
      notes: createBookingDto.notes || "",
      status: BookingStatus.PENDING,
    });
    const savedBooking = await this.bookingRepository.save(booking);

    // Tự động tạo Payment record
    const payment = this.paymentRepository.create({
      bookingId: savedBooking.id,
      amount: createBookingDto.totalPrice,
      method: createBookingDto.paymentMethod,
      status: PaymentStatus.PENDING,
    });
    await this.paymentRepository.save(payment);

    return savedBooking;
  }

  async remove(id: number, userId?: number): Promise<void> {
    const booking = await this.findOne(id, userId);
    await this.bookingRepository.remove(booking);
  }

  async cancel(id: number, userId?: number): Promise<Booking> {
    const booking = await this.bookingRepository.findOne({
      where: { id, userId },
    });
    if (!booking) {
      throw new NotFoundException(`Không tìm thấy đặt chỗ với id ${id}`);
    }
    if (booking.status === BookingStatus.CANCELLED) {
      throw new BadRequestException("Đặt chỗ đã bị hủy");
    }
    booking.status = BookingStatus.CANCELLED;
    return this.bookingRepository.save(booking);
  }

  async findByUserId(userId: number): Promise<any[]> {
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

  async cancelVnpayBooking(id: number): Promise<Booking> {
    const booking = await this.bookingRepository.findOne({ where: { id } });
    if (!booking) {
      throw new NotFoundException(`Không tìm thấy đặt chỗ với id ${id}`);
    }
    booking.status = BookingStatus.CANCELLED;
    if (booking.payment) {
      booking.payment.status = PaymentStatus.FAILED;
      await this.paymentRepository.save(booking.payment);
    }
    return this.bookingRepository.save(booking);
  }
}
