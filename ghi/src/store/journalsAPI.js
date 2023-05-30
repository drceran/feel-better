import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const journalsApi = createApi({
    reducerPath: 'journals',
    baseQuery: fetchBaseQuery({baseUrl: process.env.REACT_APP_SAMPLE_SERVICE_API_HOST}),
    endpoints: builder => ({
        getJournals: builder.query({
            query: () => '/journals/',
        }),
        createJournal: builder.mutation({
            query: data => ({
                url: '/journals/',
                body: data,
                method: 'post',
            })
        })
    })
});

export const { useGetJournalsQuery, useCreateJournalMutation} = journalsApi;
