import React, { useState } from "react";
import {
  useGetResourcesQuery, useGetResourceDetailQuery, useEditResourceMutation,
  useCreateResourceMutation, useDeleteResourceMutation
} from "../../store/resourcesApi";
import { useParams } from "react-router-dom";
import ResourceForm from "../ResourceForm";
import TherapistList from "../TherapistList";
import { useGetTokenQuery } from "../../store/usersApi";


function ResourcesList() {
  // const { id } = useParams();
  const { data } = useGetTokenQuery();
  const { data: resources, isLoading } = useGetResourcesQuery();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedResourceId, setSelectedResourceId] = useState(null);
  const { data: resource, isLoading: resourceIsLoading } = useGetResourceDetailQuery(selectedResourceId);
  const [editResource] = useEditResourceMutation();
  const [deleteResource] = useDeleteResourceMutation();
  const [editMode, setEditMode] = useState(false);
  const [editedResource, setEditedResource] = useState(null);
  const [{ isLoading: isCreating }] = useCreateResourceMutation();

  if (isLoading || !data || resourceIsLoading || isCreating) {
    return <progress className="progress is-primary" max="100"></progress>;
  }

  const handleResourceClick = (id) => {
    setSelectedResourceId(id);
  }

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
    await deleteResource(selectedResourceId);
    setSelectedResourceId(null);
  };

  //search bar
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredResources = resources ? resources.filter(({ title, writer, body }) => {
    const search = searchTerm.toLowerCase();
    return (
      title.toLowerCase().includes(search) ||
      String(writer).toLowerCase().includes(search) ||
      body.toLowerCase().includes(search)
    );
  }) : [];

  if (data && data.access_token && data.account.type === "therapist") {
    return (
      <div>
        <h2>Resources</h2>
        <input type="text" value={searchTerm} onChange={handleSearchChange} placeholder="Search..." />
        {filteredResources.map((resource) => (
          <div key={resource.id}>
            <h3>
              <p href="#" onClick={() => handleResourceClick(resource.id)}> {resource.title}</p>
            </h3>
            <p> Author: {resource.writer} | Posted on: {new Date(resource.posted_date).toLocaleString()}</p>
            {selectedResourceId === resource.id && (
              <div>
                <h2>Resource Details</h2>
                {editMode ? ( //shows a form of what values you can edit
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
                )}
              </div>
            )}
            <hr />
          </div>
        ))}
        <ResourceForm />
        <TherapistList />
      </div>
    );
  } else if (data && data.access_token) {
    return (
      <div>
        <h2>Resources</h2>
        <input type="text" value={searchTerm} onChange={handleSearchChange} placeholder="Search..." />
        {
          filteredResources.map((resource) => (
            <div key={resource.id}>
              <h3>
                <p href="#" onClick={() => handleResourceClick(resource.id)}>{resource.title}</p>
              </h3>
              <p>Author: {resource.writer} | Posted on: {new Date(resource.posted_date).toLocaleString()}</p>
              {selectedResourceId === resource.id && (
                <div>
                  <h3>{resource.title}</h3>
                  <p>Author: {resource.writer}</p>
                  <p>{resource.body}</p>
                  <img src={resource.picture} alt={resource.title} />
                  <p>Posted on: {new Date(resource.posted_date).toLocaleString()}</p>
                </div>
              )}
              <hr />
            </div>
          ))
        }
        <TherapistList />
      </div>
    );
  } else {
    return (
      <div>
        <h2>Resources</h2>
        <input type="text" value={searchTerm} onChange={handleSearchChange} placeholder="Search..." />
        {filteredResources.map((resource) => (
          <div key={resource.id}>
            <h3>
              <p href="#" onClick={() => handleResourceClick(resource.id)}>{resource.title}</p>
            </h3>
            <p>Author: {resource.writer} | Posted on: {new Date(resource.posted_date).toLocaleString()}</p>
            {selectedResourceId === resource.id && (
              <div>
                <h3>{resource.title}</h3>
                <p>Author: {resource.writer}</p>
                <p>{resource.body}</p>
                <img src={resource.picture} alt={resource.title} />
                <p>Posted on: {new Date(resource.posted_date).toLocaleString()}</p>
              </div>
            )}
            <hr />
          </div>
        ))}
      </div>
    );
  }
}

export default ResourcesList;
