import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const usersApi = createApi({
  reducerPath: "users",
  tagTypes: ["Token", "Jotter"],
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
        return (result && ["Token"]) || [];
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
        return (result && ["Token"]) || [];
      },
    }),
<<<<<<< HEAD
=======
    getUsers: builder.query({
      query: () => ({
        url: "/users",
        method: "get",
        credentials: "include",
      }),
    }),
>>>>>>> main
    getToken: builder.query({
      query: () => ({
        url: "/token",
        method: "get",
        credentials: "include",
      }),
      providesTags: ["Token"],
    }),
    logout: builder.mutation({
      query: () => ({
        url: "/token",
        method: "delete",
        credentials: "include",
      }),
      invalidatesTags: ["Token"],
    }),
    getUserInfo: builder.query({
      query: (id) => {
        return {
          url: "/jotters/" + id,
          method: "get",
          credentials: "include",
        };
      },
      providesTags: ["Jotter"],
    }),
<<<<<<< HEAD
    editUserInfo: builder.mutation({
      query: (id, formData) => {
        return {
          url: "/jotters/" + id,
          method: "put",
          body: formData,
          credentials: "include",
        };
      },
      invalidatesTags: ["token"],
=======
    getClients: builder.query({
      query: () => ({
        url: "/jotters",
        method: "get",
        credentials: "include",
      }),
    }),
    getClientDetail: builder.query({
      query: (id) => ({
        url: "/jotters" + id,
        method: "get",
        credentials: "include",
      }),
    }),
    // getClientByTherapist: builder.query({
    //   query: (therapistId) => ({
    //     url: `/therapists/${therapistId}/clients`,
    //     method: "get",
    //     credentials: "include",
    //   }),
    // }), how does this even get the therapist id tho???
    getTherapists: builder.query({
      query: () => ({
        url: "/jotters",
        method: "get",
        credentials: "include",
      }),
    }),
    getTherapistDetail: builder.query({
      query: (id) => ({
        url: "/jotters" + id,
        method: "get",
        credentials: "include",
      }),
>>>>>>> main
    }),
  }),
});

export const {
  useLoginMutation,
  useSignupMutation,
  useGetTokenQuery,
  useGetClientsQuery,
  useGetClientDetailQuery,
  // useGetClientByTherapistQuery,
  useGetTherapistsQuery,
  useGetTherapistDetailQuery,
  useGetUserInfoQuery,
  useLogoutMutation,
  useEditUserInfoMutation,
} = usersApi;
