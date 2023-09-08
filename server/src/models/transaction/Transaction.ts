import { ObjectId } from "mongodb";
import { TransactionTypes } from "./enums/TransactionTypes";
import { TransactionInterface } from "./interfaces/TransactionInterface";

export class Transaction implements TransactionInterface {
  constructor(
    public transactionType: TransactionTypes,
    public amount: number,
    public date: Date,
    public senderId: ObjectId,
    public receiverId: ObjectId,
    public description: string
  ) {}
}
