import React from "react";
import JournalList from "./components/Journal/JournalList";
import { useGetTokenQuery } from "./store/usersApi";

const HomePage = () => {
    const { data, isFetching } = useGetTokenQuery();
    const userType = data?.account.type;

    if (isFetching || !data) {
        return <h1>Loading...</h1>;
    }
    if (!userType) {
        console.log("userType is: ", userType);
    }

    return (
        <>
            <div>
                {/* <h1>Hello {data?.account.first_name}!</h1> */}
                <JournalList />
            </div>
        </>
    )
};

export default HomePage;
