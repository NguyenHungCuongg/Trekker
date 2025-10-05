import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Payment } from "./payment.entity";
import { PaymentStatus } from "src/common/enums";
import { CreatePaymentDto } from "./dto/create-payment.dto";

@Injectable()
export class PaymentService {
  constructor(
    @InjectRepository(Payment)
    private paymentRepository: Repository<Payment>,
  ) {}

  async findAll(userId?: number): Promise<Payment[]> {
    const query = this.paymentRepository
      .createQueryBuilder("payment")
      .leftJoinAndSelect("payment.booking", "booking")
      .leftJoinAndSelect("booking.user", "user");
    if (userId) {
      query.where("booking.userId = :userId", { userId });
    }
    return query.orderBy("payment.paidAt", "DESC").getMany();
  }

  async findOne(id: number, userId?: number): Promise<Payment> {
    const query = this.paymentRepository
      .createQueryBuilder("payment")
      .leftJoinAndSelect("payment.booking", "booking")
      .leftJoinAndSelect("booking.user", "user")
      .where("payment.id = :id", { id });
    if (userId) {
      query.andWhere("booking.userId = :userId", { userId });
    }
    const payment = await query.getOne();
    if (!payment) {
      throw new NotFoundException(`Không tìm thấy thanh toán với id ${id}`);
    }
    return payment;
  }

  async create(createPaymentDto: CreatePaymentDto): Promise<Payment> {
    const payment = this.paymentRepository.create({
      ...createPaymentDto,
      status: PaymentStatus.PENDING,
    });
    return this.paymentRepository.save(payment);
  }

  async markAsPaid(id: number): Promise<Payment> {
    const payment = await this.findOne(id);
    payment.status = PaymentStatus.PAID;
    payment.paidAt = new Date();
    return this.paymentRepository.save(payment);
  }

  async markAsFailed(id: number): Promise<Payment> {
    const payment = await this.findOne(id);
    payment.status = PaymentStatus.FAILED;
    return this.paymentRepository.save(payment);
  }

  async findByBookingId(bookingId: number): Promise<Payment[]> {
    return this.paymentRepository.find({
      where: { bookingId },
      relations: ["booking"],
      order: { paidAt: "DESC" },
    });
  }

  async count(userId?: number): Promise<number> {
    const query = this.paymentRepository
      .createQueryBuilder("payment")
      .leftJoin("payment.booking", "booking");
    if (userId) {
      query.where("booking.userId = :userId", { userId });
    }
    return query.getCount();
  }
}
