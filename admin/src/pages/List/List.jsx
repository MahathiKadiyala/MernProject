import React, { useState, useEffect } from 'react';
import './List.css'
import axios from "axios"
import {toast} from "react-toastify"

const List = () => {
  const url="http://localhost:4000"
   const[list,setList]=useState([]);
     const fetchList=async ()=>{
      const response=await axios.get(`${url}/api/food/list`);
      if(response.data.success){
        setList(response.data.data)
      }
      else{
        toast.error("Error")
      }
     }
    const removeFood = async (foodId) => {
    const token = localStorage.getItem("token");
    
    if (!token) {
        toast.error("No token found. Please login.");
        return;
    }

    try {
        const response = await axios.post(`${url}/api/food/remove`, 
            { id: foodId }, 
            { headers: { token } } 
        );

        if (response.data.success) {
            toast.success(response.data.message);
            await fetchList();
        } else {
            toast.error(response.data.message);
        }
    } catch (error) {
        // This will print the actual error from the server
        console.log("Error Details:", error.response?.data); 
        toast.error("Unauthorized Action");
    }
}
     useEffect(()=>{
      fetchList();
     },[])
  return (
    <div className='list add flex-col'>
      <p> All Foods List</p>
      <div className="list-table">
        <div className="list-table-format">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
        </div>
        {list.map((item,index)=>{
          return (
            <div key={index} className='list-table-format'>
              <img src={`${url}/images/`+item.image} alt=""/>
              <p>{item.name}</p>
              <p>{item.category}</p>
              <p>₹{item.price}</p>
              <p onClick={()=> removeFood(item._id)} className='cursor'>x</p>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default List
