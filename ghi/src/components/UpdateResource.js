import React, { useState } from "react";
import { useEditResourceMutation, useDeleteResourceMutation } from "../store/resourcesApi";


export default function UpdateResource({ resource, clearSelection }) {
    const [editResource] = useEditResourceMutation();
    const [deleteResource] = useDeleteResourceMutation();
    const [editMode, setEditMode] = useState(false);
    const [editedResource, setEditedResource] = useState(null);

    const handleEditResource = async (e) => {
        e.stopPropagation();
        setEditMode(true); // activates edit mode
        setEditedResource({ ...resource }); // stores the resource being edited
    };

    const handleSaveResource = async (e) => {
        e.stopPropagation();
        if (editedResource) {
            await editResource(editedResource); // saves edited resource
        }
        setEditMode(false);
        setEditedResource(null);
    };

    const handleDeleteResource = async (e) => {
        e.stopPropagation();
        await deleteResource(resource.id);
        clearSelection();
    };

    return editMode ? ( //shows a form of what values you can edit
        <>
            <textarea type="text" value={editedResource.title} onChange={(e
            ) => setEditedResource({ ...editedResource, title: e.target.value })} />
            <textarea value={editedResource.body} onChange={(e
            ) => setEditedResource({ ...editedResource, body: e.target.value })}></textarea>
            <textarea type="text" value={editedResource.picture} onChange={(e
            ) => setEditedResource({ ...editedResource, picture: e.target.value })} />
            <textarea type="text" value={editedResource.url_link} onChange={(e
            ) => setEditedResource({ ...editedResource, url_link: e.target.value })} />
            <button onClick={handleSaveResource}>Save</button>
            <button onClick={handleDeleteResource}>Delete</button>
        </>
    ) : ( // just shows the details of the clicked selected resource
        <>
            <h3>{resource.title}</h3>
            <p>Author: {resource.writer}</p>
            <p>{resource.body}</p>
            <img src={resource.picture} alt={resource.title} />
            <p>Posted on: {new Date(resource.posted_date).toLocaleString()}</p>
            <button onClick={handleEditResource}>Edit Resource</button>
        </>
    )
}
