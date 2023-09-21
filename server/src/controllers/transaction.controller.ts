import { Request, Response } from "express";
import { transactionService } from "./../services/transaction.services";


class TransactionController{
  public async transferMoneyToWallet(req: Request, res: Response) {
    
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