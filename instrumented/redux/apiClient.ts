import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  LoginRequest,
  LoginResponse,
  SignUpRequest,
  SignUpResponse,
  UserState,
} from "./apiTypes";
import { RootState } from "./store";

export const nitrusApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: `http://ec2-3-104-104-155.ap-southeast-2.compute.amazonaws.com:8081/api`,
    mode: "cors",
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.authToken;
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (build) => ({
    getMe: build.mutation<UserState, string>({
      query: (authtoken) => ({
        url: "/users/getMe/",
        method: "POST",
        body: { authToken: authtoken },
      }),
    }),
    login: build.mutation<LoginResponse, LoginRequest>({
      query: ({ ...data }) => ({
        url: "/users/login/",
        method: "POST",
        body: data,
      }),
    }),
    signUp: build.mutation<SignUpResponse, SignUpRequest>({
      query: ({ ...data }) => ({
        url: "/users/signup/",
        method: "POST",
        body: data,
      }),
    }),
  }),
});
