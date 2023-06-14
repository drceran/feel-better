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
        <div class="p-6 bg-white rounded-lg shadow-lg">
            <div class="flex space-x-4">
                <p><Link to={`/home/`} class="text-blue-500 hover:text-blue-700 underline">Home</Link></p>
                <p><Link to={`/journals/${id}/edit`} class="text-blue-500 hover:text-blue-700 underline">Edit</Link></p>
            </div>
            <h2 class="text-2xl mt-4 font-semibold text-gray-700">{journal.name} - {new Date(journal.date_time).toLocaleString()}</h2>
            <div class="p-4 mt-2 bg-gray-100 rounded-md border border-gray-200">
                <p class="text-gray-600">{journal.body}</p>
            </div>
            <p class="mt-2 text-gray-500">Mood: {journal.mood}</p>
        </div>

    )
}

export default JournalEntry;
