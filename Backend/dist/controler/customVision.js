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
const faceEndpoint = process.env.MS_FACE_ENDPOINT;
const subscriptionKey = process.env.MS_FACE_SUB_KEY;
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
        // console.log(req.body);
        // const {image} = req.body;
        // const name = image.split('/')[1];
        // console.log(name);
        // Process the file here
        // console.log('File uploaded successfully:', req.file);
        // const result = await cloudinary.v2.uploader.upload(req.file.path);
        const tagsURL = 'https://res.cloudinary.com/dxsqvb1eo/image/upload/v1707391413/ImageTags/y4r1smsdxbn5s273odpw.jpg';
        console.log('Analyzing tags in image...', tagsURL.split('/').pop());
        const tags = yield (yield computerVisionClient.analyzeImage(tagsURL, { visualFeatures: ['Tags'] })).tags;
        console.log(computerVisionClient);
        console.log((yield computerVisionClient.analyzeImage(tagsURL, { visualFeatures: ['Tags'] })).tags);
        console.log(`Tags: ${formatTags(tags)}`);
        function formatTags(tag) {
            return tags.map(tag, (any) => (`${tag.name} (${tag.confidence.toFixed(2)})`)).join(', ');
        }
        // Your further processing logic
        res.status(200).json({
            status: "success",
            data: formatTags(tags)
        });
    }
    catch (error) {
        console.log(error);
        res.status(400).json({
            status: "failure",
            error: error.message
        });
    }
});
exports.getImageTags = getImageTags;
const getImageBrand = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
    }
    catch (error) {
    }
});
exports.getImageBrand = getImageBrand;
const compareImageObject = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
    }
    catch (error) {
    }
});
exports.compareImageObject = compareImageObject;
const checkAdultContent = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
    }
    catch (error) {
    }
});
exports.checkAdultContent = checkAdultContent;
const checkColorScheme = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
    }
    catch (error) {
    }
});
exports.checkColorScheme = checkColorScheme;
