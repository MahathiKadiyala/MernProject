import React, { useContext, useEffect, useState } from "react";
import "./MyOrders.css";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";
import { assets } from "../../assets/frontend_assets/assets";

const MyOrders = () => {
  const { url, token } = useContext(StoreContext);
  const [data, setData] = useState([]);

  const fetchOrders = async () => {
    try {
      if (!token) return;

      const response = await axios.post(
        url + "/api/order/userorders",
        {},
        { headers: { token } }
      );

      if (response.data?.success) {
        setData(response.data.data || []);
      }
    } catch (error) {
      console.log("Error fetching orders:", error);
      setData([]);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [token]);

  return (
    <div className="my-orders">
      <h2>Orders</h2>

      <div className="container">
        {Array.isArray(data) && data.length > 0 ? (
          data.map((order, index) => (
            <div key={index} className="my-orders-order">
              <img src={assets.parcel_icon} alt="" />

              <p>
                {Array.isArray(order.items) &&
                  order.items.map((item, i) =>
                    i === order.items.length - 1
                      ? `${item.name} X ${item.quantity}`
                      : `${item.name} X ${item.quantity}, `
                  )}
              </p>

              {/* SAFE INR FORMAT */}
              <p>
                ₹{Number(order.amount || 0).toLocaleString("en-IN")}
              </p>

              <p>Items: {order.items?.length || 0}</p>

              <p>
                <span>&#x25cf;</span>
                <b> {order.status || "Processing"}</b>
              </p>

              <button onClick={fetchOrders}>Track Order</button>
            </div>
          ))
        ) : (
          <p>No orders found.</p>
        )}
      </div>
    </div>
  );
};

export default MyOrders;