export const cardValidationRules = {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: [
        "_id",
        "cardNumber",
        "cardHolderName",
        "expirationDate",
        "CVV",
      ],
      properties: {
        _id: {
          bsonType: "objectId",
        },
        cardNumber: {
          bsonType: "string",
          pattern: "^[0-9]{16}$",
          description: "Must be 16 digits",
        },
        cardHolderName: {
          bsonType: "string",
          description: "Include first and last name of the card owner",
        },
        expirationDate: {
          bsonType: "date",
          pattern: "^(0[1-9]|1[0-2])/[0-9]{2}$",
          description: "Must be in the format 'NN/NN' (e.g., '03/24')",
        },
        CVV: {
          bsonType: "string",
          pattern: "^[0-9]{3}$",
          description: "Must be 3 digits",
        },
      },
    },
  },
};