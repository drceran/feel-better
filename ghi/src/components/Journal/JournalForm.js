import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCreateJournalMutation } from '../../store/journalsAPI';
import ErrorNotification from '../../ErrorNotification';
import { useGetTokenQuery } from '../../store/usersApi';

function JournalForm() {
    const navigate = useNavigate();
    const [body, setBody] = useState('');
    const [name, setName] = useState('');
    const [dateTime, setDateTime] = useState('');
    const [privacy, setPrivacy] = useState(false);
    const [mood, setMood] = useState('');
    const [error, setError] = useState('');

    const [createJournal, result] = useCreateJournalMutation();
    const { data } = useGetTokenQuery();

    const options = [
        "choose",
        "happy",
        "sad",
        "angry",
        "anxious",
        "neutral",
        "ambitious",
        "carefree",
    ]

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            const journ = {
                user_id: data.account.id,
                body: body, name: name,
                date_time: dateTime,
                is_private: privacy,
                mood: mood
            }
            const result = await createJournal(journ);
            if (result) {
                navigate("/journals/");

            } else if (result.isError) {
                setError(result.error);
                console.log(result.error);
            }
        } catch (err) {
            setError(err);
        }
        if (result.isSuccess) {
            navigate("/journals/");
        };
    };



    return (
        <div class="p-6 bg-white rounded-lg shadow-lg space-y-6">
            {error && <ErrorNotification error={error} />}
            <form onSubmit={handleSubmit} class="space-y-4">
                <label class="block">
                    <span class="text-gray-700">Title:</span>
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
                <button type="submit" disabled={result.isLoading} class="px-4 py-2 rounded text-white bg-indigo-500 hover:bg-indigo-600 focus:ring-indigo-500 focus:ring-offset-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 transition ease-in-out">Submit</button>
            </form>
        </div>

    );
}

export default JournalForm;
