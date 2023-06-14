import React from "react";

export default function ScheduleInfo({ back }) {

    return (
        <div style={{ fontFamily: "Short Stack, cursive" }}>
            <button
                onClick={back}>back</button>
            <h1 style={{ fontSize: '30px' }}>Schedule Appointments With Our <br></br>Certified Therapists</h1>
            <p style={{ fontSize: '10px' }}>The scheduling feature allows users to conveniently schedule appointments with therapists.
            It provides a seamless process for users to connect with therapists based on their availability and preferred time slots, goals, and any questions/concerns you may have.</p>
            <h3 style={{ fontSize: '15px' }}>-Selecting a Package: Users can visit the pricing section of the application to explore different therapy packages offered. These packages typically include a specific number of sessions or a duration of therapy. Users can choose the package that best suits their needs and preferences.</h3>

            <h3 style={{ fontSize: '15px' }}>-Messaging and Appointment Setup: Once users have selected a package, they gain access to the messaging feature, which allows them to communicate with therapists. Users can initiate conversations with therapists to discuss their concerns, goals, and availability. Through these conversations, users and therapists can collaboratively determine suitable appointment times.</h3>

            <h3 style={{ fontSize: '15px' }}>-Appointment Scheduling: Using the scheduling feature, users can set up appointments with their chosen therapists. They can select available time slots that align with their schedules. This feature ensures a smooth and efficient process for users to secure dedicated sessions with therapists.</h3>

            <h3 style={{ fontSize: '15px' }}>-Appointment Reminders: To facilitate better attendance and time management, the scheduling feature includes appointment reminders. Users receive notifications or reminders about upcoming appointments, ensuring they stay informed and prepared for their scheduled sessions.</h3>
        </div>
    )
}
