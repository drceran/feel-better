import { useGetUserInfoQuery } from "../store/usersApi";
import { useParams } from "react-router";
import { useNavigate } from "react-router-dom";

function UserProfile() {
  const { id } = useParams();
  const { data, error, isLoading } = useGetUserInfoQuery(id);

  if (error) {
    return <div>Error:{error}</div>;
  }
  if (isLoading || !data) {
    return <progress className="progress is-primary" max="100"></progress>;
  }

  return (
    <div>
      <h1> User Profile</h1>
      <img src={data.profile_picture} alt={data.first_name} />
      <p>
        Name: {data.first_name}
        {data.last_name}
      </p>
      <p>About Me:{data.about_me} </p>
      <p>Email: {data.email}</p>
    </div>
  );
}
export default UserProfile;
