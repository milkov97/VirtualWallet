// import { ObjectId } from 'mongodb';
import { Request, Response, NextFunction } from "express";
import { token } from "../utils/jwt/jwtToken";
import { userService } from "../services/user.service";
// import { ObjectId } from "mongodb";

async function authenticateUser(req: Request, res: Response, next: NextFunction) {
  const { accessToken, refreshToken } = req.cookies;

  // if (!accessToken) {
  //   return next();
  // }

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

  // const userId = new ObjectId();
  // @ts-ignore
  const session = await userService.getUserSession(refresh.id);

  if (!session) {
    return next();
  }

  const newPayload = { id: session.id, username: session.username };
  const newAccessToken = token.createToken(newPayload);

  res.cookie("accessToken", newAccessToken, {
    httpOnly: true,
    maxAge: 5 * 60 * 1000,
    secure: true,
  });

  const test = token.verifyAccessToken(newAccessToken);
  console.log(test);

  // @ts-ignore
  req.user = test.payload;

  return next();
}

export default authenticateUser;
