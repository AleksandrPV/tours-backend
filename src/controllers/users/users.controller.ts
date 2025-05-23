import {
  Body,
  ConsoleLogger,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UsersService } from '../../services/users/users.service';
import { User, UserDocument } from 'src/shemas/user';
import { UserDto } from 'src/dto/userDto';
import { JwtAuthGuardService } from 'src/services/authentication/jwt-auth.guard/jwt-auth.guard.service';
import { UserAuthPipe } from 'src/pipes/user-auth.pipe';
import { IUser } from 'src/interfaces/user';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Get()
  getAllUsers(): Promise<User[]> {
    return this.userService.getAllUsers();
  }

  @Get(':id')
  getUserById(@Param('id') id: string): Promise<User> {
    return this.userService.getUserById(id);
  }

  // @UseGuards(JwtAuthGuardService)
  @Post()
  sendUser(@Body() data: UserDto): Promise<boolean> {
    return this.userService.checkRegUser(data.login).then((queryRes: any) => {
      console.log('data reg ', queryRes);
      if (queryRes?.length === 0) {
        return this.userService.sendUser(data);
      } else {
        console.log('err - user is exists')
        throw new HttpException({
          status: HttpStatus.CONFLICT,
          errorText: 'Пользователь уже зарегистрирован'
        }, HttpStatus.CONFLICT);
      }
    });
  }

  @UseGuards(AuthGuard('local'))
  @Post(':login')
    authUser(@Body(UserAuthPipe) data: UserDto, @Param('login') login): any {
      return this.userService.login(data);
  }

  @Put(':id')
  updateUsers(@Param('id') id: string, @Body() data: any): Promise<IUser> {
    return this.userService.updateUsers(id, data);
  }

  @Delete()
  deleteUsers() {
    return this.userService.deleteUsers();
  }

  @Delete(':id')
  deleteUserById(@Param('id') id: string): Promise<User> {
    return this.userService.deleteUserById(id);
  }
}