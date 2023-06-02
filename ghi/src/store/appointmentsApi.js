import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const appointmentsApi = createApi({
    reducerPath: "appointments",
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.REACT_APP_SAMPLE_SERVICE_API_HOST,
    }),
    endpoints: (builder) => ({
        getAppointments: builder.query({
        query: () => "/appointments/",
    }),
    createAppointment: builder.mutation({
        query: (data) => ({
            url: "/appointments/",
            body: data,
            method: "post",
        }),
    }),
    getAppointmentDetail: builder.query({
        query: (id) => ({
            url: "/appointments" + id,
            method: "get",
            credentials: "include",
        }),
    }),
    getAppointments: builder.query({
        query: (id) => ({
            url: `/appointments/`,
            method: "get",
            credentials: "include",
        }),
    }),
    }),
});

export const {
    useGetAppointmentsQuery,
    useCreateAppointmentMutation,
    useGetAppointmentDetailQuery,
} = appointmentsApi;
