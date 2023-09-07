import User from "../models/user/User";
import { UserInterface } from "../models/interfaces/UserInterface";
import { connectToDatabase } from "../database/dbConnection";
import { hashPassword } from "../utils/security/hashPassword";
import { UserLoginInterface } from "../models/interfaces/UserLoginInterface";
import { comparePasswords } from "../utils/security/comparePassword";
import { UserSession } from "../models/user/UserSession";
import { UserSessionInterface } from "../models/interfaces/UserSessionInterface";
// import { UserLogin } from "../models/user/UserLogin";

class UserService {
  public async getUser(username: string): Promise<UserInterface | null> {
    try {
      const db = await connectToDatabase();
      const users = db!.collection<User>("users");
      const user: UserInterface | null = await users.findOne({
        username: username,
      });
      return user;
    } catch (error) {
      console.log(error);

      throw error;
    }
  }

  public async authenticateUser(
    userData: UserLoginInterface
  ): Promise<UserSessionInterface | boolean> {
    try {
      const { username, password } = userData;

      const foundUser = await this.getUser(username);
      if (!foundUser) {
        return false;
      }

      const verifiedPassword = await comparePasswords(
        password,
        foundUser.password
      );
      if (!verifiedPassword) {
        return false;
      }
      // @ts-ignore
      const userSession = new UserSession(foundUser._id, foundUser.username);

      return userSession;
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
