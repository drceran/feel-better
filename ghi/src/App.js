import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import { AuthProvider } from "@galvanize-inc/jwtdown-for-react";
import Nav from "./Nav";
import Main from "./components/LandingPage/Main";
import SignupForm from "./authorization/SignupForm";
import LoginForm from "./authorization/LoginForm";
import MessagesForm from "./MessageForm";
import MessagesList from "./MessagesList";
import JournalEntry from "./components/Journal/JournalOne";
import JournalList from "./components/Journal/JournalList";
import JournalForm from "./components/Journal/JournalForm";
import ResourcesList from "./components/Resources/ResourcesList";
import ResourceForm from "./components/Resources/ResourceForm";
import AppointmentList from "./components/Appointments/AppointmentList";
import AppointmentForm from "./components/Appointments/AppointmentForm";
import UserProfile from "./authorization/UserProfile";
import Logout from "./authorization/Logout";
import Pricing from "./Pricing";
import MessageDetails from "./MessageDetails";
import JournalFormEdit from "./components/Journal/JournalEdit";
import ProfileForm from "./authorization/ProfileForm";
import MessagesEdit from "./MessagesEdit";
import HomePage from "./HomePage";
import Spotify from "./Spotify";
// import UpdateResource from "./components/UpdateResource";
// import Hamburger_Menu from "./components/LandingPage";

const domain = /https:\/\/[^/]+/;
const basename = process.env.PUBLIC_URL.replace(domain, "");

function App() {
  return (
    <div className="container margin-0">
      <BrowserRouter basename={basename}>
        <Nav />
        <AuthProvider baseUrl={process.env.REACT_APP_SAMPLE_SERVICE_API_HOST}>
          <Routes>
            <Route exact path="/" element={<Main />} />
            <Route exact path="/spotify" element={<Spotify />} />
            <Route exact path="/home" element={<HomePage />} />
            <Route exact path="/signup" element={<SignupForm />} />
            <Route exact path="/login" element={<LoginForm />}></Route>
            <Route exact path="/logout" element={<Logout />}></Route>
            <Route exact path="/jotters/" element={<UserProfile />}></Route>
            <Route exact path="/editProfile/" element={<ProfileForm />}></Route>
            <Route exact path="/messages" element={<MessagesList />} />
            <Route exact path="/messages/new" element={<MessagesForm />} />
            <Route exact path="/messages/:id" element={<MessageDetails />} />
            <Route exact path="/messages/:id/edit" element={< MessagesEdit />} />
            <Route exact path="/journals/:id/edit" element={<JournalFormEdit />} />
            <Route exact path="/journals/:id" element={<JournalEntry />} />
            <Route exact path="/journals" element={<JournalList />} />
            <Route exact path="/journals/new" element={<JournalForm />} />
            <Route exact path="/pricing" element={<Pricing />} />
            <Route exact path="/resources" element={<ResourcesList />}></Route>
            <Route exact path="/resources/create" element={<ResourceForm />}></Route>
            {/* <Route exact path="/resources/:id/edit" element={<UpdateResource />}></Route> */}
            <Route exact path="/appointments" element={<AppointmentList />}></Route>
            <Route exact path="/appointments/create" element={<AppointmentForm />}></Route>
          </Routes >
        </AuthProvider >
      </BrowserRouter >
    </div >
  );
}

export default App;
