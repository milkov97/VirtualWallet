import { UserInterface } from "../interfaces/UserInterface";

export default class User implements UserInterface {
  constructor(
    public username: string,
    public email: string,
    public password: string,
    public firstName: string,
    public lastName: string,
    public country: string,
    public address: string,
    public phoneNumber: string,
    public isVerified?: boolean
  ) {
    this.isVerified = false;
  }
}
