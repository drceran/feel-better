import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { createSlice } from '@reduxjs/toolkit';

const timestamp = Date.now();

export const messagesApi = createApi({
    reducerPath: 'messages',
    baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_SAMPLE_SERVICE_API_HOST }),
    tagTypes: ['MessagesList'],
    endpoints: (builder) => ({
        getMessages: builder.query({
            query: () => '/messages/',
            providesTags: ['MessagesList'],
        }),
        createMessage: builder.mutation({
            query: (newMessage) => ({
                url: '/messages/',
                method: 'post',
                body: newMessage,
            }),
            invalidatesTags: ['MessagesList'],
        }),
    }),
});

const messagesSlice = createSlice({
    name: 'messages',
    initialState: {
        selectedMessage: null,
    },
    reducers: {
        selectMessage: (state, action) => {
            state.selectedMessage = action.payload;
        },
    },
});

export const { selectMessage } = messagesSlice.actions;

export const { useGetMessagesQuery, useCreateMessageMutation } = messagesApi;

export default messagesSlice.reducer;
