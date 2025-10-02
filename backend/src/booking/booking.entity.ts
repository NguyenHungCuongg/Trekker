import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from "typeorm";
import { User } from "../user/user.entity";
import { Payment } from "../payment/payment.entity";
import { Invoice } from "../invoice/invoice.entity";
import { BookingStatus, ServiceType } from "../common/enums";

@Entity("bookings")
export class Booking {
  @PrimaryGeneratedColumn({ name: "booking_id" })
  id: number;

  @Column({ name: "user_id" })
  userId: number;

  @Column({
    name: "service_type",
    type: "enum",
    enum: ServiceType,
  })
  serviceType: ServiceType;

  @Column({ name: "service_id" })
  serviceId: number;

  @Column({ name: "start_date", type: "date", nullable: true })
  startDate: Date;

  @Column({ name: "end_date", type: "date", nullable: true })
  endDate: Date;

  @Column({ nullable: true })
  quantity: number;

  @Column({ name: "total_price", type: "double precision", nullable: true })
  totalPrice: number;

  @Column({
    type: "enum",
    enum: BookingStatus,
    default: BookingStatus.PENDING,
  })
  status: BookingStatus;

  @Column({
    name: "created_at",
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP",
  })
  createdAt: Date;

  @ManyToOne(() => User, (user) => user.bookings, { onDelete: "CASCADE" })
  @JoinColumn({ name: "user_id" })
  user: User;

  @OneToMany(() => Payment, (payment) => payment.booking)
  payments: Payment[];

  @OneToMany(() => Invoice, (invoice) => invoice.booking)
  invoices: Invoice[];
}
