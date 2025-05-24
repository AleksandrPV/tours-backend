import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { request } from 'http';
import { Observable } from 'rxjs';
import { IUser } from 'src/interfaces/user';
import { jwtConstants } from 'src/static/private/constants';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}
  
  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    console.log('context', context.getHandler());
    const token: string | undefined = this.extractTokenFromHeader(request);
    if (!token) {
      return false;
    }
    const userPayload = <IUser>await this.jwtService.verifyAsync(token, {secret: jwtConstants.secret});
    console.log('token', token)
    console.log('user from jwt', userPayload)
    return userPayload?.role === 'admin';
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }

}
