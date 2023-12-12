import { Favorites } from "../model/Favorites.js";

export const userAddFavorites = async (req, res) => {
  try {
    const {
      username,
      id,
      language,
      title,
      year,
      backdrop,
      vote,
    } = await req.body;

    const loginUsersFavorites = await Favorites.findOne({ username });

    if (loginUsersFavorites && !id) {
      getUserFavorites(req, res, username, loginUsersFavorites);
    }

    if (loginUsersFavorites === null && id) {
      const newUserFavorites = await Favorites.create({ username });
      await newUserFavorites.userFavorites.push({
        product_id: id,
        product_language: language,
        product_title: title,
        product_year: year,
        product_backdrop: backdrop,
        product_average: vote && vote,
      });
      await newUserFavorites.save();
      return res.json({
        status: "success",
        message: "eklendi",
        product: newUserFavorites.userFavorites,
      });
    }
    if (loginUsersFavorites && id) {
      updateUserFavorites(
        req,
        res,
        username,
        id,
        language,
        title,
        year,
        backdrop,
        vote
      );
    }
  } catch (error) {
    return res.json({
      status: "error",
      message: error.message,
    });
  }
};

export const getUserFavorites = async (
  req,
  res,
  username,
  loginUsersFavorites
) => {
  try {
    return res.json({
      status: "success",
      message: "Favorites Geldi",
      product: loginUsersFavorites.userFavorites,
    });
  } catch (error) {
    return res.json({
      status: "error",
      message: error.message,
    });
  }
};

export const updateUserFavorites = async (
  req,
  res,
  username,
  id,
  language,
  title,
  year,
  backdrop,
  vote
) => {
  try {
    const loginUsersFavorites = await Favorites.findOne({ username });

    if (loginUsersFavorites) {
      const existingItem = await loginUsersFavorites.userFavorites.find(
        (item) => +item.product_id === +id
      );
      if (existingItem) {
        deleteUserFavoritesItem(req, res, loginUsersFavorites, id);
        console.log(existingItem);
      } else {
        await loginUsersFavorites.userFavorites.push({
          product_id: id,
          product_language: language && language,
          product_title: title && title,
          product_year: year && year,
          product_backdrop: backdrop && backdrop,
          product_average: vote && vote,
        });

        await loginUsersFavorites.save();
        console.log("Favorites Güncellendi");
        return res.json({
          status: "success",
          message: "Güncellendi",
          product: loginUsersFavorites.userFavorites,
        });
      }
    }
  } catch (error) {
    return res.json({
      status: "error",
      message: error.message,
    });
  }
};

export const deleteUserFavoritesItem = async (
  req,
  res,
  loginUsersFavorites,
  id
) => {
  try {
    const notExistingItem = await loginUsersFavorites.userFavorites.filter(
      (item) => +item.product_id !== +id
    );

    loginUsersFavorites.userFavorites = await notExistingItem;
    await loginUsersFavorites.save();
    console.log("Aynı item var silindi");
    return res.json({
      status: "success",
      message: "Aynı item var silindi",
      product: loginUsersFavorites.userFavorites,
    });
  } catch (error) {
    return res.json({
      status: "error",
      message: error.message,
    });
  }
};
