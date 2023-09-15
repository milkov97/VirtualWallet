import express, { Express } from "express";
import { connectToDatabase } from "./src/database/dbConnection";
import userRouter from "./src/routes/user.router";
import cors from 'cors'
import cookieParser from "cookie-parser"
// import authenticateUser from "./src/middleware/authenticateUser";

const port = process.env.PORT;

const app: Express = express();

app.use(cookieParser())
// app.use(authenticateUser)
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3200",
  })
);
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

