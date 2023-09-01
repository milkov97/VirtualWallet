import dotenv from "dotenv";

dotenv.config();

export function validateEnvDatabaseVariables(): void {
  const requiredEnvVariables = ["DB_CONN_STRING", "DB_NAME"];

  for (const variable of requiredEnvVariables) {
    if (!process.env[variable]) {
      throw new Error(`Missing required enviroment variable: ${variable}`);
    }
  }
}
