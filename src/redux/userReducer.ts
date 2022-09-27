import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthState, UserState } from "./apiTypes";

export const SET_USER = "SET_USER";

const initialState: UserState = {
  username: "",
  password: "",
  email: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserState>) => {
      state.email = action.payload.email;
      state.password = action.payload.password;
      state.username = action.payload.username;
    },
  },
});
export const { setUser } = userSlice.actions;

export default userSlice;
