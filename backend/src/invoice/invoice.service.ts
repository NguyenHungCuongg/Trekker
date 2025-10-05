import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Invoice } from "./invoice.entity";

@Injectable()
export class InvoiceService {
  constructor(
    @InjectRepository(Invoice)
    private invoiceRepository: Repository<Invoice>,
  ) {}

  async findAll(userId?: number): Promise<Invoice[]> {
    const query = this.invoiceRepository
      .createQueryBuilder("invoice")
      .leftJoinAndSelect("invoice.booking", "booking")
      .leftJoinAndSelect("booking.user", "user");
    if (userId) {
      query.where("booking.userId = :userId", { userId });
    }
    return query.orderBy("invoice.createdAt", "DESC").getMany();
  }

  async findOne(id: number, userId?: number): Promise<Invoice> {
    const query = this.invoiceRepository
      .createQueryBuilder("invoice")
      .leftJoinAndSelect("invoice.booking", "booking")
      .leftJoinAndSelect("booking.user", "user")
      .where("invoice.id = :id", { id });
    if (userId) {
      query.andWhere("booking.userId = :userId", { userId });
    }
    const invoice = await query.getOne();
    if (!invoice) {
      throw new NotFoundException(`Không tìm thấy Id ${id}`);
    }
    return invoice;
  }

  async findByBookingId(
    bookingId: number,
    userId?: number,
  ): Promise<Invoice[]> {
    const query = this.invoiceRepository
      .createQueryBuilder("invoice")
      .leftJoinAndSelect("invoice.booking", "booking")
      .leftJoinAndSelect("booking.user", "user")
      .where("booking.id = :bookingId", { bookingId });
    if (userId) {
      query.andWhere("booking.userId = :userId", { userId });
    }
    return query.getMany();
  }

  async create(
    bookingId: number,
    totalAmount: number,
    details?: string,
  ): Promise<Invoice> {
    const invoice = this.invoiceRepository.create({
      bookingId,
      totalAmount,
      details: details,
    });
    return this.invoiceRepository.save(invoice);
  }
}
