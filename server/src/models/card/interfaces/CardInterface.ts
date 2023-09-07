import { ObjectId } from "mongodb";
import { UserInterface } from "../../user/interfaces/UserInterface";

export interface CardInterface {
  id: ObjectId;
  cardNumber: string;
  cardHolderName: UserInterface["firstName"] | UserInterface["lastName"];
  expirationDate: Date;
  CVV: string;
  userId: ObjectId;
}
