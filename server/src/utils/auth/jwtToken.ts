import jwt, { Secret, Algorithm } from "jsonwebtoken";

class Token {
  public createToken(payload: object) {
    
    try {
      const privateKey: Secret = process.env["JWT_PRIVATE_KEY"]!;
      // @ts-ignore
      const hashAlgorithm: Algorithm = process.env["JWT_ALGORITHM"];

      if (!privateKey || !hashAlgorithm) {
        throw new Error("JWT configuration missing");
      }

      const token = jwt.sign(payload, privateKey, {
        algorithm: hashAlgorithm,
        expiresIn: "1h",
      });
      return token;
    } catch (err) {
      throw new Error(`Failed to create JWT: ${err}`);
    }
  }

  public verifyToken(token: string) {
    try {
      const publicKey: Secret = process.env["JWT_PRIVATE_KEY"]!;
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
