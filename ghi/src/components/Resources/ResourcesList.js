import React, { useState, useEffect } from "react";
import { useGetResourcesQuery } from "../../store/resourcesApi";
import { useNavigate } from "react-router-dom";
import TherapistList from "../TherapistList";
import Carousel from "./ResourceCarousel";
import { useGetTokenQuery, useGetTherapistDetailQuery } from "../../store/usersApi";
import './resources.css';
import Card from "./HotlineCard";

function ResourcesList() {
  const { data } = useGetTokenQuery();
  const { data: therapists } = useGetTherapistDetailQuery();
  const { data: resources, refetch } = useGetResourcesQuery();
  const [selectedResourceId, setSelectedResourceId] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    refetch();
  }, [refetch]);

  //so the first/last name of the author shows instead of the id
  let writerName;
  if (therapists) {
    const writer = therapists.find(therapist => therapist.id === resources.writer);
    writerName = writer.first_name;
  }

  const handleResourceClick = (id) => {
    setSelectedResourceId(id);
  }

  if (data && data.access_token && data.account.type === "therapist") {
    return (
      <div className="background-page">
        <div className="content">
          <h1>Resources</h1>
          <Card />
          <Carousel />
          {resources && resources.map((resource) => (
            <div key={resource.id}>
              <h3 onClick={() => handleResourceClick(resource.id)}> {resource.title}</h3>
              <p> Author: {writerName} | Posted on: {new Date(resource.posted_date).toLocaleString()}</p>
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
            </div>
          ))}
          <h2 onClick={() => navigate("/resources/create")}>Add A Resource</h2>
        </div>
      </div>
    );
  } else if (data && data.access_token && data.account.type === "client") {
    return (
      <div>
        <h2>Resources</h2>
        <Card />
        {resources && resources.map((resource) => (
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
          </div>
        ))}
        <TherapistList />
      </div>
    );
  } else {
    return (
      <div>
        <h2>Resources</h2>
        <Card />
        {resources && resources.map((resource) => (
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
          </div>
        ))}
      </div>
    )
  }
}

export default ResourcesList;
