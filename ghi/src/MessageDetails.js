import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useGetOneMessageQuery } from './store/messagesAPI';
// import { useGetUserInfoQuery } from './store/usersApi';

function MessageDetails() {
  const { id } = useParams();
  const { data: message, error, isLoading } = useGetOneMessageQuery(id);
  // const { data: userInfo } = useGetUserInfoQuery();

  if (isLoading) {
    return <h1>Loading page...</h1>;
  }

  if (error) {
    return <h1>Error occurred! {error.message}</h1>;
  }

  return (
    <div>
      <div style={{ marginBottom: '10px' }}>
        <button className="bg-sheer hover:bg-sheer text-billow font-bold py-1 px-4 rounded" style={{ backgroundColor: '#BEC6C3' }}>
          <Link to="/home">Home</Link>
        </button>
        {' '}
        <button className="bg-sheer hover:bg-sheer text-billow font-bold py-1 px-4 rounded" style={{ backgroundColor: '#BEC6C3' }}>
          <Link to="/messages">Back to Messages</Link>
        </button>
        {' '}
        <button className="bg-sheer hover:bg-sheer text-billow font-bold py-1 px-4 rounded" style={{ backgroundColor: '#BEC6C3' }}>
          <Link to={`/messages/${id}/edit`}>Edit</Link>
        </button>
      </div>
      <div className="px-4 sm:px-0">
        <h3 className="text-base font-semibold leading-7 text-gray-900">Message Information</h3>
        <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">Personal details and application.</p>
      </div>
      <div className="mt-6 border-t border-gray-100">
        <dl className="divide-y divide-gray-100">
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">Sender name</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{message.user_id}</dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">Subject</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{message.subject}</dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">Time sent</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{message.datetime}</dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">Message</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              {message.body}
            </dd>
          </div>
        </dl>
      </div>
    </div>
  );
}



    // <div>
    //   <div style={{ marginBottom: '10px' }}>
    //     <Link to="/home">Home</Link> {' '}
    //     <Link to="/messages">Back to Messages</Link> {' '}
    //     <Link to={`/messages/${id}/edit`}>Edit</Link>
    //   </div>
//       <h2>{message.subject}</h2>
//       <p>Body: {message.body}</p>
//       <p>Recipient: {message.recipient}</p>
//       <p>Date and Time: {new Date(message.datetime).toLocaleString()}</p>
//     </div>
//   );
// }

export default MessageDetails;
