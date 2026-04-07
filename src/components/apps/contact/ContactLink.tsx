import { useTranslation } from "react-i18next";
import {
  Mail,
  Phone,
  Linkedin,
  Github,
  Copy,
  Check,
  ExternalLink,
} from "lucide-react";
import { GlassCard } from "@/components/ui";
import { useCopyToClipboard, useAudio } from "@/hooks";
import { cn } from "@/utils/cn";
import { trackEvent } from "@/lib/analytics";
import type { SocialLink } from "@/types";

export interface ContactLinkProps {
  link: SocialLink;
  className?: string;
}

const ICON_MAP: Record<string, React.ComponentType<{ size?: number }>> = {
  Mail,
  Phone,
  Linkedin,
  Github,
};

export function ContactLink({ link, className }: ContactLinkProps) {
  const { t } = useTranslation();
  const { copied, copy } = useCopyToClipboard();
  const { playSound } = useAudio();

  const Icon = ICON_MAP[link.icon];

  const handleAction = () => {
    if (link.copyable) {
      const value = link.url.replace("mailto:", "").replace("tel:", "");
      copy(value);
      playSound("copyClipboard");
      trackEvent("contact_copy", { platform: link.platform });
    } else {
      window.open(link.url, "_blank", "noopener,noreferrer");
      trackEvent("contact_click", { platform: link.platform });
    }
  };

  return (
    <GlassCard
      hoverable
      className={cn(
        "p-3",
        copied && "border-green-400/60 shadow-[0_0_8px_rgba(74,222,128,0.2)]",
        className,
      )}
    >
      <button
        type="button"
        onClick={handleAction}
        aria-label={
          link.copyable
            ? `${t("apps.contact.copy")} ${link.platform}`
            : `${t("apps.contact.open")} ${link.platform}`
        }
        className="flex items-center gap-3 w-full text-start cursor-pointer"
      >
        <div className="text-[var(--accent)] shrink-0">
          {Icon && <Icon size={18} />}
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-xs text-[var(--text-tertiary)]">{link.platform}</p>
          <p className="text-sm text-[var(--text-primary)] truncate" dir="ltr">
            {link.displayValue}
          </p>
        </div>
        <span
          className={cn(
            "shrink-0 p-2 rounded-lg",
            "text-[var(--text-secondary)]",
            "transition-all duration-200",
          )}
          aria-hidden="true"
        >
          {link.copyable ? (
            copied ? (
              <Check size={16} className="text-green-400" />
            ) : (
              <Copy size={16} />
            )
          ) : (
            <ExternalLink size={16} />
          )}
        </span>
      </button>
      {copied && link.copyable && (
        <p className="text-xs text-green-400 mt-1 ps-9">
          {t("apps.contact.copyFeedback")}
        </p>
      )}
    </GlassCard>
  );
}
