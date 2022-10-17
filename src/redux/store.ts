import { configureStore } from "@reduxjs/toolkit";
import authReducer, { authSlice } from "./authReducer";
import userReducer from "./userReducer";
import storage from "redux-persist/lib/storage";
import { combineReducers } from "redux";
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import { nitrusApi } from "./apiClient";
const persistConfig = {
  key: "auth",
  storage,
};

const reducers = combineReducers({
  auth: authReducer.reducer,
  user: userReducer.reducer,
});
const persistedReducer = persistReducer(persistConfig, reducers);
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
