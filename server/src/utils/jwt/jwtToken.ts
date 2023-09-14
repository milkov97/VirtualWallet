import jwt, { Secret, Algorithm } from "jsonwebtoken";

class Token {
  public signJWT(payload: object, privateKey: Secret, expiresIn: string) {
    try {
      // @ts-ignore
      const hashAlgorithm: Algorithm = process.env["JWT_ALGORITHM"];

      if (!privateKey || !hashAlgorithm) {
        throw new Error("JWT configuration missing");
      }

      const token = jwt.sign(payload, privateKey, {
        algorithm: hashAlgorithm,
        expiresIn,
      });
      return token;
    } catch (error) {
      throw new Error(`Failed to create JWT: ${error}`);
    }
  }
  public createToken(payload: object) {
    try {
      const privateKey = process.env["JWT_PRIVATE_KEY"]!;
      return this.signJWT(payload, privateKey, "5m");
    } catch (error) {
      throw new Error(`Failed to create JWT: ${error}`);
    }
  }

  public createRefreshToken(payload: object) {
    try {
      const publicKey = process.env["JWT_PUBLIC_KEY"]!;
      return this.signJWT(payload, publicKey, "1h");
    } catch (error) {
      throw new Error(`Failed to create JWT: ${error}`);
    }
  }

  public verifyAccessToken(token: string) {
    try {
      const privateKey: Secret = process.env["JWT_PRIVATE_KEY"]!;
      if (!privateKey) {
        throw new Error("JWT configuration missing");
      }
      const decoded = jwt.verify(token, privateKey);
      
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

  public verifyRefreshToken(token: string) {
    try {
      const publicKey: Secret = process.env["JWT_PUBLIC_KEY"]!;
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
