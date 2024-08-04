// import { app } from "./app.js";
import dotenv from "dotenv"
import express from "express"
import connectDB from "./db/index.db.js";
const app = express();
dotenv.config({
    path:'./.env'
});

connectDB().then(
    ()=>{
        app.on("error",(error)=>{
            console.log(error);
            throw error; 
        });
        app.listen(process.env.PORT || 8080);
        console.log(`Server running on PORT : ${process.env.PORT}`)
    }
).catch((error)=>{
    console.log(error);
    throw error;
});

