import { ObjectId } from "mongodb";
import { UserSessionInterface } from "../interfaces/UserSessionInterface";

export class UserSession implements UserSessionInterface {
  constructor(public id: ObjectId, public username: string) {}
}
