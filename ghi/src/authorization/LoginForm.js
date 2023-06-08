import { useEffect } from "react";
import { useLoginMutation } from "../store/usersApi";
import { useNavigate } from "react-router-dom";

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
  }, [result.isSuccess, navigate])

  if (result.isError) {
    return "Can't log in.";
  }

  return (
    <div className="card text-bg-light mb-3">
      <h5 className="card-header">Login</h5>
      <div className="card-body">
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" name="email" required />
          </div>
          <div>
            <label htmlFor="password">Password:</label>
            <input type="password" id="password" name="password" required />
          </div>
          <div>
            <input className="btn btn-primary" type="submit" value="Login" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
