import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { DeleteResult, Model } from 'mongoose';
import { User, UserDocument } from 'src/shemas/user';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {
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

  async sendUser(data): Promise<User> {
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

  async checkRegUser(): Promise<void> {
    
  }
}
