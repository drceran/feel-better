import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ErrorNotification from './ErrorNotification';
import { useCreateMessagesMutation } from './store/messagesAPI';

function MessagesForm() {
  const navigate = useNavigate();
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');
  const [cost, setCost] = useState('');
  const [sender, setSender] = useState('');
  const [recipient, setRecipient] = useState('');
  const [date_time, setDateTime] = useState('');
  const [error, setError] = useState('');

  const [createMessage, result] = useCreateMessagesMutation();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await createMessage({ body, cost, sender, recipient, date_time });
    } catch (err) {
      setError(err);
    }
  }

  if (result.isSuccess) {
    navigate('/messages');
  } else if (result.isError) {
    setError(result.error);
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
          Sender:
          <input type="text" value={sender} onChange={(e) => setSender(e.target.value)} required />
        </label>
        <label>
          Recipient:
          <input type="text" value={recipient} onChange={(e) => setRecipient(e.target.value)} required />
        </label>
        <label>
          Date/Time:
          <input type="datetime-local" value={date_time} onChange={(e) => setDateTime(e.target.value)} required />
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default MessagesForm;


// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import ErrorNotification from './ErrorNotification';
// import { useCreateMessagesMutation } from './store/messagesAPI';

// function MessagesForm() {
//   const navigate = useNavigate();
//   const [subject, setSubject] = useState('');
//   const [body, setBody] = useState('');
//   const [cost, setCost] = useState('');
//   const [sender, setSender] = useState('');
//   const [recipient, setRecipient] = useState('');
//   const [date_time, setDateTime] = useState('');
//   const [error, setError] = useState('');

//   const [createMessage, result] = useCreateMessagesMutation();

//   async function handleSubmit(e) {
//     e.preventDefault();
//     try {
//       await createMessage({ body, cost, sender, recipient, date_time });
//     } catch (err) {
//       setError(err);
//     }
//   }

//   if (result.isSuccess) {
//     navigate('/messages');
//   } else if (result.isError) {
//     setError(result.error);
//   }

//     return (
//         <div>
//             {error && <ErrorNotification message={error.message} />}
//             <form onSubmit={handleSubmit}>
//                 <label>
//                     Subject:
//                     <textarea value={subject} onChange={e => setSubject(e.target.value)} required/>
//                 </label>
//                 <label>
//                     Body:
//                     <textarea value={body} onChange={e => setBody(e.target.value)} required/>
//                 </label>
//                 <label>
//                     Cost:
//                     <textarea value={cost} onChange={e => setCost(e.target.value)} required/>
//                 </label>
//                 <label>
//                     Sender:
//                     <textarea value={sender} onChange={e => setSender(e.target.value)} required/>
//                 </label>
//                 <label>
//                     Recipient:
//                     <textarea value={recipient} onChange={e => setRecipient(e.target.value)} required/>
//                 </label>
//                 <label>
//                     Date/Time:
//                     <textarea value={date_time} onChange={e => setDateTime(e.target.value)} required/>
//                 </label>
//                 <button type="submit">Submit</button>
//             </form>
//         </div>
//     );
// }

// export default MessagesForm;
