
import {Router} from "express";
import { getImageTags,getImageBrand,compareImageObject,checkAdultContent,checkColorScheme } from "../controler/customVision";
const router = Router();
router.route("/tags").post(getImageTags);
router.route("/brands").post(getImageBrand);
router.route("/compare").post(compareImageObject);
router.route("/adultContent").post(checkAdultContent);
router.route("/colorScheme").post(checkColorScheme);
export default router;