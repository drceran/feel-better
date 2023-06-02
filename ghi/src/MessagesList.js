import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { useGetMessagesQuery } from './store/messagesAPI';
import MessageDetails from './MessageDetails';
import { selectMessage } from './store/messagesSlice';


function MessagesList() {
    const { data: messages, error, isLoading } = useGetMessagesQuery();
    const selectedMessage = useSelector((state) => state.messages.selectedMessage);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleOpenMessage = (message) => {
        dispatch(selectMessage(message.id));
        navigate(`/messages/${message.id}`);
    };

    const handleGoToAnotherPage = () => {
        navigate('/messages/new');
    };

    if (isLoading) {
        return <h1>Loading page!</h1>;
    }

    if (error) {
        return <h1>Error occurred! {error.message}</h1>;
    }

    return (
        <div>
            <h1>Messages</h1>
            <button onClick={handleGoToAnotherPage}>Create New Message</button>
            {selectedMessage ? (
                <MessageDetails message={selectedMessage} />
            ) : (
                <div>
                    {messages && messages.length > 0 ? (
                        <table>
                            <thead>
                                <tr>
                                    <th>Sender</th>
                                    <th>Recipient</th>
                                    <th>Subject</th>
                                    <th>Body</th>
                                    <th>Cost</th>
                                    <th>Date/Time</th>
                                </tr>
                            </thead>
                            <tbody>
                                {messages.map((message, index) => (
                                    <tr key={index}>
                                        <td>
                                            <Link
                                                to={`/messages/${message.id}`}
                                                onClick={() => handleOpenMessage(message)}
                                                style={{ textDecoration: 'none', color: 'inherit' }}
                                            >
                                                {message.sender}
                                            </Link>
                                        </td>
                                        <td>{message.recipient}</td>
                                        <td>{message.subject}</td>
                                        <td>{message.body}</td>
                                        <td>{message.cost}</td>
                                        <td>{new Date(message.timestamp).toLocaleString()}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <p>No messages found.</p>
                    )}
                </div>
            )}
        </div>
    );
}

export default MessagesList;
