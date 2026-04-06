import React, { useState, useContext } from "react";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";
import { toast } from "react-toastify";
import './LoginPopup.css';

const LoginPopup = ({ setShowLogin }) => {
  const { url, setToken, loadCartData } = useContext(StoreContext);
  
  // 1. ADD THIS BACK: To track if we are Logging in or Signing Up
  const [currentState, setCurrentState] = useState("Login");
  
  // 2. USE A SINGLE DATA OBJECT (Cleaner than separate states)
  const [data, setData] = useState({
    name: "",
    email: "",
    password: ""
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData(data => ({ ...data, [name]: value }));
  };

  const onLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    // 3. DYNAMIC URL: Choose endpoint based on state
    let newUrl = url;
    if (currentState === "Login") {
      newUrl += "/api/user/login";
    } else {
      newUrl += "/api/user/register";
    }

    try {
      const response = await axios.post(newUrl, data);

      if (response.data.success) {
        toast.success(`${currentState} successful!`);
        const token = response.data.token;
        setToken(token);
        localStorage.setItem("token", token);
        if (loadCartData) await loadCartData(token);
        setShowLogin(false);
      } else {
        toast.error(response.data.message || "Action failed");
      }
    } catch (err) {
      toast.error("Cannot reach server. Check your connection.");
    } finally {
      setLoading(false);
    }
  };

  const [loading, setLoading] = useState(false);

  return (
    <div className="login-popup">
      <div className="login-popup-container">
        <div className="login-popup-title">
          {/* 4. DYNAMIC TITLE */}
          <h2>{currentState}</h2>
          <button className="close-btn" onClick={() => setShowLogin(false)}>X</button>
        </div>
        <form className="login-popup-inputs" onSubmit={onLogin}>
          {/* 5. SHOW NAME FIELD ONLY FOR SIGN UP */}
          {currentState === "Sign Up" && (
            <input
              name="name"
              type="text"
              placeholder="Your name"
              value={data.name}
              onChange={onChangeHandler}
              required
            />
          )}
          <input
            name="email"
            type="email"
            placeholder="Your email"
            value={data.email}
            onChange={onChangeHandler}
            required
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            value={data.password}
            onChange={onChangeHandler}
            required
          />
          <button type="submit" disabled={loading}>
            {loading ? "Processing..." : currentState}
          </button>
        </form>
        <div className="login-popup-condition">
          <input type="checkbox" required />
          <p>By continuing, i agree to the terms of use & privacy policy.</p>
        </div>
        
        {/* 6. CLICK HANDLERS TO TOGGLE STATE */}
        {currentState === "Login" ? (
          <p>Create a new account? <span onClick={() => setCurrentState("Sign Up")} style={{cursor:'pointer', color:'tomato'}}>Click here</span></p>
        ) : (
          <p>Already have an account? <span onClick={() => setCurrentState("Login")} style={{cursor:'pointer', color:'tomato'}}>Login here</span></p>
        )}
      </div>
    </div>
  );
};

export default LoginPopup;