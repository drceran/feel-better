import React from "react";
import JournalList from "./components/JournalList";
import ClientList from "./components/AppointmentsList";

const HomePage = () => {
    return (
        <>
            <h1> Here is the home page!</h1>
            <h2>Journal list with an h2</h2>
            <div>
                <JournalList />
                <ClientList />
            </div>
        </>
    )
}

export default HomePage;
