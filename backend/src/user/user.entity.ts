import { Exclude } from "class-transformer";
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Booking } from "../booking/booking.entity";
import { Review } from "../review/review.entity";
import { UserRole } from "../common/enums";

@Entity("users")
export class User {
  @PrimaryGeneratedColumn({ name: "user_id" })
  id: number;

  @Column({ unique: true })
  username: string;

  @Column({ nullable: true })
  @Exclude()
  password: string;

  @Column({ nullable: true, name: "full_name" })
  fullName: string;

  @Column({ unique: true, nullable: true })
  phone: string;

  @Column({ unique: true })
  email: string;

  @Column({ type: "enum", enum: UserRole, default: UserRole.USER })
  role: UserRole;

  @Column({
    name: "profile_image",
    type: "text",
    nullable: true,
  })
  profileImage: string;

  @Column({ name: "google_id", nullable: true, unique: true })
  googleId: string;

  @Column({ name: "auth_provider", default: "local" })
  authProvider: string;

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
