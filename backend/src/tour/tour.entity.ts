import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  ManyToMany,
  JoinTable,
} from "typeorm";
import { Location } from "../location/location.entity";
import { Destination } from "../destination/destination.entity";

@Entity("tours")
export class Tour {
  @PrimaryGeneratedColumn({ name: "tour_id" })
  id: number;

  @Column({ name: "location_id" })
  locationId: number;

  @Column({ length: 100 })
  name: string;

  @Column({ type: "text", nullable: true })
  description: string;

  @Column({ nullable: true })
  duration: number;

  @Column({ type: "double precision", nullable: true })
  price: number;

  @Column({ type: "float", nullable: true })
  rating: number;

  @Column({ name: "start_date", type: "date", nullable: true })
  startDate: Date;

  @Column({ name: "end_date", type: "date", nullable: true })
  endDate: Date;

  @Column({ name: "max_guests", nullable: true })
  maxGuests: number;

  @Column({ type: "varchar", length: 255, nullable: true })
  image: string;

  @ManyToOne(() => Location, (location) => location.tours, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "location_id" })
  location: Location;

  @ManyToMany(() => Destination, (destination) => destination.tours)
  @JoinTable({
    name: "tour_destination",
    joinColumn: { name: "tour_id", referencedColumnName: "id" },
    inverseJoinColumn: { name: "destination_id", referencedColumnName: "id" },
  })
  destinations: Destination[];
}
