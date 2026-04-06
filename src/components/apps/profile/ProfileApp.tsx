import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Download } from "lucide-react";
import { cn } from "@/utils/cn";
import { useReducedMotion } from "@/hooks";
import { ANIMATION } from "@/constants";
import { ProfileHeader } from "./ProfileHeader";
import { StatsRow } from "./StatsRow";
import { EducationList } from "./EducationList";
import { CertificateList } from "./CertificateList";
import { TrustedBy } from "./TrustedBy";

const SECTIONS = [
  { key: "header", Component: ProfileHeader },
  { key: "stats", Component: StatsRow },
  { key: "education", Component: EducationList },
  { key: "certificates", Component: CertificateList },
  { key: "trustedBy", Component: TrustedBy },
] as const;

export function ProfileApp() {
  const { t } = useTranslation();
  const reduced = useReducedMotion();

  return (
    <div
      className={cn(
        "h-full overflow-y-auto p-4 space-y-6",
        "scrollbar-thin scroll-shadow",
      )}
    >
      {SECTIONS.map(({ key, Component }, i) => (
        <motion.div
          key={key}
          initial={reduced ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: reduced ? 0 : ANIMATION.duration.normal,
            delay: reduced ? 0 : i * 0.08,
          }}
        >
          <Component />
        </motion.div>
      ))}

      <motion.div
        initial={reduced ? false : { opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: reduced ? 0 : ANIMATION.duration.normal,
          delay: reduced ? 0 : SECTIONS.length * 0.08,
        }}
        className="pt-2"
      >
        <a
          href="/assets/documents/jihad_alkhurfan_resume_2025.pdf"
          download
          className={cn(
            "group inline-flex items-center gap-2 px-4 py-2 rounded-lg",
            "bg-[var(--accent)] text-white",
            "text-sm font-medium",
            "hover:bg-[var(--accent-hover)] transition-all duration-200",
            "active:scale-95",
            "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]",
          )}
        >
          <Download
            size={16}
            className="transition-transform duration-200 group-hover:translate-y-0.5"
          />
          {t("apps.profile.downloadResume")}
        </a>
      </motion.div>
    </div>
  );
}

export default ProfileApp;
