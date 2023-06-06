import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useEditJournalMutation, useGetOneJournalQuery } from '../store/journalsAPI';
import ErrorNotification from '../ErrorNotification';
import { useGetTokenQuery } from '../store/usersApi';
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
    const { data } = useGetTokenQuery();


    async function handleSubmit(e) {
        e.preventDefault();

        try {
            setDateTime(journal.date_time);
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
            console.log(result);
            if (result) {
                navigate("/journals/");
            } else if (result.isError) {
                setError(result.error);
            }
        } catch (err) {
            setError(err);
        }
    }



    return (
        <div>
            {error && <ErrorNotification error={error} />}
            <form onSubmit={handleSubmit}>
                <label>
                    Name:
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
                </label>
                <br />
                <label>
                    Body:
                    <input type="text" value={body} onChange={(e) => setBody(e.target.value)} required />
                </label>
                <br />
                <label>
                    Date and Time:
                    <input type="datetime-local" value={dateTime} onChange={(e) => setDateTime(e.target.value)} required />
                </label>
                <br />
                <label>
                    Privacy:
                    <input type="checkbox" checked={privacy} onChange={(e) => setPrivacy(e.target.checked)} />
                </label>
                <br />
                <label>
                    Mood:
                    <input type="text" value={mood} onChange={(e) => setMood(e.target.value)} required />
                </label>
                <br />
                <button type="submit" disabled={result.isLoading}>Submit</button>
            </form>
        </div>
    );
}

export default JournalFormEdit;
