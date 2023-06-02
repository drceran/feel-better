import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ErrorNotification from './ErrorNotification';
import { useCreateMessagesMutation } from './store/messagesAPI';

function MessagesForm() {
  const navigate = useNavigate();
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');
  const [cost, setCost] = useState('');
  const [recipient, setRecipient] = useState('');
  const [error, setError] = useState('');

  const [createMessage, result] = useCreateMessagesMutation();

  async function handleSubmit(e) {
    e.preventDefault();
    const datetime = new Date().toISOString();
    try {
      await createMessage({ subject, body, cost, recipient, datetime });
      if (result.isSuccess) {
        navigate('/messages');
      } else if (result.isError) {
        setError(result.error);
      }
    } catch (err) {
      setError(err);
    }
  }

  return (
    <div>
      {error && <ErrorNotification message={error.message} />}
      <form onSubmit={handleSubmit}>
        <label>
          Subject:
          <textarea value={subject} onChange={(e) => setSubject(e.target.value)} required />
        </label>
        <label>
          Body:
          <input type="text" value={body} onChange={(e) => setBody(e.target.value)} required />
        </label>
        <label>
          Cost:
          <input type="text" value={cost} onChange={(e) => setCost(e.target.value)} required />
        </label>
        <label>
          Recipient:
          <input type="text" value={recipient} onChange={(e) => setRecipient(e.target.value)} required />
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default MessagesForm;
