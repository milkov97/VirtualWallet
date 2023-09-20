import { CardInterface } from "../models/card/interfaces/CardInterface";
// import { connectToDatabase } from "../database/dbConnection";
import { Card } from "../models/card/Card";

class CardService {
  public createCard(
    cardData: CardInterface
  ): CardInterface {
    try {    
      const newCard = new Card(
        cardData.cardNumber,
        cardData.cardHolderName,
        cardData.expirationDate,
        cardData.CVV
      );
      
      return newCard
    } catch (error: any) {
      throw new Error(error);
    }
  }
}

export const cardService = new CardService()

