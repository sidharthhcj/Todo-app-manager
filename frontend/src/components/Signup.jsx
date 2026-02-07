import { MdEmail } from "react-icons/md";
import { PiPasswordFill } from "react-icons/pi";
import { FaUser } from "react-icons/fa";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = async () => {
    try {
      await api.post("/auth/signup", { name, email, password });
      navigate("/login");
    } catch (err) {
      alert(err.response?.data || "Signup failed");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="card bg-base-300 w-96 shadow">
        <div className="card-body">
          <h2 className="card-title justify-center">Signup</h2>

          <label className="input mb-3">
            <FaUser />
            <input placeholder="Name" onChange={(e) => setName(e.target.value)} />
          </label>

          <label className="input mb-3">
            <MdEmail />
            <input placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
          </label>

          <label className="input mb-3">
            <PiPasswordFill />
            <input
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>

          <button className="btn btn-primary" onClick={handleSignup}>
            Signup
          </button>
        </div>
      </div>
    </div>
  );
};

export default Signup;
