import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
      // data/ 는 읽기 전용: import 로만 참조하고 복사하거나 쓰지 않는다.
      "@data": fileURLToPath(new URL("./data", import.meta.url)),
    },
  },
});
