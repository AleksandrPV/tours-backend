import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { DeleteResult, Model } from 'mongoose';
import { UserDto } from '../../dto/userDto';
import { User, UserDocument } from '../../shemas/user';
import { IMongoUser, IResponseUser, IUser } from 'src/interfaces/user';
import { Request } from 'express';

import * as bcrypt from 'bcrypt';
@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private jwtService: JwtService
  ) {
    console.log('UsersService initialized');
  }

  async getAllUsers(): Promise<User[]> {
    return this.userModel.find();
  }

  async getUserById(id: string): Promise<User> {
    const user = await this.userModel.findById(id);
    if (!user) {
      throw new Error(`User with id ${id} not found`);
    }
    return user;
  }

  async sendUser(user: IUser): Promise<boolean> {
    const defaultRole = 'user';
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(user.password, salt);
    console.log('hashedPassword', hashedPassword);
    const newUser: IUser = {...user, password: hashedPassword, role: defaultRole};
    const userData = new this.userModel(newUser);
    userData.save();

    return Promise.resolve(true);
  }

  async updateUsers(id: string, user: IUser): Promise<IMongoUser> {
    const updatedUser = await this.userModel.findByIdAndUpdate(id, user, {
      new: true,
    });
    if (!updatedUser) {
      throw new Error(`User with id ${id} not found`);
    }
    return updatedUser;
  }

  // async updateUsers(id: string, user: IUser): Promise<User> {
  //   const salt = await bcrypt.genSalt();
  //   const hashedPassword = await bcrypt.hash(user.password, salt);
  //   const hashUser = Object.assign(user, { password: hashedPassword });
  //   return this.userModel.findByIdAndUpdate(id, hashUser)
  // }

  async deleteUsers(): Promise<DeleteResult> {
    return await this.userModel.deleteMany();
  }

  async deleteUserById(id: string): Promise<User> {
    const deletedUser = await this.userModel.findByIdAndDelete(id);
    if (!deletedUser) {
      throw new Error(`User with id ${id} not found`);
    }
    return deletedUser;
  }

  async checkRegUser(login: string): Promise<User[]> {
    return this.userModel.find({ login: login });
  }

  async checkAuthUser(login: string, password: string): Promise<IUser[]> {
    const usersArr = <IUser[]>await this.userModel.find({ login });
    console.log('usersArr', usersArr);
    if (usersArr.length === 0) {
      throw new BadRequestException('логин указан неверно');
    }
    const isMatch: boolean = bcrypt.compareSync(password, usersArr[0].password);
    if (!isMatch) {
      throw new BadRequestException('пароль указан неверно');
    }
    return Promise.resolve(usersArr);
  }

  // async checkAuthUser(login: string, password: string): Promise<User[] | null> {
  //   const usersArr = await this.userModel.find({ login, password });
  //   return usersArr.length === 0 ? null : usersArr;
  // }

  async login(user: IUser): Promise<IResponseUser>{
    const userFromDb = <IMongoUser>await this.userModel.findOne({login: user.login})
    const payload = { login: user.login, password: user.password, role: userFromDb?.role};
    // const userFromDb = await this.userModel.find({login: user.login});
    return {
      id: userFromDb._id,
      access_token: this.jwtService.sign(payload),
      role: userFromDb.role
    } as IResponseUser;
  }

  extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }

}
