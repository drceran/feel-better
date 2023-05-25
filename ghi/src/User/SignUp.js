import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useToken from "@galvanice-inc/jwtdown-for-react";


const SignUpForm () => {
const [formData, setFormData] = useState ({
  first_name='',
  last_name='',
  email='',
  type=['client', 'therapist'],
  phone_number='',
  city='',
  state='',
  balance=0,
});

const navigate=useNavigate();

const handleSubmit=async (event) =>
{event.preventDefault();
const url=
}

return (<div>
</div>



);

}
export default SignUpForm;
