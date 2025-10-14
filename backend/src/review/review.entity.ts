import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { User } from "../user/user.entity";
import { ServiceType } from "../common/enums";

@Entity("reviews")
export class Review {
  @PrimaryGeneratedColumn({ name: "review_id" })
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

  @Column({ type: "float", nullable: true })
  rating: number;

  @Column({ type: "text", nullable: true })
  comment: string;

  @Column({
    name: "created_at",
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP",
  })
  createdAt: Date;

  @ManyToOne(() => User, (user) => user.reviews, { onDelete: "CASCADE" })
  @JoinColumn({ name: "user_id" })
  user: User;
}
