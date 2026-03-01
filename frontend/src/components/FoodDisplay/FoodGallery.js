import React from "react";

const FoodGallery = () => {
  // URLs for your 32 uploaded images
  const imageUrls = Array.from({ length: 32 }, (_, i) =>
    `http://localhost:4000/images/food_${i + 1}.png`
  );

  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", justifyContent: "center" }}>
      {imageUrls.map((url, index) => (
        <img
          key={index}
          src={url}
          alt={`Food ${index + 1}`}
          width={150}
          style={{ borderRadius: "8px" }}
        />
      ))}
    </div>
  );
};

export default FoodGallery;