import { IUser } from "src/interfaces/user";
export class UserDto implements IUser {
  
  password: string;
  cardNumber: string;
  login: string;
  email: string;
  id: string;

  constructor(password: string, cardNumber: string, login: string, email: string, id: string) {
    this.password = password;
    this.cardNumber = cardNumber;
    this.login = login;
    this.email = email;
    this.id = id;
  }

}