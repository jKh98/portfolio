import { motion } from "framer-motion";
import { SOCIAL_LINKS } from "@/constants";
import { cn } from "@/utils/cn";
import { useReducedMotion } from "@/hooks";
import { ANIMATION } from "@/constants";
import { ContactInfo } from "./ContactInfo";
import { ContactLink } from "./ContactLink";

export function ContactApp() {
  const reduced = useReducedMotion();

  return (
    <div
      className={cn(
        "h-full overflow-y-auto p-4 space-y-4",
        "scrollbar-thin scroll-shadow",
      )}
    >
      <ContactInfo />
      <div className="space-y-2">
        {SOCIAL_LINKS.map((link, i) => (
          <motion.div
            key={link.platform}
            initial={reduced ? false : { opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              duration: reduced ? 0 : ANIMATION.duration.normal,
              delay: reduced ? 0 : 0.1 + i * 0.08,
            }}
          >
            <ContactLink link={link} />
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default ContactApp;
