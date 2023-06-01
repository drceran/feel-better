import React, {useCallback, useEffect, useState} from "react";
import { useGetJournalsQuery } from "./store/journalsAPI";
import { useGetTokenQuery } from "./store/usersApi";




function JournalList () {
    const { data: token, refetch: refetchToken } = useGetTokenQuery();
    const { data: journals, error, isLoading } = useGetJournalsQuery();
    if (isLoading) {
        return (
            <h1>Loading page! ...</h1>
        );
    }

    if (error) {
        return (
            <h1>Error occurred! {error.message}</h1>
        );
    }

    return (
        <div>
            <h1>Journal Entries</h1>
            <div>
                <table>
                    <thead>
                        <tr>
                            <th>Body</th>
                            <th>Name</th>
                            <th>Date Time</th>
                            <th>Is Private</th>
                            <th>Mood</th>
                        </tr>
                    </thead>
                    <tbody>
                        {journals && journals.map((journal, index) => (
                            <tr key={index}>
                                <td>{journal.body}</td>
                                <td>{journal.name}</td>
                                <td>{journal.dateTime}</td>
                                <td>{journal.isPrivate ? 'Yes' : 'No'}</td>
                                <td>{journal.mood}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default JournalList;
