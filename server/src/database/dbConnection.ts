import { collectionsToCreate } from "./schemas/collections";
import { MongoClient, Db } from "mongodb";
import { validateEnvDatabaseVariables } from "../utils/validation/envValidator";

export async function connectToDatabase(): Promise<Db | null> {
  try {
    validateEnvDatabaseVariables();

    const client: MongoClient = new MongoClient(process.env.DB_CONN_STRING!);

    await client.connect();

    const db: Db = client.db(process.env.DB_NAME);
    console.log("Successfully connected to database");

    collectionsToCreate(db);

    return db;
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    return null;
  }
}
