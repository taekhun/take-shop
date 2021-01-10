import express from "express";

const app = express();

app.set("view engine", "pug"); //View-engine setting
app.use("/static", express.static("static"));

export default app;
