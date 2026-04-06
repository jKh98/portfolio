import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDirection } from "@/i18n/useDirection";
import { Desktop } from "@/components/desktop";

export function App() {
  const { i18n } = useTranslation();
  const direction = useDirection();

  useEffect(() => {
    document.documentElement.dir = direction;
    document.documentElement.lang = i18n.language;
  }, [direction, i18n.language]);

  return (
    <div
      className="h-full w-full"
      style={{ backgroundColor: "var(--bg-primary)" }}
    >
      <Desktop />
    </div>
  );
}
