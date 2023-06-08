import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ErrorNotification from './ErrorNotification';
import { useCreateMessagesMutation } from './store/messagesAPI';
import { useGetTokenQuery } from './store/usersApi';


function MessagesForm() {
  const navigate = useNavigate();
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');
  const [recipient, setRecipient] = useState('');
  const [error, setError] = useState('');
  const [createMessage, result] = useCreateMessagesMutation();
  const { data } = useGetTokenQuery();
  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const message = {
        user_id: data.account.id,
        subject: subject,
        body: body,
        recipient: recipient,
        datetime: new Date().toISOString(),
      }
      const result = await createMessage(message);
      if (result) {
        navigate("/messages/");
        console.log(result);
      } else if (result.isError) {
        setError(result.error);
        console.log(result.error);
      }
    } catch (err) {
      setError(err);
    }
    if (result.isSuccess) {
      navigate("/messages/");
    };
  };
  return (
    <div>
      {error && <ErrorNotification message={error} />}
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
          Recipient:
          <input type="text" value={recipient} onChange={(e) => setRecipient(e.target.value)} required />
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
export default MessagesForm;
