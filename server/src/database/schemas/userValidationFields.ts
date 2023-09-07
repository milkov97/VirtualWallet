export const userValidationRules = {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: [
        "_id",
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
        _id: {
          bsonType: "objectId",
        },
        username: {
          bsonType: "string",
          description: "Must be a string between 4 and 30 characters",
          minLength: 4,
          maxLength: 30,

        },
        email: {
          bsonType: "string",
          pattern: "^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,4}$",
          description: "Must be a valid email address",

        },
        password: {
          bsonType: "string",
          description: "Must be a string with at least 8 characters",
          minLength: 6,
        },
        firstName: {
          bsonType: "string",
          description: "Must be a string",
          minLength: 2,
          maxLength: 50,
        },
        lastName: {
          bsonType: "string",
          description: "Must be a string",
          minLength: 2,
          maxLength: 50,
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
  validationAction: "error",
};

// password regex-^(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&+=!])(?=.*[a-zA-Z0-9]).{8,}$
// description: Your password must be a minimum of 8 characters long and contain at least one uppercase letter, one number, and one special symbol (e.g., @, #, $, %, ^, &, +, =, !).
