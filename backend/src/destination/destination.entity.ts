import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  ManyToMany,
  OneToMany,
} from "typeorm";

import { Location } from "../location/location.entity";
import { Tour } from "../tour/tour.entity";
import { Accommodation } from "src/accommodation/accommodation.entity";

@Entity("destinations")
export class Destination {
  @PrimaryGeneratedColumn({ name: "destination_id" })
  id: number;

  @Column({ length: 100 })
  name: string;

  @Column({ name: "location_id" })
  locationId: number;

  @Column({ type: "text", nullable: true })
  image: string;

  @ManyToOne(() => Location, (location) => location.destinations, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "location_id" })
  location: Location;

  @ManyToMany(() => Tour, (tour) => tour.destinations)
  tours: Tour[];

  @OneToMany(() => Accommodation, (accommodation) => accommodation.destination)
  accommodations: Accommodation[];
}
