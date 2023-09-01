import { UserInterface } from "../../interfaces/user/UserInterface";
import { ObjectId } from "mongodb";

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
    public id?: ObjectId
  ) {}
}
