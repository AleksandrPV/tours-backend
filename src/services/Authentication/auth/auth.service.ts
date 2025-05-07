import{ Strategy } from 'passport-local';
import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { UsersService } from '../../users/users.service';

@Injectable()
export class AuthService extends PassportStrategy(Strategy) {

  constructor(private usersService: UsersService) {
    super({usernameField: 'login', passwordField: 'psw'});
  }

  async validate(login: string, password: string): Promise<any> {
    const user = await this.usersService.checkAuthUser(login, password);
    console.log('user', user);
    if (!user) {
      throw new HttpException({
        status: HttpStatus.CONFLICT,
        errorText: 'Пользователь не найден в базе данных',
      }, HttpStatus.CONFLICT);
    };
    return true;
  }

  
}
