import { Currency } from "../../models/wallet/enums/Currency";
export const walletValidationRules = {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["_id", "balance", "currency"],
      properties: {
        _id: {
          bsonType: "objectId",
        },
        balance: {
          bsonType: "number",
        },
        currency: {
          bsonType: [Currency.BGN, Currency.EUR, Currency.USD],
        },
      },
    },
  },
  validationAction: "error",
};
