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
          bsonType: "string",
        },
      },
    },
  },
  validationAction: "error",
};
