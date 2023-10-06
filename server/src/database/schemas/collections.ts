import { Db } from "mongodb";
import { userValidationRules } from "./userValidationRules";
import { walletValidationRules } from "./walletValidationRules";
import { transactionValidationRules } from "./transacrionValidationRules";


export async function collectionsToCreate(db: Db) {
  const collections = [
    {
      name: "users",
      validator: userValidationRules,
    },
    {
      name: "wallets",
      validator: walletValidationRules,
    },
    {
      name: "transactions",
      validator: transactionValidationRules,
    }

  ];
  const usersCollection = db.collection("users");
  await usersCollection.createIndex(
    { username: 1, email: 1 },
    { unique: true }
  );
  const walletsCollection = db.collection("wallets");
  await walletsCollection.createIndex( {ownerId: 1}, {unique : true})
  await walletsCollection.createIndex(
    { "cards.cardNumber": 1 },
    { unique: true, partialFilterExpression: { "cards.cardNumber": { $exists: true } } }
  );



  for (const collection of collections) {
    const collectionsDB = await db
      .listCollections({ name: collection.name })
      .toArray();
    if (collectionsDB.length === 0) {
      await db.createCollection(collection.name, {
        validator: collection.validator,
      });
      console.log(`Collection '${collection.name}' created`);
    }
  }
}
