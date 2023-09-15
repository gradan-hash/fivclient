import React, { useState } from "react";
import "./Login.scss";
import axios from "axios";
import loginRoute from "../../api/api.js";

function Login() {
  const [username, setusername] = useState("");
  const [password, setPassword] = useState("");
  const [err, setError] = useState(null);

  console.log(username, password);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:4000/api/auth/login", {
        username,
        password,
      });

      console.log(res.data);
    } catch (err) {
      setError(err);
      console.log(err);
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
      </form>
    </div>
  );
}

export default Login;
