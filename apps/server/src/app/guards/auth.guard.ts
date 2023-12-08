import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private jwtService: JwtService) {}
  async canActivate(context: ExecutionContext): Promise<boolean>{
    const request = context.switchToHttp().getRequest();
    const jwt = request.headers?.authorization.split(' ')[1];
    if (!jwt) {
      return false;
    } else {
      try {
        await this.jwtService.verifyAsync(jwt);
        return true;
      } catch (e) {
        return false;
      }
    }
  }


}
