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
import itemRouter from "./routers/itemRouter";
import userRouter from "./routers/userRouter";
import routes from "./routes";
import "./passport";
const app = express();

const CookieStore = MongoStore(session);

app.set("view engine", "pug"); //View-engine setting
app.use("/uploads", express.static("uploads"));
// app.use("/items/*", express.static("static"));
// app.use("/users/*", express.static("static"));
app.use(cookieParser()); // 쿠키관리
app.use(bodyParser.json()); // request의 form, json 관리
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(express.static("static"));
// app.use(express.static(path.join(__dirname, "public")));

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
app.use(routes.users, userRouter); // "/users/"에 접속하면 => userRouter에서 찾음
app.use(routes.items, itemRouter); // "/item"에 접속하면 => videoRouter에서 찾음

export default app;
