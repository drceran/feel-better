import React from "react";
import JournalList from "./components/JournalList";
import { useGetTokenQuery } from "./store/usersApi";

const HomePage = () => {
    const { data, isFetching } = useGetTokenQuery();
    const userType = data?.account.type;

    if (isFetching || !data) {
        return <h1>Loading...</h1>;
    }
    if (userType) {
        console.log("userType is: ", userType);
    }

    return (
        <>
            <div>
                <JournalList />
            </div>
        </>
    )
};

export default HomePage;
