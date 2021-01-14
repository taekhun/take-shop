import routes from "../routes";
import Item from "../models/Item";

export const home = async (req, res) => {
  try {
    const items = await Item.find({}).sort({ _id: -1 });
    res.render("home", { pageTitle: "Home", items });
  } catch (error) {
    console.log(error);
    res.render("home", { pageTitle: "Home", items: [] });
  }
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

export const itemDetail = async (req, res) => {
  //   console.log(req.params); // id불러옴
  const {
    params: { id },
  } = req;

  try {
    const item = await Item.findById(id).populate("creator");
    res.render("itemDetail", { pageTitle: item.title, item });
  } catch (error) {
    res.redirect(routes.home);
  }
};
