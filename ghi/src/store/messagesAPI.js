import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { usersApi } from './usersApi';

export const messagesApi = createApi({
    reducerPath: 'messages',
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.REACT_APP_SAMPLE_SERVICE_API_HOST,
        prepareHeaders: (headers, { getState }) => {
            const selector = usersApi.endpoints.getToken.select();
            const { data: tokenData } = selector(getState());

            if (tokenData && tokenData.access_token) {
                headers.set('Authorization', `Bearer ${tokenData.access_token}`);
            }
            return headers;
        },
    }),
    tagTypes: ["Messages", "MessageDetail"],
    endpoints: (builder) => ({
        getMessages: builder.query({
            query: () => '/messages/',
            providesTags: ["Messages"]
        }),
        createMessages: builder.mutation({
            query: (data) => ({
                url: '/messages',
                body: data,
                method: 'post',
            }),
            async onQueryStarted(_, { dispatch, queryFulfilled }) {
                await queryFulfilled;
                dispatch(usersApi.util.invalidateTags(["Token"]));
            }, invalidatesTags: ["Messages"]
        }),
        getOneMessage: builder.query({
            query: (id) => ({
                url: `/messages/${id}`,
                method: 'get',
            }),
            providesTags: ["MessageDetail"]
        }),
        editMessage: builder.mutation({
            query: ({ id, ...message }) => ({
                url: `/messages/${id}`,
                method: 'put',
                body: message,
            }),
            invalidatesTags: ["Messages", "MessageDetail"]
        }),
        deleteMessage: builder.mutation({
            query: (id) => ({
                url: `/messages/${id}`,
                method: 'delete',
            }),
            invalidatesTags: ["Messages"]
        }),
    }),
});


export const { useGetMessagesQuery, useCreateMessagesMutation, useEditMessageMutation, useGetOneMessageQuery, useDeleteMessageMutation } = messagesApi;
