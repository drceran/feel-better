import { useState } from "react";
import { useCreateAppointmentMutation } from "../../store/appointmentsApi";
import { useGetTherapistsQuery, useGetTokenQuery } from "../../store/usersApi";
import { useNavigate } from "react-router-dom";
import './appointments.css'


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
                cost: 10,
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
        <div className="appointment-container flex items-center justify-center min-h-scree">
        <div className="w-full max-w-xs mx-auto text-center">
                <form onSubmit={handleSubmit} className="shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <div className="schedule mb-7">
                    <label htmlFor="therapist_id" className="block text-gray-700 text-sm font-bold mb-9">Schedule an appointment with:</label>
                    <select id="therapist_id" name="therapist_id" value={appointmentData.therapist_id} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                        <option value="">Select a Therapist</option>
                        {therapists.map((therapist) => (
                            <option key={therapist.id} value={therapist.id}>
                                {therapist.first_name} {therapist.last_name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="schedule mb-7">
                    <label htmlFor="appointment_date" className="block text-gray-700 text-sm font-bold mb-9">Date:</label>
                    <input type="date" id="appointment_date" name="appointment_date" value={appointmentData.appointment_date} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                </div>
                <div className="schedule mb-7">
                    <label htmlFor="appointment_time" className="block text-gray-700 text-sm font-bold mb-9">Time:</label>
                    <input type="time" id="appointment_time" name="appointment_time" value={appointmentData.appointment_time} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                </div>
                <div className="schedule flex items-center justify-center">
                        <button type="submit" className="bg-[#FCDFCE] hover:bg-[#BEC6C3] text-[#626670] font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Create</button>
                </div>
            </form>
        </div>
        </div>
    );
}
