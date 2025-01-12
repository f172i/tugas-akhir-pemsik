// src/components/ProtectedRoute.jsx
import propTypes from "prop-types";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ children }) => {
  const { token } = useSelector((state) => state.auth);

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

ProtectedRoute.propTypes = {
  children: propTypes.node.isRequired,
};

export default ProtectedRoute;
