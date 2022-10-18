import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  LoginRequest,
  LoginResponse,
  SignUpRequest,
  SignUpResponse,
  UserState,
  Collection,
  PostCollection,
} from "./apiTypes";
import { RootState } from "./store";
// const baseUrl = `http://ec2-3-104-104-155.ap-southeast-2.compute.amazonaws.com:8081/api`;
const baseUrl = `http://0.0.0.0:8081/api`;
export const nitrusApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: baseUrl,
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
    postFile: build.mutation<any, FormData>({
      query: ({ ...data }) => ({
        url: "/files/",
        method: "POST",
        data: data,
        body: data,
        params: data,
        headers: {
          "content-type":
            "multipart/form-data; boundary=----WebKitFormBoundarypoWW2qkMkXwQj3Ik",
        },
      }),
    }),

    getCollections: build.query<Collection[], void>({
      query: () => ({
        url: `/collection/`,
      }),
    }),
    postCollection: build.mutation<Collection, PostCollection>({
      query: ({ ...data }) => ({
        url: `/collection/`,
        method: "POST",
        body: data,
      }),
    }),
  }),
});
