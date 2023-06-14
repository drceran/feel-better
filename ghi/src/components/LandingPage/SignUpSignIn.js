import React, { useState } from "react";
import LoginForm from "../../authorization/LoginForm";
import SignupForm from "../../authorization/SignupForm"

export default function LandingForm() {
    const [content, setContent] = useState(0);
    const back = () => setContent(0);
    let context;

switch (content) {
    case 0:
        context = (
            <>
                <div>
                    <p onClick={() => setContent(1)}>Sign In</p>
                </div>
                <div>
                    <p onClick={() => setContent(2)}>Sign Up</p>
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
        <div>{context}</div>
    </div>
)
}
