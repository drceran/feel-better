import LoginForm from "./User/LoginForm";
import useToken from "@galvanize-inc/jwtdown-for-react";

export const Main = () => {
  const { token } = useToken();
  return <div>{!token && <LoginForm />}</div>;
};
