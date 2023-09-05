import { Request, Response } from "express";
import { userService } from "../services/userService";
import { token } from "../utils/auth/jwtToken";

class UserController {
  public async login(req: Request, res: Response): Promise<Response> {
    try {
      const userData = req.body;
      const user = await userService.authenticateUser(userData);
      console.log(user);
      
      if (!user) {
        return res.json({ message: "User not found" }).status(401);
      }

      const payload = { username: user.username };
      const accessToken = token.createToken(payload);

      
      res.cookie("accessToken", accessToken, {
        maxAge: 300000,
        httpOnly: true,
      });

      return res.json(token.verifyToken(accessToken)?.payload);
    } catch (error) {
      return res.json({ error: `Internal server error: ${error}` }).status(500);
    }
  }

  public async createUser(req: Request, res: Response): Promise<Response> {
    try {
      const userData = req.body;
      const newUser = await userService.createUser(userData);
      return res.json(newUser).status(201);
    } catch (error) {
      return res.json({ error: "Internal server error" }).status(500);
    }
  }
}

export const userController = new UserController();
