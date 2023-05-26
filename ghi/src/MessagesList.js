import React, {useCallback, useEffect, useState} from "react";
import { useGetMessagesQuery } from "./store/messagesAPI";

function MessagesList () {
    const { data: messages, error, isLoading } = useGetMessagesQuery();

    if (isLoading) {
        return (
            <h1>Loading page!</h1>
        );
    }

    if (error) {
        return (
            <h1>Error occurred! {error.message}</h1>
        );
    }

    return (
        <div>
            <h1>Messages</h1>
            <div>
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
                        {messages && messages.map((message, index) => (
                            <tr key={index}>
                                <td>{message.sender}</td>
                                <td>{message.recipient}</td>
                                <td>{message.subject}</td>
                                <td>{message.body}</td>
                                <td>{message.cost}</td>
                                <td>{message.date_time}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default MessagesList;
