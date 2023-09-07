import { UserLoginInterface } from "../interfaces/UserLoginInterface";

export class UserLogin implements UserLoginInterface {
  constructor(public username: string, public password: string) {}
}
