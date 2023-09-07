import { ObjectId } from "mongodb";
import { Currency } from "../enums/Currency";

export interface WalletInterface {
    id: ObjectId;
    ownerId: ObjectId;
    balance: number;
    currency: Currency.BGN | Currency.EUR | Currency.USD
}