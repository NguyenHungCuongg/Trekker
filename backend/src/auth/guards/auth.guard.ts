import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt/dist/jwt.service";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {} //Inject JwtService từ thư viện jwt

  //Hàm canActivate sẽ được gọi mỗi khi có request đi qua guard này
  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest(); //Lấy request từ context
    const authorization = request.headers.authorization; //Lấy header authorization từ request (dưới dạng "Bearer token")
    const token = authorization?.split(" ")[1]; //Lấy token từ header authorization (tách và lấy "token" khỏi "Bearer token")

    if (!token) {
      //Nếu không có token thì ném lỗi
      throw new UnauthorizedException("Không tìm thấy token");
    }

    //Nếu có token thì xác thực token
    try {
      const tokenPayload = await this.jwtService.verifyAsync(token); //Lấy payload từ token đã được xác thực bằng thư viện jwt
      request.user = {
        userId: tokenPayload.sub,
        username: tokenPayload.username,
      };
      return true;
    } catch (error) {
      console.log(error);
      throw new UnauthorizedException("Token không hợp lệ");
    }
  }
}
