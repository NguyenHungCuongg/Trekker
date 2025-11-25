import { Expose } from "class-transformer";
import { IsNumber, IsString } from "class-validator";

export class DestinationCardDto {
  @IsNumber()
  @Expose()
  id: number;

  @IsString()
  @Expose()
  name: string;

  @IsNumber()
  @Expose()
  locationId: number;

  @IsString()
  @Expose()
  image: string;

  @IsNumber()
  @Expose({ name: "tourCount" })
  tourCount: number;

  constructor(
    id: number,
    name: string,
    locationId: number,
    image: string,
    tourCount: number,
  ) {
    this.id = id;
    this.name = name;
    this.locationId = locationId;
    this.image = image;
    this.tourCount = tourCount;
  }
}
