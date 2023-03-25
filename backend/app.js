import express from 'express';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import User from './models/user.js';
import dotenv from "dotenv";
import flash from "connect-flash";
import bodyParser from 'body-parser';
import authRouter from "./routers/auth.router.js"
/////////////////////////////////
//DOTENV
dotenv.config();
const PORT = process.env.PORT || 8000;
const MongoUri = process.env.MONGODB_URI;
const SECRET_KEY = process.env.SECRET_KEY;
/////////////////////////////////////

const app = express();



app.use(flash());




app.get('/',(req,res)=>{
    res.send("Hello World");
}
)
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/auth',authRouter);
// app.use(express.urlencoded({ extended: true }));
// app.use(express.json({ extended: true }));




//Connecting to the database
mongoose
  .connect(MongoUri, {
    maxPoolSize: 50,
    wtimeoutMS: 2500,
  })
  .then(() => {
    app.listen("3000", () => {
      console.log("Server is listening on port 3000");
    });
  })
  .catch((err) => {
    console.log("Error Occurred");
  });