import React, { useContext, useEffect, useState } from "react";
import "./Login.css";
import { toast } from "react-toastify";
import axios from "axios";
import { StoreContext } from "../../context/StoreContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  // Defining the local URL here for Option A
  const url = "http://localhost:4000"; 
  
  const { admin, setAdmin, token, setToken } = useContext(StoreContext);
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };

  const onLogin = async (event) => {
    event.preventDefault();

    try {
      // Corrected syntax: Using the local url variable
      const response = await axios.post(url + "/api/admin/login", data);

      if (response.data.success) {
        setToken(response.data.token);
        setAdmin(true);
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("admin", "true"); 
        
        toast.success("Login Successfully");
        navigate("/add");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Login Error:", error);
      if (error.response) {
        toast.error(error.response.data.message || "Login Failed");
      } else {
        toast.error("Server connection failed. Is your backend running locally?");
      }
    }
  };

  useEffect(() => {
    if (admin && token) {
      navigate("/add");
    }
  }, [admin, token, navigate]);

  return (
    <div className="login-popup">
      <form onSubmit={onLogin} className="login-popup-container">
        <div className="login-popup-title">
          <h2>Login</h2>
        </div>
        <div className="login-popup-inputs">
          <input
            name="email"
            onChange={onChangeHandler}
            value={data.email}
            type="email"
            placeholder="Your email"
            required
          />
          <input
            name="password"
            onChange={onChangeHandler}
            value={data.password}
            type="password"
            placeholder="Your password"
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;