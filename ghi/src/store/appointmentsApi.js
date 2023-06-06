import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { usersApi } from './usersApi';

export const appointmentsApi = createApi({
    reducerPath: "appointments",
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.REACT_APP_SAMPLE_SERVICE_API_HOST,
        prepareHeaders: (headers, { getState }) => {
            const selector = usersApi.endpoints.getToken.select();
            const { data: tokenData } = selector(getState());

            if (tokenData && tokenData.access_token) {
                headers.set('Authorization', `Bearer ${tokenData.access_token}`)
            }
            return headers
        }
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
    getClientAppointmentDetail: builder.query({
        query: (id) => ({
            url: "/appointments" + id,
            method: "get",
            credentials: "include",
        }),
    }),
    getClientAppointments: builder.query({
        query: (id) => ({
            url: `/appointments`,
            method: "get",
            credentials: "include",
        }),
    }),
    getTherapistAppointments: builder.query({
        query: (id) => ({
            url: `/therapistappointments/${id}`,
            method: 'get',
        }),
    }),
    editAppointment: builder.mutation({
        query: ({ id, ...appointment }) => ({
            url: `/appointments/${id}`,
            method: "put",
            body: appointment,
        }),
    }),
    deleteAppointment: builder.mutation({
        query: (id) => ({
            url: `/appointments/${id}`,
            method: "delete",
        }),
    }),
    }),
});

export const {
    useGetClientAppointmentsQuery,
    useCreateAppointmentMutation,
    useGetClientAppointmentDetailQuery,
    useEditAppointmentMutation,
    useDeleteAppointmentMutation,
    useGetTherapistAppointmentsQuery,
} = appointmentsApi;
