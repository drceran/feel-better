import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { useGetOneMessageQuery } from './store/messagesAPI';

function MessageDetails() {
    const { id } = useParams();
    const { data: message, error, isLoading } = useGetOneMessageQuery(id);

    if (isLoading) {
        return <h1>Loading page...</h1>;
    }

    if (error) {
        return <h1>Error occurred! {error.message}</h1>;
    }

    return (
        <div>
            <div>
                <Link to="/messages">Back to Messages</Link>
            </div>
            <h2>{message.subject}</h2>
            <p>Body: {message.body}</p>
            <p>Cost: {message.cost}</p>
            <p>Recipient: {message.recipient}</p>
            <p>Date and Time: {new Date(message.datetime).toLocaleString()}</p>
        </div>
    );
}

export default MessageDetails;
