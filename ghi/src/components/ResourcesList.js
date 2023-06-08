import React, { useState, useEffect } from "react";
import {
  useGetResourcesQuery
} from "../store/resourcesApi";
import { useNavigate } from "react-router-dom";
import TherapistList from "./TherapistList";
import { useGetTokenQuery } from "../store/usersApi";

function ResourcesList() {
  const { data } = useGetTokenQuery();
  const { data: resources, refetch } = useGetResourcesQuery();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedResourceId, setSelectedResourceId] = useState();
  const navigate = useNavigate();


  useEffect(() => {
    refetch();
  }, [refetch]);


  const handleResourceClick = (id) => {
    setSelectedResourceId(id);
  }


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
            <h3 onClick={() => handleResourceClick(resource.id)}> {resource.title}</h3>
            <p> Author: {resource.writer} | Posted on: {new Date(resource.posted_date).toLocaleString()}</p>
            {selectedResourceId === resource.id && (
              <div>
                <h3>{resource.title}</h3>
                <p>Author: {resource.writer}</p>
                <p>{resource.body}</p>
                <img src={resource.picture} alt={resource.title} />
                <p>Posted on: {new Date(resource.posted_date).toLocaleString()}</p>
                <button onClick={() => navigate(`/resources/${resource.id}/edit`)}>
                  Edit Resource
                </button>
              </div>
            )}
            <hr />
          </div>
        ))}
        <h2 onClick={() => navigate("/resources/create")}>Add A Resource</h2>
        <TherapistList />
      </div>
    );
  } else if (data && data.access_token && data.account.type === "client") {
    return (
      <div>
        <h2>Resources</h2>
        <input type="text" value={searchTerm} onChange={handleSearchChange} placeholder="Search..." />
        {
          filteredResources.map((resource) => (
            <div key={resource.id}>
              <h3 onClick={() => handleResourceClick(resource.id)}>{resource.title}</h3>
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
    )
  }
}
export default ResourcesList;
