// import passport from "passport";
import routes from "../routes";
// import User from "../models/User";

export const getJoin = (req, res) => {
  res.render("join", { pageTitle: "join" });
};

export const getLogin = (req, res) =>
  res.render("login", { pageTitle: "Log in" });
