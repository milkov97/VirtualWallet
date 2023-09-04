import { Request, Response } from "express";
import { userService } from "../services/userService";
import { token } from "../utils/auth/jwtToken";


class UserController {
  public async getUser(req: Request, res: Response): Promise<Response> {
    try {
      const userData = req.body
      const user = userService.authenticateUser(userData)
      if(!user) {
        return res.json({message: 'User not found'}).status(401)
      }
      // @ts-ignore
      const accessToken = token.createToken({id: user.id, username: user.username, email: user.email})
      return res.json(token.verifyToken(accessToken)?.payload).status(200)
    } catch (error) {
      return res.json({ error: "Internal server error" }).status(500);
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
