import { useCreateUserMutation } from "./store/usersApi";
import { useNavigate, userNavigate } from 'react-router-dom'

const LoginForm = () => {
    const [createUser, result] = useCreateUserMutation
    const navigate = useNavigate();


    const handleSubmit = (e) => {
        e.preventDefault();
        createUser()
        e.target.reset();
    };

    if (result.isSuccess) {
        navigate("/home");
    } else if (result.isError){
        return "Can't log in."
    }

return (
    <div className="card text-bg-light mb-3">
    <h5 className="card-header">Login</h5>
    <div className="card-body">
        <div>
        <input className="btn btn-primary" type="submit" value="Login" />
        </div>
    </div>
    </div>
);
};

export default LoginForm;
