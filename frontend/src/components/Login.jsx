import { MdEmail } from "react-icons/md";
import { PiPasswordFill } from "react-icons/pi";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      await api.post("/auth/login", { email, password });
      navigate("/home");
    } catch (err) {
      setError(err.response?.data || "Login failed");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="card bg-base-300 w-96 shadow">
        <div className="card-body">
          <h2 className="card-title justify-center">Login</h2>

          <label className="input mb-3">
            <MdEmail />
            <input
              type="email"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>

          <label className="input mb-3">
            <PiPasswordFill />
            <input
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>

          <button className="btn btn-primary" onClick={handleLogin}>
            Login
          </button>

          {error && <p className="text-red-500 text-center">{error}</p>}

          <p className="text-center">
            No account? <Link to="/signup" className="link">Signup</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
