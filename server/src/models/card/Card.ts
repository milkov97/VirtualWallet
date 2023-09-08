import { ObjectId } from "mongodb";
import { CardInterface } from "./interfaces/CardInterface";

export class Card implements CardInterface{
    constructor(public cardNumber: string, public cardHolderName: string,public expirationDate: Date,public CVV: string, public userId: ObjectId){}
}