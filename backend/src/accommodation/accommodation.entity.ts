// src/accommodation/accommodation.entity.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from "typeorm";
import { RoomType } from "../room-type/room-type.entity";
import { Destination } from "src/destination/destination.entity";

@Entity("accommodations")
export class Accommodation {
  @PrimaryGeneratedColumn({ name: "accommodation_id" })
  id: number;

  @Column({ name: "destination_id" })
  destinationId: number;

  @Column({ length: 100 })
  name: string;

  @Column({ type: "text", nullable: true })
  description: string;

  @Column({ type: "float", nullable: true })
  rating: number;

  @Column({ length: 20, nullable: true })
  phone: string;

  @Column({ length: 100, nullable: true })
  email: string;

  @Column({ type: "text", nullable: true })
  address: string;

  @Column({ type: "text", nullable: true })
  image: string;

  // Relationships
  @ManyToOne(() => Destination, (destination) => destination.accommodations, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "destination_id" })
  destination: Destination;

  @OneToMany(() => RoomType, (roomType) => roomType.accommodation)
  roomTypes: RoomType[];
}
