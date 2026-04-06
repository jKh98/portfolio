import { cn } from "@/utils/cn";
import { ExperienceTimeline } from "./ExperienceTimeline";

export function ExperienceApp() {
  return (
    <div className={cn("h-full overflow-y-auto p-4", "scrollbar-thin")}>
      <ExperienceTimeline />
    </div>
  );
}

export default ExperienceApp;
