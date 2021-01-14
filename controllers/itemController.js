import routes from "../routes";
import Item from "../models/Item";

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

//Upload Item
export const getUpload = (req, res) => {
  res.render("upload", { pageTitle: "Upload" });
};

export const postUpload = async (req, res) => {
  const {
    body: { title, description },
    file: { path },
  } = req;

  const newItem = await Item.create({
    fileUrl: path,
    title,
    description,
    creator: req.user.id,
  });
  req.user.items.push(newItem.id);
  req.user.save();
  res.redirect(routes.itemDetail(newItem.id));
};
