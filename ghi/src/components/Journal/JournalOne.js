import React from "react";
import { Link, useParams } from "react-router-dom";
import { useGetOneJournalQuery } from "../../store/journalsAPI";

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
        <div className="journals-form-div w-screen bg-opacity-0 border border-gray-300 rounded-lg">
            <div className="mx-auto w-7/8 md:w-1/2 max-w-5xl p-6 rounded-lg shadow-lg">
                <div className="flex space-x-4 text-base text-billow font-bold tracking-wide">
                </div>
                <h2 className="text-2xl mt-4 font-semibold text-billow">{journal.name} - {new Date(journal.date_time).toLocaleString()}</h2>
                <p><Link to={`/journals/${id}/edit`} className="text-sheer hover:text-candy underline">Edit</Link></p>
                <div className="p-4 mt-2 bg-gray-100 bg-opacity-50 rounded-md border border-gray-300 overflow-y-auto max-h-96">
                    <p className="text-iron">{journal.body}</p>
                </div>
                <p className="mt-2 text-2xl font-semibold text-billow">Mood: {journal.mood}</p>
            </div>
        </div>

    )
}

export default JournalEntry;
