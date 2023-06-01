import { createSlice } from '@reduxjs/toolkit';
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
    endpoints: (builder) => ({
        getJournals: builder.query({
            query: () => '/messages/',
        }),
        createJournal: builder.mutation({
            query: (data) => ({
                url: '/messages/',
                body: data,
                method: 'post',
            }),
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

export const messagesReducer = messagesSlice.reducer;
export const {
    useGetMessageQuery,
    useCreateMessagesMutation,
} = messagesApi;


// import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
// import { usersApi } from './usersApi';


// export const messagesApi = createApi({
//     reducerPath: 'messages',
//     baseQuery: fetchBaseQuery({
//         baseUrl: process.env.REACT_APP_SAMPLE_SERVICE_API_HOST,
//         prepareHeaders: (headers, { getState }) => {
//             const selector = usersApi.endpoints.getToken.select();
//             const { data: tokenData } = selector(getState());


//             if (tokenData && tokenData.access_token) {
//                 headers.set('Authorization', `Bearer ${tokenData.access_token}`)
//             }
//             return headers
//         }
//     }),
//     endpoints: builder => ({
//         getJournals: builder.query({
//             query: () => '/messages/',
//         }),
//         createJournal: builder.mutation({
//             query: data => ({
//                 url: '/messages/',
//                 body: data,
//                 method: 'post',
//             })
//         })
//     })

// });

//export const { useGetMessageQuery, useCreateMessageMutation, messagesSlice } = messagesApi;






// import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
// import { createSlice } from '@reduxjs/toolkit';



// export const messagesApi = createApi({
//     reducerPath: 'messages',
//     baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_SAMPLE_SERVICE_API_HOST }),
//     tagTypes: ['MessagesList'],
//     endpoints: (builder) => ({
//         getMessages: builder.query({
//             query: () => '/messages/',
//             providesTags: ['MessagesList'],
//         }),
//         createMessage: builder.mutation({
//             query: (newMessage) => ({
//                 url: '/messages/',
//                 method: 'post',
//                 body: newMessage,
//             }),
//             invalidatesTags: ['MessagesList'],
//         }),
//         // getMessageDetails: builder.query({
//         //     query: (id) => ({
//         //         url: `/messages/${id}`,
//         //         method: 'get',
//         //     }),
//         // }),
//     }),
// });

// const messagesSlice = createSlice({
//     name: 'messages',
//     initialState: {
//         selectedMessage: null,
//     },
//     reducers: {
//         selectMessage: (state, action) => {
//             state.selectedMessage = action.payload;
//         },
//     },
// });

// export const { selectMessage } = messagesSlice.actions;

// export const { useGetMessageQuery, useCreateMessageMutation } = messagesApi;

// export default messagesSlice.reducer;

// // import { usersApi } from './usersApi';
// // export const messagesApi = createApi({
// //     reducerPath: 'messages',
// //     baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_SAMPLE_SERVICE_API_HOST }),
// //     prepareHeaders: (headers, { getState }) => {
// //         const selector = usersApi.endpoints.getToken.select();
// //         const { data: tokenData} = selector(getState());
// //         if (tokenData && tokenData.access_token) {
// //             headers.set('authorization', `Bearer ${tokenData.access_token}`);
// //         }
// //         return headers;
// //     },

// //     endpoints: (builder) => ({
// //         getMessages: builder.query({
// //             query: () => '
// //
