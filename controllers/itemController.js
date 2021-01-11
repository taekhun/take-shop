import routes from "../routes";
export const home = async (req, res) => {
  //   try {
  //     const videos = await Video.find({}).sort({ _id: -1 });
  //     res.render("home", { pageTitle: "Home", videos });
  //   } catch (error) {
  //     console.log(error);
  //     res.render("home", { pageTitle: "Home", videos: [] });
  //   }
  res.render("home", { pageTitle: "Home" });
};
