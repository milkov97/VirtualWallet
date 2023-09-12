import { Request, Response } from "express";
import { userService } from "../services/userService";
import { token } from "../utils/auth/jwtToken";

class UserController {
  public async login(req: Request, res: Response): Promise<Response> {
    try {
      const userData = req.body;
      const user = await userService.authenticateUser(userData);
      if (!user) {
        return res.status(401).json("Incorrect username or password");
      }
      // @ts-ignore
      const payload = { id: user._id, username: user.username };
      const accessToken = token.createToken(payload);
      const refreshToken = token.createRefreshToken(payload);

      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        maxAge: 60 * 60 * 1000,
      });

      return res.json(accessToken);
    } catch (error) {
      let message = "Unknown Error";
      if (error instanceof Error) message = error.message;
      return res
        .status(501)
        .json({ error: `Internal server error: ${message}` });
    }
  }

  public async createUser(req: Request, res: Response): Promise<Response> {
    try {
      const userData = req.body;

      const newUser = await userService.createUser(userData);

      return res.status(201).json(newUser);
    } catch (error) {
      let message = "Unknown Error";
      if (error instanceof Error) message = error.message;
      return res
        .status(500)
        .json({ error: `Internal server error: ${message}` });
    }
  }

  public async getUserInfo(req: Request, res: Response) {}
  public async updateUserInfo(req: Request, res: Response) {}
}

export const userController = new UserController();
