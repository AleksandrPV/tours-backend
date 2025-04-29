import {
  Body,
  Controller,
  Delete,
  Get,
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
    return this.userService.sendUser(data);
  }

  @Put(':id')
  updateUsers(@Param('id') id: string): Promise<User> {
    return this.userService.updateUsers(id);
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
