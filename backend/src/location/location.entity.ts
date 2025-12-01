import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Destination } from "../destination/destination.entity";
import { Tour } from "../tour/tour.entity";

@Entity("locations")
export class Location {
  @PrimaryGeneratedColumn({ name: "location_id" })
  id: number;

  @Column({ length: 100 })
  name: string;

  @Column({ type: "text", nullable: true })
  description: string;

  @Column({ type: "text", nullable: true })
  image: string;

  @OneToMany(() => Destination, (destination) => destination.location)
  destinations: Destination[];

  @OneToMany(() => Tour, (tour) => tour.location)
  tours: Tour[];
}
