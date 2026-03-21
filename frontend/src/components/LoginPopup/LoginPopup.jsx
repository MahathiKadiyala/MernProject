// import React, { useContext, useState } from "react";
// import "./LoginPopup.css";
// import { assets } from "../../assets/frontend_assets/assets";
// import { StoreContext } from "../../context/StoreContext";
// import axios from "axios";
// import { toast } from "react-toastify";

// const LoginPopup = ({ setShowLogin }) => {
//   const {url, setToken } = useContext(StoreContext);
//   const [currentState, setCurrentState] = useState("Login");
//   const [data, setData] = useState({
//     name: "",
//     email: "",
//     password: "",
//   });

//   const onChangeHandler = (event) => {
//     const name = event.target.name;
//     const value = event.target.value;
//     setData((data) => ({ ...data, [name]: value }));
//   };

//   const onLogin = async (event) => {
//     event.preventDefault();
//     let newUrl = url;
//     if (currentState === "Login") {
//       newUrl += "/api/user/login";
//     } else {
//       newUrl += "/api/user/register";
//     }
//     const response = await axios.post(newUrl, data);
//     if (response.data.success) {
//       setToken(response.data.token);
//       localStorage.setItem("token", response.data.token);
//       toast.success("Login Successfully")
//       setShowLogin(false);
//     }else{
//       toast.error(response.data.message);
//     }
//   };
//   return (
//     <div className="login-popup">
//       <form onSubmit={onLogin} className="login-popup-container">
//         <div className="login-popup-title">
//           <h2>{currentState}</h2>
//           <img
//             onClick={() => setShowLogin(false)}
//             src={assets.cross_icon}
//             alt=""
//           />
//         </div>
//         <div className="login-popup-inputs">
//           {currentState === "Login" ? (
//             <></>
//           ) : (
//             <input
//               name="name"
//               onChange={onChangeHandler}
//               value={data.name}
//               type="text"
//               placeholder="Your name"
//               required
//             />
//           )}
//           <input
//             name="email"
//             onChange={onChangeHandler}
//             value={data.email}
//             type="email"
//             placeholder="Your email"
//             required
//           />
//           <input
//             name="password"
//             onChange={onChangeHandler}
//             value={data.password}
//             type="password"
//             placeholder="Your password"
//             required
//           />
//         </div>
//         <button type="submit">
//           {currentState === "Sign Up" ? "Create Account" : "Login"}
//         </button>
//         <div className="login-popup-condition">
//           <input type="checkbox" required />
//           <p>By continuing, i agree to the terms of use & privacy policy.</p>
//         </div>
//         {currentState === "Login" ? (
//           <p>
//             Create a new account?{" "}
//             <span onClick={() => setCurrentState("Sign Up")}>Click here</span>
//           </p>
//         ) : (
//           <p>
//             Already have an account?{" "}
//             <span onClick={() => setCurrentState("Login")}>Login here</span>
//           </p>
//         )}
//       </form>
//     </div>
//   );
// };

// export default LoginPopup;
import React, { useState, useContext } from "react";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";
import { toast } from "react-toastify";
import './LoginPopup.css';

const LoginPopup = ({ setShowLogin }) => {
  const { url, setToken, loadCartData } = useContext(StoreContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(`${url}/api/user/login`, {
        email,
        password,
      });

      if (response.data.success) {
        toast.success("Login successful!");
        const token = response.data.token;

        setToken(token); // set token in context
        localStorage.setItem("token", token); // persist token
        if (loadCartData) await loadCartData(token); // load cart data

        // optional: clear form fields
        setEmail("");
        setPassword("");

        setShowLogin(false); // close popup
      } else {
        toast.error(response.data.message || "Login failed");
      }
    } catch (err) {
      if (err.response) {
        console.error("Backend Error Data:", err.response.data);
        toast.error(err.response.data.message);
      } else {
        console.error("Network Error:", err.message);
        toast.error("Cannot reach server. Check your connection.");
      }
    } finally {
      setLoading(false); // always reset loading state
    }
  };

  return (
    <div className="login-popup"> {/* This is now the dark background */}
      <div className="login-popup-container"> {/* This is the white box */}
        <div className="login-popup-title">
          <h2>Login</h2>
          <button 
            className="close-btn" 
            onClick={() => setShowLogin(false)}
            style={{border:'none', background:'none', fontSize:'20px', cursor:'pointer'}}
          >
            X
          </button>
        </div>
        <form className="login-popup-inputs" onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
        <div className="login-popup-condition">
            <input type="checkbox" required />
            <p>By continuing, i agree to the terms of use & privacy policy.</p>
        </div>
        <p>Create a new account? <span>Click here</span></p>
      </div>
    </div>
  );
};
export default LoginPopup;