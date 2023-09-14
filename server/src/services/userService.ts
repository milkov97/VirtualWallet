import User from "../models/user/User";
import { UserInterface } from "../models/user/interfaces/UserInterface";
import { connectToDatabase } from "../database/dbConnection";
import { UserLoginInterface } from "../models/user/interfaces/UserLoginInterface";
import { UserSession } from "../models/user/UserSession";
import { UserSessionInterface } from "../models/user/interfaces/UserSessionInterface";
import { passwordHandler } from "../utils/security/PasswordHandler";
// import { UserLogin } from "../models/user/UserLogin";

class UserService {
  public async findUser(username: string): Promise<UserInterface | null> {
    try {
      const db = await connectToDatabase();
      const users = db!.collection<User>("users");
      const user: UserInterface | null = await users.findOne({
        username: username,
      });
      return user;
    } catch (error) {
      throw error;
    }
  }

  public async getCurrentUser(
    userData: UserLoginInterface
  ): Promise<UserSessionInterface | boolean> {
    try {
      const { username, password } = userData;

      const foundUser = await this.findUser(username);
      if (!foundUser) {
        return false;
      }

      const verifiedPassword = await passwordHandler.comparePasswords(
        password,
        foundUser.password
      );
      if (!verifiedPassword) {
        return false;
      }
      // @ts-ignore
      const userSession = new UserSession(foundUser._id, foundUser.username, true);

      return userSession;
    } catch (error) {
      throw error;
    }
  }

  public async createUser(userData: UserInterface): Promise<UserInterface> {
    try {
      const db = await connectToDatabase();
      const hashedPassword = await passwordHandler.hashPassword(
        userData.password
      );
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
