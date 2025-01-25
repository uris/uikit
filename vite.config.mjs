import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  return {
    root: "./playground",
    logLevel: "silent", // prevent loggin vite hot upate, connecting, etc. messages
    plugins: [react()],
    server: {
      open: true,
      port: 3000,
    },
  };
});
