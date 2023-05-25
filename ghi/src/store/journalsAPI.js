import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const journalsApi = createApi({
    reducerPath: 'journals',
    baseQuery: "http://localhost:8000/",
    endpoints: builder => ({
        getJournals: builder.query({
            query: () => '/journals/', 
        })
    })
});

export const { useGetJournalsQuery } = journalsApi;
