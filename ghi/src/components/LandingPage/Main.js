import React, { useState, useEffect } from "react";
import Diaries_Info from "./Diaries";
import Schedule_Info from "./Schedule";
import Resources from "./Resources";
import LoginForm from "../../authorization/LoginForm";
import useToken from "@galvanize-inc/jwtdown-for-react";
import LandingForm from "./SignUpSignIn";
import './index.css';
import 'animate.css';

export default function Main() {
  const { token } = useToken();
  const [content, setContent] = useState(0);
  const [isVisible, setIsVisible] = useState(false);


  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const back = () => setContent(0);
  let context;


  switch (content) {
    case 0:
      context = (
        <>
          <div>
            <h1>Create Personal Diaries</h1>
            <p onClick={() => setContent(1)}>Learn More</p>
          </div>
          <div>
            <h1>Schedule Appointments with Certified Therapists</h1>
            <p onClick={() => setContent(2)}>Learn More</p>
          </div>
          <div>
            <h1>Resources</h1>
            <p onClick={() => setContent(3)}>Learn More</p>
          </div>
        </>
      );
      break;
    case 1:
      context = <Diaries_Info back={back} />;
      break;
    case 2:
      context = <Schedule_Info back={back} />;
      break;
    case 3:
      context = <Resources back={back} />;
      break;
    default:
      return null;
  }

  return (
    <div className="landing-page relative hero-content bg-[#E0D7D3] w-screen h-screen pr-50">
      <video autoPlay muted className="absolute top-0 w-screen h-full object-cover">
        <source src={process.env.PUBLIC_URL + "/static/FullSizeRender.mov"} type="video/mp4" />
      </video>
      <div className="background">
        <div className={`functionalities ${isVisible ? 'animate__animated animate__fadeIn' : ''}`}>{context}</div>
        <div className={`login-form ${isVisible ? 'animate__animated animate__fadeIn' : ''}`}>{!token && <LandingForm />}</div>
        <div className="footer flex items-center justify-center">
          About Us | Contact Us | Privacy Policy
        </div>
      </div>
    </div>
  );
}
