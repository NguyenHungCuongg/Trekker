// src/accommodation/accommodation.entity.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from "typeorm";
import { Location } from "../location/location.entity";
import { RoomType } from "../room-type/room-type.entity";

@Entity("accommodations")
export class Accommodation {
  @PrimaryGeneratedColumn({ name: "accommodation_id" })
  id: number;

  @Column({ name: "location_id" })
  locationId: number;

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

  // Relationships
  @ManyToOne(() => Location, (location) => location.accommodations, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "location_id" })
  location: Location;

  @OneToMany(() => RoomType, (roomType) => roomType.accommodation)
  roomTypes: RoomType[];
}
