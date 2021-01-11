import routes from "./routes";

export const localsMiddleware = (req, res, next) => {
  res.locals.siteName = "take-shop";
  res.locals.routes = routes;
  // res.locals.loggedUser = req.user || null;
  next();
};
