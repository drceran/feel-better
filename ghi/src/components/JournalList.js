import React, { useState, useEffect } from "react";
import { useGetJournalsQuery } from "../store/journalsAPI";
import { Link } from 'react-router-dom';

function JournalList() {
    const [searchTerm, setSearchTerm] = useState("");
    let { data: journals, error, isLoading, refetch } = useGetJournalsQuery();

    useEffect(() => {
        refetch();
    }, [refetch]);

    if (isLoading) {
        return <h1>Loading page! ...</h1>;
    }

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const filteredJournals = journals?.filter(({ body, name, date_time }) => {
        const search = searchTerm.toLowerCase();
        const lowercaseDateTime = new Date(date_time).toLocaleString().toLowerCase();
        return (
            body.toLowerCase().includes(search) ||
            name.toLowerCase().includes(search) ||
            lowercaseDateTime.includes(search)
        );
    });

    const sortedJournals = filteredJournals?.sort((a, b) => {
        return new Date(b.date_time) - new Date(a.date_time);
    });

    const mostRecentJournals = sortedJournals?.length <= 10 ? sortedJournals : sortedJournals?.slice(0, 10);

    return (
        <div>
            <h1>Journal Entries</h1>
            <input type="text" value={searchTerm} onChange={handleSearchChange} placeholder="Search..." />
            <Link to={`/journals/new`}>
                <button>Create Journal Entry</button>
            </Link>
            <div>{filteredJournals?.length > 0 ? (
                <ul>
                    {mostRecentJournals?.map((journal, index) => (
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
