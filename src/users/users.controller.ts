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
} from '@nestjs/common';
import { UsersService } from 'src/services/users/users.service';
import { User } from 'src/shemas/user';

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

  @Post()
  sendUser(@Body() data: any): Promise<User> {
    return this.userService.sendUser(data)
  }

// @Post()
// sendUser(@Body() data: any): Promise<User> {
//   return this.userService.checkRegUser(data.login).then((queryRes) => {
//     console.log('data reg ', queryRes);
//     if (queryRes.length === 0) {
//       return this.userService.sendUser(data);
//     } else {
//       console.log('err - user is exists')
//       throw new HttpException({
//         status: HttpStatus.CONFLICT,
//         errorText: 'Пользователь уже зарегистрирован'
//       }, HttpStatus.CONFLICT);
//     }
//   });

// }

  @Put(':id')
  updateUsers(@Param('id') id: string, @Body() data: any): Promise<User> {
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
