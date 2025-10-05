import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { Booking } from "../booking/booking.entity";

@Entity("invoices")
export class Invoice {
  @PrimaryGeneratedColumn({ name: "invoice_id" })
  id: number;

  @Column({ name: "booking_id" })
  bookingId: number;

  @Column({ name: "total_amount", type: "double precision" })
  totalAmount: number;

  @Column({
    name: "created_at",
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP",
  })
  createdAt: Date;

  @Column({ type: "text", nullable: true })
  details: string;

  // Relationships
  @ManyToOne(() => Booking, (booking) => booking.invoices, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "booking_id" })
  booking: Booking;
}
