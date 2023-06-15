import React, { useState, useEffect } from "react";
import { useGetResourcesQuery } from "../../store/resourcesApi";
import { useNavigate } from "react-router-dom";
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
      <div className="resource-container">
        <div className="content">
          <h1 className="page-title">Resources</h1>
          <div className="card-container flex">
            {resources && resources.map((resource) => (
              <div className="resource-card w-1/2 block rounded-sm bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700" key={resource.id}>
                <img className="rounded-t-lg" src={resource.picture} alt={resource.title} />
                <div className="p-6">
                  <h3 className="mb-2 text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50" onClick={() => handleResourceClick(resource.id)}>{resource.title}</h3>
                  <p className="mb-4 text-base text-neutral-600 dark:text-neutral-200">{writerName} | Posted on: {new Date(resource.posted_date).toLocaleString()}</p>
                  <button type="button" className="inline-block rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                    onClick={() => navigate(`/resources/${resource.id}/edit`)}>
                    Edit Resource
                  </button>
                </div>
              </div>
            ))}
          </div>
          <Carousel />
          <h2 className="source-form" onClick={() => navigate("/resources/create")}>Add A Resource</h2>
        </div>
      </div>
    );

  } else if (data && data.access_token && data.account.type === "client") {
    return (
      <div className="resource-container">
        <div className="content">
          <h1 className="page-title">Resources</h1>
          <div className="card-container flex">
            {resources && resources.map((resource) => (
              <div className="resource-card w-1/2 block rounded-sm bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700" key={resource.id}>
                <img className="rounded-t-lg" src={resource.picture} alt={resource.title} />
                <div className="p-6">
                  <h3 className="mb-2 text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50" onClick={() => handleResourceClick(resource.id)}>{resource.title}</h3>
                  <p className="mb-4 text-base text-neutral-600 dark:text-neutral-200">{writerName} | Posted on: {new Date(resource.posted_date).toLocaleString()}</p>
                </div>
              </div>
            ))}
          </div>
          <Carousel />
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <h1 className="page-title">Resources</h1>
        <Card />
        {resources && resources.map((resource) => (
          <div key={resource.id}>
            <h3>
              <p href="#" onClick={() => handleResourceClick(resource.id)}>{resource.title}</p>
            </h3>
            <p>{resource.writer} | Posted on: {new Date(resource.posted_date).toLocaleString()}</p>
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
