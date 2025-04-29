import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./global.css";
import Router from "./pages/router/index.tsx";
import { scan } from "react-scan";
import { config } from "./config/index.ts";

scan({
  enabled: config.environment === "development",
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Router />
  </StrictMode>,
);
