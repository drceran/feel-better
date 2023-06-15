import { useSignupMutation } from "../store/usersApi";
import { useNavigate } from "react-router-dom";

const SignupForm = ({back}) => {
  const [signup, result] = useSignupMutation();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const dataJson = {};
    formData.forEach((value, key) => (dataJson[key] = value));
    signup(dataJson);
    e.target.reset();
  };

  if (result.isSuccess) {
    navigate("/home");
  }

  return (
    <div style={{ fontFamily: "Short Stack" }} className="w-full ">
      <button style={{fontSize: '10px' }}
        onClick={back}>back</button>
      <form className="shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            className="block text-[#626670] mb-2 text-4xl font-black"
            htmlFor="first_name"
          >
            First Name
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            name="first_name"
            id="first_name"
            type="text"
            placeholder="First Name"
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-[#626670] text-4xl font-black mb-2"
            htmlFor="last_name"
          >
            Last Name
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            name="last_name"
            id="last_name"
            type="text"
            placeholder="Last Name"
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-[#626670] text-4xl font-black mb-2"
            htmlFor="email"
          >
            Email Address
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            name="email"
            id="email"
            type="email"
            placeholder="email@gmail.com"
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-[#626670] text-4xl font-black mb-2"
            htmlFor="type"
          >
            I am a
          </label>
          <select
            name="type"
            id="type"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value="client">Client</option>
            <option value="therapist">Therapist</option>
          </select>
        </div>
        <div className="mb-6">
          <label
            className="block text-[#626670] text-4xl font-black mb-2"
            htmlFor="password"
          >
            Password
          </label>
          <input
            className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            name="password"
            type="password"
            placeholder="******************"
          />
          <p className="text-red-500 text-xs italic">
            Please choose a password.
          </p>
        </div>
        <input type="hidden" name="phone_number" value="000" />
        <input type="hidden" name="city" value="undefined" />
        <input type="hidden" name="state" value="undefined" />
        <input type="hidden" name="balance" value="0" />
        <div className="flex items-center justify-center">
          <button
            className="bg-[#BEC6C3] hover:bg-green-900 text-[#626670] text-5xl font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline text-center"
            type="submit"
          >
            Sign Up
          </button>
        </div>
      </form>
      <p className="text-center text-gray-500 text-xs">
        &copy;2023 Journal Jotters. All rights reserved.
      </p>
    </div>
  );
};

export default SignupForm;
