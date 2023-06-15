import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
    useEditResourceMutation,
    useDeleteResourceMutation,
    useGetResourceDetailQuery,
} from "../../store/resourcesApi";
import ErrorNotification from "../../ErrorNotification";
import { useGetTokenQuery } from "../../store/usersApi";
import { useParams } from "react-router-dom";
import './resources.css';

export default function UpdateResource() {
    const navigate = useNavigate();
    const { id } = useParams();
    const { data: resource } = useGetResourceDetailQuery(id);
    const { data } = useGetTokenQuery();
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [picture, setPicture] = useState("");
    const [url_link, setUrl] = useState("");
    const [error, setError] = useState("");
    const [editResource, editResult] = useEditResourceMutation(id);
    const [deleteResource, deleteResult] = useDeleteResourceMutation();


    useEffect(() => {
        if (resource) {
            setTitle(resource.title);
            setBody(resource.body);
            setPicture(resource.picture);
            setUrl(resource.url_link);
        }
    }, [resource]);

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            const updatedResource = {
                id: resource.id,
                writer: data.account.id,
                title: title,
                body: body,
                picture: picture,
                url_link: url_link,
            };

            const result = await editResource(updatedResource);

            if (result) {
                navigate("/resources");
            } else if (result) {
                setError(result.error);
                console.log(error, "catch 1st")
            }
        } catch (err) {
            setError(err.message);
        }
    }


    async function handleDelete() {
        try {
            await deleteResource(id);
            navigate("/resources/");
        } catch (err) {
            setError(err);
        }
    }

    // return (
    //     <div className="resource-container">
    //         {error && <ErrorNotification error={error} />}
    //         <form onSubmit={handleSubmit}>
    //             <label>
    //                 Title:
    //                 <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
    //             </label>
    //             <br />
    //             <label>
    //                 Body:
    //                 <input type="text" value={body} onChange={(e) => setBody(e.target.value)} />
    //             </label>
    //             <br />
    //             <label>
    //                 Picture:
    //                 <input type="text" value={picture} onChange={(e) => setPicture(e.target.value)} />
    //             </label>
    //             <br />
    //             <label>
    //                 URL Link:
    //                 <input type="text" value={url_link} onChange={(e) => setUrl(e.target.value)} />
    //             </label>
    //             <button type="submit" disabled={editResult.isLoading}>
    //                 Submit
    //             </button>
    //             <button type="button" onClick={handleDelete} disabled={deleteResult.isLoading}>
    //                 Delete
    //             </button>
    //         </form>
    //     </div>
    // );
    return (
        <div className="resource-container flex items-center justify-center min-h-screen">
            <div className="w-full max-w-lg mx-auto">
                {error && <ErrorNotification error={error} />}
                <form onSubmit={handleSubmit} className="shadow-md rounded px-8 pt-6 pb-8 mb-4">
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
                            Title:
                        </label>
                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="title" type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="body">
                            Body:
                        </label>
                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="body" type="text" value={body} onChange={(e) => setBody(e.target.value)} />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="picture">
                            Picture:
                        </label>
                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="picture" type="text" value={picture} onChange={(e) => setPicture(e.target.value)} />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="url_link">
                            URL Link:
                        </label>
                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="url_link" type="text" value={url_link} onChange={(e) => setUrl(e.target.value)} />
                    </div>
                    <div className="flex items-center justify-between">
                        <button className="bg-[#BEC6C3] hover:bg-green-900 text-[#626670] font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit" disabled={editResult.isLoading}>
                            Submit
                        </button>
                        <button className="bg-[#FCDFCE] hover:bg-red-700 text-[#626670] font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button" onClick={handleDelete} disabled={deleteResult.isLoading}>
                            Delete
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );

}
