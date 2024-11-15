import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./Navbar/Navbar.js";
import GoogleMap from "./Map/GoogleMap.js";
import Login from "./Login/Login.js";
import Signup from "./Signup/Signup.js";
import AuthProvider from "./AuthProvider/AuthProviderWrapper.js";
import Favorites from "./Favorites/Favorites.js";

import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={
              <>
                <GoogleMap />
              </>
            }
          />

          <Route
            path="/login"
            element={
              <>
                <Login />
              </>
            }
          />
          <Route
            path="/signup"
            element={
              <>
                <Signup />
              </>
            }
          />

          <Route
            path="/favorites"
            element={
              <>
                <Favorites />
              </>
            }
          />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
);
