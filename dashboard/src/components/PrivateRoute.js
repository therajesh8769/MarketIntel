// import React, { useEffect, useState } from "react";
// import { Navigate } from "react-router-dom";
// import axios from "axios";

// const PrivateRoute = ({ element: Component, ...rest }) => {
//   const [isAuthenticated, setIsAuthenticated] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const verifyUser = async () => {
//       try {
//         const response = await axios.get("http://localhost:8080/userVerification", { withCredentials: true });
//         if (response.data.status) {
//           setIsAuthenticated(true);
//         } else {
//           setIsAuthenticated(false);
//         }
//       } catch (error) {
//         console.error("Verification failed", error);
//         setIsAuthenticated(false);
//       }
//       setLoading(false);
//     };
    
//     verifyUser();
//   }, []);

//   if (loading) {
//     return <div>Loading...</div>; // Show a loading screen while verification is in progress
//   }

// //   return isAuthenticated ? <Component {...rest} /> :  window.location.href='http://localhost:3001/';
// };

// export default PrivateRoute;
