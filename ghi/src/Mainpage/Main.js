// import LoginForm from "../authorization/LoginForm";
// import useToken from "@galvanize-inc/jwtdown-for-react";
import MainpageFooter from "./MainpageFooter";
import MainPageCover from "./MainPageCover";


function Main() {
  return (
    <>
      <div>
        <MainPageCover />
        <MainPageArticles />
        <MainpageFooter />
      </div>
    </>
  );
}
export default Main;


// export const Main = () => {
//   const { token } = useToken();
//   return <div>{!token && <LoginForm />}</div>;
// };
