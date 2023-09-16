import { ObjectId } from "mongodb";
import { WalletInterface } from "../models/wallet/interfaces/WalletInterface";
import { connectToDatabase } from "../database/dbConnection";
import { Wallet } from "../models/wallet/Wallet";

class WalletService {
  public async getWalletInfo(ownerId: string): Promise<WalletInterface | null> {
    
    try {
      const id = new ObjectId(ownerId);
      const db = await connectToDatabase();
      const wallets = db!.collection<Wallet>("wallets");
      const wallet: WalletInterface | null = await wallets.findOne({
        ownerId: id,
      });
      return wallet;
    } catch (error: any) {
      throw new Error(error);
    }
  }
}

export const walletService = new WalletService();
