import { motion } from "framer-motion";
import { cn } from "@/utils/cn";
import { useReducedMotion } from "@/hooks";
import { ANIMATION } from "@/constants";
import { ProfileHeader } from "./ProfileHeader";
import { StatsRow } from "./StatsRow";
import { EducationList } from "./EducationList";
import { CertificateList } from "./CertificateList";

const SECTIONS = [
  { key: "header", Component: ProfileHeader },
  { key: "stats", Component: StatsRow },
  { key: "education", Component: EducationList },
  { key: "certificates", Component: CertificateList },
] as const;

export function ProfileApp() {
  const reduced = useReducedMotion();

  return (
    <div
      className={cn(
        "h-full overflow-y-auto",
        "scrollbar-thin scroll-shadow",
      )}
    >
      <div className="max-w-2xl mx-auto px-6 pt-6 pb-8 space-y-6">
        {SECTIONS.map(({ key, Component }, i) => (
          <motion.div
            key={key}
            initial={reduced ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: reduced ? 0 : ANIMATION.duration.normal,
              delay: reduced ? 0 : i * 0.06,
            }}
          >
            <Component />
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default ProfileApp;
