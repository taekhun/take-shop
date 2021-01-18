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

export const getEditItem = async (req, res) => {
  const {
    params: { id },
  } = req;

  try {
    const item = await Item.findById(id);
    if (item.creator != req.user.id) {
      throw Error();
    } else {
      res.render("editItem", { pageTitle: `Edit ${item.title}`, item });
    }
  } catch (error) {
    res.redirect(routes.home);
  }
};
//Post : 업데이트, redirect
export const postEditItem = async (req, res) => {
  const {
    params: { id },
    body: { title, description },
  } = req;

  try {
    console.log(id, title, description);
    Item.findOneAndUpdate({ _id: id }, { title, description });
    res.redirect(routes.itemDetail(id));
  } catch (error) {
    res.redirect(routes.home);
  }
};

export const deleteItem = async (req, res) => {
  const {
    params: { id },
  } = req;
  try {
    const item = await Item.findById(id);
    if (item.creator != req.user.id) {
      throw Error();
    } else {
      await Item.findOneAndRemove({ _id: id });
    }
  } catch (error) {
    console.log(error);
  }
  res.redirect(routes.home);
};
