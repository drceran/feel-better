import { useGetTokenQuery, useGetUserInfoQuery } from "../store/usersApi";

function UserProfile() {
  const { data: tokenData, isLoading: isTokenLoading } = useGetTokenQuery();
  const { data: userInfoData, error: userInfoError, isLoading: isUserInfoLoading } = useGetUserInfoQuery(isTokenLoading || !tokenData ? undefined : tokenData.account.id);

  if (userInfoError) {
    console.log("Error:", userInfoError);
  }

  return (
    <div>
      <h1> User Profile</h1>
      <img src={userInfoData?.profile_picture} alt={userInfoData?.first_name} />
      <p>
        Name: {userInfoData?.first_name}
        {userInfoData?.last_name}
      </p>
      <p>About Me: {userInfoData?.about_me}</p>
      <p>Email: {userInfoData?.email}</p>
    </div>
  );
}

export default UserProfile;
