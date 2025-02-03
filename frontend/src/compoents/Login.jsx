import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import "./styles/Login.css";

const Login = () => {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const api = import.meta.env.VITE_API_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${api}/login/`, credentials,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }

      );
      console.log('API URL:', import.meta.env.VITE_API_URL);
      localStorage.setItem("token", response.data.access);
      setError("");
      navigate("/main");
    } catch (error) {
      console.error("Login failed:", error);
      setError("Invalid username or password");
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <div className="login-header">
          <h1 className="login-title">Sign in</h1>
          <p className="login-subtitle">to continue to Medigem</p>
        </div>
        <div className="login-inputs">
          <input
            className="login-input"
            type="text"
            placeholder="Username"
            value={credentials.username}
            onChange={(e) =>
              setCredentials({ ...credentials, username: e.target.value })
            }
          />
          <input
            className="login-input"
            type="password"
            placeholder="Password"
            value={credentials.password}
            onChange={(e) =>
              setCredentials({ ...credentials, password: e.target.value })
            }
          />
        </div>
        {error && <p className="login-error">{error}</p>}
        <button className="login-button" type="submit">
          Sign In
        </button>
      </form>
      <p className="login-signup-prompt">
        Don't have an account?{" "}
        <Link className="login-signup-link" to="/signup">
          Create account
        </Link>
      </p>
    </div>
  );
};

export default Login;