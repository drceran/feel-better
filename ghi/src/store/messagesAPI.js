import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { usersApi } from './usersApi';


export const messagesApi = createApi({
    reducerPath: 'messages',
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.REACT_APP_SAMPLE_SERVICE_API_HOST,
        prepareHeaders: (headers, { getState }) => {
            const selector = usersApi.endpoints.getToken.select();
            const { data: tokenData } = selector(getState());
            console.log('tokenData', tokenData);

            if (tokenData && tokenData.access_token) {
                headers.set('Authorization', `Bearer ${tokenData.access_token}`);
            }
            return headers;
        },
    }),
    endpoints: (builder) => ({
        getMessages: builder.query({
            query: () => '/messages/',
        }),
        createMessages: builder.mutation({
            query: (data) => ({
                url: '/messages/',
                body: data,
                method: 'post',
            }),
        }),
    }),
});


export const { useGetMessagesQuery, useCreateMessagesMutation } = messagesApi;
