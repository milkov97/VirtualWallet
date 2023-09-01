import User from "../models/user/User";
import { UserInterface } from "../interfaces/user/UserInterface";
import { connectToDatabase } from "../database/dbConnection";



export const createUser = async (
  userData: UserInterface
): Promise<UserInterface> => {
  try {
    const db = await connectToDatabase();
    const newUser = new User(
      userData.username,
      userData.email,
      userData.password,
      userData.firstName,
      userData.lastName,
      userData.country,
      userData.address,
      userData.phoneNumber
    );
    const result = await db!.collection("users").insertOne(newUser);
    return {...newUser, _id: result.insertedId}
  } catch (error) {
    throw error;
  }
};
