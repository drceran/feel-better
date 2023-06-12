import LoginForm from "../../authorization/LoginForm";
import useToken from "@galvanize-inc/jwtdown-for-react";
import React, { useState } from "react";
import Diaries_Info from "./Diaries";
import Schedule_Info from "./Schedule";
import Resources from "./Resources";
import './index.css';


export default function Main() {
  const { token } = useToken();
  const [content, setContent] = useState(0)
  const back = () => setContent(0)
  let context;

  switch (content) {
    case 0:
      context = (
        <>
          <div>
            <h1>Create Personal Diaries</h1>
            <p
              onClick={() => setContent(1)}>Learn More</p>
          </div>
          <div>
            <h1>Schedule Appointments with Certified Therapists</h1>
            <p
              onClick={() => setContent(2)}>Learn More</p>
          </div>
          <div>
            <h1>Resources</h1>
            <p
              onClick={() => setContent(3)}>Learn More</p>
          </div>
        </>
      )
      break;
      case 1:
        context = (
          <Diaries_Info
          back={back}
          />
          )
          break;
          case 2:
            context = (
              <Schedule_Info
              back={back}
              />
              )
              break;
              case 3:
                context = (
                  <Resources
                  back={back}
                  />
                  )
                  break;
                  default:
                    return null
                  }

  return (
    <div className='background'>
      <div className='functionalities'>{context}</div>
      <div className="login-form">{!token && <LoginForm />}</div>
      <div className="footer flex items-center justify-center">About Us | Contact Us | Privacy Policy </div>
    </div>
  )

}
