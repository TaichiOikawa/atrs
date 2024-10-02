import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig(() => {
  return {
    plugins: [react()],
    build: {
      outDir: "../src/build",
      emptyOutDir: true,
      rollupOptions: {
        output: {
          manualChunks: {
            react: [
              "react",
              "react-dom",
              "react-router-dom",
              "react-hook-form",
            ],
            socket: ["socket.io-client"],
            mantine: [
              "@mantine/core",
              "@mantine/form",
              "@mantine/hooks",
              "@mantine/notifications",
              "@mantine/modals",
            ],
          },
        },
      },
    },
  };
});
