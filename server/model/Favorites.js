import mongoose from "mongoose";

const { Schema } = mongoose;

const UserFavoritesSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  userFavorites: [
    {
      product_id: {
        type: String,
        required: true,
      },
      product_language: {
        type: String,
        required: true,
      },
      product_title: {
        type: String,
        required: true,
      },
      product_year: {
        type: String,
      },
      product_backdrop: {
        type: String,
        required: true,
      },
      product_average: {
        type: String,
      },
    },
  ],
});

export const Favorites = mongoose.model("favorites", UserFavoritesSchema);
