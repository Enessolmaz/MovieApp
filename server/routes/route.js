import express from "express";
import { loginUser, registerUser } from "../controllers/User.js";
import { userAddFavorites } from "../controllers/FavoritesAdd.js";

const route = express.Router();

route.post("/createUser", registerUser);
route.post("/loginUser", loginUser);
route.post("/addFavorites", userAddFavorites);

export default route;
