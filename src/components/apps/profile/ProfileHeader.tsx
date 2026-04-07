import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { cn } from "@/utils/cn";
import { useReducedMotion, useIsMobile } from "@/hooks";
import { ANIMATION } from "@/constants";
import { GlassCard } from "@/components/ui";
import { trackEvent } from "@/lib/analytics";
import { YEARS_OF_EXPERIENCE } from "@/data";
import {
  MapPin,
  Linkedin,
  Github,
  Mail,
  Download,
  FileText,
  Circle,
} from "lucide-react";

export interface ProfileHeaderProps {
  className?: string;
}

const SOCIAL_ITEMS = [
  {
    icon: Mail,
    href: "mailto:jalkhurfan@gmail.com",
    label: "Email",
    display: "Email",
  },
  {
    icon: Linkedin,
    href: "https://linkedin.com/in/jalkhurfan",
    label: "LinkedIn",
    display: "LinkedIn",
  },
  {
    icon: Github,
    href: "https://github.com/jKh98",
    label: "GitHub",
    display: "GitHub",
  },
] as const;

export function ProfileHeader({ className }: ProfileHeaderProps) {
  const { t } = useTranslation();
  const reduced = useReducedMotion();
  const isMobile = useIsMobile();

  return (
    <GlassCard
      className={cn("overflow-visible", className)}
      innerClassName={cn(
        "flex gap-0",
        isMobile ? "flex-col items-center" : "flex-row items-end",
      )}
    >
      {/* Photo — full-body cutout on desktop, circular headshot on mobile */}
      {isMobile ? (
        <motion.div
          className="relative shrink-0 mt-4"
          initial={reduced ? false : { opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={reduced ? {} : ANIMATION.spring.gentle}
        >
          {/* Accent glow */}
          <div
            className={cn(
              "absolute inset-0 rounded-full",
              "bg-[var(--accent)] opacity-15 blur-2xl",
              "pointer-events-none",
            )}
          />
          <img
            src="/assets/images/profile-nobg.webp"
            alt={t("topbar.name")}
            loading="eager"
            width={96}
            height={96}
            // show top part of the image, which includes the face, in the circular crop
            className="relative w-36 h-36 rounded-full object-cover ring-2 ring-[var(--border)] drop-shadow-lg  object-top"
          />
        </motion.div>
      ) : (
        <motion.div
          className="relative shrink-0 self-end w-[240px] -mt-4"
          initial={reduced ? false : { opacity: 0, x: -12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={reduced ? {} : ANIMATION.spring.gentle}
        >
          {/* Accent glow behind the person */}
          <div
            className={cn(
              "absolute bottom-8 left-1/2 -translate-x-1/2",
              "w-40 h-40 rounded-full",
              "bg-[var(--accent)] opacity-15 blur-3xl",
              "pointer-events-none",
            )}
          />
          <img
            src="/assets/images/profile-nobg.webp"
            alt={t("topbar.name")}
            loading="eager"
            width={240}
            height={320}
            className="relative w-full h-auto object-contain object-bottom drop-shadow-lg"
          />
        </motion.div>
      )}

      {/* Info column */}
      <div
        className={cn(
          "min-w-0 flex-1 flex flex-col gap-4",
          isMobile
            ? "px-4 pb-4 pt-2 items-center text-center"
            : "py-6 pe-6 ps-1",
        )}
      >
        {/* Name + role + meta */}
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: reduced ? 0 : ANIMATION.duration.normal,
            delay: reduced ? 0 : 0.08,
          }}
        >
          <div
            className={cn(
              "flex items-center gap-2 mb-1",
              isMobile && "flex-wrap justify-center",
            )}
          >
            <h2
              className={cn(
                "font-bold text-[var(--text-primary)] leading-tight glass-text-shadow",
                isMobile ? "text-xl" : "text-2xl",
              )}
            >
              {t("topbar.name")}
            </h2>
            {/* Availability badge */}
            <span
              className={cn(
                "inline-flex items-center gap-1 px-2 py-0.5 rounded-full",
                "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400",
                "text-[10px] font-semibold",
              )}
            >
              <Circle size={5} fill="currentColor" className="shrink-0" />
              {t("apps.profile.availableStatus")}
            </span>
          </div>
          <p className="text-sm font-semibold text-[var(--accent)] glass-text-shadow">
            {t("apps.profile.role")}
          </p>
          <span
            className={cn(
              "flex items-center gap-1 text-xs text-[var(--text-tertiary)] mt-1",
              isMobile && "justify-center",
            )}
          >
            <MapPin size={12} className="shrink-0" />
            {t("apps.profile.location")}
          </span>
        </motion.div>

        {/* Summary */}
        <motion.p
          initial={reduced ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: reduced ? 0 : ANIMATION.duration.normal,
            delay: reduced ? 0 : 0.15,
          }}
          className="text-sm text-[var(--text-secondary)] leading-relaxed"
        >
          {t("apps.profile.summary", { years: YEARS_OF_EXPERIENCE })}
        </motion.p>

        {/* Actions */}
        <motion.div
          className="flex flex-col gap-3"
          initial={reduced ? false : { opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: reduced ? 0 : ANIMATION.duration.normal,
            delay: reduced ? 0 : 0.2,
          }}
        >
          {/* Download resume CTA — full width, prominent */}
          <a
            href="/assets/documents/jihad_alkhurfan_resume_2025.pdf"
            download
            onClick={() => trackEvent("resume_download")}
            className={cn(
              "group relative inline-flex items-center justify-center gap-2.5",
              "w-full px-5 py-2.5 rounded-xl",
              "bg-[var(--accent)] text-white text-sm font-semibold",
              "shadow-[0_2px_12px_var(--accent-glow)]",
              "hover:shadow-[0_4px_20px_var(--accent-glow)]",
              "hover:brightness-110 active:scale-[0.98]",
              "transition-all duration-200",
              "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]",
              "overflow-hidden",
            )}
          >
            {/* Shimmer highlight on hover */}
            <span
              className={cn(
                "absolute inset-0 -translate-x-full",
                "bg-gradient-to-r from-transparent via-white/20 to-transparent",
                "group-hover:translate-x-full transition-transform duration-700 ease-in-out",
              )}
            />
            <FileText size={15} className="relative" />
            <span className="relative">{t("apps.profile.downloadResume")}</span>
            <Download
              size={13}
              className="relative opacity-70 transition-transform duration-200 group-hover:translate-y-0.5"
            />
          </a>

          {/* Social links — compact icon+label pills */}
          <div
            className={cn(
              "flex items-center gap-2",
              isMobile && "flex-wrap justify-center",
            )}
          >
            {SOCIAL_ITEMS.map(({ icon: Icon, href, label, display }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith("mailto:") ? undefined : "_blank"}
                rel={
                  href.startsWith("mailto:") ? undefined : "noopener noreferrer"
                }
                aria-label={label}
                onClick={() => trackEvent("social_click", { platform: label })}
                className={cn(
                  "group/social inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg",
                  "text-xs font-medium",
                  "bg-[var(--bg-glass-inner)] border border-[var(--border)]",
                  "text-[var(--text-secondary)]",
                  "hover:text-[var(--accent)] hover:border-[var(--border-accent)]",
                  "hover:bg-[var(--bg-glass-hover)]",
                  "hover:shadow-[var(--shadow-sm)]",
                  "transition-all duration-200",
                  "active:scale-[0.97]",
                )}
              >
                <Icon
                  size={13}
                  className="transition-transform duration-200 group-hover/social:scale-110"
                />
                {display}
              </a>
            ))}
          </div>
        </motion.div>
      </div>
    </GlassCard>
  );
}
