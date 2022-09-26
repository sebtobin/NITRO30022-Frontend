import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authReducer";
import userReducer from "./userReducer";

const store = configureStore({
  reducer: {
    auth: authReducer.reducer,
    user: userReducer.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
