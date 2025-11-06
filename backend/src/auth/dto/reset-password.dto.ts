import { IsString, IsNotEmpty, IsEmail } from "class-validator";

export class ResetPasswordDto {
  @IsEmail({}, { message: "Email không hợp lệ" })
  @IsNotEmpty({ message: "Email không được để trống" })
  email: string;

  @IsString({ message: "Mật khẩu mới phải là chuỗi ký tự" })
  @IsNotEmpty({ message: "Mật khẩu mới không được để trống" })
  newPassword: string;
}
