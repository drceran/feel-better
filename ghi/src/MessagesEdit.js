import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ErrorNotification from './ErrorNotification';
import { useEditMessageMutation, useGetOneMessageQuery } from './store/messagesAPI';
import { useGetTokenQuery } from './store/usersApi';

function MessagesEdit() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [subject, setSubject] = useState('');
    const [body, setBody] = useState('');
    const [recipient, setRecipient] = useState('');
    const [error, setError] = useState('');
    const [dateTime, setDateTime] = useState('');

    const { data: message } = useGetOneMessageQuery(id);
    const { data } = useGetTokenQuery();

    useEffect(() => {
        if (message) {
            setSubject(message.subject);
            setBody(message.body);
            setRecipient(message.recipient);
            setDateTime(message.datetime);
        }
    }, [message]);

    const [editMessage] = useEditMessageMutation();

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            const updatedMessage = {
                id: parseInt(id),
                user_id: data.account.id,
                subject: subject,
                body: body,
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
        <div className="max-w-md mx-auto">
            {error && <ErrorNotification error={error} />}
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="subject" className="block mb-1">
                        Subject:
                    </label>
                    <textarea
                        id="subject"
                        className="w-full p-2 border border-gray-300 rounded"
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="body" className="block mb-1">
                        Body:
                    </label>
                    <input
                        type="text"
                        id="body"
                        className="w-full p-2 border border-gray-300 rounded"
                        value={body}
                        onChange={(e) => setBody(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="recipient" className="block mb-1">
                        Recipient:
                    </label>
                    <input
                        type="text"
                        id="recipient"
                        className="w-full p-2 border border-gray-300 rounded"
                        value={recipient}
                        onChange={(e) => setRecipient(e.target.value)}
                        required
                    />
                </div>
                <button className="bg-sheer hover:bg-sheer text-billow font-bold py-1 px-4 rounded" style={{ backgroundColor: '#BEC6C3', color: '#626670' }}>
                    Submit
                </button>
            </form>
        </div>
    );
}

export default MessagesEdit;
