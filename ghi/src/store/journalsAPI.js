import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { usersApi } from './usersApi';


export const journalsApi = createApi({
    reducerPath: 'journals',
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.REACT_APP_SAMPLE_SERVICE_API_HOST,
        prepareHeaders: (headers, { getState }) => {
            const selector = usersApi.endpoints.getToken.select();
            const { data: tokenData } = selector(getState());

            if (tokenData && tokenData?.access_token) {
                headers.set('Authorization', `Bearer ${tokenData.access_token}`)
            }
            return headers
        }
    }),
    endpoints: builder => ({
        getJournals: builder.query({
            query: () => '/journals/',
        }),
        getOneJournal: builder.query({
            query: (id) => {
                return {
                    url: `/journals/${id}`,
                    method: "get",
                };
            },
        }),
        createJournal: builder.mutation({
            query: data => ({
                url: '/journals/',
                body: data,
                method: 'post',
            }),
            invalidates: [{ type: 'getJournals', endpoint: 'journals' }]
        }),
        editJournal: builder.mutation({
            query: ({ id, ...journal }) => ({
                url: `/journals/${id}`,
                method: 'put',
                body: journal,
            }),
            invalidates: [{ type: 'getJournals', endpoint: 'journals' }]
        }),
        deleteJournal: builder.mutation({
            query: (id) => {
                return {
                    url: `/journals/${id}`,
                    method: "delete",
                };
            },
            invalidates: [{ type: 'getJournals', endpoint: 'journals' }]
        })
    })
});

export const { useEditJournalMutation, useGetJournalsQuery, useCreateJournalMutation, useGetOneJournalQuery, useDeleteJournalMutation } = journalsApi;
