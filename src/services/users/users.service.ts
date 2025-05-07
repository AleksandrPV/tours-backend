import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { DeleteResult, Model } from 'mongoose';
import { UserDto } from '../../dto/userDto';
import { User, UserDocument } from '../../shemas/user';

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

  async sendUser(data: User): Promise<User> {
    const userData = new this.userModel(data);
    return userData.save();
  }

  async updateUsers(id: string, body): Promise<User> {
    const updatedUser = await this.userModel.findByIdAndUpdate(id, body, {
      new: true,
    });
    if (!updatedUser) {
      throw new Error(`User with id ${id} not found`);
    }
    return updatedUser;
  }

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

  async checkRegUser(login): Promise<void> {
    
  }

  async checkAuthUser(login: string, password: string): Promise<User[] | null> {
    const userArr = await this.userModel.find({ login, password });
    return userArr.length === 0 ? null : userArr;
  }

  async login(user: UserDto) {
    const payload = { login: user.login, password: user.password};
    const userFromDb = await this.userModel.find({login: user.login});
    return {
      id: userFromDb[0]._id,
      access_token: this.jwtService.sign(payload),
    }
  }

}
