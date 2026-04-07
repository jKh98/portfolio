import { cn } from "@/utils/cn";
import { ExperienceCard } from "./ExperienceCard";
import type { Experience } from "@/types";

export interface ExperienceTimelineProps {
  experiences: Experience[];
  expandedIds: Set<string>;
  onToggleExpand: (id: string) => void;
  className?: string;
}

export function ExperienceTimeline({
  experiences,
  expandedIds,
  onToggleExpand,
  className,
}: ExperienceTimelineProps) {
  return (
    <div className={cn("relative", className)}>
      {/* Vertical timeline line */}
      <div
        className={cn(
          "absolute top-0 bottom-0 start-[7px] w-px",
          "bg-[var(--border)]",
        )}
        aria-hidden="true"
      />

      <div className="space-y-4">
        {experiences.map((exp) => (
          <div key={exp.id} className="relative flex items-start gap-4">
            {/* Timeline dot */}
            <div
              className={cn(
                "relative z-10 mt-4 w-[15px] h-[15px] rounded-full shrink-0",
                "border-2",
                !exp.endDate
                  ? "bg-[var(--accent)] border-[var(--accent)]"
                  : "bg-[var(--bg-surface)] border-[var(--text-tertiary)]",
              )}
              aria-hidden="true"
            />
            <div className="flex-1 min-w-0">
              <ExperienceCard
                experience={exp}
                expanded={expandedIds.has(exp.id)}
                onToggle={() => onToggleExpand(exp.id)}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
