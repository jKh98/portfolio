import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { cn } from "@/utils/cn";
import { useReducedMotion } from "@/hooks";
import { ANIMATION } from "@/constants";

export interface ContactInfoProps {
  className?: string;
}

function TimezoneIndicator() {
  const { t } = useTranslation();
  const [time, setTime] = useState(() => formatBeirutTime());

  useEffect(() => {
    const id = setInterval(() => setTime(formatBeirutTime()), 60_000);
    return () => clearInterval(id);
  }, []);

  return (
    <p className="text-xs text-[var(--text-tertiary)] mt-1">
      {t("apps.contact.timezone", { time })}
    </p>
  );
}

function formatBeirutTime(): string {
  return new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "2-digit",
    timeZone: "Asia/Beirut",
  }).format(new Date());
}

export function ContactInfo({ className }: ContactInfoProps) {
  const { t } = useTranslation();
  const reduced = useReducedMotion();

  return (
    <motion.div
      initial={reduced ? false : { opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: reduced ? 0 : ANIMATION.duration.normal }}
      className={cn("space-y-2", className)}
    >
      <h2
        className={cn(
          "text-lg font-bold",
          "bg-gradient-to-r from-[var(--accent)] to-[var(--text-primary)]",
          "bg-clip-text text-transparent",
        )}
      >
        {t("apps.contact.subtitle")}
      </h2>
      <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
        {t("apps.contact.availability")}
      </p>
      <TimezoneIndicator />
    </motion.div>
  );
}
