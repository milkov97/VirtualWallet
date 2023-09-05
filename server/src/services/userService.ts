import User from "../models/user/User";
import { UserInterface } from "../interfaces/user/UserInterface";
import { connectToDatabase } from "../database/dbConnection";
import { hashPassword } from "../utils/security/hashPassword";
import { UserLoginInterface } from "../interfaces/user/UserLoginInterface";
import { comparePasswords } from "../utils/security/comparePassword";
import { UserSession } from "../models/user/UserSession";
import { UserSessionInterface } from "../interfaces/user/UserSessionInterface";
// import { UserLogin } from "../models/user/UserLogin";


class UserService {
  public async getUser(username: string): Promise<UserInterface | null> {
    try {
      const db = await connectToDatabase();
      const users = db!.collection<User>("users");
      const user: UserInterface | null = await users.findOne({ username: username });
      console.log(user);
      
      return user;
    } catch (err) {
      throw new Error(`User not found`);
    }
  }

  public async authenticateUser(
    userData: UserLoginInterface
  ): Promise<UserSessionInterface | null> {
    try {
      const { username, password } = userData;

      const foundUser = await this.getUser(username);

      if(!foundUser) {
        throw new Error('User not found');
      }

      const verifiedPassword = comparePasswords(password, foundUser.password);

      if(!verifiedPassword) {
        throw new Error('Incorrect username or password')
      }

      const userSession = new UserSession(username);
      
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
