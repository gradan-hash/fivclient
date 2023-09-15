// Register.jsx

import React, { useState } from "react";
import axios from "axios";
import "./Register.scss";

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

  // const upload = async (file) => {
  //   const data = new FormData();
  //   data.append("file", file);
  //   data.append("upload_preset", "fiver");

  //   try {
  //     const res = await axios.post(
  //       "https://api.cloudinary.com/v1_1/drh36px3j/upload",
  //       { data }
  //     );
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("");
      console.log(res.data);
      // Handle successful registration, e.g., redirect to a login page
    } catch (err) {
      console.error(err);
      // Handle registration error
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
