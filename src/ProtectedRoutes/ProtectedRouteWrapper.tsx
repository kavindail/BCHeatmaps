import { useState, useEffect } from "react";
import { Navigate, Route } from "react-router-dom";
import axios from "axios";

const ProtectedRoute = (children: any) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      //TODO: Set the users local storage variable so that they are indicated authenticated
    } else {
      //TODO: Do not route the user but take away their authentication local variable
    }
  }, [isAuthenticated]);

  useEffect(() => {
    const validateSession = async () => {
      //TODO: Instead of local storage this needs to include credentials
      try {
        const response = await axios.post(
          //TODO: Replace this with api url from environment variable
          "http://localhost:3000/auth/verifyToken",
          {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true,
          },
        );
        console.log(response);
        setIsAuthenticated(true);
      } catch (error) {
        console.error("Error:", error);
        setIsAuthenticated(false);
      }
    };

    validateSession();
  }, []);

  return <>{children}</>;
};

export default ProtectedRoute;
