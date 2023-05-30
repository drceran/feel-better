import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const timestamp = Date.now();

export const messagesApi = createApi({
    reducerPath: 'messages',
    baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_SAMPLE_SERVICE_API_HOST}),
    tagTypes: ['MessagesList'],
    endpoints: builder => ({
        getMessages: builder.query({
            query: () => '/messages/',
            providesTags: ['MessagesList'],
        }),
        createMessages: builder.mutation({
            query: (newMessage) => ({
                url: '/messages/',
                method: 'post',
                body: newMessage,
                timestamp: new Date(timestamp).toISOString()
            }),
            invalidatesTags: ['MessagesList']
        }),
    }),
});

export const {
    useGetMessagesQuery,
    useCreateMessagesMutation
} = messagesApi;
