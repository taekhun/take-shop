import passport from "passport";
// import GithubStrategy from "passport-github";
// import FacebookStrategy from "passport-facebook";
// import {
//   facebookLoginCallback,
//   githubLoginCallback,
// } from "./controllers/userController";
import User from "./models/User";
import routes from "./routes";

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// //strategy
// passport.use(User.createStrategy());
// passport.use(
//   new GithubStrategy(
//     {
//       clientID: process.env.GITHUB_ID,
//       clientSecret: process.env.GITHUB_SECRET,
//       callbackURL: `http://localhost:4000${routes.githubCallback}`,
//     },
//     githubLoginCallback
//   )
// );

// passport.use(
//   new FacebookStrategy(
//     {
//       clientID: process.env.FACEBOOK_ID,
//       clientSecret: process.env.FACEBOOK_SECRET,
//       callbackURL: `https://d57b30bcf5b0.ngrok.io${routes.facebook}`,
//       profileFields: ["id", "displayName", "email"],
//       scope: ["public_profile", "email"],
//     },
//     facebookLoginCallback
//   )
// );
