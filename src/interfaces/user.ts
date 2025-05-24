import mongoose, * as monggoose from 'mongoose';

export type Roles = 'admin' | 'user';

export interface IUser {
  password: string,
  cardNumber?: string,
  login: string,
  email?: string,
  id?: string,
  role?: Roles,
}

export interface IResponseUser {
  id: mongoose.Types.ObjectId,
  access_token: string,
  role: Roles
}
export interface IMongoUser extends IUser {
  _id?: mongoose.Types.ObjectId
}