import { validateCardExpDate } from "../../utils/validation/cardExpDateValidator";
import { CardInterface } from "./interfaces/CardInterface";

export class Card implements CardInterface {
  constructor(
    public cardNumber: string,
    public cardHolderName: string,
    public expirationDate: Date,
    public CVV: string
  ) {    
    
    if(!validateCardExpDate(this.expirationDate.toString())){
      throw new Error("Invalid expiraton date")
    }
  }
}
