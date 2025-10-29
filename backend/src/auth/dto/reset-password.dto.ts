import { IsString, IsNotEmpty, IsEmail, MinLength } from "class-validator";

export class ResetPasswordDto {
  @IsEmail({}, { message: "Email không hợp lệ" })
  @IsNotEmpty({ message: "Email không được để trống" })
  email: string;

  @IsString({ message: "Mật khẩu mới phải là chuỗi ký tự" })
  @IsNotEmpty({ message: "Mật khẩu mới không được để trống" })
  @MinLength(6, { message: "Mật khẩu mới phải có ít nhất 6 ký tự" })
  newPassword: string;
}
