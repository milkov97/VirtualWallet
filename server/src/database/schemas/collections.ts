import { Db } from 'mongodb'
import { userValidationRules } from "./userValidationFields";


export async function collectionsToCreate(db: Db) {
    const collections = [
      {
        name: "users",
        validator: userValidationRules,
      },
    ];

    for(const collection of collections) {
      const collectionName = collection.name;
      const collectionsDB = await db.listCollections({name: collectionName}).toArray()
      if(collectionsDB.length === 0) {
        await db.createCollection(collectionName, {validator: collection.validator})
        console.log(`Collection '${collectionName}' created`);
      }
    }
}