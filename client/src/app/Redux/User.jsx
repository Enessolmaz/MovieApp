import { createSlice } from "@reduxjs/toolkit";

export const UserSlicer = createSlice({
  name: "User",
  initialState: {
    username: "",
    wishlist: [],
  },
  reducers: {
    setUserData: (state, action) => {
      state.username = action.payload;
    },
    setUserWishlist: (state, action) => {
      state.wishlist = action.payload;
    },
  },
});

export const { setUserData, setUserWishlist } = UserSlicer.actions;
export default UserSlicer.reducer;
