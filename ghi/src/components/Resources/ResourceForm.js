import React, { useState } from "react";
import { useCreateResourceMutation } from "../../store/resourcesApi";
import { useGetTokenQuery } from "../../store/usersApi";
import ErrorNotification from "../../ErrorNotification";
import { useNavigate } from "react-router-dom";
import './resources.css';

export default function ResourceForm() {
    const navigate = useNavigate();
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [picture, setPicture] = useState("");
    const [url_link, setUrl] = useState("");
    const [error, setError] = useState("");

    const [createResource, result] = useCreateResourceMutation();
    const { data } = useGetTokenQuery();

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            const resource = {
                user_id: data.account.id,
                title: title,
                body: body,
                writer: data.account.id,
                picture: picture,
                url_link: url_link,
            };
            const result = await createResource(resource);
            if (result) {
                navigate("/resources");
            } else if (result.isError) {
                setError(result.error);
            }
        } catch (err) {
            setError(err);
            setError(err);
        }
        if (result.isSuccess) {
            navigate("/resources");
        };
    }


    // return (
    //     <div className="resource-container">
    //         {error && <ErrorNotification error={error} />}
    //         <form onSubmit={handleSubmit}>
    //             <label>
    //                 Title: <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
    //             </label>
    //             <br />
    //             <label>
    //                 Body: <input type="text" value={body} onChange={(e) => setBody(e.target.value)} required />
    //             </label>
    //             <br />
    //             <label>
    //                 Picture: <input type="text" value={picture} onChange={(e) => setPicture(e.target.value)} />
    //             </label>
    //             <br />
    //             <label>
    //                 URL: <input type="text" value={url_link} onChange={(e) => setUrl(e.target.value)} required />
    //             </label>
    //             <br />
    //             <button type="submit">
    //                 Post Resource
    //             </button>
    //         </form>
    //     </div>
    // );
    return (
        <div className="resource-container flex items-center justify-center min-h-screen">
            <div className="w-full max-w-md mx-auto">
                {error && <ErrorNotification error={error} />}
                <form onSubmit={handleSubmit} className="shadow-md rounded px-8 pt-6 pb-8 mb-4">
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
                            Title:
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="title"
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="body">
                            Body:
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="body"
                            type="text"
                            value={body}
                            onChange={(e) => setBody(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="picture">
                            Picture:
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="picture"
                            type="text"
                            value={picture}
                            onChange={(e) => setPicture(e.target.value)}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="url_link">
                            URL:
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="url_link"
                            type="text"
                            value={url_link}
                            onChange={(e) => setUrl(e.target.value)}
                            required
                        />
                    </div>
                    <div className="flex items-center justify-center">
                        <button
                            className="bg-[#BEC6C3] hover:bg-green-900 text-[#626670] font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            type="submit"
                        >
                            Post Resource
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );

}
