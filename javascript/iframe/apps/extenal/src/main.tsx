import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./global.css";
import { AppRouter } from "./pages/router.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AppRouter />
  </StrictMode>,
);
