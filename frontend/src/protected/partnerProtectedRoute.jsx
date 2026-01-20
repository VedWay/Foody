import { Navigate } from "react-router-dom";

const PartnerProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("partnerToken");

  if (!token || token === "undefined" || token === "null") {
    return <Navigate to="/foodpartner/login" replace />;
  }

  return children;
};

export default PartnerProtectedRoute;
