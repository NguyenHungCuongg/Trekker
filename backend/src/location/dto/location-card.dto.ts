import { Expose } from "class-transformer";
import { IsNumber, IsString } from "class-validator";

export class LocationCardDto {
  @IsNumber()
  @Expose()
  id: number;

  @IsString()
  @Expose()
  name: string;

  @IsString()
  @Expose()
  description: string;

  @IsString()
  @Expose()
  image: string;

  @IsNumber()
  @Expose({ name: "tourCount" })
  tourCount: number;

  @IsNumber()
  @Expose({ name: "accommodationCount" })
  accommodationCount: number;

  constructor(
    id: number,
    name: string,
    description: string,
    image: string,
    tourCount: number,
    accommodationCount: number,
  ) {
    Object.assign(this, {
      id,
      name,
      description,
      image,
      tourCount,
      accommodationCount,
    });
  }
}
