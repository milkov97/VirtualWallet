import { Db } from "mongodb";
import { userValidationRules } from "./userValidationRules";
import { walletValidationRules } from "./walletValidationRules";
import { cardValidationRules } from "./cardValidationRules";

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
      name: "cards",
      validator: cardValidationRules,
    },
  ];
  const usersCollection = db.collection("users");
  await usersCollection.createIndex(
    { username: 1, email: 1 },
    { unique: true }
  );
  const cardCollection = db.collection("cards");
  await cardCollection.createIndex({ cardNumber: 1234567542157453 }, { unique: true });


  for (const collection of collections) {
    const collectionName = collection.name;
    const collectionsDB = await db
      .listCollections({ name: collectionName })
      .toArray();
    if (collectionsDB.length === 0) {
      await db.createCollection(collectionName, {
        validator: collection.validator,
      });
      console.log(`Collection '${collectionName}' created`);
    }
  }
}
