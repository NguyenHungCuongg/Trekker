import { IsNumber, IsNotEmpty, IsEnum, Min } from "class-validator";
import { PaymentMethod } from "src/common/enums";

export class CreatePaymentDto {
  @IsNumber()
  @IsNotEmpty()
  bookingId: number;

  @IsNumber()
  @Min(0)
  @IsNotEmpty()
  amount: number;

  @IsEnum(PaymentMethod)
  @IsNotEmpty()
  method: PaymentMethod;
}
