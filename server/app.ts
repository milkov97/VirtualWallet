import express, { Express } from "express";
import { connectToDatabase } from "./src/database/dbConnection";
import bodyParser from "body-parser";
import userRouter from "./src/routes/userRouter";


const app: Express = express();

connectToDatabase();

app.use(bodyParser.json())

app.use('/', userRouter)