import { SKILLS } from "@/data";
import { cn } from "@/utils/cn";
import { SkillCategory } from "./SkillCategory";

export function SkillsApp() {
  return (
    <div
      className={cn("h-full overflow-y-auto p-4 space-y-6", "scrollbar-thin")}
    >
      {SKILLS.map((category) => (
        <SkillCategory key={category.nameKey} category={category} />
      ))}
    </div>
  );
}

export default SkillsApp;
