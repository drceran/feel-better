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
    tagTypes: ["Appointments", "AppointmentDetail", "Jotter"],
    endpoints: (builder) => ({
        getAppointments: builder.query({
            query: () => "/appointments/",
            providesTags: ["Appointments"]
        }),
        createAppointment: builder.mutation({
            query: (data) => ({
                url: "/appointments/",
                body: data,
                method: "post",
            }),
            invalidatesTags: ["Appointments", "Jotter"]
        }),
        getClientAppointmentDetail: builder.query({
            query: (id) => ({
                url: "/appointments" + id,
                method: "get",
                credentials: "include",
            }),
            providesTags: ["AppointmentDetail"]
        }),
        getClientAppointments: builder.query({
            query: () => ({
                url: `/appointments`,
                method: "get",
                credentials: "include",
            }),
            providesTags: ["Appointments"]
        }),
        getTherapistAppointments: builder.query({
            query: () => ({
                url: `/therapistappointments`,
                method: 'get',
                credentials: "include",
            }),
            providesTags: ["Appointments"]
        }),
        editAppointment: builder.mutation({
            query: ({ id, ...appointment }) => ({
                url: `/appointments/${id}`,
                method: "put",
                body: appointment,
                credentials: "include",
            }),
            invalidatesTags: ["Appointments", "AppointmentDetail"]
        }),
        deleteAppointment: builder.mutation({
            query: (id) => ({
                url: `/appointments/${id}`,
                method: "delete",
                credentials: "include",
            }),
            invalidatesTags: ["Appointments"]
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
