import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ErrorNotification from './ErrorNotification';
import { useEditMessageMutation, useGetOneMessageQuery } from './store/messagesAPI';
import { useGetTokenQuery } from './store/usersApi';

function MessagesFormEdit() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [subject, setSubject] = useState('');
    const [body, setBody] = useState('');
    const [cost, setCost] = useState('');
    const [recipient, setRecipient] = useState('');
    const [error, setError] = useState('');
    const [dateTime, setDateTime] = useState('');

    const { data: message } = useGetOneMessageQuery(id);
    const { data, errorToken } = useGetTokenQuery();

    useEffect(() => {
        if (message) {
            setSubject(message.subject);
            setBody(message.body);
            setCost(message.cost);
            setRecipient(message.recipient);
            setDateTime(message.datetime);
        }
    }, [message]);

    const [editMessage, result] = useEditMessageMutation();

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            const updatedMessage = {
                id: parseInt(id),
                user_id: data.account.id,
                subject: subject,
                body: body,
                cost: cost,
                recipient: recipient,
                datetime: dateTime,
            };

            const result = await editMessage(updatedMessage);

            if (result.isSuccess) {
                navigate('/messages');
            } else if (result.isError) {
                setError(result.error);
            }
        } catch (err) {
            setError(err);
        }
    }

    return (
        <div>
            {error && <ErrorNotification error={error} />}
            <form onSubmit={handleSubmit}>
                <label>
                    Subject:
                    <textarea value={subject} onChange={(e) => setSubject(e.target.value)} required />
                </label>
                <label>
                    Body:
                    <input type="text" value={body} onChange={(e) => setBody(e.target.value)} required />
                </label>
                <label>
                    Cost:
                    <input type="text" value={cost} onChange={(e) => setCost(e.target.value)} required />
                </label>
                <label>
                    Recipient:
                    <input type="text" value={recipient} onChange={(e) => setRecipient(e.target.value)} required />
                </label>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export default MessagesFormEdit;
