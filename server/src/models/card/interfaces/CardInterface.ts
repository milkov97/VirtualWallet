import { ObjectId } from "mongodb";

export interface CardInterface {
  _id?: ObjectId;
  cardNumber: string;
  cardHolderName: string;
  expirationDate: Date;
  CVV: string;
  userId: ObjectId;
}
