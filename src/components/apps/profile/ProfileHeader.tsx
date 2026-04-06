import { useTranslation } from "react-i18next";
import { cn } from "@/utils/cn";

export interface ProfileHeaderProps {
  className?: string;
}

export function ProfileHeader({ className }: ProfileHeaderProps) {
  const { t } = useTranslation();

  return (
    <div
      className={cn("flex flex-col items-center text-center gap-4", className)}
    >
      <div className="relative">
        <div
          className={cn(
            "absolute -inset-1 rounded-full",
            "bg-[var(--accent)] opacity-20 blur-md",
          )}
        />
        <img
          src="/assets/images/profile.jpeg"
          alt={t("topbar.name")}
          className={cn(
            "relative w-28 h-28 rounded-full object-cover",
            "ring-2 ring-[var(--accent)] ring-offset-2",
            "ring-offset-[var(--bg-surface)]",
          )}
        />
      </div>
      <div className="space-y-2">
        <h2 className="text-2xl font-bold text-[var(--text-primary)]">
          {t("topbar.name")}
        </h2>
        <p className="text-sm text-[var(--accent)] font-medium">
          Senior Fullstack Engineer
        </p>
        <p className="text-sm text-[var(--text-secondary)] max-w-md leading-relaxed">
          {t("apps.profile.summary")}
        </p>
      </div>
    </div>
  );
}
