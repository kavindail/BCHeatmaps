import React, { useState, useEffect } from "react";
import { Navigate, Route } from "react-router-dom";
import axios from "axios";
const apiUrl: string | undefined = import.meta.env.VITE_API_URL as string;

const ProtectedRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      localStorage.setItem("Authenticated", "true");
    } else {
      localStorage.setItem("Authenticated", "false");
    }
  }, [isAuthenticated]);

  useEffect(() => {
    console.log("Protected route entered");
    const validateSession = async () => {
      try {
        const response = await axios.post(
          apiUrl + "/auth/verifyToken",
          {},
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

  return (
    <>
      {React.Children.map(children, (child) => {
        return React.cloneElement(child, { isAuthenticated });
      })}
    </>
  );
};

export default ProtectedRoute;
