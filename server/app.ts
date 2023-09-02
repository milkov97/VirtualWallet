import express, { Express } from "express";
import { connectToDatabase } from "./src/database/dbConnection";
import bodyParser from "body-parser";
import userRouter from "./src/routes/userRouter";

const app: Express = express();

app.use(bodyParser.json());

const port = process.env.PORT;

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


app.use("/", userRouter);
