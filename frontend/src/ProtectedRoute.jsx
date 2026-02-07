import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "./api";

const ProtectedRoute = ({ children }) => {
  const [auth, setAuth] = useState(null);

  useEffect(() => {
    api.get("/todo/get")
      .then(() => setAuth(true))
      .catch(() => setAuth(false));
  }, []);

  if (auth === null) return <p>Loading...</p>;
  return auth ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
