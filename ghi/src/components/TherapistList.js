import React from "react";
import { useGetTherapistsQuery } from "../store/usersApi";
import { useParams } from "react-router-dom";

function TherapistList() {
    const { id } = useParams();
    const { data, isLoading } = useGetTherapistsQuery(id);

    if (isLoading) {
        return <progress className="progress is-primary" max="100"></progress>;
    }

    const therapists = data.filter((therapist) => therapist.type === "therapist");

    return (
        <div>
        <h2>Therapists</h2>
        {therapists.map((therapist) => (
            <div key={therapist.id}>
                <p> Name: {therapist.first_name} {therapist.last_name} Email: {therapist.email} </p>
            </div>
        ))}
        </div>
    );
}

export default TherapistList;
