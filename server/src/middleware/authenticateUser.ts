// import { ObjectId } from 'mongodb';
import { Request, Response, NextFunction } from "express";
import { token } from "../utils/jwt/jwtToken";
import { userService } from "../services/user.service";
import { ObjectId } from "mongodb";

async function authenticateUser(req: Request, res: Response, next: NextFunction) {
  const { accessToken, refreshToken } = req.cookies;

  if (!accessToken) {
    return next();
  }

  const { payload, expired } = token.verifyAccessToken(accessToken);

  if (payload) {
    // @ts-ignore
    req.user = payload;
    return next();
  }

  const { payload: refresh } =
    expired && refreshToken
      ? token.verifyRefreshToken(refreshToken)
      : { payload: null };

  if (!refresh) {
    return next();
  }

  // @ts-ignore
  const userId = new ObjectId(refresh.id);
  const session = await userService.getUserSession(userId);
  console.log(session);

  if (!session) {
    return next();
  }

  const newPayload = { id: userId, username: session.username };
  const newAccessToken = token.createToken(newPayload);

  res.cookie("accessToken", newAccessToken, {
    httpOnly: true,
    maxAge: 5 * 60 * 1000,
    secure: true,
  });

  // @ts-ignore
  req.user = token.verifyAccessToken(newAccessToken)?.payload;

  return next();
}

export default authenticateUser;
