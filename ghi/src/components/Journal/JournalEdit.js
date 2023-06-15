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
        <div className="journals-form-div w-screen bg-opacity-0 border border-gray-300 rounded-lg ">
            {error && <ErrorNotification error={error} />}
            <h2 className="text-2xl font-semibold text-billow">Edit Entry</h2>
            <form onSubmit={handleSubmit} className="journal-form space-y-4 bg-opacity-0 border border-gray-300 rounded-lg p-4 w-3/4 md:w-1/2">
                <label className="block text-base text-billow font-bold tracking-wide">
                    <span>Name:</span>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)}
                        required className="mt-1 block w-full bg-gray-100 bg-opacity-50 px-3 py-2 placeholder-billow-500 rounded-md focus:outline-none focus:border-blue-300"
                        placeholder='Your Name' />
                </label>
                <label className="block text-base text-billow font-bold tracking-wide">
                    <span>Body:</span>
                    <textarea value={body} onChange={(e) => setBody(e.target.value)} required className="peer block min-h-[auto] w-full rounded border-0 bg-gray-100 bg-opacity-50 px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-billow-200 dark:placeholder:text-billow-200"
                        id="exampleFormControlTextarea1"
                        rows="7"
                        placeholder="Your Entry"></textarea>
                </label>
                <div className="flex justify-between space-x-4">
                    <label className="block text-base text-billow font-bold tracking-wide">
                        <span>Date and Time:</span>
                        <input type="datetime-local" value={dateTime} onChange={(e) => setDateTime(e.target.value)} required className="mt-1 block w-full px-3 py-2 bg-gray-100 bg-opacity-50 placeholder-gray-500 rounded-md focus:outline-none focus:border-blue-300" />
                    </label>
                    <label className="block text-base text-billow font-bold tracking-wide">
                        <span>Privacy:</span>
                        <input type="checkbox" checked={privacy} onChange={(e) => setPrivacy(e.target.checked)} className="mt-1 block h-6 w-6 text-indigo-600 transition duration-150 ease-in-out" />
                    </label>
                    <label className="block text-base text-billow font-bold tracking-wide">
                        <span>Mood:</span>
                        <select value={mood} onChange={(e) => setMood(e.target.value)} required className="mt-1 block w-full pl-3 pr-10 py-2 bg-gray-100 bg-opacity-50 text-base rounded-md focus:outline-none focus:border-blue-300">
                            {options.map((option, index) =>
                                <option key={index} value={option}>{option}</option>
                            )}
                        </select>
                    </label>
                </div>
                <div className="flex justify-between">
                    <button type="submit" disabled={result.isLoading} className="px-4 py-2 rounded-full text-white bg-smog hover:bg-sheer focus:ring-smog focus:ring-offset-smog-200 focus:outline-none focus:ring-2 focus:ring-offset-2 transition ease-in-out">Submit</button>
                    <button type="button" onClick={handleDelete} disabled={deleteResult.isLoading} className="px-4 py-2 rounded-full text-white bg-smog hover:bg-sheer focus:ring-smog focus:ring-offset-smog-200 focus:outline-none focus:ring-2 focus:ring-offset-2 transition ease-in-out">Delete</button>
                </div>
            </form>
        </div>
    );
}

export default JournalFormEdit;


