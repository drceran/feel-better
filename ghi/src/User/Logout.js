import { useEffect } from "react";
import { useLogoutMutation } from "../store/usersApi";
import { useNavigate } from "react-router-dom";

function Logout() {
  const [triggerMethodName, { isSuccess, data }] = useLogoutMutation();
  const navigate = useNavigate();

  useEffect(() => {
    triggerMethodName();
  }, []);
  if (isSuccess) {
    navigate("/");
  }

  return (
    <div>
      <h1> Logging out...</h1>
    </div>
  );
}
export default Logout;
