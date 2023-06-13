import React, { useState, useEffect } from "react";
import {
  useGetResourcesQuery
} from "../../store/resourcesApi";
import { useNavigate } from "react-router-dom";
import TherapistList from "../TherapistList";
import Carousel from "./ResourceCarousel";
import { useGetTokenQuery, useGetTherapistDetailQuery } from "../../store/usersApi";
import './resources.css';

function Hotline() {
  return (
    <div>
      <h1>Hotlines</h1>
      <h2><a href="https://988lifeline.org/">988 Suicide & Crisis Lifeline:</a> 24/7 Free & Confidential Support Chat & Text</h2>
      <h2><a href="https://www.aa.org/">Alcoholics Anonymous</a></h2>
      <h2><a href="https://www.cdc.gov/hiv/library/hotlines.html">CDC National HIV & AIDS Hotline</a> (800)422-4453</h2>
      <h2><a href="https://www.thehotline.org/">National Domestic Violence Hotline</a> (800)799-7233</h2>
      <h2><a href="https://www.rainn.org/">National Sexual Assault Hotline</a> (800)656-4673</h2>
      <h2><a href="https://www.samhsa.gov/find-help/national-helpline">Substance Abuse & Mental Health Services Administration National Hotline</a> (800)662-4357</h2>
      <h2><a href="https://www.veteranscrisisline.net/">Veterans Crisis Line</a> 988 then press 1</h2>
    </div>
  )
}

function ResourcesList() {
  const { data } = useGetTokenQuery();
  const { data: therapists } = useGetTherapistDetailQuery();
  const { data: resources, refetch } = useGetResourcesQuery();
  const [searchTerm, setSearchTerm] = useState("");
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
      <div className="background-page">
        <div className="content">
        <h1>Resources</h1>
        <input type="text" className="search"value={searchTerm} onChange={handleSearchChange} placeholder="Search..." />
        <Hotline />
        <Carousel />
        {filteredResources.map((resource) => (
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
        <TherapistList />
        </div>
      </div>
    );
  } else if (data && data.access_token && data.account.type === "client") {
    return (
      <div>
        <h2>Resources</h2>
        <input type="text" value={searchTerm} onChange={handleSearchChange} placeholder="Search..." />
        <Hotline />
          {filteredResources.map((resource) => (
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
        <Hotline />
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
          </div>
        ))}
      </div>
    )
  }
}
export default ResourcesList;
