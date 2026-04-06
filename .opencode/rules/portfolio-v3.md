# Portfolio V3 - Project Rules

These rules apply to ALL work on this portfolio project. Read SPEC.md for full
technical specification. These rules are the non-negotiable guardrails.

## Source of Truth

- `SPEC.md` is the authoritative specification. If you're unsure about a
  design decision, check the spec first.
- The JSON resume data provided by the owner is the canonical source for all
  career content. It is pasted in the initial conversation and also reflected
  in `src/data/` files.

## Tech Stack (Do Not Deviate)

- Vite 6 + React 19 + TypeScript 5.7+
- Tailwind CSS v4 (CSS-first config)
- Framer Motion for all UI animations
- React Three Fiber + Drei for 3D background only
- i18next + react-i18next for i18n
- Lucide React for icons (tree-shakeable, one import per icon)
- clsx + tailwind-merge via `cn()` utility
- Yarn as package manager

**Do NOT add**: UI component libraries (Ant Design, MUI, Radix, shadcn),
state management libraries (Redux, Zustand, Jotai), CSS preprocessors
(LESS, SASS), routers (react-router), form libraries, analytics libraries.

## Import Aliases

Always use `@/` alias for imports. Never use relative paths that go up more
than one level (`../../`).

```ts
// Good
import { GlassCard } from "@/components/ui";
import { useTheme } from "@/hooks";
import type { AppId } from "@/types";

// Bad
import { GlassCard } from "../../ui/GlassCard";
```

## Component Rules

### Structure

- One exported component per file
- Named exports only, never `export default` (except for lazy loading entry points)
- Props interface exported and named `{Component}Props`
- `className` prop on all layout/container components
- Composition via `children` over config props

### Size Limits

- Components: max ~150 lines. Split if larger.
- Hooks: max ~80 lines. Compose smaller hooks if larger.
- Utility functions: max ~50 lines per function.
- Type files: max ~100 lines. Split by domain.
- Locale files: exception - can be longer (pure data).

### Separation of Concerns

- `components/ui/` = Presentational. Zero business logic, zero context usage.
  Props in, JSX out.
- `components/desktop/`, `components/window/` = Structural. May use context.
  Define layout and interaction patterns.
- `components/apps/` = Container. Compose UI components with data. Connect
  context/data to presentational components.
- `data/` = Static content (experience, skills, education). Language-agnostic.
- `i18n/locales/` = Translatable strings. All user-visible text lives here.
- `types/` = Shared TypeScript interfaces. No runtime code.
- `hooks/` = Custom hooks. One behavior per hook.
- `constants/` = App-wide constants (app registry, social links).

### Naming

- Components: PascalCase files and exports (`Window.tsx`, `DockIcon.tsx`)
- Hooks: camelCase with `use` prefix (`useWindowManager.ts`)
- Utils: camelCase (`cn.ts`, `format.ts`)
- Types: PascalCase (`WindowState`, `AppDefinition`)
- Constants: SCREAMING_SNAKE_CASE (`APP_DEFINITIONS`, `SOCIAL_LINKS`)
- CSS variables: kebab-case (`--bg-primary`, `--accent`)
- i18n keys: dot-separated lowercase (`apps.profile.title`)

## State Management Rules

- Window state: `WindowContext` + `useReducer` only
- Theme state: `ThemeContext` + `useState` only
- i18n: i18next built-in (no custom context)
- Everything else: local `useState` in the component that owns it
- Never prop-drill beyond 2 levels - use context or composition instead
- No Redux, no Zustand, no external state libraries

## Animation Rules

- All UI animations use Framer Motion
- 3D animations use R3F `useFrame`
- Simple hover/transitions use CSS transitions (no JS)
- Use shared animation tokens from constants (spring configs, durations)
- Every animated component must check `useReducedMotion()` and provide
  instant fallback
- Never animate layout properties (width, height) directly - use
  `transform` and `opacity`

## Styling Rules

- Tailwind utility classes for all styling
- Use `cn()` utility for conditional classes
- CSS variables for theme-dependent values (colors, shadows)
- No inline styles except for truly dynamic values (z-index from state,
  position from drag)
- Use `text-start`/`text-end` instead of `text-left`/`text-right` (RTL)
- Use logical properties where possible (`ms-`, `me-`, `ps-`, `pe-`)

## Accessibility Rules

- All interactive elements must be keyboard accessible
- Dock icons: `role="button"`, `aria-label`, `aria-pressed`
- Windows: `role="dialog"`, `aria-labelledby`, `aria-modal`
- 3D canvas: `aria-hidden="true"`
- Never rely on color alone for information
- Minimum WCAG AA contrast ratio (4.5:1)

## Performance Rules

- Lazy load all app components (`React.lazy`)
- Lazy load 3D scene
- Hide 3D scene on mobile (< 768px)
- Keep Three.js triangle count < 2000
- `dpr` capped at `[1, 1.5]` for R3F canvas
- No unnecessary re-renders: avoid inline object/array literals in props
- Use `useMemo`/`useCallback` only when there's a measured need

## File Organization

- Barrel exports (`index.ts`) in each directory for clean imports
- Co-locate related files (component + its sub-components in same directory)
- No circular dependencies between directories
- `types/` depends on nothing
- `constants/` depends on `types/` only
- `data/` depends on `types/` only
- `hooks/` depends on `types/`, `context/`
- `context/` depends on `types/`, `hooks/`
- `components/ui/` depends on `utils/` only
- `components/apps/` depends on everything above

## Git Rules

- All work on `v3` branch
- Do not touch `master` or `v2` branches
- Commit frequently with descriptive messages
- Do not commit node_modules, dist, or .env files
