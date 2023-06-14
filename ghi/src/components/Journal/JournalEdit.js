import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useEditJournalMutation, useDeleteJournalMutation, useGetOneJournalQuery } from '../../store/journalsAPI';
import ErrorNotification from '../../ErrorNotification';
import { useGetTokenQuery } from '../../store/usersApi';
import { useParams } from 'react-router-dom';

function JournalFormEdit() {
    const navigate = useNavigate();
    const [body, setBody] = useState('');
    const [name, setName] = useState('');
    const [dateTime, setDateTime] = useState('');
    const [privacy, setPrivacy] = useState(false);
    const [mood, setMood] = useState('');
    const [error, setError] = useState('');
    const { id } = useParams();

    const { data: journal } = useGetOneJournalQuery(id);
    const options = [
        "happy",
        "sad",
        "angry",
        "anxious",
        "neutral",
        "ambitious",
        "carefree",
    ]

    useEffect(() => {
        let dateObj = new Date(journal.date_time);
        let formattedDateStr = dateObj.toISOString().slice(0, 16);

        if (journal) {
            setBody(journal.body);
            setName(journal.name);
            setDateTime(formattedDateStr);
            setPrivacy(journal.is_private);
            setMood(journal.mood);
        }
    }, [journal]);

    const [editJournal, result] = useEditJournalMutation(id);
    const [deleteJournal, deleteResult] = useDeleteJournalMutation();
    const { data } = useGetTokenQuery();


    async function handleSubmit(e) {
        e.preventDefault();

        try {
            setDateTime(journal?.date_time);
            setDateTime(journal?.date_time);
            const journ = {
                user_id: data.account.id,
                id: parseInt(id),
                body: body,
                name: name,
                date_time: dateTime,
                is_private: privacy,
                mood: mood
            }
            const result = await editJournal(journ);


            if (result) {
                navigate("/journals/");
            } else if (result.isError) {
                setError(result.error);
            }
        } catch (err) {
            setError(err);
        }

    }
    async function handleDelete() {
        try {
            const result = await deleteJournal(id);
            if (result) {
                navigate("/journals/");
            } else if (deleteResult.isError) {
                setError(deleteResult.error);
            }
        } catch (err) {
            setError(err);
        }

    }



    return (
        <div class="p-6 bg-white rounded-lg shadow-lg space-y-6">
            {error && <ErrorNotification error={error} />}
            <form onSubmit={handleSubmit} class="space-y-4">
                <label class="block">
                    <span class="text-gray-700">Name:</span>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} required class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
                </label>
                <label class="block">
                    <span class="text-gray-700">Body:</span>
                    <input type="text" value={body} onChange={(e) => setBody(e.target.value)} required class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
                </label>
                <label class="block">
                    <span class="text-gray-700">Date and Time:</span>
                    <input type="datetime-local" value={dateTime} onChange={(e) => setDateTime(e.target.value)} required class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
                </label>
                <label class="block">
                    <span class="text-gray-700">Privacy:</span>
                    <input type="checkbox" checked={privacy} onChange={(e) => setPrivacy(e.target.checked)} class="mt-1 block h-6 w-6 text-indigo-600 transition duration-150 ease-in-out" />
                </label>
                <label class="block">
                    <span class="text-gray-700">Mood:</span>
                    <select value={mood} onChange={(e) => setMood(e.target.value)} required class="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
                        {options.map((option, index) =>
                            <option key={index} value={option}>{option}</option>
                        )}
                    </select>
                </label>
                <div class="flex justify-between">
                    <button type="submit" disabled={result.isLoading} class="px-4 py-2 rounded text-white bg-indigo-500 hover:bg-indigo-600 focus:ring-indigo-500 focus:ring-offset-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 transition ease-in-out">Submit</button>
                    <button type="button" onClick={handleDelete} disabled={deleteResult.isLoading} class="px-4 py-2 rounded text-white bg-red-500 hover:bg-red-600 focus:ring-red-500 focus:ring-offset-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 transition ease-in-out">Delete</button>
                </div>
            </form>
        </div>

    );
}

export default JournalFormEdit;
