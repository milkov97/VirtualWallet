import { ObjectId } from "mongodb";
import { UserInterface } from "./UserInterface";

export interface CardInterface {
  id: ObjectId;
  cardNumber: string;
  cardHolderName: UserInterface["firstName"] | UserInterface["lastName"];
  expirationDate: Date;
  CVV: number;
  userId: ObjectId;
}
