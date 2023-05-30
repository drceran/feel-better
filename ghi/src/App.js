import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import { AuthProvider } from "@galvanize-inc/jwtdown-for-react";
import Nav from "./Nav";
// import Chat from "./Chat";
import { Main } from "./Main";
import TitleBar from "./TitleBar";
import SignupForm from "./User/SignupForm";
import LoginForm from "./User/LoginForm";
import MessagesForm from "./MessageForm";
import MessagesList from "./MessagesList";
import JournalList from "./JournalList";
import JournalForm from "./JournalForm";
import Pricing from "./Pricing";
import MessageDetails from "./MessageDetails";

const domain = /https:\/\/[^/]+/;
const basename = process.env.PUBLIC_URL.replace(domain, "");

function App() {
  return (

    <div className="container">
      <BrowserRouter basename={basename}>
        <Nav />
        <AuthProvider baseUrl={process.env.REACT_APP_SAMPLE_SERVICE_API_HOST}>
          <TitleBar />
          <Routes>
            <Route exact path="/" element={<Main />}></Route>
            {/* <Route path="/chat" element={<Chat />} /> */}
            <Route exact path="/signup" element={<SignupForm />}></Route>
            <Route exact path="/login" element={<LoginForm />}></Route>
            <Route exact path="/messages" element={<MessagesList />}></Route>
            <Route exact path="/messages/new" element={<MessagesForm />}></Route>
            <Route exact path="/journals" element={<JournalList />}></Route>
            <Route exact path="/journals/new" element={<JournalForm />}></Route>
            <Route exact path="/pricing" element={<Pricing />}></Route>
            <Route exact path="/messages/:id" element={<MessageDetails />}></Route>
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
