import { ObjectId } from "mongodb";
import { CardInterface } from "../card/interfaces/CardInterface";
import { Currency } from "./enums/Currency";
import { WalletInterface } from "./interfaces/WalletInterface";

export class Wallet implements WalletInterface {
    constructor(public ownerId: ObjectId, public balance: number, public currency: Currency, public cards?: CardInterface[] | []) {
    }
}

