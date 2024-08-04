import { MongoClient, ServerApiVersion } from 'mongodb';
import { app_name } from '../constants.js';
import mongoose from 'mongoose';
const connectDB = async() => {
    try{
        // console.log(`${process.env.MONGODB_URI}/${app_name}`);
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${app_name}`);
        console.log(`\n MongoDB connected !! DB HOST: ${connectionInstance.connection.host}`);
    }catch(error)
    {
        console.log("mongoDB connection error",error);
        process.exit(1);
    }
}

export default connectDB;