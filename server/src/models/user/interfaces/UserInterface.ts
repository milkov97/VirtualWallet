import { ObjectId } from "mongodb";

export interface UserInterface {
    _id?: ObjectId;
    username: string;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    country: string;
    address: string;
    phoneNumber: string;
    isVerified?: boolean
}