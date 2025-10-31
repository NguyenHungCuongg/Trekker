import { Injectable, CanActivate, ExecutionContext } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { UserRole } from "../../common/enums";

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    // Lấy các roles được yêu cầu từ decorator
    const requiredRoles = this.reflector.getAllAndOverride<UserRole[]>(
      "roles",
      [context.getHandler(), context.getClass()],
    );

    // Nếu không có yêu cầu role thì cho phép truy cập
    if (!requiredRoles) {
      return true;
    }

    // Lấy user từ request (đây là user đã được xác thực bởi JwtAuthGuard)
    const { user } = context.switchToHttp().getRequest();

    // Kiểm tra xem role của user có nằm trong các role được yêu cầu không và trả về kết quả
    return requiredRoles.some((role) => user.role === role);
  }
}
