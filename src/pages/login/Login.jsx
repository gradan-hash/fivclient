import React, { useState } from "react";
import "./Login.scss";
import axios from "axios"

function Login() {
  const [username, setusername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
      const res = await axios.post("")
    } catch (error) {
      console.log(error)
      
    }
  };

  return (
    <div className="login-container">
      <h2>Login to Fiverr</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">username</label>
          <input
            type="username"
            id="username"
            value={username}
            onChange={(e) => setusername(e.target.username)}
            placeholder="Enter your email"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
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
