import { Request, Response } from "express";
import { walletService } from "../services/wallet.services";
import { token } from "../utils/jwt/jwtToken";
// import { cardService } from "../services/card.services";


class WalletController {
  public async getWallet(req: Request, res: Response): Promise<Response> {
    try{
        const payload = token.verifyRefreshToken(req.cookies.refreshToken).payload
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

  public async addCard(req: Request, res: Response) {
    try{
      const payload = token.verifyRefreshToken(
        req.cookies.refreshToken
      ).payload;

      const cardData = req.body;
      
      // const card = cardService.createCard(cardData);
      
      // @ts-ignore
      const cardInserted = await walletService.addCardToWallet(payload.id, cardData);
      if(cardInserted){
        return res.status(204).send({ message: "Card added" });
      }
      return res.status(404)
    } catch(error){
      let message = "Unknown Error";

      if (error instanceof Error) message = error.message;
      
      return res.status(401).json({ error: `Unauthorized: ${message}` });
    }
  }

  public async updateCardInfo(req: Request, res: Response) {}

  public async removeCardFromWallet(req: Request, res: Response) {}
}

export const walletController = new WalletController()