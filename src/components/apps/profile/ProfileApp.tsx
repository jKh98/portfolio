import { useTranslation } from "react-i18next";
import { Download } from "lucide-react";
import { cn } from "@/utils/cn";
import { ProfileHeader } from "./ProfileHeader";
import { StatsRow } from "./StatsRow";
import { EducationList } from "./EducationList";
import { CertificateList } from "./CertificateList";
import { TrustedBy } from "./TrustedBy";

export function ProfileApp() {
  const { t } = useTranslation();

  return (
    <div
      className={cn("h-full overflow-y-auto p-4 space-y-6", "scrollbar-thin")}
    >
      <ProfileHeader />
      <StatsRow />
      <EducationList />
      <CertificateList />
      <TrustedBy />

      <div className="pt-2">
        <a
          href="/assets/documents/jihad_alkhurfan_resume_2025.pdf"
          download
          className={cn(
            "inline-flex items-center gap-2 px-4 py-2 rounded-lg",
            "bg-[var(--accent)] text-white",
            "text-sm font-medium",
            "hover:bg-[var(--accent-hover)] transition-colors",
            "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]",
          )}
        >
          <Download size={16} />
          {t("apps.profile.downloadResume")}
        </a>
      </div>
    </div>
  );
}

export default ProfileApp;
