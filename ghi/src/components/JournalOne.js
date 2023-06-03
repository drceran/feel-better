import React from "react";
import { Link, useParams } from "react-router-dom";
import { useGetOneJournalQuery } from "../store/journalsAPI";

function JournalEntry() {
    const { id } = useParams();
    const { data: journal, error, isLoading } = useGetOneJournalQuery(id);

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
            <div>
                <a><Link to={`/home/`}>Home</Link></a>
                <a><Link to={`/journals/${id}/edit`}>Edit</Link></a>
            </div>
            <h2>{journal.name} - {new Date(journal.date_time).toLocaleString()}</h2>
            <p>{journal.body}</p>
            <p>Mood: {journal.mood}</p>
        </div>
    )
}

export default JournalEntry;
