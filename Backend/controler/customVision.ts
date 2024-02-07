import { Request,Response,Express } from "express";
import multer from "multer";
import { FileFilterCallback } from "multer";
import * as path from 'path';
import cloudinary from "cloudinary";
import { ComputerVisionClient } from "@azure/cognitiveservices-computervision"
import {ApiKeyCredentials } from "@azure/ms-rest-js";
import dotenv from "dotenv";
dotenv.config({path:"./.env"});


//Keys
const key = process.env.MS_COMPUTER_VISION_SUBSCRIPTION_KEY;
const endpoint:string | undefined  = process.env.MS_COMPUTER_VISION_ENDPOINT;
const faceEndpoint = process.env.MS_FACE_ENDPOINT;
const subscriptionKey = process.env.MS_FACE_SUB_KEY;
let computerVisionClient:any;
if(endpoint){
     computerVisionClient = new ComputerVisionClient(
        new ApiKeyCredentials({ inHeader: { "Ocp-Apim-Subscription-Key": key} }),
        endpoint
      );
}else{
    throw new Error("Endpoint is not defined");
}


//File Upload
const upload = multer({
storage:multer.diskStorage({}),
fileFilter:(req:Request,file:Express.Multer.File,cb:FileFilterCallback)=>{
let ext = path.extname(file.originalname);
if(ext !== ".jpg" && ext !== ".jpeg" && ext !== ".png"){
cb(new Error("File type is not supported"));
return;
}
cb(null,true);
}
})
export const getImageTags = async(req:Request,res:Response):Promise<void>=>{
 try{
    upload.single("file-to-upload")(req, res, async (err: any) => {
        if (err) {
            throw new Error(err.message);
        } else {
            // Here you can access the uploaded file using req.file
            if (!req.file) {
                throw new Error('No file uploaded');
            }
            // Process the file here
            console.log('File uploaded successfully:', req.file);
            const result = await cloudinary.v2.uploader.upload(req.file.path);
            const tagsURL = result.secure_url;
            console.log('Analyzing tags in image...', tagsURL.split('/').pop());
            const tags:any = (await computerVisionClient.analyzeImage(tagsURL, { visualFeatures: ['Tags'] })).tags;
            console.log(`Tags: ${formatTags(tags)}`);
            function formatTags(tag:any) {
                return tags.map(tag,(any: any) => (`${tag.name} (${tag.confidence.toFixed(2)})`)).join(', ');
              }
            // Your further processing logic
            res.status(200).json({
                status:200,
                message:"Tags",
                data:formatTags(tags)
            });
        }
    });
 } catch(error:any){

 } 
}

export const getImageBrand = async():Promise<void>=>{
    try{

    } catch(error:any){
   
    } 
}
export const compareImageObject = async():Promise<void>=>{
    try{

    } catch(error:any){
   
    } 
}

export const checkAdultContent = async():Promise<void>=>{
    try{

    } catch(error:any){
   
    } 
}

export const checkColorScheme = async():Promise<void>=>{
    try{

    } catch(error:any){
   
    } 
}