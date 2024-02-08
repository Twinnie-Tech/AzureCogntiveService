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
// const faceEndpoint = process.env.MS_FACE_ENDPOINT;
// const subscriptionKey = process.env.MS_FACE_SUB_KEY;
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
    const {image} = req.body;
            // Process the file here
            const tagsURL = image;
            console.log('Analyzing tags in image...', tagsURL.split('/').pop());
            const tags:any = await (await computerVisionClient.analyzeImage(tagsURL, { visualFeatures: ['Tags'] })).tags;
            console.log(tags);
            res.status(200).json({
                status:"success",
                data:tags
            });      
 } catch(error:any){
    res.status(400).json({
        status:"failure",
        error:error.message
    });
 }
 } 

export const getImageBrand = async(req:Request,res:Response):Promise<void>=>{
    try{
        const {image} = req.body;
        // Process the file here
        const brandsURL = image;
        console.log('Analyzing Brands in image...', brandsURL.split('/').pop());
        const brands:any = await (await computerVisionClient.analyzeImage(brandsURL, { visualFeatures: ['Brands'] })).brands;
      //  console.log(computerVisionClient)
        console.log(brands);
        res.status(200).json({
            status:"success",
            data:brands
        }); 
    } catch(error:any){
        res.status(400).json({
            status:"failure",
            error:error.message
        });
    } 
}
export const compareImageObject = async(req:Request,res:Response):Promise<void>=>{
    try{
        let carCount = 1;
        const {image} = req.body;
        // Process the file here
        const objectURL = image;
        console.log('Analyzing  objects in  image...', objectURL.split('/').pop());
        const objects = (
            await computerVisionClient.analyzeImage(objectURL, {
              visualFeatures: ["Objects"],
            })
          ).objects;
if(objects.length){
    console.log(
        `${objects.length} object${objects.length == 1 ? "" : "s"} found:`
      );
      console.log(objects[0]?.object)
      for (const obj of objects) {
        if (obj.object === "car") {
            carCount = carCount + 1;        
        } 
      }
      if(carCount > 0){
        res.status(200).json({
            status:"success",
            data:"car"
        }); 
      }
} 
    } catch(error:any){
        res.status(400).json({
            status:"failure",
            error:error.message
        });
    } 
}

export const checkAdultContent = async(req:Request,res:Response):Promise<void>=>{
    try{
        const {image} = req.body;
        const isIt = (flag: String) => flag ? 'is' : "isn't";;
        // Process the file here
        const adultURLImage = image;
         // Analyze URL image
        console.log('Analyzing image for color scheme...', adultURLImage.split('/').pop());
        const adult = (await computerVisionClient.analyzeImage(adultURLImage, {
            visualFeatures: ['Adult']
          })).adult;
          console.log(`This probably ${isIt(adult.isAdultContent)} adult content (${adult.adultScore.toFixed(4)} score)`);
          console.log(`This probably ${isIt(adult.isRacyContent)} racy content (${adult.racyScore.toFixed(4)} score)`);
        console.log(adult);
        if(adult?.isAdultContent==true){
            res.status(200).json({
                status:"success",
                data:"true"
            }); 
        }else{
            res.status(200).json({
                status:"success",
                data:"false"
            });
        }
       
    } catch(error:any){
        res.status(400).json({
            status:"failure",
            error:error.message
        });
    } 
}

export const checkColorScheme = async(req:Request,res:Response):Promise<void>=>{
    try{
        const {image} = req.body;
        // Process the file here
        const  colorURLImage = image;
         // Analyze URL image
        console.log('Analyzing image for color scheme...', colorURLImage.split('/').pop());
        const color = (await computerVisionClient.analyzeImage(colorURLImage, { visualFeatures: ['Color'] })).color;
      //  console.log(computerVisionClient)
        console.log(color);
        res.status(200).json({
            status:"success",
            data:color?.dominantColors
        }); 
    } catch(error:any){
        res.status(400).json({
            status:"failure",
            error:error.message
        });
    } 
}