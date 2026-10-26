import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import RoomPage from "@/components/pages/RoomPage";
import "@/styles/global.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RoomPage />
  </StrictMode>,
);
