import React, { useState } from "react";

import "./Register.scss";
import upload from "../../utils/upload";
import newRequests from "../../utils/newRequest";
import { useNavigate } from "react-router-dom";

function Register() {
  const [file, setFile] = useState(null);
  const [User, setUser] = useState({
    username: "",
    email: "",
    password: "",
    img: "",
    country: "",
    phonenumber: "",
    desc: "",
    isSeller: false,
  });
  console.log(User);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUser((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleSeller = (e) => {
    setUser((prev) => {
      return { ...prev, isSeller: e.target.checked };
    });
  };



  const handleSubmit = async (e) => {
    e.preventDefault();

    const url = await upload(file);
    try {
      const res = await newRequests.post("/auth/register", {
        ...User,
        img: url,
      });
      console.log(res.data);
      navigate("/login");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="img">Image URL</label>
          <input
            type="file"
            id="img"
            name="img"
            onChange={(e) => setFile(e.target.files[0])}
          />
        </div>
        <div>
          <label htmlFor="country">Country</label>
          <input
            type="text"
            id="country"
            name="country"
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="phonenumber">Phone Number</label>
          <input
            type="text"
            id="phonenumber"
            name="phonenumber"
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="desc">Description</label>
          <textarea id="desc" name="desc" onChange={handleChange} />
        </div>
        <div>
          <label>
            <input type="checkbox" name="isSeller" onChange={handleSeller} />{" "}
            Register as Seller
          </label>
        </div>
        <div>
          <button type="submit">Register</button>
        </div>
      </form>
    </div>
  );
}

export default Register;
