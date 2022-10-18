import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthState } from "./apiTypes";

const initialState: AuthState = {
  authToken: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthToken: (state, action: PayloadAction<string>) => {
      state.authToken = action.payload;
    },

    logout: (state) => {
      state.authToken = initialState.authToken;
    },
  },
});
export const { setAuthToken, logout } = authSlice.actions;

export default authSlice;
