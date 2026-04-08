import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { fileURLToPath, URL } from "node:url";

/**
 * Compute years of professional experience from the earliest start date
 * in the experience data. Used to inject into index.html at build time.
 */
function yearsOfExperience(): number {
  const earliestStart = new Date("2018-12-01"); // NAR Technologies internship
  const now = new Date();
  return Math.floor(
    (now.getTime() - earliestStart.getTime()) / (365.25 * 24 * 60 * 60 * 1000),
  );
}

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    {
      name: "inject-years-of-experience",
      transformIndexHtml(html) {
        return html.replace(/__YEARS_EXP__/g, String(yearsOfExperience()));
      },
    },
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  base: "/",
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          "vendor-react": ["react", "react-dom"],
          "vendor-motion": ["framer-motion"],
          "vendor-i18n": ["i18next", "react-i18next"],
          "vendor-firebase": [
            "firebase/app",
            "firebase/firestore",
            "firebase/analytics",
            "firebase/app-check",
          ],
        },
      },
    },
  },
});
