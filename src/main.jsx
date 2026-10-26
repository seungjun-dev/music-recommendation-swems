import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
// 전역 스타일을 먼저 불러와야 컴포넌트 스타일이 뒤에서 덮어쓴다.
import "@/styles/global.css";
import RoomPage from "@/components/pages/RoomPage";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RoomPage />
  </StrictMode>,
);
