import {v2 as cloudinary} from "cloudinary";
import { ApiResponse } from "./ApiResponse";
import { ApiError } from "./ApiError";
import fs from 'fs';


cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_SECRET_KEY // Click 'View Credentials' below to copy your API secret
});


const uploadFileOnCloudinary = async(localFile)=>{
     try{
        const uploadedImage = cloudinary.uploader.upload(localFile);
        if(!uploadedImage){
            throw new ApiError(500,"Problem while uploading file to cloud");
        }
        fs.unlink(localFile);
        return uploadedImage;

     }catch(error){
        fs.unlink(localFile);
        console(error?.message);
        
     }
}