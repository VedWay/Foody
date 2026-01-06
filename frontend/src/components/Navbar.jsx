import React from "react";

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md px-8 py-4 flex justify-between items-center">
      <h1 className="text-xl font-bold">FoodDelivery</h1>

      <div className="space-x-4">
        <button className="text-gray-700 hover:text-black">
          Login
        </button>

        <button className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800">
          Sign Up
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
