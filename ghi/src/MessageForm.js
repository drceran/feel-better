import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ErrorNotification from './ErrorNotification';
import { useCreateMessagesMutation } from './store/messagesAPI';
import { useGetTokenQuery, useGetTherapistsQuery } from './store/usersApi';

function MessagesForm() {
  const { data: getTherapist, isLoading } = useGetTherapistsQuery();
  const navigate = useNavigate();
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');
  const [recipient, setRecipient] = useState('');
  const [error, setError] = useState('');
  const [createMessage, result] = useCreateMessagesMutation();
  const { data } = useGetTokenQuery();

  const therapists = getTherapist?.filter((therapist) => therapist.type === "therapist") || [];

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const message = {
        user_id: data.account.id,
        subject: subject,
        body: body,
        recipient: recipient,
        cost: 1,
        datetime: new Date().toISOString(),
      };
      const result = await createMessage(message);
      if (!result) {
        console.log('some text');
      }
    } catch (err) {
      setError(err);
    }
  }

  useEffect(() => {
    if (result.isSuccess) {
      navigate('/messages/');
    }
  }, [result, navigate]);

  if (result.isError) {
    setError(result.error);
  }

  if (isLoading) {
    return <progress className="progress is-primary" max="100">Loading therapists</progress>;
  }

  return (
    <div className="max-w-md mx-auto">
      {error && <ErrorNotification message={error} />}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="subject" className="block mb-1">
            Subject:
          </label>
          <textarea
            id="subject"
            className="w-full p-2 border border-gray-300 rounded"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="body" className="block mb-1">
            Body:
          </label>
          <input
            type="text"
            id="body"
            className="w-full p-2 border border-gray-300 rounded"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="recipient" className="block mb-1">
            Recipient:
          </label>
          <select
            id="recipient"
            className="w-full p-2 border border-gray-300 rounded"
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
            required
          >
            <option value="">Select a recipient</option>
            {therapists.map((therapist) => (
              <option key={therapist.id} value={therapist.id}>
                {therapist.first_name} {therapist.last_name}
              </option>
            ))}
          </select>
        </div>
        <button className="bg-sheer hover:bg-sheer text-billow font-bold py-1 px-4 rounded" style={{ backgroundColor: '#BEC6C3', color: '#626670' }}>
          Submit
        </button>
      </form>
    </div>
  );
}

export default MessagesForm;
