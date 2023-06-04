import React from "react";
import JournalList from "./components/JournalList";
import ClientsList from "./components/Clientslist";
import ClientList from "./components/AppointmentsList";
import { useGetTokenQuery } from "./store/usersApi";





const HomePage = () => {
    const { data, error } = useGetTokenQuery();
    const userType = data.account.type;

    console.log(data);
    if (userType == 'client') {
        console.log("Welcome Client!!")
    };


    return (
        <>
            <div>
                <JournalList />
                <ClientsList />
                {/* <ClientList /> */}
            </div>
        </>
    )
};

export default HomePage;
