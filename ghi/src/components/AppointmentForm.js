import { useState } from "react";
import { useCreateAppointmentMutation } from "../store/appointmentsApi";
import { useGetTherapistsQuery, useGetTokenQuery } from "../store/usersApi";
import { useNavigate } from "react-router-dom";


export default function AppointmentForm() {
    const { data: getTherapist, isLoading } = useGetTherapistsQuery();
    const [createAppointment, result] = useCreateAppointmentMutation();
    const [setError] = useState("");
    const { data } = useGetTokenQuery();
    const navigate = useNavigate();


    const therapists = getTherapist?.filter((therapist) => therapist.type === "therapist") || [];
    const [appointmentData, setAppointmentData] = useState({
        therapist_id: "",
        appointment_date: "",
        appointment_time: "",
    });


    const handleChange = (e) => {
        setAppointmentData((oldData) => ({
            ...oldData,
            [e.target.name]: e.target.value,
        }));
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const appt = {
                user_id: data.account.id,
                therapist_id: appointmentData.therapist_id,
                appointment_date: appointmentData.appointment_date,
                appointment_time: appointmentData.appointment_time,
                cost: (data.account.balance),
            };
            const result = await createAppointment(appt);
            if (result) {
                navigate("/appointments");
                console.log(result);

            } else if (result.isError) {
                setError(result.error);
                console.log(result.error);
            }
        } catch (err) {
            setError(err);
        }
        if (result.isSuccess) {
            navigate("/appointments");
        };
    }


    if (isLoading) {
        return <progress className="progress is-primary" max="100">Loading appointments</progress>;
    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="therapist_id">Schedule an appointment with:</label>
                    <select id="therapist_id" name="therapist_id" value={appointmentData.therapist_id} onChange={handleChange}>
                        <option value="">Select a Therapist</option>
                        {therapists.map((therapist) => (
                            <option key={therapist.id} value={therapist.id}>
                                {therapist.first_name} {therapist.last_name}
                            </option>
                        ))}
                    </select>
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
