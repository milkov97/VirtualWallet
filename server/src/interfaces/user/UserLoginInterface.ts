import { Document } from "mongodb";
export interface UserLoginInterface extends Document{
    username: string;
    password: string;
}