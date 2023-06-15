import React, { useEffect } from "react";
import { useGetClientAppointmentsQuery, useDeleteAppointmentMutation, useGetTherapistAppointmentsQuery } from "../../store/appointmentsApi";
import { useGetTokenQuery, useGetTherapistDetailQuery, useGetClientDetailQuery } from "../../store/usersApi";
import { useNavigate } from "react-router-dom";
import './appointments.css'

function Appointment({ appointment, handleCancelAppointment, handleRescheduleAppointment, data }) {
    const { data: therapistDetails } = useGetTherapistDetailQuery(appointment.therapist_id);
    return (
        <div key={appointment.id} className="my-4 flex justify-between items-center">
            <p className="text-base text-gray-700">Therapist: {therapistDetails?.first_name} {therapistDetails?.last_name}  Date: {appointment.appointment_date} Time: {appointment.appointment_time}</p>
            <div className="flex">
                <button onClick={() => handleCancelAppointment(appointment.id)} className="px-4 py-2 border bg-[#FCDFCE] text-[#626670] hover:bg-red-100 hover:text-white transition duration-150 ease-in-out">Cancel</button>
                <button onClick={() => handleRescheduleAppointment(appointment.id, data)} className="px-4 py-2 border bg-[#BEC6C3] text-[#626670] hover:bg-green-100 hover:text-[#626670] transition duration-150 ease-in-out ml-4">Reschedule</button>
            </div>
        </div>
    );
}

function TherapistAppointment({ appointment, handleCancelAppointment }) {
    const { data: clientDetails } = useGetClientDetailQuery(appointment.user_id);
    return (
        <div key={appointment.id} className="my-4 flex justify-between items-center">
            <p className="text-base text-gray-700">Client: {clientDetails?.first_name} {clientDetails?.last_name} Date: {appointment.appointment_date} Time: {appointment.appointment_time}</p>
            <button onClick={() => handleCancelAppointment(appointment.id)} className="px-4 py-2 border bg-[#FCDFCE] text-[#626670] hover:bg-red-500 hover:text-white transition duration-150 ease-in-out">Cancel</button>
        </div>
    );
}

export default function AppointmentList() {
    const { data } = useGetTokenQuery();
    const { data: appointments, refetch } = useGetClientAppointmentsQuery();
    const { data: therapistsappointments } = useGetTherapistAppointmentsQuery()
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

    const handleRescheduleAppointment = async (id) => {
        try {
            await deleteAppointment(id);
            navigate("/appointments/create")
        } catch (error) {
            console.error(error);
        }
    };


    if (data && data.access_token && data.account.type === "client") {
        return (
            <div className="appointment-container">
                <h2 className="appt-title text-center">My Appointments</h2>
                <div className="appt-list flex items-center flex-col">
                <button onClick={handleScheduleAppointment} className="px-4 py-2 border bg-[#BEC6C3] text-[#626670] hover:bg-[#FCDFCE] hover:text-[#626670] transition duration-150 ease-in-out mt-4">Schedule an Appointment</button>
                {appointments?.map((appointment) =>
                    <Appointment
                        key={appointment.id}
                        appointment={appointment}
                        handleCancelAppointment={handleCancelAppointment}
                        handleRescheduleAppointment={handleRescheduleAppointment}
                        data={data}
                    />
                )}
            </div>
            </div>
        );
    } else if (data && data.access_token && data.account.type === "therapist") {
        return (
            <div className="appointment-container">
                <h2 className="appt-title text-center">My Appointments</h2>
                <div className="appt-list flex items-center flex-col text-xxlarge">
                {therapistsappointments?.map((appointment) =>
                    <TherapistAppointment
                        key={appointment.id}
                        appointment={appointment}
                        handleCancelAppointment={handleCancelAppointment}
                    />
                )}
            </div>
            </div>
        );
    } else {
        return <div className="appointment-container">
            <h2 className="appt-title text-center">Loading appointments...</h2>
        </div>
    }
}
