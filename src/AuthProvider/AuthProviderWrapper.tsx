import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
const apiUrl: string | undefined = import.meta.env.VITE_API_URL as string;

//You need to create a context these are the ways the children are going to interact with the variables
const AuthContext = createContext({
  isAuthenticated: false,
  setIsAuthenticated: (authStatus: boolean) => {},
});

//Children being passed as props to the function here
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [authState, setAuthState] = useState(false);

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
        setAuthState(true);
        console.log("IsAuthenticated: ", authState);
      } catch (error) {
        console.error("Error:", error);
        console.log("IsAuthenticated: ", authState);
        setAuthState(false);
      }
    };

    validateSession();
  }, []);

  return (
    <>
      <AuthContext.Provider
        //The protected route context provider provides the children the context which was set above
        value={{ isAuthenticated: authState, setIsAuthenticated: setAuthState }}
        //THis is explicitly where the context is passed down, you give the context then the useState, and then the setter and the useState setter
      >
        {children}
      </AuthContext.Provider>
    </>
  );
};

//This is providing the export so that children can import "useProtectedRoute"
// First import the context provider
//import {useProtectedRoute} from 'filepath'
// -----
//If the children just want the variable and dont want to set they can
//const { isAuthenticated } = useProtectedRoute();
// -----
//If they need to also update the context for all other components they can
//const { isAuthenticated, setIsAuthenticated } = useProtectedRoute();
export const useAuthProvider = () => useContext(AuthContext);

export default AuthProvider;
