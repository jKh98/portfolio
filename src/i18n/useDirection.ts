import { useTranslation } from "react-i18next";

/** Returns "rtl" or "ltr" based on the current language */
export function useDirection(): "rtl" | "ltr" {
  const { i18n } = useTranslation();
  return i18n.language === "ar" ? "rtl" : "ltr";
}
