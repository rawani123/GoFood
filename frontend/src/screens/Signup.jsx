import React,{useState} from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signup = () => {

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        location: "",
    });

    const navigate = useNavigate();

    const handelSubmit = async(e) => {
        e.preventDefault();
        const res = await axios.post("http://localhost:5000/api/users/creatuser", formData);
        if(!res.data.success){
            alert(res.data.message);
        }
        else{
            alert("User created successfully");
            setFormData({
                name: "",
                email: "",
                password: "",
                location: "",
            });
            navigate("/login");
        }
    }
  return (
    <div className="container">
      <form className="mt-4" onSubmit={handelSubmit}>
      <div className="mb-3">
          <label className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
          />
        </div>
        <div className="mb-3">
          <label  className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
          />
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className="mb-3">
          <label className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            value={formData.password}
            onChange={(e) => setFormData({...formData, password: e.target.value})}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">
            Location
          </label>
          <input
            type="text"
            className="form-control"
            value={formData.location}
            onChange={(e) => setFormData({...formData, location: e.target.value})}
          />
        </div>
        <button type="submit" className="btn btn-success">
          Submit
        </button>
        <Link to="/login" className="btn btn-danger ms-2">Already a user</Link>
      </form>
    </div>
  );
};

export default Signup;
