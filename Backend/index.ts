import  expresss , { Express,Request,Response } from "express";
import customRouter from "./route/customVision";
import dotenv from "dotenv";
import cors from "cors";
dotenv.config({path:"./.env"});
const app = expresss();
app.use(cors());
app.use(expresss.json());
const port = process.env.PORT || 8000;
app.use("/api/v1/customVision",customRouter);
app.listen(port,()=>{
    console.log(`Server running at port ${port}`);
});
