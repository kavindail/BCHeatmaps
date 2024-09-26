import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import GoogleMap from "./Map/GoogleMap.js";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <GoogleMap />
  </StrictMode>,
);
