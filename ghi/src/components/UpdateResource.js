import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
    useEditResourceMutation,
    useDeleteResourceMutation,
    useGetResourceDetailQuery,
} from "../store/resourcesApi";
import ErrorNotification from "../ErrorNotification";
import { useGetTokenQuery } from "../store/usersApi";
import { useParams } from "react-router-dom";


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

    return (
        <div>
            {error && <ErrorNotification error={error} />}
            <form onSubmit={handleSubmit}>
                <label>
                    Title:
                    <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
                </label>
                <br />
                <label>
                    Body:
                    <input type="text" value={body} onChange={(e) => setBody(e.target.value)} />
                </label>
                <br />
                <label>
                    Picture:
                    <input type="text" value={picture} onChange={(e) => setPicture(e.target.value)} />
                </label>
                <br />
                <label>
                    URL Link:
                    <input type="text" value={url_link} onChange={(e) => setUrl(e.target.value)} />
                </label>
                <button type="submit" disabled={editResult.isLoading}>
                    Submit
                </button>
                <button type="button" onClick={handleDelete} disabled={deleteResult.isLoading}>
                    Delete
                </button>
            </form>
        </div>
    );
}
