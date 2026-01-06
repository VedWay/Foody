import React from "react";

const UserRegister = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">
          Create Account
        </h2>

        {/* Error message UI */}
        <p className="bg-red-100 text-red-600 p-2 rounded mb-4 hidden">
          Error message here
        </p>

        {/* Success message UI */}
        <p className="bg-green-100 text-green-600 p-2 rounded mb-4 hidden">
          Success message here
        </p>

        <form className="space-y-4">
          <input
            type="text"
            placeholder="Full Name"
            className="w-full p-3 border rounded focus:outline-none focus:ring"
          />

          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 border rounded focus:outline-none focus:ring"
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 border rounded focus:outline-none focus:ring"
          />

          <button
            type="button"
            className="w-full bg-black text-white py-3 rounded hover:bg-gray-800 transition"
          >
            Register
          </button>
        </form>

        <p className="text-center text-sm mt-4">
          Already have an account?{" "}
          <span className="text-blue-600 cursor-pointer">
            Login
          </span>
        </p>
      </div>
    </div>
  );
};

export default UserRegister;

