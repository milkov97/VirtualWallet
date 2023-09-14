import { Request, Response, NextFunction } from "express";
import { token } from "../utils/jwt/jwtToken";

function authenticateUser(req: Request, res: Response, next: NextFunction) {
  if (!req.cookies) {
    return res.status(401).json({ error: "Not Authorized" });
  }

  const { accessToken, refreshToken } = req.cookies;

  if (!accessToken) {
    return next();
  }
  // @ts-ignore
  const { payload, expired } = token.verifyAccessToken(accessToken);

  if (payload) {
    // @ts-ignore
    req.user = payload;
    return next();
  }
  // @ts-ignore
  const { payload: refresh } =
    expired && refreshToken ? token.verifyRefreshToken(refreshToken) : { payload: null };

  if (!refresh) {
    return next();
  }

  return next();
}

export default authenticateUser;
