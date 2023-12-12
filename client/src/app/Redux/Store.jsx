import { configureStore } from "@reduxjs/toolkit";
import UserSlicer from "./User";

export const store = configureStore({
  reducer: {
    user: UserSlicer,
  },
});
