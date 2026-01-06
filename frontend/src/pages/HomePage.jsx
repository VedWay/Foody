import React from "react";
import RestaurantCard from "../components/RestaurantCard.jsx";

const HomePage= () => {
  return (
    <div className="px-8 py-6">
      <h1 className="text-3xl font-bold mb-6">
        Restaurants Near You
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <RestaurantCard />
        
      </div>
    </div>
  );
};

export default HomePage;
