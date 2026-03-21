// import React, { useContext, useState } from "react";
// import "./Navbar.css";
// import logo from "../../assets/QB_Logo.jpeg";   // ✅ correct import
// import { assets } from "../../assets/frontend_assets/assets"; // ✅ add this
// import { Link, useNavigate } from "react-router-dom";
// import { StoreContext } from "../../context/StoreContext";
// import { toast } from "react-toastify";

// const Navbar = ({ setShowLogin }) => {
//   const [menu, setMenu] = useState("home");
//   const { getTotalCartAmount, token, setToken } = useContext(StoreContext);
//   const navigate = useNavigate();

//   const logout = () => {
//     localStorage.removeItem("token");
//     setToken("");
//     toast.success("Logout Successfully");
//     navigate("/");
//   };

//   return (
//     <div className="navbar">
//       <Link to="/">
//         {/* ✅ FIXED HERE */}
//         <img src={logo} alt="Logo" className="logo" />
//       </Link>

//       <ul className="navbar-menu">
//         <Link
//           to="/"
//           onClick={() => setMenu("home")}
//           className={menu === "home" ? "active" : ""}
//         >
//           home
//         </Link>

//         <a
//           href="#explore-menu"
//           onClick={() => setMenu("menu")}
//           className={menu === "menu" ? "active" : ""}
//         >
//           menu
//         </a>

//         <a
//           href="#app-download"
//           onClick={() => setMenu("mobile-app")}
//           className={menu === "mobile-app" ? "active" : ""}
//         >
//           mobile-app
//         </a>

//         <a
//           href="#footer"
//           onClick={() => setMenu("contact-us")}
//           className={menu === "contact-us" ? "active" : ""}
//         >
//           contact us
//         </a>
//       </ul>

//       <div className="navbar-right">
//         <img src={assets.search_icon} alt="" />

//         <div className="navbar-search-icon">
//           <Link to="/cart">
//             <img src={assets.basket_icon} alt="" />
//           </Link>
//           <div className={getTotalCartAmount() === 0 ? "" : "dot"}></div>
//         </div>

//         {!token ? (
//           <button onClick={() => setShowLogin(true)}>sign in</button>
//         ) : (
//           <div className="navbar-profile">
//             <img src={assets.profile_icon} alt="" />
//             <ul className="nav-profile-dropdown">
//               <li onClick={() => navigate("/myorders")}>
//                 <img src={assets.bag_icon} alt="" />
//                 <p>Orders</p>
//               </li>
//               <hr />
//               <li onClick={logout}>
//                 <img src={assets.logout_icon} alt="" />
//                 <p>Logout</p>
//               </li>
//             </ul>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Navbar;
import React, { useContext, useState } from "react";
import "./Navbar.css";
import logo from "../../assets/QB_Logo.jpeg";
import { assets } from "../../assets/frontend_assets/assets";
import { Link, useNavigate } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";
import { toast } from "react-toastify";

const Navbar = ({ setShowLogin }) => {
  const [menu, setMenu] = useState("home");
  const [showSearch, setShowSearch] = useState(false);
  
  // Use global state from context
  const { getTotalCartAmount, token, setToken, searchTerm, setSearchTerm } = useContext(StoreContext);
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    toast.success("Logout Successfully");
    navigate("/");
  };

  return (
    <div className="navbar">
      <Link to="/"><img src={logo} alt="Logo" className="logo" /></Link>

      <ul className="navbar-menu">
        <Link to="/" onClick={() => setMenu("home")} className={menu === "home" ? "active" : ""}>home</Link>
        <a href="#explore-menu" onClick={() => setMenu("menu")} className={menu === "menu" ? "active" : ""}>menu</a>
        <a href="#app-download" onClick={() => setMenu("mobile-app")} className={menu === "mobile-app" ? "active" : ""}>mobile-app</a>
        <a href="#footer" onClick={() => setMenu("contact-us")} className={menu === "contact-us" ? "active" : ""}>contact us</a>
      </ul>

      <div className="navbar-right">
        <div className="navbar-search-container">
          {showSearch && (
            <input 
              type="text" 
              placeholder="Search food..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="navbar-search-input"
              autoFocus
            />
          )}
          <img 
            src={assets.search_icon} 
            alt="search" 
            onClick={() => setShowSearch(!showSearch)} 
            style={{ cursor: "pointer" }}
          />
        </div>

        <div className="navbar-search-icon">
          <Link to="/cart"><img src={assets.basket_icon} alt="" /></Link>
          <div className={getTotalCartAmount() === 0 ? "" : "dot"}></div>
        </div>

        {!token ? (
          <button onClick={() => setShowLogin(true)}>sign in</button>
        ) : (
          <div className="navbar-profile">
            <img src={assets.profile_icon} alt="" />
            <ul className="nav-profile-dropdown">
              <li onClick={() => navigate("/myorders")}><img src={assets.bag_icon} alt="" /><p>Orders</p></li>
              <hr />
              <li onClick={logout}><img src={assets.logout_icon} alt="" /><p>Logout</p></li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;