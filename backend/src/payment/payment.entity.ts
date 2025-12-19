import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  OneToOne,
} from "typeorm";
import { Booking } from "../booking/booking.entity";
import { PaymentMethod, PaymentStatus } from "../common/enums";

@Entity("payments")
export class Payment {
  @PrimaryGeneratedColumn({ name: "payment_id" })
  id: number;

  @Column({ name: "booking_id" })
  bookingId: number;

  @Column({ type: "double precision" })
  amount: number;

  @Column({
    type: "enum",
    enum: PaymentMethod,
    nullable: true,
  })
  method: PaymentMethod;

  @Column({
    type: "enum",
    enum: PaymentStatus,
    default: PaymentStatus.PENDING,
  })
  status: PaymentStatus;

  @Column({ name: "paid_at", type: "timestamp", nullable: true })
  paidAt: Date;

  // Relationships
  @OneToOne(() => Booking, (booking) => booking.payment, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "booking_id" })
  booking: Booking;
}
