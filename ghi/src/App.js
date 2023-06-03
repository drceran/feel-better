import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import { AuthProvider } from "@galvanize-inc/jwtdown-for-react";
import Nav from "./Nav";
import { Main } from "./Main";
import SignupForm from "./authorization/SignupForm";
import LoginForm from "./authorization/LoginForm";
import MessagesForm from "./MessageForm";
import MessagesList from "./MessagesList";
import JournalList from "./JournalList";
import JournalForm from "./JournalForm";
<<<<<<< HEAD
import UserProfile from "./User/UserProfile";
import Logout from "./User/Logout";
import ProfileForm from "./User/ProfileForm";
=======
import ResourcesList from "./components/ResourcesList";
import ClientsList from "./components/Clientslist";
import AppointmentList from "./components/AppointmentsList";
import ClientList from "./components/AppointmentsList";
import UserProfile from "./authorization/UserProfile";
import Logout from "./authorization/Logout";
import Pricing from "./Pricing";
import MessageDetails from "./MessageDetails";
// import { Spotify } from "./Spotify";
>>>>>>> main

const domain = /https:\/\/[^/]+/;
const basename = process.env.PUBLIC_URL.replace(domain, "");

function App() {
  return (
    <div className="container">
      <BrowserRouter basename={basename}>
        <Nav />
        <AuthProvider baseUrl={process.env.REACT_APP_SAMPLE_SERVICE_API_HOST}>
          <Routes>
<<<<<<< HEAD
            <Route exact path="/" element={<Main />}></Route>
            {/* <Route path="/chat" element={<Chat />} /> */}
            <Route exact path="/signup" element={<SignupForm />}></Route>
            <Route exact path="/login" element={<LoginForm />}></Route>
            <Route exact path="/logout" element={<Logout />}></Route>
            <Route exact path="/journals" element={<JournalList />}></Route>
            <Route exact path="/journals/new" element={<JournalForm />}></Route>
            <Route exact path="/jotters/:id" element={<UserProfile />}></Route>
            <Route
              exact
              path="/editProfile/:id"
              element={<ProfileForm />}
            ></Route>
=======
            <Route exact path="/" element={<Main />} />
            <Route exact path="/signup" element={<SignupForm />} />
            {/* <Route exact path="/login" element={<LoginForm />} /> */}
            <Route exact path="/messages" element={<MessagesList />} />
            <Route exact path="/messages/new" element={<MessagesForm />} />
            <Route exact path="/journals" element={<JournalList />} />
            <Route exact path="/journals/new" element={<JournalForm />} />
            <Route exact path="/pricing" element={<Pricing />} />
            <Route exact path="/messages/:id" element={<MessageDetails />} />
            {/* <Route exact path="/spotify" element={<Spotify />} /> */}
            <Route exact path="/logout" element={<Logout />} />
            <Route exact path="/resources" element={<ResourcesList />}></Route>
            <Route exact path="/jotters" element={<ClientsList />}></Route>
            {/* <Route exact path="/resources/" element={<ResourceForm />}></Route> */}
            <Route exact path="/appointments" element={<AppointmentList/>}></Route>
            <Route exact path="/appointments" element={<ClientList/>}></Route>
            <Route exact path="/jotters/:id" element={<UserProfile />} />
>>>>>>> main
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
