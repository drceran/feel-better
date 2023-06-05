import React from 'react';
import { useParams } from 'react-router-dom';
import { selectMessage } from './store/messagesSlice';

function MessageDetails() {
    console.log(selectMessage);

    if (!selectMessage) {
        return <p>No message found.</p>;
    }

    return (
        <div>
            <h2>Message Details</h2>
            <p>
                <strong>Sender:</strong> {selectMessage.sender}
            </p>
            <p>
                <strong>Recipient:</strong> {selectMessage.recipient}
            </p>
            <p>
                <strong>Subject:</strong> {selectMessage.subject}
            </p>
            <p>
                <strong>Body:</strong> {selectMessage.body}
            </p>
            <p>
                <strong>Cost:</strong> {selectMessage.cost}
            </p>
            <p>
                <strong>Date/Time:</strong>{' '}
                {new Date(selectMessage.timestamp).toLocaleString()}
            </p>
        </div>
    );
}

export default MessageDetails;
