import { TransactionTypes } from "../../models/transaction/enums/TransactionTypes"
export const transactionValidationRules = {
    validaror : {
        $jsonSchema: {
            bsonType: "object",
            required: [
              "_id",
              "transactionType",
              "amount",
              "date",
              "senderId",
              "receiverId",
              "description"
            ],
            properties: {
                _id: {
                    bsonType: "objectId",
                },
                transactionType: {
                    bsonType : [TransactionTypes.credit, TransactionTypes.debit, TransactionTypes.transfer]
                },
                amount: {
                    bsonType: "number",
                },
                date: {
                    bsonType: "date",
                },
                senderId: {
                    bsonType: "objectId",
                },
                receiverId: {
                    bsonType: "objectId",
                },
                description: {
                    bsonType: "string",
                }
            }
        }
    },
    validationAction: "error",
}