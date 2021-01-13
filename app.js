import express from "express";
import morgan from "morgan";
import passport from "passport";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import session from "express-session";
import MongoStore from "connect-mongo";

import { localsMiddleware } from "./middlewares";
import globalRouter from "./routers/globalRouter";
import routes from "./routes";
import "./passport";

const app = express();

const CookieStore = MongoStore(session);

app.set("view engine", "pug"); //View-engine setting
app.use(express.static("static"));
app.use(cookieParser()); // 쿠키관리
app.use(bodyParser.json()); // request의 form, json 관리
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("dev"));

app.use(
  session({
    secret: process.env.COOKIE_SECRET,
    resave: true,
    saveUninitialized: false,
    store: new CookieStore({ mongooseConnection: mongoose.connection }),
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(localsMiddleware);

app.use(routes.home, globalRouter);

export default app;
