import express from "express";
import routes from "../routes";
import { home } from "../controllers/itemController";
import {
  getJoin,
  getLogin,
  postLogin,
  postJoin,
} from "../controllers/userController";
const globalRouter = express.Router();

globalRouter.get(routes.home, home);
globalRouter.get(routes.join, getJoin);
globalRouter.post(routes.join, postJoin, postLogin);

globalRouter.get(routes.login, getLogin);
globalRouter.post(routes.login, postLogin);
// globalRouter.get(routes.search, home);

export default globalRouter;
