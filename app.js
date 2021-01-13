import express from "express";
import morgan from "morgan";
import passport from "passport";

import { localsMiddleware } from "./middlewares";
import globalRouter from "./routers/globalRouter";
import routes from "./routes";

const app = express();

app.set("view engine", "pug"); //View-engine setting
app.use(express.static("static"));
app.use(morgan("dev"));

app.use(localsMiddleware);

app.use(routes.home, globalRouter);

export default app;
