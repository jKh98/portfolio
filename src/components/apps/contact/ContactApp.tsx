import { SOCIAL_LINKS } from "@/constants";
import { cn } from "@/utils/cn";
import { ContactInfo } from "./ContactInfo";
import { ContactLink } from "./ContactLink";

export function ContactApp() {
  return (
    <div
      className={cn("h-full overflow-y-auto p-4 space-y-4", "scrollbar-thin")}
    >
      <ContactInfo />
      <div className="space-y-2">
        {SOCIAL_LINKS.map((link) => (
          <ContactLink key={link.platform} link={link} />
        ))}
      </div>
    </div>
  );
}

export default ContactApp;
