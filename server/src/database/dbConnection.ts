import { MongoClient, Db } from "mongodb";
import { validateEnvDatabaseVariables } from "../utils/validation/envValidator";
import { userValidationRules } from "./schemas/userValidationFields";

export async function connectToDatabase(): Promise<Db | null> {
  try {
    // Validate env variables and throw error if something is missing
    validateEnvDatabaseVariables();

    // Create new Mongo client
    const client: MongoClient = new MongoClient(process.env.DB_CONN_STRING!);

    // Connect to database
    await client.connect();

    const db: Db = client.db(process.env.DB_NAME);
    console.log("Successfully connected to database");
    db.command(userValidationRules)
    return db;
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    return null;
  }
}
