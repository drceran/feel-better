import useToken from "@galvanize-inc/jwtdown-for-react";
import { useNavigate } from "react-router-dom";

const TitleBar = () => {
  const { logout } = useToken();
  const navigate = useNavigate();
  const handleClick = () => navigate("/signup");


  return (
    <div className="mt-3">
        <div className="btn-group mb-3" role="group">
        <button className="btn btn-danger" onClick={logout}>
            Logout <i className="bi bi-box-arrow-left"></i>
        </button>

        <button
            type="button"
            className="btn btn-success"
            onClick={handleClick}
        >
            Signup <i className="bi bi-person-plus"></i>
        </button>
        </div>
    </div>
  );
};

export default TitleBar;
