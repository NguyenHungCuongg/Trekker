import { Module, forwardRef } from "@nestjs/common";
import { UserService } from "./user.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./user.entity";
import { UserController } from "./user.controller";
import { AuthModule } from "../auth/auth.module";
import { CloudinaryModule } from "../cloudinary/cloudinary.module";

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    forwardRef(() => AuthModule),
    CloudinaryModule,
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
