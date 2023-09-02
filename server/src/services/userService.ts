import User from "../models/user/User";
import { UserInterface } from "../interfaces/user/UserInterface";
import { connectToDatabase } from "../database/dbConnection";

class UserService {
  public async getUser() {
    try {
      const db = await connectToDatabase();

      const result = db!.collection("users").find().toArray();
      return result;
    } catch (error) {
      throw error;
    }
  }

  public async createUser(userData: UserInterface): Promise<UserInterface> {
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
      console.log(newUser);
      console.log(result);
      return { ...newUser, _id: result.insertedId };
    } catch (error) {
      throw error;
    }
  }
}

export const userService = new UserService();
