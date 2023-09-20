import { CardInterface } from "./interfaces/CardInterface";

export class Card implements CardInterface {
  constructor(
    public cardNumber: string,
    public cardHolderName: string,
    public expirationDate: string,
    public CVV: string
  ) {}
}
