import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { LoginRequest, LoginResponse } from "./apiTypes";
import { RootState } from "./store";

export const nitrusApi = createApi({
  baseQuery: fetchBaseQuery({
    // baseUrl: `http://ec2-3-104-104-155.ap-southeast-2.compute.amazonaws.com:8081/api`,
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
    login: build.mutation<LoginResponse, LoginRequest>({
      query: ({ ...data }) => ({
        url: "http://ec2-3-104-104-155.ap-southeast-2.compute.amazonaws.com:8081/api/users/login/",
        method: "POST",
        body: data,
      }),
    }),
    // signUp: build.mutation<SignUpResponse, SignUp>({
    //   query: ({ ...data }) => ({
    //     url: '/auth/signup',
    //     method: 'POST',
    //     body: data,
    //   }),
    // }),
    // getMe: build.query<User, void>({
    //   query: () => ({
    //     url: '/auth/me',
    //   }),
    // }),
  }),
});
