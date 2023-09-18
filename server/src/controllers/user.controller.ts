import { Request, Response } from "express";
import { userService } from "../services/user.services";
import { token } from "../utils/jwt/jwtToken";

class UserController {
  public async login(req: Request, res: Response): Promise<Response> {
    try {
      const userData = req.body;
      const user = await userService.getCurrentUser(userData);

      if (!user) {
        return res
          .status(401)
          .header({ "WWW-Authenticate": "Bearer" })
          .json("Invalid username or password");
      }

      // @ts-ignore
      const payload = { id: user.id, username: user.username };

      const accessToken = token.createToken(payload);
      // @ts-ignore
      const refreshToken = token.createRefreshToken({ id: user.id });

      res.cookie("accessToken", accessToken, {
        maxAge: 5 * 60 * 1000,
      });

      res.cookie("refreshToken", refreshToken, {
        maxAge: 60 * 60 * 1000,
      });

      return res.send(user);
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

  public async getUserInfo(req: Request, res: Response) {
    // const accessToken = authorizationHeader
    //   ? authorizationHeader.split(" ")[1]
    //   : null;

    const { accessToken, refreshToken } = req.cookies;
    console.log("accessToken", accessToken, "refreshToken", refreshToken);

    const payload = token.verifyRefreshToken(refreshToken).payload;
    try {
      // @ts-ignore
      const user = await userService.getUserSession(payload.id);
      console.log(user);

      // @ts-ignore
      return res.send(user);
    } catch (error) {
      let message = "Unknown Error";

      if (error instanceof Error) message = error.message;

      return res.status(401).json({ error: `Unauthorized: ${message}` });
    }
  }

  public async updateUserInfo(req: Request, res: Response) {}

  public async logOut(req: Request, res: Response) {
    res.cookie("accessToken", "", {
      httpOnly: true,
      maxAge: 0,
      secure: true,
    });

    res.cookie("refreshToken", "", {
      httpOnly: true,
      maxAge: 0,
    });
    // @ts-ignore
    // userService.turnDownSession(req.id);
    return res.send({ success: true });
  }
}

export const userController = new UserController();
