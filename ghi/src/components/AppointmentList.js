import React, { useEffect } from "react";
import { useGetClientAppointmentsQuery, useCreateAppointmentMutation, useDeleteAppointmentMutation, useGetTherapistAppointmentsQuery } from "../store/appointmentsApi";
import { useGetTokenQuery, useGetTherapistDetailQuery, useGetClientDetailQuery } from "../store/usersApi";
import { useNavigate } from "react-router-dom";


function Appointment({ appointment, handleCancelAppointment, handleRescheduleAppointment, data }) {
    const { data: therapistDetails } = useGetTherapistDetailQuery(appointment.therapist_id);
    return (
        <div key={appointment.id}>
            <p>Therapist: {therapistDetails?.first_name} {therapistDetails?.last_name}  Date: {appointment.appointment_date} Time: {appointment.appointment_time}
                <button onClick={() => handleCancelAppointment(appointment.id)}>Cancel </button>
                <button onClick={() => handleRescheduleAppointment(appointment.id, data)}> Reschedule</button></p>
        </div>
    );
}


function TherapistAppointment({ appointment, handleCancelAppointment }) {
    const { data: clientDetails } = useGetClientDetailQuery(appointment.user_id);
    return (
        <div key={appointment.id}>
            <p>Client: {clientDetails?.first_name} {clientDetails?.last_name} Date: {appointment.appointment_date} Time: {appointment.appointment_time}
                <button onClick={() => handleCancelAppointment(appointment.id)}>Cancel </button></p>
        </div>
    );
}


export default function AppointmentList() {
    const { data } = useGetTokenQuery();
    const { data: appointments, refetch } = useGetClientAppointmentsQuery(data?.account.id);
    const { data: therapistsappointments } = useGetTherapistAppointmentsQuery(data?.account.id)
    const [createAppointment] = useCreateAppointmentMutation();
    const [deleteAppointment] = useDeleteAppointmentMutation();
    const navigate = useNavigate();


    useEffect(() => {
        refetch();
    }, [refetch])


    const handleScheduleAppointment = () => {
        navigate("/appointments/create");
    };

    const handleCancelAppointment = async (id) => {
        try {
            await deleteAppointment(id);
        } catch (error) {
            console.error(error);
        }
    };

    const handleRescheduleAppointment = async (id, newAppointmentData) => {
        navigate("/appointments/create")
        try {
            await deleteAppointment(id);
            await createAppointment(newAppointmentData);
        } catch (error) {
            console.error(error);
        }
    };


    if (data && data.access_token && data.account.type === "client") {
        return (
            <div>
                <h2>My Appointments</h2>
                {appointments?.map((appointment) =>
                    <Appointment
                        key={appointment.id}
                        appointment={appointment}
                        handleCancelAppointment={handleCancelAppointment}
                        handleRescheduleAppointment={handleRescheduleAppointment}
                        data={data}
                    />
                )}
                <button onClick={handleScheduleAppointment}>Schedule an Appointment</button>
            </div>
        );
    } else if (data && data.access_token && data.account.type === "therapist") {
        return (
            <div>
                <h2>My Appointments</h2>
                {therapistsappointments?.map((appointment) =>
                    <TherapistAppointment
                        key={appointment.id}
                        appointment={appointment}
                        handleCancelAppointment={handleCancelAppointment}
                    />
                )}
            </div>
        );
    } else {
        return <div>
            <h2>Loading appointments...</h2>
        </div>
    }
}
