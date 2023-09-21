import { ObjectId } from "mongodb";
import { WalletInterface } from "../models/wallet/interfaces/WalletInterface";
import { connectToDatabase } from "../database/dbConnection";
import { Wallet } from "../models/wallet/Wallet";
import { CardInterface } from "../models/card/interfaces/CardInterface";
import { Card } from "../models/card/Card";

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

  public async addCardToWallet(ownerId: string, cardData: CardInterface) {
    const id = new ObjectId(ownerId);
    const db = await connectToDatabase();
    const walletCollection = db!.collection<Wallet>("wallets");
    const wallet: WalletInterface | null = await walletCollection.findOne({
      ownerId: id,
    });
    
    if (!wallet) {
      return null;
    }    

    const newCard = new Card(
      cardData.cardNumber,
      cardData.cardHolderName,
      cardData.expirationDate,
      cardData.CVV
    );

    const foundCard = wallet.cards?.find((existingCard) => existingCard.cardNumber === newCard.cardNumber)

    
    if(foundCard) {
      throw new Error("Card number already exists")
    }

    const result = await walletCollection.updateOne(
      { _id: wallet._id },
      { $push: { cards: newCard } }
    );

    if (result.modifiedCount === 1) {
      return true;
    }

    return false;
  }

  public async updateCard() {}

  public async removeCard() {}
}

export const walletService = new WalletService();
