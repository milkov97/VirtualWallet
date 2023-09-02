import { Request, Response } from "express";
import { userService } from "../services/userService";


class UserController {
  public async getUser(req: Request, res: Response): Promise<Response> {
    let allUsers: any[];
    try {
      allUsers = await userService.getUser();
      return res.json(allUsers).status(200);
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
