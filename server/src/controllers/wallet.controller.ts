import { Request, Response } from "express";
import { walletService } from "../services/wallet.services";
import { token } from "../utils/jwt/jwtToken";


class WalletController {
  public async getWallet(req: Request, res: Response): Promise<Response> {
    try{
        const refreshToken = req.cookies.refreshToken;
        const payload = token.verifyRefreshToken(refreshToken).payload
        // @ts-ignore
        const wallet = await walletService.getWalletInfo(payload.id)
        return res.status(200).send({wallet})
    } catch(error) {
        let message = "Unknown Error";

        if (error instanceof Error) message = error.message;

        return res
          .status(401)
          .json({ error: `Unauthorized: ${message}` });
    }
  }
}

export const walletController = new WalletController()