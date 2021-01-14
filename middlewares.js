import routes from "./routes";
import multer from "multer";

//multer : img to url
const multerItem = multer({ dest: "uploads/items/" });
const multerAvatar = multer({ dest: "uploads/avatars/" });

export const localsMiddleware = (req, res, next) => {
  res.locals.siteName = "take-shop";
  res.locals.routes = routes;
  res.locals.loggedUser = req.user || null;
  next();
};

// 공용 버전
export const onlyPublic = (req, res, next) => {
  if (req.user) {
    res.redirect(routes.home);
  } else {
    next();
  }
};

//로그인 버전
export const onlyPrivate = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    res.redirect(routes.home);
  }
};

export const uploadItem = multerItem.single("itemFile");
export const uploadAvatar = multerAvatar.single("avatar");
