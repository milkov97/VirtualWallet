import { Request, Response } from "express";
import { transactionService } from "./../services/transaction.services";
import { token } from "../utils/jwt/jwtToken";
import { walletService } from "../services/wallet.services";
import { cardService } from "../services/card.services";


class TransactionController{
  public async transferMoneyToWallet(req: Request, res: Response) {
    const payload = token.verifyRefreshToken(req.cookies.refreshToken).payload;
    // @ts-ignore
    const wallet = await walletService.getWalletInfo(payload.id);
    if(!wallet) {
      return res.status(400).json({message: "Wallet not found"})
    }
    
  }

  public async sendMoney(req: Request, res: Response) {
    
  }
  
  public async confirmTransaction(req: Request, res: Response) {

  }

  public async viewTransactionHistory(req: Request, res: Response) {

  }

  public async sendTransactionNotification(req: Request, res: Response) {

  }

  public async exchangeMoney(req: Request, res: Response) {

  }
  
}

export const transactionController = new TransactionController()