import React, { useState, useEffect } from "react";
import DiariesInfo from "./Diaries";
import ScheduleInfo from "./Schedule";
import Resources from "./Resources";
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
        <div style = {{ fontFamily: "Short Stack, cursive" }}>
          <div>
            <h1 style={{fontSize: '32px'}}>Create Personal Diaries</h1>
            <p style={{fontSize: '20px' }} onClick={() => setContent(1)}>Learn More</p>
          </div>
          <div>
            <h1 style={{fontSize: '32px' }}>Schedule Appointments
            <br></br>with Certified Therapists</h1>
            <p style={{fontSize: '20px' }} onClick={() => setContent(2)}>Learn More</p>
          </div>
          <div>
            <h1 style={{fontSize: '32px' }}>Resources</h1>
            <p style={{fontSize: '20px' }} onClick={() => setContent(3)}>Learn More</p>
          </div>
        </div>
      );
      break;
    case 1:
      context = <DiariesInfo back={back} />;
      break;
    case 2:
      context = <ScheduleInfo back={back} />;
      break;
    case 3:
      context = <Resources back={back} />;
      break;
    default:
      return null;
  }

  return (
    <div className="landing-page overflow-hidden relative hero-content bg-[#E0D7D3] w-screen h-screen">
      <video autoPlay muted className="absolute top-0 left-0 w-screen h-full">
        <source src={process.env.PUBLIC_URL + "/static/FullSizeRender.mov"} type="video/mp4" />
      </video>
      <div className="background flex:0 0 auto">
        <div className={`functionalities ${isVisible ? 'animate__animated animate__fadeIn' : ''}`}>{context}</div>
        <div className={`login-form ${isVisible ? 'animate__animated animate__fadeIn' : ''}`}>{!token && <LandingForm />}</div>
        <div className="footer flex items-center justify-center">
          About Us | Contact Us | Privacy Policy
        </div>
      </div>
    </div>
  );
}
