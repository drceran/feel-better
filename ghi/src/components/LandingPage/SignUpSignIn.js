import React, { useState } from "react";
import LoginForm from "../../authorization/LoginForm";
import SignupForm from "../../authorization/SignupForm"
import './index.css'
// import "../../../public/static/JournalJotter.svg"

export default function LandingForm() {
    const [content, setContent] = useState(0);
    const back = () => setContent(0);
    let context;

switch (content) {
    case 0:
        context = (
            <div style={{ fontFamily: "Short Stack, cursive", display: "flex", flexDirection: "column", alignItems: "center", height: "100%"}}>
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
        <div className="signup-logo">Journal</div>
        <div className="signup-logo">Jotter</div>
        {/* <img src="../../../public/static/Journal Jotter.svg" alt="logo"></img> */}
        {context}
    </div>
)
}
