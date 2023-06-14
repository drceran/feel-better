import React, { useState, useEffect } from "react";
import useToken from "@galvanize-inc/jwtdown-for-react";
import LoginForm from "../../authorization/LoginForm";
import SignupForm from "../../authorization/SignupForm"

export default function LandingForm() {
    const { token } = useToken();
    const [content, setContent] = useState(0);
    const back = () => setContent(0);
    let context;

switch (content) {
    case 0:
        context = (
            <>
                <div>
                    <h1>Sign In</h1>
                    <p onClick={() => setContent(1)}>Sign In</p>
                </div>
                <div>
                    <h1>Sign Up</h1>
                    <p onClick={() => setContent(2)}>Learn More</p>
                </div>
            </>
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
        <LoginForm />
    </div>
)
}
