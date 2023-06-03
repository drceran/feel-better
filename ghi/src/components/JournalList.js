import React from "react";
import { useGetJournalsQuery } from "../store/journalsAPI";
import { Link } from 'react-router-dom';

function JournalList() {
    let { data: journals, error, isLoading } = useGetJournalsQuery();
    if (isLoading) {
        return <h1>Loading page! ...</h1>;
    }

    if (error) {
        return <h1>Error occurred! {error.message}</h1>;
    }

    const sortedJournals = Array.from(journals).sort((a, b) => {
        return new Date(b.date_time) - new Date(a.date_time);
    });

    const mostRecentJournals = sortedJournals?.length <= 10 ? sortedJournals : sortedJournals.slice(0, 10);

    return (
        <div>
            <h1>Journal Entries</h1>
            <div>{journals && journals.length > 0 ? (
                <ul>
                    {mostRecentJournals.map((journal, index) => (
                        <Link to={`/journals/${journal.id}`} key={index}>
                            <li><button className="rounded-t-lg">
                                {journal.name} - {new Date(journal.date_time).toLocaleString()}
                            </button></li>
                        </Link>
                    ))}
                </ul>
            ) : (
                <p>No entries found.</p>
            )}
            </div>
        </div>
    );
}

export default JournalList;
