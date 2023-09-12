import express, { Express } from "express";
import { connectToDatabase } from "./src/database/dbConnection";
import userRouter from "./src/routes/user.router";
import cors from 'cors'

const port = process.env.PORT;

const app: Express = express();

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use("/", userRouter);


connectToDatabase()
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(port, () => {
      console.log(`Server is running on port:${port} `);
    });
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

