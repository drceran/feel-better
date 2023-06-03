import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const resourcesApi = createApi({
    reducerPath: "resources",
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.REACT_APP_SAMPLE_SERVICE_API_HOST,
    }),
    endpoints: (builder) => ({
    getResources: builder.query({
        query: () => "/resources/",
    }),
    createResource: builder.mutation({
        query: (data) => ({
            url: "/resources/",
            body: data,
            method: "post",
        }),
    }),
    getResourceDetail: builder.query({
        query: (id) => ({
            url: "/resources/" + id,
            method: "get",
            credentials: "include",
        }),
    }),
    }),
});

export const { useGetResourcesQuery, useCreateResourceMutation, useGetResourceDetailQuery } = resourcesApi;
