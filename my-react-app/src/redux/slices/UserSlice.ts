import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  userType: "admin" | "user";
}

const initialState: UserState = {
  userType: "admin",
};

const UserSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserType: (state, action: PayloadAction<UserState["userType"]>) => {
      state.userType = action.payload;
    },
    toggleUserType: (state) => {
      state.userType = state.userType === "admin" ? "user" : "admin";
    },
  },
});

export const { setUserType, toggleUserType } = UserSlice.actions;
export default UserSlice.reducer;
