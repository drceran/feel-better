import React, { useState, useEffect } from "react";
import { useGetJournalsQuery } from "../../store/journalsAPI";
import { Link } from 'react-router-dom';
import "./Journals.css";

function JournalList() {
    const [searchTerm, setSearchTerm] = useState("");
    let { data: journals, isLoading, refetch } = useGetJournalsQuery();

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
        <div className="">
            <div className="journals-container w-screen">
                <h1 className="text-3xl font-semibold text-billow">Journal Entries</h1>
                <input type="text" value={searchTerm} onChange={handleSearchChange} placeholder="Search..." className="px-3 py-2 placeholder-gray-500 text-billow rounded-md focus:outline-none focus:shadow-outline-blue focus:border-blue-300" />
                <Link to={`/journals/new`}>
                    <button className="px-4 py-2 rounded text-white bg-sheer hover:bg-candy focus:ring-sheer focus:ring-offset-sheer-200 focus:outline-none focus:ring-2 focus:ring-offset-2 transition ease-in-out">Create Journal Entry</button>
                </Link>
                <div className="overflow-y-auto max-h-96">
                    {filteredJournals?.length > 0 ? (
                        <ul className="flex flex-col">
                            {mostRecentJournals?.map((journal, index) => (
                                <li key={index} className="border-b-2 border-billow-100">
                                    <Link to={`/journals/${journal.id}`} className={`py-5 px-4 flex justify-between border-l-4 border-transparent hover:border-smog hover:bg-cloud`}>
                                        <div className="sm:pl-4 pr-8 flex sm:items-center">
                                            <div className="space-y-1">
                                                <p className="text-base text-billow font-bold tracking-wide">{journal.name}</p>
                                                <p className="text-sm text-billow font-medium">{new Date(journal.date_time).toLocaleString()}</p>
                                            </div>
                                        </div>
                                        <div className="pr-4 flex flex-col justify-between items-end">
                                            <button className="px-3 py-1 rounded text-white bg-sheer hover:bg-candy focus:ring-sheer focus:ring-offset-sheer-200 focus:outline-none focus:ring-2 focus:ring-offset-2 transition ease-in-out w-full text-left">
                                                Details
                                            </button>
                                        </div>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-gray-500">No entries found.</p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default JournalList;
