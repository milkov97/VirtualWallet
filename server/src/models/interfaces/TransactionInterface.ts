import { ObjectId } from "mongodb";
import { TransactionTypes } from "../enums/TransactionTypes";

export interface TransactionInterface {
    id: ObjectId;
    transactionType: TransactionTypes.debit | TransactionTypes.credit | TransactionTypes.transfer;
    amount: number;
    date: Date;
    senderId: ObjectId;
    receiverId: ObjectId;
    description: string;
}