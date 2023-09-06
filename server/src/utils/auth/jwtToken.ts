import jwt, { Secret, Algorithm } from "jsonwebtoken";

class Token {
  public createToken(payload: object, privateKey?: Secret, expiresIn?: string) {
    try {
      // @ts-ignore
      const hashAlgorithm: Algorithm = process.env["JWT_ALGORITHM"];
      privateKey = process.env["JWT_ACCESS_TOKEN"]!;
      expiresIn = "10m"

      if (!privateKey || !hashAlgorithm) {
        throw new Error("JWT configuration missing");
      }

      const token = jwt.sign(payload, privateKey, {
        algorithm: hashAlgorithm,
        expiresIn: expiresIn,
      });
      return token;
    } catch (err) {
      throw new Error(`Failed to create JWT: ${err}`);
    }
  }

  public createRefreshToken(payload: object) {
    try {
      const privateKey: Secret = process.env["JWT_REFRESH_TOKEN"]!;
      return this.createToken(payload, privateKey, '1h');
    } catch (err) {
      throw new Error(`Failed to create JWT: ${err}`);
    }
  }

  public verifyToken(token: string) {
    try {
      const publicKey: Secret = process.env["JWT_ACCESS_TOKEN"]!;
      if (!publicKey) {
        throw new Error("JWT configuration missing");
      }
      const decoded = jwt.verify(token, publicKey);

      return { payload: decoded, expired: false };
    } catch (error) {
      if (error instanceof Error) {
        return {
          payload: null,
          expired: error.message.includes("jwt expired"),
        };
      }
      return null;
    }
  }
}

export const token = new Token();
