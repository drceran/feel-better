import React, { useState } from "react";
import { useGetClientsQuery, useGetClientDetailQuery } from "../store/usersApi";
import { useParams } from "react-router-dom";

function ClientsList() {
    const { id } = useParams();
    const { data, isLoading } = useGetClientsQuery(id);
    const { clientDetailData, clientDetailIsLoading } = useGetClientDetailQuery(id);
    const [searchText, setSearchText] = useState("");
    const [selectedClient, setSelectedClient] = useState(null);

    if (isLoading || !data) {
        return <progress className="progress is-primary" max="100"></progress>;
    }

    const handleSearch = (e) => {
        setSearchText(e.target.value);
    };

    const handleClientClick = (client) => {
        setSelectedClient(client);
    };

    const clients = data.filter((client) => client.type === "client" &&
    (searchText === "" ||
    client.first_name.toLowerCase().includes(searchText.toLowerCase()) ||
    client.last_name.toLowerCase().includes(searchText.toLowerCase()) ||
    client.email.toLowerCase().includes(searchText.toLowerCase()))
    );

    return (
        <div>
        <h2>Clients List</h2>
        <input type="text" value={searchText}onChange={handleSearch} placeholder="Search clients"/>
        {clients.map((client) => (
            <div key={client.id}>
            <p>
                <a href="#" onClick={() => handleClientClick(client)}>
                Name: {client.first_name} {client.last_name} Email: {client.email}
                </a>
            </p>
            <hr />
            </div>
        ))}
        {selectedClient && (
            <div>
            <h3>Client Details</h3>
            <p>First Name: {selectedClient.first_name}</p>
            <p>Last Name: {selectedClient.last_name}</p>
            <p>Email: {selectedClient.email}</p>
            <p>Phone Number: {selectedClient.phone_number}</p>
            <p>City: {selectedClient.city}</p>
            <p>State: {selectedClient.state}</p>
            <p>Profile Picture: {selectedClient.profile_picture}</p>
            <p>About Me: {selectedClient.about_me}</p>
            </div>
        )}
        </div>
    );
}

export default ClientsList;

// //later i need to make sure that a logged in therapist can only view their assigned clients
