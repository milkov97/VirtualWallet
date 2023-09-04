import User from "../models/user/User";
import { UserInterface } from "../interfaces/user/UserInterface";
import { connectToDatabase } from "../database/dbConnection";
import { hashPassword } from "../utils/security/hashPassword";
import { UserLoginInterface } from "../interfaces/user/UserLoginInterface";
import { comparePasswords } from "../utils/security/comparePassword";
import { UserSession } from "../models/user/UserSession";
import { UserSessionInterface } from '../interfaces/user/UserSessionInterface';

class UserService {
  public async authenticateUser(
    userData: UserLoginInterface
  ): Promise<UserSessionInterface | null> {
    try {
      const db = await connectToDatabase();
      const username = userData.username;
      // @ts-ignore
      const user = db.collection("users").findOne({ username }).toArray();
      const verifiedPassword = comparePasswords(
        userData.password,
        user.password
      );
      if (!verifiedPassword) {
        return null;
      }
      const userSession = new UserSession(user.id, user.username, user.email)
      return userSession
    } catch (error) {
      throw error;
    }
  }

  public async createUser(userData: UserInterface): Promise<UserInterface> {
    try {
      const db = await connectToDatabase();
      const hashedPassword = await hashPassword(userData.password);
      const newUser = new User(
        userData.username,
        userData.email,
        hashedPassword,
        userData.firstName,
        userData.lastName,
        userData.country,
        userData.address,
        userData.phoneNumber
      );
      // @ts-ignore
      const result = await db.collection("users").insertOne(newUser);
      return { ...newUser, _id: result.insertedId };
    } catch (error) {
      throw error;
    }
  }
}

export const userService = new UserService();
