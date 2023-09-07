import express, { Express } from "express";
import { connectToDatabase } from "./src/database/dbConnection";
import userRouter from "./src/routes/userRouter";

const app: Express = express();

app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use("/", userRouter);
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

// app.listen(port)