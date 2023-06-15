import React, { useState } from "react";
import { useCreateResourceMutation } from "../../store/resourcesApi";
import { useGetTokenQuery } from "../../store/usersApi";
import ErrorNotification from "../../ErrorNotification";
import { useCreateResourceMutation } from "../../store/resourcesApi";
import { useGetTokenQuery } from "../../store/usersApi";
import ErrorNotification from "../../ErrorNotification";
import { useNavigate } from "react-router-dom";


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


    return (
        <div className="form-container">
            {error && <ErrorNotification error={error} />}
            <form onSubmit={handleSubmit}>
                <label>
                    Title: <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
                </label>
                <br />
                <label>
                    Body: <input type="text" value={body} onChange={(e) => setBody(e.target.value)} required />
                </label>
                <br />
                <label>
                    Picture: <input type="text" value={picture} onChange={(e) => setPicture(e.target.value)} />
                </label>
                <br />
                <label>
                    URL: <input type="text" value={url_link} onChange={(e) => setUrl(e.target.value)} required />
                </label>
                <br />
                <button type="submit">
                    Post Resource
                </button>
            </form>
        </div>
    );
}
