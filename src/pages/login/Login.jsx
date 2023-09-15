import React, { useState } from "react";
import "./Login.scss";
import newRequests from "../../utils/newRequest";
import {useNavigate} from "react-router-dom"
function Login() {
  const [username, setusername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate= useNavigate()

  console.log(username, password);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await newRequests.post("/auth/login", { username, password });
      localStorage.setItem("currentUser", JSON.stringify(res.data));
      navigate("/");
      console.log(res.data);
    } catch (err) {
      setError(err.response.data);
      // console.log(err.response.data);
    }
  };

  return (
    <div className="login-container">
      <h2>Login to Fiverr</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">username</label>
          <input
            type="username"
            id="username"
            onChange={(e) => setusername(e.target.value)}
            placeholder="Enter your username"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
          />
        </div>
        <button type="submit" className="login-button">
          Login
        </button>
        {error && error}
      </form>
    </div>
  );
}

export default Login;
