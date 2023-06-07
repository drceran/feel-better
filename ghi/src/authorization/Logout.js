import { useEffect } from "react";
import { useLogoutMutation, usersApi } from "../store/usersApi";
import { useLogoutMutation, usersApi } from "../store/usersApi";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../store/authSlice";

function Logout() {
  const [logOut, { isSuccess, data }] = useLogoutMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    logOut();
  }, [logOut]);

  useEffect(() => {
    if (data) {
      dispatch(logout());
      dispatch(usersApi.util.resetApiState());
    }
  }, [data, dispatch]);

  if (isSuccess) {
    navigate("/ ");
  }

  return (
    <div>
      <h1> Logging out...</h1>
    </div>
  );
}
export default Logout;
