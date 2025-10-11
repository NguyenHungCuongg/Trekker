import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { Accommodation } from "../accommodation/accommodation.entity";

@Entity("room_types")
export class RoomType {
  @PrimaryGeneratedColumn({ name: "room_type_id" })
  id: number;

  @Column({ name: "accommodation_id" })
  accommodationId: number;

  @Column({ length: 100 })
  name: string;

  @Column({ nullable: true })
  capacity: number;

  @Column({ type: "double precision", nullable: true })
  price: number;

  @Column({ type: "text", nullable: true })
  amenities: string;

  @Column({ type: "text", nullable: true })
  description: string;

  @ManyToOne(() => Accommodation, (accommodation) => accommodation.roomTypes, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "accommodation_id" })
  accommodation: Accommodation;
}
