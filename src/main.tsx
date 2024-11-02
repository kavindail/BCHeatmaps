import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./Navbar/Navbar.js";
import GoogleMap from "./Map/GoogleMap.js";
import Login from "./Login/Login.js";
import Signup from "./Signup/Signup.js";
import ProtectedRoute from "./ProtectedRoutes/ProtectedRouteWrapper.js";

import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <ProtectedRoute>
                <GoogleMap />
              </ProtectedRoute>
            </>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
