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

  public async addCardToWallet(ownerId: string, card: CardInterface) {
    const id = new ObjectId(ownerId);
    const db = await connectToDatabase();
    const walletCollection = db!.collection<Wallet>("wallets");
    const wallet: WalletInterface | null = await walletCollection.findOne({
      ownerId: id,
    });
    
    if (!wallet) {
      return null;
    }    

    const result = await walletCollection.updateOne(
      { _id: wallet._id },
      { $push: { cards: card } }
    );

    if (result.modifiedCount === 1) {
      return true;
    }

    return false;
  }
}

export const walletService = new WalletService();
