// import axios from "axios";
// import { createContext, useEffect, useState } from "react";
// import { toast } from "react-toastify";

// // Create context
// export const StoreContext = createContext(null);

// // Currency formatter
// export const formatCurrency = (amount) =>
//   new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR" }).format(amount);

// const StoreContextProvider = ({ children }) => {
//   const [cartItems, setCartItems] = useState({});
//   const [food_list, setFoodList] = useState([]);
//   const [token, setToken] = useState("");

//   const url = "http://localhost:4000"; // backend URL
//   const api = (path) => `${url}${path.startsWith("/") ? path : "/" + path}`;

//   // Fetch food list from backend
//   const fetchFoodList = async () => {
//     try {
//       const res = await axios.get(api("/api/food/list"));
//       if (res.data.success) setFoodList(res.data.data);
//       else toast.error(res.data.message || "Failed to fetch food list");
//     } catch (err) {
//       console.error("Fetch food list error:", err.response || err.message);
//       toast.error("Cannot reach backend. Make sure server is running.");
//     }
//   };

//   // Load cart data
//   const loadCartData = async (authToken) => {
//     if (!authToken) return;
//     try {
//       const res = await axios.get(api("/api/cart"), {
//         headers: { Authorization: `Bearer ${authToken}` },
//       });
//       setCartItems(res.data.cartData || {});
//     } catch (err) {
//       console.error("Load cart error:", err.response?.data || err.message);
//       toast.error(err.response?.data?.message || "Failed to load cart data");
//     }
//   };

//   // Add item to cart
//   const addToCart = async (itemId) => {
//     setCartItems((prev) => ({
//       ...prev,
//       [itemId]: prev[itemId] ? prev[itemId] + 1 : 1,
//     }));
//     if (!token) return;

//     try {
//       const res = await axios.post(
//         api("/api/cart/add"),
//         { itemId },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       if (res.data.success) toast.success("Item added to cart");
//       else toast.error(res.data.message || "Failed to add item");
//     } catch (err) {
//       console.error("Add cart error:", err.response || err.message);
//       toast.error("Failed to add item to cart");
//     }
//   };

//   // Remove item from cart
//   const removeFromCart = async (itemId) => {
//     setCartItems((prev) => ({
//       ...prev,
//       [itemId]: prev[itemId] && prev[itemId] > 0 ? prev[itemId] - 1 : 0,
//     }));
//     if (!token) return;

//     try {
//       const res = await axios.post(
//         api("/api/cart/remove"),
//         { itemId },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       if (res.data.success) toast.success("Item removed from cart");
//       else toast.error(res.data.message || "Failed to remove item");
//     } catch (err) {
//       console.error("Remove cart error:", err.response || err.message);
//       toast.error("Failed to remove item");
//     }
//   };

//   // Get total cart amount
//   const getTotalCartAmount = () => {
//     return Object.entries(cartItems).reduce((total, [itemId, quantity]) => {
//       if (quantity > 0) {
//         const product = food_list.find((p) => p._id === itemId);
//         if (product) total += product.price * quantity;
//       }
//       return total;
//     }, 0);
//   };

//   // Load initial data
//   useEffect(() => {
//     const init = async () => {
//       await fetchFoodList();
//       const savedToken = localStorage.getItem("token");
//       if (savedToken) {
//         setToken(savedToken);
//         await loadCartData(savedToken);
//       }
//     };
//     init();
//   }, []);

//   return (
//     <StoreContext.Provider
//       value={{
//         food_list,
//         cartItems,
//         setCartItems,
//         addToCart,
//         removeFromCart,
//         getTotalCartAmount,
//         url,
//         token,
//         setToken,
//         formatCurrency,
//       }}
//     >
//       {children}
//     </StoreContext.Provider>
//   );
// };

// export default StoreContextProvider;
import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const [cartItems, setCartItems] = useState({});
  const url = "http://localhost:4000";
  //https://food-delivery-backend-5b6g.onrender.com
  const [token, setToken] = useState("");
  const [food_list, setFoodList] = useState([]);

  const addToCart = async (itemId) => {
    if (!cartItems[itemId]) {
      setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
    } else {
      setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    }
    if (token) {
      const response=await axios.post(
        url + "/api/cart/add",
        { itemId },
        { headers: { token } }
      );
      if(response.data.success){
        toast.success("item Added to Cart")
      }else{
        toast.error("Something went wrong")
      }
    }
  };

  const removeFromCart = async (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
    if (token) {
      const response= await axios.post(
        url + "/api/cart/remove",
        { itemId },
        { headers: { token } }
      );
      if(response.data.success){
        toast.success("item Removed from Cart")
      }else{
        toast.error("Something went wrong")
      }
    }
  };

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = food_list.find((product) => product._id === item);
        totalAmount += itemInfo.price * cartItems[item];
      }
    }
    return totalAmount;
  };

  const fetchFoodList = async () => {
    const response = await axios.get(url + "/api/food/list");
    if (response.data.success) {
      setFoodList(response.data.data);
    } else {
      alert("Error! Products are not fetching..");
    }
  };

  const loadCardData = async (token) => {
    const response = await axios.post(
      url + "/api/cart/get",
      {},
      { headers: { token } }
    );
    setCartItems(response.data.cartData);
  };

  useEffect(() => {
    async function loadData() {
      await fetchFoodList();
      if (localStorage.getItem("token")) {
        setToken(localStorage.getItem("token"));
        await loadCardData(localStorage.getItem("token"));
      }
    }
    loadData();
  }, []);

  const contextValue = {
    food_list,
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    url,
    token,
    setToken,
  };
  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};
export default StoreContextProvider;