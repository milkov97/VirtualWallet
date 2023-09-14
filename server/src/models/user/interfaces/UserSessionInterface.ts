import { ObjectId } from "mongodb";

export interface UserSessionInterface {
  id: ObjectId;
  username: string;
  isValid: boolean;
}
