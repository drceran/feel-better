import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const messagesApi = createApi({
    reducerPath: 'messages',
    baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_SAMPLE_SERVICE_API_HOST}),
    endpoints: builder => ({
        getMessages: builder.query({
            query: () => '/messages/',
        }),
        createMessages: builder.mutation({
            query: (newMessage) => ({
                url: '/messages/',
                method: 'POST',
                body: newMessage
            })
        })
    })
});

export const { useGetMessagesQuery,useCreateMessagesMutation} = messagesApi;
