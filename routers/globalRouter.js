import express from "express";
import routes from "../routes";
import { home } from "../controllers/itemController";
import {
  getJoin,
  getLogin,
  postLogin,
  postJoin,
  logout,
} from "../controllers/userController";
import { onlyPrivate, onlyPublic } from "../middlewares";

const globalRouter = express.Router();

globalRouter.get(routes.home, home);

globalRouter.get(routes.join, onlyPublic, getJoin);
globalRouter.post(routes.join, onlyPublic, postJoin, postLogin);

globalRouter.get(routes.login, onlyPublic, getLogin);
globalRouter.post(routes.login, onlyPublic, postLogin);
globalRouter.get(routes.search, home);
globalRouter.get(routes.logout, onlyPrivate, logout);

export default globalRouter;
