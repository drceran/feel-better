import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCreateJournalMutation } from '../store/journalsAPI';
import ErrorNotification from '../ErrorNotification';
import { useGetTokenQuery } from '../store/usersApi';

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
            if (result.isSuccess) {
                navigate("/journals");
            } else if (result.isError) {
                setError(result.error);
            }
        } catch (err) {
            setError(err);
        }
        if (result.isSuccess) {
            navigate("/journals/");
        };
    };



    return (
        <div>
            {error && <ErrorNotification error={error} />}
            <form onSubmit={handleSubmit}>
                <label>
                    Body:
                    <input type="text" value={body} onChange={(e) => setBody(e.target.value)} required />
                </label>
                <br />
                <label>
                    Name:
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
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

export default JournalForm;
