import { Request, Response, NextFunction } from "express";

export function requireToken(req: Request, res: Response, next: NextFunction) {
  if (!req.cookies) {
    return res.status(401).json({ error: "Not Authorized" });
  }

  const { accessToken, refreshToken } = req.cookies
  console.log(accessToken, refreshToken);
  
  if(!accessToken || !refreshToken) {
    return res.status(401).json({ message: "You need to be logged in" });
  }
  return next();
}
