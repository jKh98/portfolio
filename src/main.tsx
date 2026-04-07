import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { PreferencesProvider, ThemeProvider, WindowProvider } from "@/context";
import { App } from "./App";
import "@/i18n";
import "@/lib/firebase"; // Initialize Firebase + Analytics
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <PreferencesProvider>
      <ThemeProvider>
        <WindowProvider>
          <App />
        </WindowProvider>
      </ThemeProvider>
    </PreferencesProvider>
  </StrictMode>,
);
