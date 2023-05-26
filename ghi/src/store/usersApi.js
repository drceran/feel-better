import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const usersApi = createApi({
  reducerPath: "users",
  tagTypes: ["Token"],
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_SAMPLE_SERVICE_API_HOST,
  }),
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (info) => {
        let formData = null;
        if (info instanceof HTMLElement) {
          formData = new FormData(info);
        } else {
          formData = new FormData();
          formData.append("username", info.email);
          formData.append("password", info.password);
        }
        return {
          url: "/token",
          method: "post",
          body: formData,
          credentials: "include",
        };
      },
      invalidatesTags: (result) => {
        return (result && ["Account"]) || [];
      },
    }),
    signup: builder.mutation({
      query: (formData) => {
        return {
          url: "/api/accounts",
          method: "post",
          body: formData,
          credentials: "include",
        };
      },
      invalidatesTags: (result) => {
        return (result && ["Account"]) || [];
      },
    }),
    createUser: builder.mutation({
      query: (data) => ({
        url: "/token",
        body: data,
        method: "post",
      }),
    }),
    getToken: builder.query({
      query: () => ({
        url: "/token",
        method: "get",
        credentials: "include",
      }),
    }),
  }),
});

export const {
  useGetUsersQuery,
  useLoginMutation,
  useSignupMutation,
  useGetTokenQuery,
} = usersApi;
