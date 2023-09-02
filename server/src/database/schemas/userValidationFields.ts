export const userValidationRules = {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: [
        "username",
        "email",
        "password",
        "firstName",
        "lastName",
        "country",
        "address",
        "phoneNumber",
      ],
      properties: {
        username: {
          bsonType: "string",
          description: "Must be a string",
        },
        email: {
          bsonType: "string",
          pattern: "^\\S+@\\S+$",
          description: "Must be a valid email address",
        },
        password: {
          bsonType: "string",
          description: "Must be a string",
        },
        firstName: {
          bsonType: "string",
          description: "Must be a string",
        },
        lastName: {
          bsonType: "string",
          description: "Must be a string",
        },
        country: {
          bsonType: "string",
          description: "Must be a string",
        },
        address: {
          bsonType: "string",
          description: "Must be a string",
        },
        phoneNumber: {
          bsonType: "string",
          pattern: "^[0-9]{10}$",
          description: "Must be a valid 10-digit phone number",
        },
      },
    },
  },
};
