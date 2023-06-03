import { useEditUserInfoMutation } from "../store/usersApi";
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import ErrorNotification from "../ErrorNotification";
import { useParams } from "react-router-dom";

function ProfileForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    phone_number: "",
    certifications: "",
    graduated_college: "",
    profile_picture: "",
    email: "",
    about_me: "",
  });

  const [error, setError] = useState("");

  const [editUSer, result] = useEditUserInfoMutation();

  const handleFormChange = (e) => {
    const value = e.target.value;
    const inputName = e.target.name;

    setFormData({
      ...formData,
      [inputName]: value,
    });
  };

  async function handleSubmit(e) {
    e.preventDefault();
    editUSer(id, formData);
  }

  return (
    <div className="card text-bg-light mb-3">
      <h5 className="card-header">Please edit your page</h5>
      <div className="card-body"></div>

      <div className="card text-bg-light mb-3">
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="first_name">First Name:</label>
              <input
                onChange={handleFormChange}
                type="text"
                id="first_name"
                name="first_name"
                required
              />
            </div>
            <div>
              <label htmlFor="last_name">Last Name:</label>
              <input
                onChange={handleFormChange}
                type="text"
                id="last_name"
                name="last_name"
                required
              />
            </div>
            <div>
              <label htmlFor="phone_number">Phone Number:</label>
              <input
                onChange={handleFormChange}
                type="text"
                id="phone_number"
                name="phone_number"
                required
              />
            </div>
            <div>
              <label htmlFor="Certificates">Certificates:</label>
              <input
                onChange={handleFormChange}
                type="text"
                id="Certificates"
                name="Certificates"
                required
              />
            </div>
            <div>
              <label htmlFor="Graduated College">Graduated College:</label>
              <input
                onChange={handleFormChange}
                type="text"
                id="Graduated College"
                name="Graduated College"
                required
              />
            </div>
            <div>
              <label htmlFor="Profile Picture">Profile Picture:</label>
              <input
                onChange={handleFormChange}
                type="text"
                id="Profile Picture"
                name="Profile Picture"
                required
              />
            </div>
            <div>
              <label htmlFor="Email">Email:</label>
              <input
                onChange={handleFormChange}
                type="email"
                id="Email"
                name="Email"
                required
              />
            </div>
            <div>
              <label htmlFor="About Me">About Me:</label>
              <textarea
                onChange={handleFormChange}
                id="About Me"
                name="About Me"
                required
              />
            </div>
            <div>
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
                value="Save Changes"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
export default ProfileForm;
