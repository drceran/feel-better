import React, { useState } from "react";
import {
  useGetResourcesQuery,
  useGetResourceDetailQuery,
  useCreateResourceMutation,
} from "../store/resourcesApi";
import { useParams } from "react-router-dom";

function ResourcesList() {
  const { id } = useParams();
  const { data, isLoading } = useGetResourcesQuery(id);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedResourceId, setSelectedResourceId] = useState(null);
  const { data: resource, isLoading: resourceIsLoading } =
    useGetResourceDetailQuery(selectedResourceId);

  const [isFormVisible, setIsFormVisible] = useState(false);
  const [newResource, setNewResource] = useState({
    title: "",
    writer: "",
    body: "",
    picture: "",
  });

  const [createResource, { isLoading: isCreating }] = useCreateResourceMutation();

  if (isLoading || !data || resourceIsLoading || isCreating) {
    return <progress className="progress is-primary" max="100"></progress>;
  }

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleResourceClick = async (resourceId) => {
    setSelectedResourceId(resourceId);
  };

  const handleFormToggle = () => {
    setIsFormVisible(!isFormVisible);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewResource((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    await createResource(newResource);
    setNewResource({
      title: "",
      writer: "",
      body: "",
      picture: "",
    });
    setIsFormVisible(false);
  };

  const filteredResources = data.filter((resource) => {
    const title = resource.title.toLowerCase();
    const writer = String(resource.writer).toLowerCase();
    const search = searchTerm.toLowerCase();
    return title.includes(search) || writer.includes(search);
  });

  return (
    <div>
      <h2>Resources</h2>
      <input type="text" value={searchTerm} onChange={handleSearchChange} placeholder="Search..." />
      {filteredResources.map((resource) => (
        <div key={resource.id} onClick={() => handleResourceClick(resource.id)}>
          <h3>
            <a href="#" onClick={(e) => e.preventDefault()}> {resource.title} </a>
          </h3>
          <p> Author: {resource.writer} | Posted on: {new Date(resource.posted_date).toLocaleString()}{" "} </p>
          <hr />
        </div>
      ))}
      {resource && (
        <div>
          <h2>Resource Details</h2>
          <h3>{resource.title}</h3>
          <p>Author: {resource.writer}</p>
          <p>{resource.body}</p>
          <img src={resource.picture} alt={resource.title} />
          <p>Posted on: {new Date(resource.posted_date).toLocaleString()}</p>
        </div>
      )}
      {isFormVisible && (
        <form onSubmit={handleFormSubmit}>
          <textarea type="text" name="title" value={newResource.title} onChange={handleInputChange} placeholder="Title" required />
          <textarea type="text" name="writer" value={newResource.writer} onChange={handleInputChange} placeholder="Writer" required/>
          <textarea name="body" value={newResource.body} onChange={handleInputChange} placeholder="Body" required/>
          <textarea type="text" name="picture" value={newResource.picture} onChange={handleInputChange} placeholder="Picture URL" required/>
          <button type="submit">Submit</button>
        </form>
      )}
      <button onClick={handleFormToggle}>Add resource</button>
    </div>
  );
}

export default ResourcesList;
