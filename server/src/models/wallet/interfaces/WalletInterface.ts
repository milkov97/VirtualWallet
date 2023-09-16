import { ObjectId } from "mongodb";
import { Currency } from "../enums/Currency";
import { CardInterface } from "../../card/interfaces/CardInterface";

export interface WalletInterface {
    _id?: ObjectId;
    ownerId: ObjectId;
    balance: number;
    currency: Currency.BGN | Currency.EUR | Currency.USD;
    cards?: CardInterface[];
}