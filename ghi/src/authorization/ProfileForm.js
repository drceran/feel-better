import { useEditUserInfoMutation, useGetTokenQuery, useGetUserInfoQuery } from "../store/usersApi";
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { useEffect } from "react";


function ProfileForm() {
  const { data: tokenData, isLoading: isTokenLoading } = useGetTokenQuery();
  const { data: userInfoData, error: userInfoError, isLoading: isUserInfoLoading } = useGetUserInfoQuery(isTokenLoading || !tokenData ? undefined : tokenData.account.id);

  const navigate = useNavigate();
  const [formData, setFormData] = useState(userInfoData || {});

  useEffect(() => {
    setFormData(userInfoData || {});
  }, [userInfoData]);
  const [setError] = useState("");

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
    try {
      await editUSer({ id: tokenData?.account.id, formData });

    } catch (err) {
      setError(err);
    }
  }

  useEffect(() => {
    if (result.isSuccess) {
      navigate("/jotters/");
    }
  }, [result, navigate]);

  if (userInfoError) {
    return <div>Error: {userInfoError}</div>;
  }

  if (isUserInfoLoading || isTokenLoading || !userInfoData) {
    return <progress className="progress is-primary" max="100"></progress>;
  }

  if (result.isError) {
    setError(result.error);
  }
  if (isUserInfoLoading || !userInfoData) {
    return <progress className="progress is-primary" max="100"></progress>;
  }

  if (userInfoData.type === "therapist") {
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
                  value={formData.first_name || ''}
                />
              </div>
              <div>
                <label htmlFor="last_name">Last Name:</label>
                <input
                  onChange={handleFormChange}
                  type="text"
                  id="last_name"
                  name="last_name"
                  value={formData.last_name || ''}
                />
              </div>
              <div>
                <label htmlFor="phone_number">Phone Number:</label>
                <input
                  onChange={handleFormChange}
                  type="text"
                  id="phone_number"
                  name="phone_number"
                  value={formData.phone_number || ''}
                />
              </div>
              <div>
                <label htmlFor="certificates">Certificates:</label>
                <input
                  onChange={handleFormChange}
                  type="text"
                  id="certificates"
                  name="certificates"
                  value={formData.certificates || ''}
                />
              </div>
              <div>
                <label htmlFor="graduated_college">Graduated College:</label>
                <input
                  onChange={handleFormChange}
                  type="text"
                  id="graduated_college"
                  name="graduated_college"
                  value={formData.graduated_college || ''}
                />
              </div>
              <div>
                <label htmlFor="profile_picture">Profile Picture:</label>
                <input
                  onChange={handleFormChange}
                  type="text"
                  id="profile_picture"
                  name="profile_picture"
                  value={formData.profile_picture || ''}
                />
              </div>
              <div>
                <label htmlFor="city">City:</label>
                <input
                  type="text"
                  onChange={handleFormChange}
                  id="city"
                  name="city"
                  value={formData.city || ''}
                />
              </div>
              <div>
                <label htmlFor="state">State:</label>
                <input
                  type="text"
                  onChange={handleFormChange}
                  id="state"
                  name="state"
                  value={formData.state || ''}
                />
              </div>
              <div>
                <label htmlFor="about_me">About Me:</label>
                <textarea
                  onChange={handleFormChange}
                  id="about_me"
                  name="about_me"
                  value={formData.about_me || ''}
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
  } else if (userInfoData.type === "client") {
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
                  value={formData.first_name || ''}
                />
              </div>
              <div>
                <label htmlFor="last_name">Last Name:</label>
                <input
                  onChange={handleFormChange}
                  type="text"
                  id="last_name"
                  name="last_name"
                  value={formData.last_name || ''}
                />
              </div>
              <div>
                <label htmlFor="profile_picture">Profile Picture:</label>
                <input
                  onChange={handleFormChange}
                  type="text"
                  id="profile_picture"
                  name="profile_picture"
                  value={formData.profile_picture || ''}
                />
              </div>
              <div>
                <label htmlFor="about_me">About Me:</label>
                <textarea
                  onChange={handleFormChange}
                  id="about_me"
                  name="about_me"
                  value={formData.about_me || ''}
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


};

export default ProfileForm;
