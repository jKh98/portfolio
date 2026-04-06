import { useCallback, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Wifi,
  WifiOff,
  BatteryFull,
  BatteryMedium,
  BatteryLow,
  Bell,
  BellDot,
} from "lucide-react";
import { cn } from "@/utils/cn";
import { Tooltip } from "@/components/ui";
import { useIsMobile } from "@/hooks";

/** Battery drain interval in ms (drops ~1% every 3s for fun) */
const DRAIN_INTERVAL = 3_000;

/**
 * Interactive status tray icons for the TopBar.
 * WiFi toggles online/offline, Battery drains over time (click to charge),
 * Bell toggles notification indicator.
 */
export function StatusTray() {
  const { t } = useTranslation();
  const isMobile = useIsMobile();

  // WiFi toggle
  const [isOnline, setIsOnline] = useState(true);

  // Battery drain (starts at 100, drains slowly)
  const [battery, setBattery] = useState(100);
  const drainRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    drainRef.current = setInterval(() => {
      setBattery((prev) => Math.max(0, prev - 1));
    }, DRAIN_INTERVAL);
    return () => {
      if (drainRef.current) clearInterval(drainRef.current);
    };
  }, []);

  const chargeBattery = useCallback(() => setBattery(100), []);

  // Bell notification toggle
  const [hasNotification, setHasNotification] = useState(false);

  const BatteryIcon = battery > 60 ? BatteryFull : battery > 20 ? BatteryMedium : BatteryLow;
  const batteryColor =
    battery > 60
      ? "text-[var(--text-secondary)]"
      : battery > 20
        ? "text-amber-500"
        : "text-red-500";

  const baseClass = cn(
    "transition-colors duration-200 cursor-pointer",
    "hover:text-[var(--accent)]",
    "active:scale-90 transition-transform",
  );

  // Mobile: show only WiFi
  if (isMobile) {
    return (
      <div className="flex items-center">
        <button
          type="button"
          aria-label={t("topbar.status.wifi")}
          onClick={() => setIsOnline((p) => !p)}
          className={cn(baseClass, isOnline ? "text-[var(--text-secondary)]" : "text-red-500")}
        >
          {isOnline ? <Wifi size={12} /> : <WifiOff size={12} />}
        </button>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-1.5">
      <Tooltip content={isOnline ? t("topbar.status.wifi") : t("topbar.status.wifiOff")}>
        <button
          type="button"
          aria-label={isOnline ? t("topbar.status.wifi") : t("topbar.status.wifiOff")}
          onClick={() => setIsOnline((p) => !p)}
          className={cn(baseClass, isOnline ? "text-[var(--text-secondary)]" : "text-red-500")}
        >
          {isOnline ? <Wifi size={14} /> : <WifiOff size={14} />}
        </button>
      </Tooltip>
      <Tooltip content={t("topbar.status.batteryLevel", { level: battery })}>
        <button
          type="button"
          aria-label={t("topbar.status.batteryLevel", { level: battery })}
          onClick={chargeBattery}
          className={cn(baseClass, batteryColor)}
        >
          <BatteryIcon size={14} />
        </button>
      </Tooltip>
      <Tooltip
        content={
          hasNotification
            ? t("topbar.status.newNotification")
            : t("topbar.status.notifications")
        }
      >
        <button
          type="button"
          aria-label={
            hasNotification
              ? t("topbar.status.newNotification")
              : t("topbar.status.notifications")
          }
          onClick={() => setHasNotification((p) => !p)}
          className={cn(baseClass, "relative text-[var(--text-secondary)]")}
        >
          {hasNotification ? <BellDot size={14} /> : <Bell size={14} />}
        </button>
      </Tooltip>
    </div>
  );
}
