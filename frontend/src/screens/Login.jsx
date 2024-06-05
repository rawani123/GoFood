import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handelSubmit = async (e) => {
    e.preventDefault();
    const res = await axios.post(
      "http://localhost:5000/api/users/login",
      formData
    );
    if (!res.data.success) {
      alert(res.data.message);
    } else {
      alert("User login successfully");
      setFormData({
        email: "",
        password: "",
      });
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("userEmail", formData.email);
      navigate("/");
    }
  };
  return (
    <div className="container">
      <form className="mt-4" onSubmit={handelSubmit}>
        <div className="mb-3">
          <label className="form-label">Email address</label>
          <input
            type="email"
            className="form-control"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          />
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className="mb-3">
          <label className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
          />
        </div>
        <button type="submit" className="btn btn-success">
          Submit
        </button>
        <Link to="/signup" className="btn btn-danger ms-2">
          Create an account
        </Link>
      </form>
    </div>
  );
};

export default Login;
