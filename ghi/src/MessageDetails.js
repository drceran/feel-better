import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

function MessageDetails() {
    const { id } = useParams();
    const selectedMessage = useSelector((state) =>
        state.messages.find((messages) => messages.id === id)
    );

    if (!selectedMessage) {
        return <p>No message found.</p>;
    }

    return (
        <div>
            <h2>Message Details</h2>
            <p>
                <strong>Sender:</strong> {selectedMessage.sender}
            </p>
            <p>
                <strong>Recipient:</strong> {selectedMessage.recipient}
            </p>
            <p>
                <strong>Subject:</strong> {selectedMessage.subject}
            </p>
            <p>
                <strong>Body:</strong> {selectedMessage.body}
            </p>
            <p>
                <strong>Cost:</strong> {selectedMessage.cost}
            </p>
            <p>
                <strong>Date/Time:</strong>{' '}
                {new Date(selectedMessage.timestamp).toLocaleString()}
            </p>
        </div>
    );
}

export default MessageDetails;
