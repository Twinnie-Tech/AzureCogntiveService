import { Request,Response } from "express";
import multer from "multer";
export const getImageTags = async():Promise<void>=>{
 try{
const upload = multer({
    storage:multer.diskStorage({
        // fileFilter:(req:Request,file:Object,cb:Object)=>{

        // }
    })
})
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