import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useToken from "@galvanize-inc/jwtdown-for-react";

const LoginForm = () => {
  const [username, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { login } = useToken();

  const handleLogin = (event) => {
    event.preventDefault();
    login(username, password);
    event.target.reset();
    navigate("/");
  };

  return (

        <div >
          <h1>Login</h1>
          <form onSubmit={handleLogin}>
            <div>
              <input
                onChange={(event) => setEmail(event.target.value)}
                placeholder="Email"
                required
                type="email"
                name="username"
                id="username"
                className="form-input"
                value={username}
              />
            </div>
            <div>
              <input
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Password"
                required
                type="password"
                name="password"
                id="password"
                className="form-input"
                value={password}
              />
            </div>
            <button>
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
export default LoginForm;
