import React, { useState } from "react";
import LoginForm from "../../authorization/LoginForm";
import SignupForm from "../../authorization/SignupForm"
import './index.css'



export default function LandingForm() {
    const [content, setContent] = useState(0);
    const back = () => setContent(0);
    let context;

switch (content) {
    case 0:
        context = (
            <div style={{ fontFamily: "Short Stack, cursive", display: "flex", flexDirection: "column", alignItems: "center", height: "75%"}}>
                <div className="signup-nav">
                    <p>Sign In</p> |
                    <p style={{ marginLeft: "8px" }} onClick={() => setContent(2)}>Sign Up</p>
                </div>
                <LoginForm />
            </div>
        );
        break;
    case 1:
        context = <LoginForm back={back} />;
        break;
    case 2:
        context = <SignupForm back={back} />
        break;
    default:
        return null;
}

return(
    <div className="landing-form">
        <div className="signup-logo">Journal Jotter</div>
        <img className="mx-auto h-1/6 w-1/6" src={process.env.PUBLIC_URL + "/static/JournalJotter.svg"} alt=""/>
        {context}
    </div>
)
}
