import { Navigate } from "react-router-dom";

const UserProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");

  if (!token || token === "undefined" || token === "null") {
    return <Navigate to="/user/login" replace />;
  }

  return children;
};

export default UserProtectedRoute;
