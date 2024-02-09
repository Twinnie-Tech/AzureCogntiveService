"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkColorScheme = exports.checkAdultContent = exports.compareImageObject = exports.getImageBrand = exports.getImageTags = void 0;
const multer_1 = __importDefault(require("multer"));
const path = __importStar(require("path"));
const cognitiveservices_computervision_1 = require("@azure/cognitiveservices-computervision");
const ms_rest_js_1 = require("@azure/ms-rest-js");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({ path: "./.env" });
//Keys
const key = process.env.MS_COMPUTER_VISION_SUBSCRIPTION_KEY;
const endpoint = process.env.MS_COMPUTER_VISION_ENDPOINT;
// const faceEndpoint = process.env.MS_FACE_ENDPOINT;
// const subscriptionKey = process.env.MS_FACE_SUB_KEY;
let computerVisionClient;
if (endpoint) {
    computerVisionClient = new cognitiveservices_computervision_1.ComputerVisionClient(new ms_rest_js_1.ApiKeyCredentials({ inHeader: { "Ocp-Apim-Subscription-Key": key } }), endpoint);
}
else {
    throw new Error("Endpoint is not defined");
}
//File Upload
const upload = (0, multer_1.default)({
    storage: multer_1.default.diskStorage({}),
    fileFilter: (req, file, cb) => {
        let ext = path.extname(file.originalname);
        if (ext !== ".jpg" && ext !== ".jpeg" && ext !== ".png") {
            cb(new Error("File type is not supported"));
            return;
        }
        cb(null, true);
    }
});
const getImageTags = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { image } = req.body;
        // Process the file here
        const tagsURL = image;
        console.log('Analyzing tags in image...', tagsURL.split('/').pop());
        const tags = yield (yield computerVisionClient.analyzeImage(tagsURL, { visualFeatures: ['Tags'] })).tags;
        console.log(tags);
        res.status(200).json({
            status: "success",
            data: tags
        });
    }
    catch (error) {
        res.status(400).json({
            status: "failure",
            error: error.message
        });
    }
});
exports.getImageTags = getImageTags;
const getImageBrand = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { image } = req.body;
        // Process the file here
        const brandsURL = image;
        console.log('Analyzing Brands in image...', brandsURL.split('/').pop());
        const brands = yield (yield computerVisionClient.analyzeImage(brandsURL, { visualFeatures: ['Brands'] })).brands;
        //  console.log(computerVisionClient)
        console.log(brands);
        res.status(200).json({
            status: "success",
            data: brands
        });
    }
    catch (error) {
        res.status(400).json({
            status: "failure",
            error: error.message
        });
    }
});
exports.getImageBrand = getImageBrand;
const compareImageObject = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        let carCount = 1;
        const { image } = req.body;
        // Process the file here
        const objectURL = image;
        console.log('Analyzing  objects in  image...', objectURL.split('/').pop());
        const objects = (yield computerVisionClient.analyzeImage(objectURL, {
            visualFeatures: ["Objects"],
        })).objects;
        if (objects.length) {
            console.log(`${objects.length} object${objects.length == 1 ? "" : "s"} found:`);
            console.log((_a = objects[0]) === null || _a === void 0 ? void 0 : _a.object);
            for (const obj of objects) {
                if (obj.object === "car") {
                    carCount = carCount + 1;
                }
            }
            if (carCount > 0) {
                res.status(200).json({
                    status: "success",
                    data: "car"
                });
            }
        }
    }
    catch (error) {
        res.status(400).json({
            status: "failure",
            error: error.message
        });
    }
});
exports.compareImageObject = compareImageObject;
const checkAdultContent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { image } = req.body;
        const isIt = (flag) => flag ? 'is' : "isn't";
        ;
        // Process the file here
        const adultURLImage = image;
        // Analyze URL image
        console.log('Analyzing image for color scheme...', adultURLImage.split('/').pop());
        const adult = (yield computerVisionClient.analyzeImage(adultURLImage, {
            visualFeatures: ['Adult']
        })).adult;
        console.log(`This probably ${isIt(adult.isAdultContent)} adult content (${adult.adultScore.toFixed(4)} score)`);
        console.log(`This probably ${isIt(adult.isRacyContent)} racy content (${adult.racyScore.toFixed(4)} score)`);
        console.log(adult);
        if ((adult === null || adult === void 0 ? void 0 : adult.isAdultContent) == true) {
            res.status(200).json({
                status: "success",
                data: "true"
            });
        }
        else {
            res.status(200).json({
                status: "success",
                data: "false"
            });
        }
    }
    catch (error) {
        res.status(400).json({
            status: "failure",
            error: error.message
        });
    }
});
exports.checkAdultContent = checkAdultContent;
const checkColorScheme = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { image } = req.body;
        // Process the file here
        const colorURLImage = image;
        // Analyze URL image
        console.log('Analyzing image for color scheme...', colorURLImage.split('/').pop());
        const color = (yield computerVisionClient.analyzeImage(colorURLImage, { visualFeatures: ['Color'] })).color;
        //  console.log(computerVisionClient)
        console.log(color);
        res.status(200).json({
            status: "success",
            data: color === null || color === void 0 ? void 0 : color.dominantColors
        });
    }
    catch (error) {
        res.status(400).json({
            status: "failure",
            error: error.message
        });
    }
});
exports.checkColorScheme = checkColorScheme;
