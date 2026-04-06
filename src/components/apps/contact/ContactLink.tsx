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
import { useCopyToClipboard } from "@/hooks";
import { cn } from "@/utils/cn";
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

  const Icon = ICON_MAP[link.icon];

  const handleAction = () => {
    if (link.copyable) {
      const value = link.url.replace("mailto:", "").replace("tel:", "");
      copy(value);
    } else {
      window.open(link.url, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <GlassCard hoverable className={cn("p-3", className)}>
      <div className="flex items-center gap-3">
        <div className="text-[var(--accent)] shrink-0">
          {Icon && <Icon size={18} />}
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-xs text-[var(--text-tertiary)]">{link.platform}</p>
          <p className="text-sm text-[var(--text-primary)] truncate">
            {link.displayValue}
          </p>
        </div>
        <button
          type="button"
          onClick={handleAction}
          aria-label={
            link.copyable
              ? `${t("apps.contact.copy")} ${link.platform}`
              : `${t("apps.contact.open")} ${link.platform}`
          }
          className={cn(
            "shrink-0 p-2 rounded-lg",
            "text-[var(--text-secondary)]",
            "hover:text-[var(--accent)] hover:bg-[var(--bg-glass-hover)]",
            "transition-all duration-200",
            "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]",
          )}
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
        </button>
      </div>
      {copied && link.copyable && (
        <p className="text-xs text-green-400 mt-1 ps-9">
          {t("apps.contact.copyFeedback")}
        </p>
      )}
    </GlassCard>
  );
}
