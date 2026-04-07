import { useRef, useMemo } from "react";
import { motion, useSpring, useTransform } from "framer-motion";
import { cn } from "@/utils/cn";
import { useReducedMotion } from "@/hooks";
import { ANIMATION, SKILL_ICONS } from "@/constants";
import type { MagneticState } from "@/hooks";

/** Max distance (px) at which a badge starts reacting to the cursor */
const PROXIMITY_RADIUS = 120;
/** Max tilt in degrees for the hovered badge */
const MAX_TILT = 12;
/** Max translation (px) "magnetic pull" toward cursor */
const MAX_TRANSLATE = 3;

export interface SkillBadgeProps {
  name: string;
  index?: number;
  className?: string;
  /** Container-relative mouse state from useMagneticGroup */
  mouse?: MagneticState;
}

export function SkillBadge({
  name,
  index = 0,
  className,
  mouse,
}: SkillBadgeProps) {
  const reduced = useReducedMotion();
  const iconPath = SKILL_ICONS[name];
  const badgeRef = useRef<HTMLSpanElement>(null);

  // Compute proximity-based transforms
  const { tiltX, tiltY, translateX, translateY, glowX, glowY, proximity } =
    useMemo(() => {
      if (!mouse?.active || !badgeRef.current || reduced) {
        return {
          tiltX: 0,
          tiltY: 0,
          translateX: 0,
          translateY: 0,
          glowX: 50,
          glowY: 50,
          proximity: 0,
        };
      }

      const el = badgeRef.current;
      // offsetLeft/Top are relative to the offsetParent (the container
      // with position:relative from the flex-wrap div in SkillCategory).
      const centerX = el.offsetLeft + el.offsetWidth / 2;
      const centerY = el.offsetTop + el.offsetHeight / 2;

      const dx = mouse.x - centerX;
      const dy = mouse.y - centerY;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance > PROXIMITY_RADIUS) {
        return {
          tiltX: 0,
          tiltY: 0,
          translateX: 0,
          translateY: 0,
          glowX: 50,
          glowY: 50,
          proximity: 0,
        };
      }

      // 1 = right on top, 0 = at the edge of proximity
      const factor = 1 - distance / PROXIMITY_RADIUS;
      // Ease the factor for smoother falloff
      const eased = factor * factor;

      // Tilt: rotateX is the opposite of dy (tilts "toward" cursor)
      const tiltAmountX = -(dy / PROXIMITY_RADIUS) * MAX_TILT * eased;
      const tiltAmountY = (dx / PROXIMITY_RADIUS) * MAX_TILT * eased;

      // Subtle magnetic pull toward cursor
      const tx = (dx / PROXIMITY_RADIUS) * MAX_TRANSLATE * eased;
      const ty = (dy / PROXIMITY_RADIUS) * MAX_TRANSLATE * eased;

      // Glow position as percentage within the badge
      const relX = ((mouse.x - el.offsetLeft) / el.offsetWidth) * 100;
      const relY = ((mouse.y - el.offsetTop) / el.offsetHeight) * 100;

      return {
        tiltX: tiltAmountX,
        tiltY: tiltAmountY,
        translateX: tx,
        translateY: ty,
        glowX: Math.max(0, Math.min(100, relX)),
        glowY: Math.max(0, Math.min(100, relY)),
        proximity: eased,
      };
    }, [mouse?.active, mouse?.x, mouse?.y, reduced]);

  // Spring-smoothed values for buttery animations
  const springConfig = { stiffness: 300, damping: 25, mass: 0.5 };
  const smoothTiltX = useSpring(tiltX, springConfig);
  const smoothTiltY = useSpring(tiltY, springConfig);
  const smoothTx = useSpring(translateX, springConfig);
  const smoothTy = useSpring(translateY, springConfig);
  const smoothProximity = useSpring(proximity, springConfig);

  // Derive scale from proximity (1 -> 1.08 at peak)
  const scale = useTransform(smoothProximity, [0, 1], [1, 1.08]);

  // Derive glow opacity from proximity
  const glowOpacity = useTransform(smoothProximity, [0, 0.3, 1], [0, 0.5, 1]);

  // Derive accent border color from proximity
  const borderColor = useTransform(smoothProximity, (v) =>
    v > 0.05 ? `rgba(6, 182, 212, ${0.4 * v})` : "var(--border)",
  );

  // Derive outer glow shadow from proximity
  const boxShadow = useTransform(smoothProximity, (v) =>
    v > 0.05
      ? `var(--shadow-md), 0 0 ${v * 14}px rgba(6, 182, 212, ${0.12 * v})`
      : "var(--shadow-md)",
  );

  return (
    <motion.span
      ref={badgeRef}
      initial={reduced ? false : { opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: reduced ? 0 : ANIMATION.duration.fast,
        delay: reduced ? 0 : index * 0.03,
      }}
      className="inline-flex"
      style={{ perspective: reduced ? undefined : 600 }}
    >
      <motion.div
        style={
          reduced
            ? undefined
            : {
                rotateX: smoothTiltX,
                rotateY: smoothTiltY,
                x: smoothTx,
                y: smoothTy,
                scale,
              }
        }
      >
        <motion.div
          className={cn(
            "relative rounded-lg px-3 py-1.5 overflow-hidden",
            "backdrop-blur-xl backdrop-saturate-150 border",
            "bg-[var(--bg-glass-inner)]",
            "glass-noise glass-gradient glass-inner-highlight",
            "text-xs font-medium text-[var(--text-secondary)]",
            "cursor-pointer",
            className,
          )}
          style={
            reduced
              ? undefined
              : {
                  borderColor,
                  boxShadow,
                }
          }
        >
          {/* Radiant glow overlay — follows cursor position */}
          {!reduced && (
            <motion.div
              className="skill-glow-overlay"
              style={{
                opacity: glowOpacity,
                background: `radial-gradient(circle at ${glowX}% ${glowY}%, var(--accent) 0%, var(--accent-glow) 40%, transparent 70%)`,
              }}
              aria-hidden="true"
            />
          )}
          <div className="relative z-[1] inline-flex items-center gap-1.5">
            {iconPath && (
              <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                className={cn(
                  "w-4 h-4 shrink-0 transition-colors duration-200",
                  proximity > 0.3 && "text-[var(--accent)]",
                )}
                aria-hidden="true"
              >
                <path d={iconPath} />
              </svg>
            )}
            <span
              className={cn(
                "transition-colors duration-200",
                proximity > 0.3 && "text-[var(--text-primary)]",
              )}
            >
              {name}
            </span>
          </div>
        </motion.div>
      </motion.div>
    </motion.span>
  );
}
