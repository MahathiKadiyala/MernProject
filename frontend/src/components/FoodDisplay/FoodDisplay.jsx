// import React, { useContext } from "react";
// import "./FoodDisplay.css";
// import { StoreContext } from "../../context/StoreContext";
// import FoodItem from "../FoodItem/FoodItem";

// const FoodDisplay = ({ category }) => {
//   const { food_list } = useContext(StoreContext);

//   // Filter food items based on category, then map to FoodItem components
//   const filteredFood = food_list.filter(
//     (item) => category === "All" || category === item.category
//   );

//   return (
//     <div className="food-display" id="food-display">
//       <h2>Top dishes near you</h2>

//       <div className="food-display-list">
//         {filteredFood.length > 0 ? (
//           filteredFood.map((item) => (
//             <FoodItem
//               key={item._id}        // unique key
//               _id={item._id}        // pass correct _id
//               name={item.name}
//               description={item.description}
//               price={item.price}
//               image={item.image}
//             />
//           ))
//         ) : (
//           <p>No dishes available in this category.</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default FoodDisplay;
import React, { useContext } from "react";
import "./FoodDisplay.css";
import { StoreContext } from "../../context/StoreContext";
import FoodItem from "../FoodItem/FoodItem";

const FoodDisplay = ({ category }) => {
  // Pulling context directly
  const context = useContext(StoreContext);
  
  // Debugging log: This will tell us if context is truly reaching the component
  console.log("DEBUG: Context object is:", context);

  // If context is missing, stop here
  if (!context) {
    return <p>Error: StoreContext is not available.</p>;
  }

  // Destructure safely
  const { food_list, searchTerm } = context;

  // Ensure food_list exists before filtering
  const safeList = food_list || [];

  const filteredFood = food_list.filter((item) => {
    // 1. Determine which property holds the food name
    // Replace 'name' below with the actual key you found in your console log
    const nameToSearch = item.name || item.title || ""; 

    const matchesCategory = category === "All" || category === item.category;
    const matchesSearch = nameToSearch.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesCategory && matchesSearch;
});

  return (
    <div className="food-display" id="food-display">
      <h2>Top dishes near you</h2>
      <div className="food-display-list">
        {filteredFood.length > 0 ? (
          filteredFood.map((item) => (
            <FoodItem
              key={item._id}
              _id={item._id}
              name={item.name}
              description={item.description}
              price={item.price}
              image={item.image}
            />
          ))
        ) : (
          <p>No dishes found matching your criteria.</p>
        )}
      </div>
    </div>
  );
};

export default FoodDisplay;