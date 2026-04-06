import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { cn } from "@/utils/cn";
import { useReducedMotion } from "@/hooks";
import { ANIMATION } from "@/constants";

export interface ProfileHeaderProps {
  className?: string;
}

export function ProfileHeader({ className }: ProfileHeaderProps) {
  const { t } = useTranslation();
  const reduced = useReducedMotion();

  return (
    <motion.div
      initial={reduced ? false : { opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: reduced ? 0 : ANIMATION.duration.normal }}
      className={cn("flex flex-col items-center text-center gap-4", className)}
    >
      <div className="relative">
        <div
          className={cn(
            "absolute -inset-1 rounded-full",
            "bg-[var(--accent)] opacity-20 blur-md",
          )}
        />
        <motion.img
          src="/assets/images/profile.jpeg"
          alt={t("topbar.name")}
          loading="lazy"
          width={112}
          height={112}
          animate={reduced ? {} : { scale: [1, 1.03, 1] }}
          transition={
            reduced ? {} : { duration: 4, repeat: Infinity, ease: "easeInOut" }
          }
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
          {t("apps.profile.role")}
        </p>
        <p className="text-sm text-[var(--text-secondary)] max-w-md leading-relaxed">
          {t("apps.profile.summary")}
        </p>
      </div>
    </motion.div>
  );
}
