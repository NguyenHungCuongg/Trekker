import {
  IsNumber,
  IsNotEmpty,
  IsEnum,
  IsDateString,
  Min,
  IsString,
  IsEmail,
  IsOptional,
} from "class-validator";
import { ServiceType, PaymentMethod } from "src/common/enums";

export class CreateBookingDto {
  @IsNumber()
  @IsNotEmpty()
  userId: number;

  @IsEnum(ServiceType)
  @IsNotEmpty()
  serviceType: ServiceType;

  @IsNumber()
  @IsNotEmpty()
  serviceId: number;

  @IsDateString()
  @IsNotEmpty()
  startDate: Date;

  @IsDateString()
  @IsNotEmpty()
  endDate: Date;

  @IsNumber()
  @IsNotEmpty()
  @Min(1)
  quantity: number;

  @IsNumber()
  @IsNotEmpty()
  @Min(0)
  totalPrice: number;

  @IsString()
  @IsNotEmpty()
  customerName: string;

  @IsEmail()
  @IsNotEmpty()
  customerEmail: string;

  @IsString()
  @IsNotEmpty()
  customerPhone: string;

  @IsString()
  @IsOptional()
  notes?: string;

  @IsEnum(PaymentMethod)
  @IsNotEmpty()
  paymentMethod: PaymentMethod;

  @IsNumber()
  @IsOptional()
  roomTypeId?: number;
}
