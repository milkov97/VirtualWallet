import { ObjectId } from "mongodb";
import { WalletInterface } from "../models/wallet/interfaces/WalletInterface";
import { connectToDatabase } from "../database/dbConnection";
import { Wallet } from "../models/wallet/Wallet";
import { CardInterface } from "../models/card/interfaces/CardInterface";

class WalletService {
  public async getWalletInfo(ownerId: string): Promise<WalletInterface | null> {
    
    try {
      const id = new ObjectId(ownerId);
      const db = await connectToDatabase();
      const walletCollection = db!.collection<Wallet>("wallets");
      const wallet: WalletInterface | null = await walletCollection.findOne({
        ownerId: id,
      });
      return wallet;
    } catch (error: any) {
      throw new Error(error);
    }
  }

  public async createCard(ownerId: string, card: {}): Promise<CardInterface | boolean> {
    try{
      const id = new ObjectId(ownerId);
      const db = await connectToDatabase();
      const walletCollection = db!.collection<Wallet>("wallets");
      const wallet: WalletInterface | null = await walletCollection.findOne({
        ownerId: id,
      });
      
      if(!wallet) return false
      
      wallet.cards?.push()

    } catch(error: any) {
      throw new Error(error)
    }
  }
}

export const walletService = new WalletService();
