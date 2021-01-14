import express from "express";
import routes from "../routes";
import {
  getUpload,
  postUpload,
  //   itemDetail,
  //   getEditItem,
  //   postEditItem,
  //   deleteItem,
} from "../controllers/itemController";
import { onlyPrivate, uploadItem } from "../middlewares";

const itemRouter = express.Router();

//Upload
itemRouter.get(routes.upload, onlyPrivate, getUpload);
itemRouter.post(routes.upload, onlyPrivate, uploadItem, postUpload);

export default itemRouter;
