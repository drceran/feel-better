import { Main } from "./Main";
import { AuthProvider } from "@galvanize-inc/jwtdown-for-react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import TitleBar from "./TitleBar";
import SignupForm from "./SignupForm";
import LoginForm from "./LoginForm";

const domain = /https:\/\/[^/]+/;
const basename = process.env.PUBLIC_URL.replace(domain, "");

function App() {
  return (
    <div className="container">
      <BrowserRouter basename={basename}>
        <AuthProvider
          baseUrl={process.env.REACT_APP_SAMPLE_SERVICE_API_HOST}
        >
          <TitleBar />
          <Routes>
            <Route exact path="/" element={<Main />}></Route>
            <Route exact path="/signup" element={<SignupForm />}></Route>
            <Route exact path="/login" element={<LoginForm />}></Route>
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
