import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { useGetMessagesQuery, useDeleteMessageMutation } from './store/messagesAPI';
import { selectMessage } from './store/messagesSlice';
import { useGetUserInfoQuery, useGetTokenQuery } from './store/usersApi';


function MessagesList() {
    const { data: messages, error, isLoading } = useGetMessagesQuery();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [deleteMessage] = useDeleteMessageMutation();
    const { data: tokenData, isLoading: isTokenLoading } = useGetTokenQuery();
    const { data: userInfoData } = useGetUserInfoQuery(isTokenLoading || !tokenData ? undefined : tokenData.account.id);


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
        return <h1>Error occurred! {error.messages}</h1>;
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
        <div className="mx-auto w-full max-w-5xl bg-white">
            <ul className="flex flex-col">
                <button onClick={() => handleGoToAnotherPage(messages)} className="bg-sheer hover:bg-sheer text-billow font-bold py-1 px-4 rounded" style={{ backgroundColor: '#BEC6C3', color: '#626670' }}>Create a New Message</button>
                {recentMessages.map(messages => (
                    <li key={messages.id} className="border-b-2 border-gray-100">
                        <div className={`py-5 px-4 flex justify-between border-l-4 border-transparent bg-transparent ${messages.online ? "hover:border-green-400 hover:bg-gray-200" : "hover:border-red-500 hover:bg-red-50"}`}>

                            {/* USER DETAILS */}
                            <div className="sm:pl-4 pr-8 flex sm:items-center">
                                {/* User Picture */}
                                <img src={userInfoData.profile_picture} alt="Profile" className="mr-3 w-8 sm:w-12 h-8 sm:h-12 rounded-full" />
                                {/* User Infos */}
                                <div className="space-y-1">
                                    {/* Name */}
                                    <p className="text-base text-gray-700 font-bold tracking-wide">{userInfoData.first_name}  {userInfoData.last_name}</p>
                                    {/* Role */}
                                    <p className="text-sm text-gray-500 font-medium">{messages.subject}</p>
                                    <p className="text-sm text-gray-500 font-medium">{messages.body}</p>
                                </div>
                            </div>

                            {/* USER STATUS & BUTTON */}
                            <div className="pr-4 flex flex-col justify-between items-end">
                                <p className="text-sm text-gray-500 font-semibold">{messages.datetime}</p>
                                <Link
                                    to={`/messages/${messages.id}`}
                                    onClick={() => handleOpenMessage(messages)}
                                    className="text-sm text-gray-500 font-semibold hover:underline hover:text-gray-700"
                                >
                                    Details
                                </Link>
                                <button onClick={() => handleDelete(messages.id)} className="text-sm text-gray-500 font-semibold hover:underline hover:text-gray-700">Delete</button>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default MessagesList;
