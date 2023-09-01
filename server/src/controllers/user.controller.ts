import { Request, Response } from "express";
import * as userService from "../services/userService";

class UserController {
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
