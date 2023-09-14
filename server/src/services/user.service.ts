import User from "../models/user/User";
import { UserInterface } from "../models/user/interfaces/UserInterface";
import { connectToDatabase } from "../database/dbConnection";
import { UserLoginInterface } from "../models/user/interfaces/UserLoginInterface";
import { UserSession } from "../models/user/UserSession";
import { UserSessionInterface } from "../models/user/interfaces/UserSessionInterface";
import { passwordHandler } from "../utils/security/PasswordHandler";
import { ObjectId } from "mongodb";
// import { UserLogin } from "../models/user/UserLogin";

class UserService {
  public async findUserInfo(username: string): Promise<UserInterface | null> {
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

      const foundUser = await this.findUserInfo(username);
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
      
      const userSession = new UserSession(
        // @ts-ignore
        foundUser._id,
        foundUser.username,
        true
      );

      return userSession;
    } catch (error) {
      throw error;
    }
  }

  public async getUserSession(
    userId: string
  ): Promise<UserSessionInterface | null> {
    try {
      const id = new ObjectId(userId);
      const db = await connectToDatabase();
      const users = db!.collection<User>("users");
      const user: UserInterface | null = await users.findOne({
        _id: id,
      });
      if (!user) {
        return null;
      }
      // @ts-ignore
      const userSession = new UserSession(user._id, user?.username, true);
      return userSession;
    } catch (error) {
      throw error;
    }
  }

  // public async turnDownSession(sessionId: ObjectId) {
  //   const session = this.getUserSession(sessionId);
  //   // @ts-ignore
  //   session.invalidateSession();
  // }

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
