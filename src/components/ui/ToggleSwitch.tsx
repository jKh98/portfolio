import { cn } from "@/utils/cn";

export interface ToggleSwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  className?: string;
}

export function ToggleSwitch({
  checked,
  onChange,
  className,
}: ToggleSwitchProps) {
  return (
    <button
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className={cn(
        "relative w-10 h-6 rounded-full transition-colors shrink-0 cursor-pointer",
        checked ? "bg-[var(--accent)]" : "bg-[var(--text-tertiary)]",
        className,
      )}
    >
      <span
        className={cn(
          "absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white transition-transform",
          checked && "translate-x-4",
        )}
      />
    </button>
  );
}
