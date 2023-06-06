import React from "react";
import { useGetClientAppointmentsQuery, useEditAppointmentMutation, useDeleteAppointmentMutation, useGetTherapistAppointmentsQuery } from "../store/appointmentsApi";
import { useGetTokenQuery } from "../store/usersApi";
import { useNavigate } from "react-router-dom";


export default function AppointmentList() {

    const { data, error } = useGetTokenQuery();
    const { data: appointments } = useGetClientAppointmentsQuery(data?.account.id);
    const { data: therapistsappointments } = useGetTherapistAppointmentsQuery(data?.account.id)
    const [editAppointment] = useEditAppointmentMutation();
    const [deleteAppointment] = useDeleteAppointmentMutation();
    const navigate = useNavigate();

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

    const handleRescheduleAppointment = async (id, data) => {
        try {
            await editAppointment({ id, data });
            navigate("/appointments/create")
        } catch (error) {
            console.error(error);
        }
    };


    if (data && data.access_token && data.account.type === "client") {
        return (
            <div>
                <h2>My Appointments</h2>
                {appointments?.map((appointment) => (
                    <div key={appointment.id}>
                        <p>Therapist: {appointment.therapist_id} Date: {appointment.appointment_date} Time: {appointment.appointment_time}
                            <button onClick={() => handleCancelAppointment(appointment.id)}>Cancel </button>
                            <button onClick={() => handleRescheduleAppointment(appointment.id, data)}> Reschedule</button></p>
                    </div>
                ))}
                <button onClick={handleScheduleAppointment}>Schedule an Appointment</button>
            </div>
        );
    } else if (data && data.access_token && data.account.type === "therapist") {
        return (
            <div>
                <h2>My Appointments</h2>
                {therapistsappointments?.map((appointment) => (
                    <div key={appointment.id}>
                        <p>Client: {appointment.user_id} Date: {appointment.appointment_date} Time: {appointment.appointment_time}
                            <button onClick={() => handleCancelAppointment(appointment.id)}>Cancel </button> </p>
                    </div>
                ))}
            </div>
        );
    } else {

        return <div>oopsie.</div>; // return something else if user is not a therapist
    }
}
