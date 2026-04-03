// import React, { useContext } from "react";
// import { Navigate, useLocation } from "react-router-dom";
// import { AuthContext } from "../context/AuthContext";

// function ProtectedRoute({ children }) {
//   const { user } = useContext(AuthContext);
//   const location = useLocation();

//   if (!user) {
//     return <Navigate to="/login" replace state={{ from: location }} />;
//   }

//   return children;
// }

// export default ProtectedRoute;


// import React, { useContext } from "react";
// import { Navigate, useLocation } from "react-router-dom";
// import { AuthContext } from "../context/AuthContext";

// function ProtectedRoute({ children }) {
//   const { user } = useContext(AuthContext);
//   const location = useLocation();

//   if (!user) {
//     return <Navigate to="/login" replace state={{ from: location }} />;
//   }

//   return children;
// }

// export default ProtectedRoute;


// ProtectedRoute.js - CORRECTED VERSION
// import React, { useContext } from "react";
// import { Navigate } from "react-router-dom";
// import { AuthContext } from "../context/AuthContext";

// const ProtectedRoute = ({ children }) => {
//   const { user, loading } = useContext(AuthContext);

//   // Show loading while checking authentication
//   if (loading) {
//     return (
//       <div style={{
//         display: "flex",
//         justifyContent: "center",
//         alignItems: "center",
//         height: "100vh"
//       }}>
//         <div>Loading...</div>
//       </div>
//     );
//   }

//   // If not authenticated, redirect to login
//   if (!user) {
//     return <Navigate to="/login" replace />;
//   }

//   // If authenticated, render the children
//   return children;
// };

// export default ProtectedRoute;



import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // FIXED: Changed import

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth(); // FIXED: Using custom hook

  // Show loading while checking authentication
  if (loading) {
    return (
      <div style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh"
      }}>
        <div>Loading...</div>
      </div>
    );
  }

  // If not authenticated, redirect to login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // If authenticated, render the children
  return children;
};

export default ProtectedRoute;