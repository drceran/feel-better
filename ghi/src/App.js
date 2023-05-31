import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import ErrorNotification from "./ErrorNotification";
import "./App.css";
import { AuthProvider } from "@galvanize-inc/jwtdown-for-react";
import { Main } from "./Main";
import SignupForm from "./User/SignupForm";
import LoginForm from "./User/LoginForm";
import JournalList from "./JournalList";
import Nav from "./Nav";
import JournalForm from "./JournalForm";
import UserProfile from "./User/UserProfile";
import Logout from "./User/Logout";

const domain = /https:\/\/[^/]+/;
const basename = process.env.PUBLIC_URL.replace(domain, "");

function App() {
  return (
    <div className="container">
      <BrowserRouter basename={basename}>
        <Nav />
        <AuthProvider baseUrl={process.env.REACT_APP_SAMPLE_SERVICE_API_HOST}>
          <Routes>
            <Route exact path="/" element={<Main />}></Route>
            {/* <Route path="/chat" element={<Chat />} /> */}
            <Route exact path="/signup" element={<SignupForm />}></Route>
            <Route exact path="/login" element={<LoginForm />}></Route>
            <Route exact path="/logout" element={<Logout />}></Route>
            <Route exact path="/journals" element={<JournalList />}></Route>
            <Route exact path="/journals/new" element={<JournalForm />}></Route>
            <Route exact path="/jotters/:id" element={<UserProfile />}></Route>
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
