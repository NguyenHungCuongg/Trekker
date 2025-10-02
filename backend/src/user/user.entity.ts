import { Exclude } from "class-transformer";
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Booking } from "../booking/booking.entity";
import { Review } from "../review/review.entity";

@Entity("users")
export class User {
  @PrimaryGeneratedColumn({ name: "user_id" })
  id: number;

  @Column({ unique: true })
  username: string;

  @Column()
  @Exclude()
  password: string;

  @Column({ name: "fullname", nullable: true }) // Sửa từ full_name thành fullname
  fullName: string;

  @Column({ unique: true, nullable: true })
  phone: string;

  @Column({
    name: "created_at",
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP",
  })
  createdAt: Date;

  @OneToMany(() => Booking, (booking) => booking.user)
  bookings: Booking[];

  @OneToMany(() => Review, (review) => review.user)
  reviews: Review[];
}
