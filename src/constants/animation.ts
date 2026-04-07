/** Shared animation tokens for consistent motion across the app */
export const ANIMATION = {
  spring: {
    gentle: { type: "spring" as const, stiffness: 200, damping: 20 },
    snappy: { type: "spring" as const, stiffness: 300, damping: 25 },
    bouncy: { type: "spring" as const, stiffness: 400, damping: 15 },
  },
  duration: {
    fast: 0.15,
    normal: 0.3,
    slow: 0.5,
  },
  ease: {
    easeOut: [0.0, 0.0, 0.2, 1] as const,
    easeInOut: [0.4, 0.0, 0.2, 1] as const,
  },
} as const;
