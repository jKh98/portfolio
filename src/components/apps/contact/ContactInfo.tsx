import { useTranslation } from "react-i18next";
import { cn } from "@/utils/cn";

export interface ContactInfoProps {
  className?: string;
}

export function ContactInfo({ className }: ContactInfoProps) {
  const { t } = useTranslation();

  return (
    <div className={cn("space-y-2", className)}>
      <h2 className="text-lg font-bold text-[var(--text-primary)]">
        {t("apps.contact.subtitle")}
      </h2>
      <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
        {t("apps.contact.availability")}
      </p>
    </div>
  );
}
