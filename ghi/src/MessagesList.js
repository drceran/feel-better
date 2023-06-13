import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { useGetMessagesQuery, useDeleteMessageMutation } from './store/messagesAPI';
import MessageDetails from './MessageDetails';
import { selectMessage } from './store/messagesSlice';


function MessagesList() {
    const { data: messages, error, isLoading } = useGetMessagesQuery();
    const selectedMessage = useSelector((state) => state.messages.selectedMessage);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [deleteMessage] = useDeleteMessageMutation();

    useEffect(() => {
        if (deleteMessage.isSuccess) {
            dispatch(deleteMessage(deleteMessage.arg));
        }
    }, [deleteMessage.isSuccess, deleteMessage.arg, dispatch, deleteMessage]);

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

    const sortedMessages = Array.from(messages).sort((a, b) => {
        const dateComparison = new Date(b.timestamp) - new Date(a.timestamp);
        if (dateComparison !== 0) {
            return dateComparison;
        }
        return b.id - a.id;
    });

    const recentMessages = sortedMessages?.length <= 20 ? sortedMessages : sortedMessages.slice(0, 20);

    const handleDelete = async (id) => {
        try {
            await deleteMessage(id);
        } catch (err) {
            console.error('Error deleting message:', err);
        }
    };

    return (
        <div>
            <h1>Messages</h1>
            <button onClick={handleGoToAnotherPage} className="bg-sheer hover:bg-sheer text-billow font-bold py-1 px-4 rounded" style={{ backgroundColor: '#BEC6C3', color: '#626670' }}>
                Create New Message
            </button>
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
                                    <th>Date/Time</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {recentMessages.map((message, index) => (
                                    <tr key={index}>
                                        <td>
                                            <Link
                                                to={`/messages/${message.id}`}
                                                onClick={() => handleOpenMessage(message)}
                                                style={{ textDecoration: 'underline', color: 'blue' }}
                                            >
                                                {message.user_id}
                                            </Link>
                                        </td>
                                        <td>{message.recipient}</td>
                                        <td>{message.subject}</td>
                                        <td>{message.body}</td>
                                        <td>{new Date(message.datetime).toLocaleString()}</td>
                                        <td>
                                            <button onClick={() => handleDelete(message.id)} className="bg-sheer hover:bg-sheer text-candyfloss font-bold py-1 px-4 rounded" style={{ backgroundColor: '#BEC6C3', color: '#fcdfce' }}>
                                                Delete
                                            </button>
                                        </td>
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
