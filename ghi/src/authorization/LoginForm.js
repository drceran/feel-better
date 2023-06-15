import { useLoginMutation } from "../store/usersApi";
import { useNavigate } from "react-router-dom";
import React, { useEffect } from "react";


const LoginForm = () => {
  const [login, result] = useLoginMutation();
  const navigate = useNavigate();


  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const email = formData.get("email");
    const password = formData.get("password");

    login({ email, password });

    e.target.reset();
  };

  useEffect(() => {
    if (result.isSuccess) {
      navigate("/home");
    }
  }, [result.isSuccess, navigate]);

  if (result.isError) {
    return "Can't log in.";
  }


  return (
    <div className="w-full h-full">
      <form className="shadow-md rounded px-8 pt-6 pb-8 mb-4 h-full flex flex-col justify-between" onSubmit={handleSubmit}>
        <div className="mb-4">
          <label style={{ fontFamily: "Short Stack, cursive", fontSize: '2rem', fontWeight: '900' }} className="block text-[#626670] text-md font-reg mb-2 text-center" htmlFor="email">
            Email
          </label>
          <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="email" name="email" type="email" required />
        </div>
        <div className="mb-6">
          <label style={{ fontFamily: "Short Stack, cursive", fontSize: '2rem', fontWeight: '900' }} className="block text-[#626670] text-md font-reg mb-2 text-center" htmlFor="password">
            Password
          </label>
          <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" name="password" type="password" required />
        </div>
        <div className="flex items-center justify-center">
          <input style={{ fontFamily: "Short Stack, cursive", fontSize: '2rem' }} className="bg-[#BEC6C3] hover:bg-green-900 text-[#626670] font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline cursor-pointer" type="submit" value="Login" />
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
