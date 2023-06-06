import React from "react";
import { useGetAppointmentsQuery, useCreateAppointmentMutation } from "../store/appointmentsApi";
import { useParams } from "react-router-dom";
import { useState } from "react";

function AppointmentList() {
    const { id } = useParams();
    const { data: clientAppointments, isLoading } = useGetAppointmentsQuery(id);

    if (isLoading || !clientAppointments) {
        return <progress className="progress is-primary" max="100"></progress>;
    }
}

function AppointmentForm({ onSubmit }) {
    const [appointmentData, setAppointmentData] = useState({
        therapist_id: "",
        appointment_date: "",
        appointment_time: "",
    });

    const handleChange = (e) => {
        setAppointmentData((prevData) => ({
            ...prevData,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(appointmentData);
    };

    return (
        <div>
            <h2>Create Appointment</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="therapist_id">Therapist ID:</label>
                    <input type="text" id="therapist_id" name="therapist_id" value={appointmentData.therapist_id} onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="appointment_date">Date:</label>
                    <input type="date" id="appointment_date" name="appointment_date" value={appointmentData.appointment_date} onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="appointment_time">Time:</label>
                    <input type="time" id="appointment_time" name="appointment_time" value={appointmentData.appointment_time} onChange={handleChange} />
                </div>
                <button type="submit">Create</button>
            </form>
        </div>
    );
}

function ClientList() {
    const { id } = useParams();
    const { data: clientAppointments, isLoading } = useGetAppointmentsQuery(id);
    const createAppointment = useCreateAppointmentMutation();

    if (isLoading || !clientAppointments) {
        return <progress className="progress is-primary" max="100"></progress>;
    }

    const handleCreateAppointment = (appointmentData) => {
        createAppointment(appointmentData);
    };

    return (
        <div>
            <h2>Appointments for Client</h2>
            <AppointmentList />
            {clientAppointments.map((appointment) => (
                <div key={appointment.id}>
                    <p>Therapist: {appointment.therapist_id}</p>
                    <p>Date: {appointment.appointment_date}</p>
                    <p>Time: {appointment.appointment_time}</p>
                </div>
            ))}
            <h2>Appointments for therapist</h2>
            {clientAppointments.map((appointment) => (
                <div key={appointment.id}>
                    <p>Client: {appointment.user_id}</p>
                    <p>Date: {appointment.appointment_date}</p>
                    <p>Time: {appointment.appointment_time}</p>
                </div>
            ))}
            <AppointmentForm onSubmit={handleCreateAppointment} />
        </div>
    );
}

export default ClientList;
