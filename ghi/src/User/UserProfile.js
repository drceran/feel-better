import { useGetUserInfoQuery } from "../store/usersApi";
import { useParams } from "react-router";

function UserProfile() {
  const { id } = useParams();
  const { data, error, isLoading } = useGetUserInfoQuery(id);

  console.log(data);

  console.log("able to initiate data");
  if (error) {
    return <div>Error:{error}</div>;
  }
  if (isLoading || !data) {
    return <progress className="progress is-primary" max="100"></progress>;
  }

  console.log(data);

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
