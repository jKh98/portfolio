import { useContext } from "react";
import { PreferencesContext } from "@/context/PreferencesProvider";
import type { PreferencesContextValue } from "@/types";

export function usePreferences(): PreferencesContextValue {
  const context = useContext(PreferencesContext);
  if (!context) {
    throw new Error(
      "usePreferences must be used within a PreferencesProvider",
    );
  }
  return context;
}
