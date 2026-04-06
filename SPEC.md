# Portfolio V3 - Technical Specification

## Table of Contents

1. [Overview](#1-overview)
2. [Design Philosophy](#2-design-philosophy)
3. [Tech Stack](#3-tech-stack)
4. [Architecture Principles](#4-architecture-principles)
5. [Project Structure](#5-project-structure)
6. [Type System](#6-type-system)
7. [Component Architecture](#7-component-architecture)
8. [State Management](#8-state-management)
9. [3D Background System](#9-3d-background-system)
10. [Window System](#10-window-system)
11. [Desktop Shell](#11-desktop-shell)
12. [App Sections](#12-app-sections)
13. [Theme System](#13-theme-system)
14. [Internationalization](#14-internationalization)
15. [Animation Strategy](#15-animation-strategy)
16. [Responsive Design](#16-responsive-design)
17. [Performance](#17-performance)
18. [Accessibility](#18-accessibility)
19. [Data Layer](#19-data-layer)
20. [Configuration](#20-configuration)
21. [Build & Deploy](#21-build--deploy)
22. [Cleanup Checklist](#22-cleanup-checklist)
23. [Implementation Phases](#23-implementation-phases)

---

## 1. Overview

### 1.1 Concept

A neo-skeuomorphic desktop OS interface where the portfolio is presented as an
interactive desktop environment. Visitors interact with "app windows" launched
from a dock, rather than scrolling through a traditional single-page layout.

### 1.2 Owner

- **Name**: Jihad Al-Khurfan
- **Title**: Senior Software Engineer
- **Email**: jalkhurfan@gmail.com
- **Phone**: +961 76 380 589
- **Website**: jalkhurfan.com
- **LinkedIn**: linkedin.com/in/jalkhurfan
- **GitHub**: github.com/jKh98

### 1.3 Goals

- Break away from the generic scrolling SPA portfolio pattern
- Showcase technical skill through the portfolio itself
- Modern, memorable, and professional
- Clean codebase that reflects engineering quality
- Bilingual (EN + AR with RTL)
- Performant with graceful degradation

---

## 2. Design Philosophy

### 2.1 Neo-Skeuomorphism

Not retro skeuomorphism (leather textures, drop shadows everywhere), but a
modern interpretation:

- **Frosted glass** (backdrop-blur) for window surfaces
- **Layered depth** via soft, multi-layer box-shadows
- **Tactile interactions** - elements respond to hover/click with subtle scale,
  lift, and glow
- **Physical metaphors** - windows, dock, desktop, traffic-light buttons
- **Material consistency** - glass surfaces, metallic accents, consistent light
  source (top-left)

### 2.2 Color Palette

#### Dark Theme (Default)

| Token              | Value                       | Usage                 |
| ------------------ | --------------------------- | --------------------- |
| `--bg-primary`     | `#0a0e1a`                   | Desktop background    |
| `--bg-surface`     | `#111827`                   | Window base           |
| `--bg-glass`       | `rgba(17, 24, 39, 0.70)`    | Frosted glass fill    |
| `--bg-glass-hover` | `rgba(17, 24, 39, 0.85)`    | Glass hover state     |
| `--accent`         | `#06b6d4` (cyan-500)        | Links, active, CTA    |
| `--accent-hover`   | `#22d3ee` (cyan-400)        | Accent hover          |
| `--accent-glow`    | `rgba(6, 182, 212, 0.25)`   | Glow effects          |
| `--text-primary`   | `#f1f5f9` (slate-100)       | Headings, body        |
| `--text-secondary` | `#94a3b8` (slate-400)       | Muted text, labels    |
| `--text-tertiary`  | `#64748b` (slate-500)       | Disabled, timestamps  |
| `--border`         | `rgba(148, 163, 184, 0.10)` | Subtle borders        |
| `--border-accent`  | `rgba(6, 182, 212, 0.30)`   | Accent borders        |
| `--shadow-sm`      | `0 1px 2px rgba(0,0,0,0.3)` | Subtle elevation      |
| `--shadow-md`      | Multi-layer (see impl)      | Window shadow         |
| `--shadow-lg`      | Multi-layer (see impl)      | Focused window shadow |

#### Light Theme

Inverted luminance. Background becomes off-white (`#f8fafc`), surfaces become
white with subtle gray borders, text becomes dark, accent stays cyan. Glass
becomes `rgba(255, 255, 255, 0.70)`. 3D scene dims significantly.

### 2.3 Typography

| Usage       | Font                 | Weight   | Size       |
| ----------- | -------------------- | -------- | ---------- |
| Headings    | Inter                | 600, 700 | 1.5-2rem   |
| Body        | Inter                | 400, 500 | 0.875-1rem |
| Code/Mono   | JetBrains Mono       | 400      | 0.8125rem  |
| Arabic body | IBM Plex Sans Arabic | 400, 600 | 0.875-1rem |

### 2.4 Spacing & Sizing

- Base unit: 4px (Tailwind default)
- Window padding: 24px (6 in Tailwind)
- Section gaps: 16-24px
- Border radius: `rounded-xl` (12px) for windows, `rounded-lg` (8px) for
  cards, `rounded-md` (6px) for buttons/badges
- Max window width: 900px (desktop), 100% (mobile)
- Max window height: 80vh (desktop), 100vh (mobile)

---

## 3. Tech Stack

| Layer       | Technology                                     | Version |
| ----------- | ---------------------------------------------- | ------- |
| Build       | Vite                                           | ^6      |
| Framework   | React                                          | ^19     |
| Language    | TypeScript                                     | ^5.7    |
| Styling     | Tailwind CSS                                   | ^4      |
| 3D          | @react-three/fiber + @react-three/drei + three | latest  |
| Animation   | framer-motion                                  | ^11     |
| i18n        | i18next + react-i18next                        | latest  |
| Icons       | lucide-react                                   | latest  |
| Utilities   | clsx + tailwind-merge                          | latest  |
| Linting     | ESLint (flat config)                           | ^9      |
| Package Mgr | Yarn                                           | ^1      |
| Deploy      | gh-pages                                       | latest  |

### 3.1 Dependency Justification

Every dependency must earn its place:

- **@react-three/fiber + drei**: 3D background scene. No lighter alternative
  provides the same declarative React integration.
- **framer-motion**: Window open/close/drag animations, dock hover effects,
  boot sequence. The most ergonomic animation library for React.
- **i18next**: Proven i18n solution, supports RTL detection, interpolation,
  namespaces.
- **lucide-react**: Tree-shakeable, consistent icon set. One import per icon.
- **clsx + tailwind-merge**: Conditional class composition without conflicts.
  `cn()` utility pattern.
- **gh-pages**: One-command deploy to GitHub Pages. Already proven in this repo.

### 3.2 What We Are NOT Using

| Excluded         | Reason                                         |
| ---------------- | ---------------------------------------------- |
| Ant Design       | Heavy, opinionated. We're building custom UI.  |
| Radix UI         | No complex form/modal primitives needed.       |
| Redux            | Overkill. React Context + useReducer suffices. |
| react-router     | Single "page" with window-based navigation.    |
| Formspree        | No contact form. Links-only contact.           |
| reCAPTCHA        | No form, no need.                              |
| LESS/SASS        | Tailwind handles all styling.                  |
| Gulp             | No CSS preprocessing needed.                   |
| Google Analytics | Can be added later if needed. Not core.        |

---

## 4. Architecture Principles

### 4.1 SOLID in React Context

#### Single Responsibility Principle (SRP)

- **One component = one reason to change.** A `Window` component handles window
  chrome (title bar, frame, shadow). It does NOT know what content is inside.
- **Hooks encapsulate one behavior.** `useWindowManager` handles window state.
  `useTheme` handles theme. They don't overlap.
- **Data files are separate from components.** Resume data lives in `data/`,
  not embedded in JSX.

#### Open/Closed Principle (OCP)

- **The Window system is open for extension, closed for modification.** New
  "apps" (windows) are added by creating a new component and registering it in
  the app registry. No changes to `Window`, `Dock`, or `WindowManager` needed.
- **The theme system uses CSS variables.** Adding a new theme means adding a new
  set of variable values, not changing component code.

#### Liskov Substitution Principle (LSP)

- **All app components conform to the same interface.** Any component that
  implements `AppComponent` can be rendered inside a `Window`. They are
  interchangeable from the window system's perspective.
- **Shared component props are consistent.** A `GlassCard` accepts the same
  `className` + `children` pattern as any other container.

#### Interface Segregation Principle (ISP)

- **Props interfaces are minimal.** Components only accept the props they use.
  No "god props" objects passed through layers.
- **Context is split by concern.** `ThemeContext` and `WindowContext` are
  separate. A component that only needs theme doesn't subscribe to window state
  changes.

#### Dependency Inversion Principle (DIP)

- **Components depend on abstractions, not concrete data.** `ExperienceTimeline`
  receives `ExperienceItem[]` via props, not a hardcoded import from `data/`.
- **The window system depends on an `AppDefinition` interface**, not on specific
  app implementations. The registry maps app IDs to lazy-loaded components.

### 4.2 React Best Practices

#### Component Patterns

- **Presentational vs. Container separation.** Presentational components in
  `components/ui/` receive data via props and render UI. Container components
  in `components/apps/` compose presentational components and connect to
  context/data.
- **Composition over configuration.** Use `children` and render props instead
  of massive prop objects. A `Window` renders `{children}`, not a `content`
  prop.
- **Custom hooks for all non-trivial logic.** If a component has more than ~5
  lines of logic before the return, extract to a hook.
- **Forward refs on interactive primitives** for accessibility and composition.

#### File Organization

- **One exported component per file.** Small helper components used only within
  a file are fine to co-locate, but not exported.
- **Index files for clean imports.** Each directory with multiple related files
  has an `index.ts` barrel export.
- **Co-located tests** (when added): `Component.test.tsx` next to
  `Component.tsx`.

#### Naming Conventions

- **Components**: PascalCase (`Window.tsx`, `DockIcon.tsx`)
- **Hooks**: camelCase with `use` prefix (`useWindowManager.ts`)
- **Utils**: camelCase (`cn.ts`, `formatDate.ts`)
- **Types**: PascalCase, suffixed with descriptive name (`WindowState`,
  `AppDefinition`)
- **Constants**: SCREAMING_SNAKE_CASE in `constants/` files
- **CSS variables**: kebab-case with `--` prefix

#### Performance Patterns

- **React.lazy + Suspense** for app components (code-split per window)
- **useMemo / useCallback** only when there's a measured need (not prematurely)
- **Avoid prop drilling** beyond 2 levels - use context or composition
- **Key prop stability** - use stable IDs, never array indices for dynamic lists
- **Avoid inline object/array literals in props** when they cause re-renders

### 4.3 File Size Guidelines

- **Components**: Max ~150 lines. If larger, split into sub-components.
- **Hooks**: Max ~80 lines. If larger, compose smaller hooks.
- **Type files**: Max ~100 lines per file. Split by domain.
- **Locale files**: Exception - these can be longer since they're pure data.
- **Utils**: Max ~50 lines per function. One function per file if complex.

---

## 5. Project Structure

```
portfolio/
├── index.html                          # Vite entry HTML
├── vite.config.ts                      # Vite config with path aliases
├── tailwind.config.ts                  # Tailwind v4 config (if needed beyond CSS)
├── tsconfig.json                       # TypeScript config
├── tsconfig.app.json                   # App-specific TS config
├── tsconfig.node.json                  # Node (vite config) TS config
├── eslint.config.js                    # ESLint 9 flat config
├── package.json
├── yarn.lock
├── SPEC.md                             # This file
├── .gitignore
│
├── public/
│   ├── CNAME                           # jalkhurfan.com
│   ├── favicon.ico
│   └── assets/
│       ├── documents/
│       │   ├── jihad_alkhurfan_resume_2025.pdf
│       │   └── jihad_alkhurfan_resume_2025_detailed.pdf
│       └── images/
│           └── profile.jpeg
│
└── src/
    ├── main.tsx                         # React root mount + providers
    ├── App.tsx                          # Root layout: 3D bg + Desktop shell
    ├── index.css                        # Tailwind directives + CSS vars + fonts
    ├── vite-env.d.ts                    # Vite type reference
    │
    ├── types/                           # Shared type definitions
    │   ├── index.ts                     # Barrel export
    │   ├── window.ts                    # WindowId, WindowState, AppDefinition
    │   ├── resume.ts                    # Experience, Education, Skill, etc.
    │   └── theme.ts                     # Theme, ThemeMode
    │
    ├── constants/                       # App-wide constants
    │   ├── index.ts                     # Barrel export
    │   ├── apps.ts                      # App registry: id, icon, label, component
    │   └── social.ts                    # Social links data
    │
    ├── data/                            # Static content data (resume, etc.)
    │   ├── index.ts                     # Barrel export
    │   ├── experience.ts                # Work experience entries
    │   ├── education.ts                 # Education entries
    │   ├── skills.ts                    # Skills by category
    │   └── certificates.ts              # Certifications
    │
    ├── hooks/                           # Custom React hooks
    │   ├── index.ts                     # Barrel export
    │   ├── useWindowManager.ts          # Window CRUD operations
    │   ├── useTheme.ts                  # Theme read/toggle
    │   ├── useReducedMotion.ts          # prefers-reduced-motion detection
    │   ├── useCopyToClipboard.ts        # Clipboard API wrapper
    │   └── useIsMobile.ts              # Responsive breakpoint detection
    │
    ├── context/                         # React contexts
    │   ├── index.ts                     # Barrel export
    │   ├── ThemeProvider.tsx            # Theme context + provider
    │   └── WindowProvider.tsx           # Window manager context + provider
    │
    ├── i18n/                            # Internationalization
    │   ├── index.ts                     # i18next initialization
    │   ├── locales/
    │   │   ├── en.ts                    # English strings
    │   │   └── ar.ts                    # Arabic strings
    │   └── useDirection.ts              # RTL/LTR detection hook
    │
    ├── utils/                           # Pure utility functions
    │   ├── cn.ts                        # clsx + tailwind-merge
    │   └── format.ts                    # Date formatting, etc.
    │
    └── components/
        ├── ui/                          # Presentational primitives (no business logic)
        │   ├── index.ts                 # Barrel export
        │   ├── GlassCard.tsx            # Frosted glass container
        │   ├── Badge.tsx                # Tag/badge component
        │   ├── IconButton.tsx           # Icon-only button with tooltip
        │   ├── Tooltip.tsx              # Hover tooltip
        │   ├── CopyButton.tsx           # Copy-to-clipboard button
        │   └── SkeletonLoader.tsx       # Loading placeholder
        │
        ├── background/                  # 3D background system
        │   ├── Scene3D.tsx              # R3F Canvas wrapper
        │   ├── FloatingShapes.tsx       # Animated polyhedra
        │   ├── ParticleField.tsx        # Subtle particle effect
        │   └── Lighting.tsx             # Scene lighting setup
        │
        ├── desktop/                     # Desktop OS shell
        │   ├── Desktop.tsx              # Main desktop layout
        │   ├── TopBar.tsx               # Menu bar (name, clock, toggles)
        │   ├── Dock.tsx                 # Bottom dock bar
        │   ├── DockIcon.tsx             # Individual dock icon
        │   └── BootSequence.tsx         # Startup animation
        │
        ├── window/                      # Window system
        │   ├── Window.tsx               # Window frame (glass, shadow, title bar)
        │   ├── WindowHeader.tsx         # Title bar with controls
        │   └── WindowContent.tsx        # Scrollable content area
        │
        └── apps/                        # Portfolio section "apps"
            ├── registry.ts              # Lazy-loaded app component registry
            ├── profile/
            │   ├── ProfileApp.tsx        # Container: composes profile sub-components
            │   ├── ProfileHeader.tsx     # Photo + name + title + summary
            │   ├── StatsRow.tsx          # Experience/projects/tech stats
            │   ├── EducationList.tsx     # Education entries
            │   ├── CertificateList.tsx   # Certification badges
            │   └── TrustedBy.tsx         # Company logos strip
            │
            ├── experience/
            │   ├── ExperienceApp.tsx     # Container: composes timeline
            │   ├── ExperienceTimeline.tsx # Vertical timeline layout
            │   └── ExperienceCard.tsx    # Single role card (expandable)
            │
            ├── skills/
            │   ├── SkillsApp.tsx         # Container: composes skill categories
            │   ├── SkillCategory.tsx     # Single category with badges
            │   └── SkillBadge.tsx        # Individual skill pill
            │
            └── contact/
                ├── ContactApp.tsx        # Container: composes contact links
                ├── ContactLink.tsx       # Single link with icon + copy
                └── ContactInfo.tsx       # Name, title, availability message
```

### 5.1 Import Aliases

Configured in `vite.config.ts` and `tsconfig.json`:

```
@/          -> src/
@/components -> src/components/
@/hooks      -> src/hooks/
@/context    -> src/context/
@/types      -> src/types/
@/data       -> src/data/
@/constants  -> src/constants/
@/utils      -> src/utils/
@/i18n       -> src/i18n/
```

---

## 6. Type System

### 6.1 Window Types (`types/window.ts`)

```ts
/** Unique identifier for each app window */
export type AppId = "profile" | "experience" | "skills" | "contact";

/** Runtime state of a single window */
export interface WindowState {
  id: AppId;
  isOpen: boolean;
  isMinimized: boolean;
  isFocused: boolean;
  zIndex: number;
  /** Position override from dragging (desktop only) */
  position?: { x: number; y: number };
}

/** Static definition of an app for the registry */
export interface AppDefinition {
  id: AppId;
  /** i18n key for the window title */
  titleKey: string;
  /** Lucide icon name */
  icon: string;
  /** Lazy-loaded React component */
  component: React.LazyExoticComponent<React.ComponentType>;
}

/** Actions dispatched to the window reducer */
export type WindowAction =
  | { type: "OPEN"; id: AppId }
  | { type: "CLOSE"; id: AppId }
  | { type: "MINIMIZE"; id: AppId }
  | { type: "RESTORE"; id: AppId }
  | { type: "FOCUS"; id: AppId }
  | { type: "UPDATE_POSITION"; id: AppId; position: { x: number; y: number } }
  | { type: "CLOSE_ALL" };

/** The window manager context value */
export interface WindowManagerContextValue {
  windows: Record<AppId, WindowState>;
  /** Ordered list of AppIds by z-index (last = top) */
  windowOrder: AppId[];
  dispatch: React.Dispatch<WindowAction>;
  /** Convenience methods */
  openWindow: (id: AppId) => void;
  closeWindow: (id: AppId) => void;
  minimizeWindow: (id: AppId) => void;
  restoreWindow: (id: AppId) => void;
  focusWindow: (id: AppId) => void;
}
```

### 6.2 Resume Types (`types/resume.ts`)

```ts
export interface Experience {
  id: string;
  company: string;
  companyUrl: string;
  position: string;
  location: string;
  startDate: string; // ISO date string
  endDate?: string; // undefined = "Present"
  highlights: string[];
  /** Tags for key technologies used in this role */
  tags?: string[];
}

export interface Education {
  institution: string;
  institutionUrl: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
}

export interface Certificate {
  name: string;
  issuer: string;
  date: string;
  url: string;
}

export interface SkillCategory {
  /** i18n key for category name */
  nameKey: string;
  skills: string[];
}

export interface SocialLink {
  platform: string;
  url: string;
  /** Lucide icon name */
  icon: string;
  /** Value to display (username, email, etc.) */
  displayValue: string;
  /** Whether this is copyable (e.g., email) */
  copyable?: boolean;
}
```

### 6.3 Theme Types (`types/theme.ts`)

```ts
export type ThemeMode = "dark" | "light";

export interface ThemeContextValue {
  theme: ThemeMode;
  toggleTheme: () => void;
  setTheme: (mode: ThemeMode) => void;
}
```

---

## 7. Component Architecture

### 7.1 Component Categories

#### Presentational (`components/ui/`)

- Receive ALL data via props
- Zero business logic, zero context consumption
- Pure rendering + CSS
- Highly reusable
- Examples: `GlassCard`, `Badge`, `IconButton`, `Tooltip`

#### Structural (`components/desktop/`, `components/window/`)

- Define layout and interaction patterns
- May consume context (window state, theme)
- Not tied to specific content
- Examples: `Desktop`, `Dock`, `Window`, `TopBar`

#### Container (`components/apps/`)

- Compose presentational + structural components
- Connect data (from `data/` imports or context) to presentational components
- Each "app" is a container that assembles its sub-components
- Examples: `ProfileApp`, `ExperienceApp`

### 7.2 Component Contracts

Every component follows this pattern:

```tsx
// 1. Type definition for props (exported for consumers)
export interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  hoverable?: boolean;
}

// 2. Component implementation (named export, no default exports)
export function GlassCard({
  children,
  className,
  hoverable = false,
}: GlassCardProps) {
  return (
    <div
      className={cn(
        "rounded-xl backdrop-blur-md ...",
        hoverable && "hover:...",
        className,
      )}
    >
      {children}
    </div>
  );
}
```

Rules:

- Named exports only (no `export default`). Enables consistent imports and
  better tree-shaking.
- Props interface is always exported and named `{Component}Props`.
- `className` prop on all layout/container components for composition.
- `children` over render props over config props.

---

## 8. State Management

### 8.1 State Strategy

| State                    | Solution                         | Reason                      |
| ------------------------ | -------------------------------- | --------------------------- |
| Window open/close/focus  | `WindowContext` + `useReducer`   | Multiple components need it |
| Theme mode               | `ThemeContext` + `useState`      | Global, persisted           |
| i18n language            | i18next built-in state           | Managed by library          |
| Boot sequence shown      | `sessionStorage` + local state   | One-time per session        |
| Expanded experience      | Local `useState` in card         | Component-scoped            |
| Clipboard feedback       | Local `useState` in copy button  | Component-scoped            |
| Dock hover magnification | Local `useState` + framer motion | Component-scoped            |

### 8.2 Window Reducer

The `useReducer` pattern for window state ensures predictable state transitions:

```ts
function windowReducer(
  state: WindowManagerState,
  action: WindowAction,
): WindowManagerState {
  switch (action.type) {
    case "OPEN":
    // Set isOpen=true, isFocused=true, isMinimized=false
    // Push to top of windowOrder
    case "CLOSE":
    // Set isOpen=false, isFocused=false
    // Remove from windowOrder, focus next top window
    case "MINIMIZE":
    // Set isMinimized=true, isFocused=false
    // Focus next visible window
    case "RESTORE":
    // Set isMinimized=false, isFocused=true
    // Push to top of windowOrder
    case "FOCUS":
    // Set isFocused=true for target, false for all others
    // Move to top of windowOrder
    case "CLOSE_ALL":
    // Close all windows
  }
}
```

### 8.3 Context Boundaries

```
<ThemeProvider>          ← Theme state (dark/light)
  <WindowProvider>       ← Window manager state
    <App />              ← Desktop + 3D + Windows
  </WindowProvider>
</ThemeProvider>
```

i18next is initialized as a side effect in `i18n/index.ts` and accessed via
`useTranslation()` hook - no context provider needed.

---

## 9. 3D Background System

### 9.1 Architecture

The 3D background is a **fixed, full-viewport R3F Canvas** rendered behind the
desktop UI. It is purely decorative and does not affect interactivity.

```
<div className="fixed inset-0 -z-10">
  <Canvas>
    <Lighting />
    <FloatingShapes />
    <ParticleField />
  </Canvas>
</div>
```

### 9.2 Components

#### `Scene3D.tsx`

- Wraps `<Canvas>` with responsive settings
- Sets `camera`, `dpr`, `frameloop` props
- Handles Suspense fallback (empty/null)
- Conditionally renders nothing if `prefers-reduced-motion` is active

#### `FloatingShapes.tsx`

- 5-8 semi-transparent polyhedra (icosahedrons, octahedrons, dodecahedrons)
- Randomized positions in 3D space (spread across viewport)
- Slow rotation animation via `useFrame`
- Subtle drift/float using sine wave oscillation
- Material: `MeshStandardMaterial` with low opacity (0.08-0.15), wireframe
  option, accent color tint
- Each shape is its own `<mesh>` - no instancing needed for this count

#### `ParticleField.tsx`

- 50-100 small dots scattered in space
- Very slow drift animation
- Near-invisible (`opacity: 0.1-0.2`) to add subtle depth
- Uses `<Points>` from drei for efficiency

#### `Lighting.tsx`

- Ambient light (low intensity: 0.3-0.5)
- One point light (accent color, subtle)
- Adapts intensity based on theme (dimmer in light mode)

### 9.3 Performance Constraints

- Total triangle count: < 2000
- Frame rate target: 30fps (not 60 - it's ambient, not interactive)
- `frameloop="demand"` when no animations are active
- `dpr` capped at `[1, 1.5]` to avoid retina overhead
- Canvas is hidden entirely on mobile (< 768px) to save battery/GPU
- Wrapped in `React.lazy` + `Suspense` so it doesn't block initial paint

---

## 10. Window System

### 10.1 Window Component

The `Window` component is the core visual element. It renders the
neo-skeuomorphic window frame and delegates content to `children`.

#### Visual Properties

- **Background**: Frosted glass (`backdrop-blur-xl bg-glass`)
- **Border**: 1px subtle border (`border-white/10`)
- **Shadow**: Multi-layer shadow for depth:
  ```css
  box-shadow:
    0 4px 6px rgba(0, 0, 0, 0.1),
    0 10px 30px rgba(0, 0, 0, 0.2),
    0 0 0 1px rgba(255, 255, 255, 0.05) inset;
  ```
- **Border radius**: `rounded-xl` (12px)
- **Focused state**: Brighter shadow, accent glow on border
- **Unfocused state**: Dimmed opacity (0.85), muted shadow

#### Behavior

- **Open animation**: Scale from 0.9 + opacity 0 -> 1, spring physics
- **Close animation**: Scale to 0.95 + opacity 0, quicker ease-out
- **Minimize animation**: Scale down + translate toward dock position
- **Draggable** (desktop only): Title bar is drag handle. Uses framer-motion
  `drag` prop with bounds constrained to viewport.
- **Focus on click**: Any click inside the window dispatches `FOCUS` action
- **Scrollable content**: `WindowContent` has `overflow-y: auto` with styled
  scrollbar

#### Props

```ts
export interface WindowProps {
  appId: AppId;
  title: string;
  children: React.ReactNode;
  className?: string;
}
```

The window reads its own state (isOpen, isFocused, zIndex, position) from
`WindowContext` using its `appId`. This avoids prop-drilling window state.

### 10.2 WindowHeader

- Three traffic-light buttons (close = red, minimize = yellow, disabled green)
- Window title text (centered)
- Close dispatches `CLOSE` action
- Minimize dispatches `MINIMIZE` action
- Title bar is the drag handle (via `dragControls` from framer-motion)

### 10.3 WindowContent

- Simple scrollable container (`overflow-y-auto`)
- Custom scrollbar styling (thin, accent-colored thumb)
- Padding applied here (not in Window frame) so content scrolls under header

---

## 11. Desktop Shell

### 11.1 Desktop Layout

```
┌─────────────────────────────────────────────┐
│ TopBar: [Name]       [Clock]   [Theme][Lang]│
├─────────────────────────────────────────────┤
│                                             │
│              3D Background                  │
│                                             │
│         ┌──────────────────┐                │
│         │   Window(s)      │                │
│         │                  │                │
│         │                  │                │
│         └──────────────────┘                │
│                                             │
│                                             │
├─────────────────────────────────────────────┤
│ Dock: [Profile][Experience][Skills][Contact] │
└─────────────────────────────────────────────┘
```

### 11.2 TopBar

- Fixed at top, full width, height: 32px
- Semi-transparent glass background
- Left: Owner name ("Jihad Al-Khurfan") in small text
- Center: Live clock (HH:MM format, updates every minute)
- Right: Theme toggle (sun/moon icon) + Language switcher (EN/AR button)
- z-index above windows

### 11.3 Dock

- Fixed at bottom, centered horizontally
- Glass background with rounded-2xl border
- Horizontal row of `DockIcon` components
- Padding: 8px vertical, 12px horizontal
- Gap between icons: 8px

#### DockIcon

- Base size: 48px
- Icon from lucide-react
- **Hover magnification**: Scale up to 1.4x with spring animation. Adjacent
  icons scale to 1.2x (proximity-based magnification like macOS dock).
- **Active indicator**: Small dot below icon when window is open
- **Bounce animation**: Brief bounce when window opens
- **Tooltip**: App name appears above on hover
- Click dispatches `OPEN` (or `FOCUS` if already open, `RESTORE` if minimized)

### 11.4 BootSequence

- Renders a full-screen overlay on mount
- Sequence:
  1. Black screen (200ms)
  2. Fade in monospace text: `> jalkhurfan.com` with typing effect (800ms)
  3. Subtle loading indicator (600ms)
  4. Fade out overlay (400ms)
  5. Profile window auto-opens
- Total duration: ~2 seconds
- Checks `sessionStorage.getItem("booted")` - skips if already played
- Sets `sessionStorage.setItem("booted", "true")` after completion
- Respects `prefers-reduced-motion`: skips animation, just auto-opens profile

---

## 12. App Sections

### 12.1 App Registry (`constants/apps.ts`)

```ts
import type { AppDefinition } from "@/types";

export const APP_DEFINITIONS: AppDefinition[] = [
  {
    id: "profile",
    titleKey: "apps.profile.title",
    icon: "User",
    component: lazy(() => import("@/components/apps/profile/ProfileApp")),
  },
  {
    id: "experience",
    titleKey: "apps.experience.title",
    icon: "Briefcase",
    component: lazy(() => import("@/components/apps/experience/ExperienceApp")),
  },
  {
    id: "skills",
    titleKey: "apps.skills.title",
    icon: "Code",
    component: lazy(() => import("@/components/apps/skills/SkillsApp")),
  },
  {
    id: "contact",
    titleKey: "apps.contact.title",
    icon: "Mail",
    component: lazy(() => import("@/components/apps/contact/ContactApp")),
  },
];
```

Adding a new app = add an entry here + create the component. No other files
need modification.

### 12.2 Profile App

**Purpose**: Introduction, bio, education, certifications, social proof.

**Layout**:

```
┌──────────────────────────────────────┐
│ [Photo]  Name                        │
│          Title                       │
│          Summary paragraph           │
├──────────────────────────────────────┤
│ [6+ Years] [30+ Projects] [20+ Tech]│
├──────────────────────────────────────┤
│ Education                            │
│  - ASU: MSE Software Engineering     │
│  - AUB: BE Computer & Comm. Eng.    │
├──────────────────────────────────────┤
│ Certifications                       │
│  - Azure Fundamentals               │
├──────────────────────────────────────┤
│ Trusted By                           │
│ [Deloitte] [Revinate] [Klareo] [DGA]│
├──────────────────────────────────────┤
│ [Download Resume]                    │
└──────────────────────────────────────┘
```

**Sub-components**:

- `ProfileHeader`: Photo (rounded-full, accent ring, subtle glow) + name +
  title + summary. Photo is `profile.jpeg` from public/assets.
- `StatsRow`: Three stat cards in a row. Each has a number + label.
- `EducationList`: Maps `education` data to styled entries.
- `CertificateList`: Maps `certificates` data to badge-style entries with
  external link.
- `TrustedBy`: Row of company names/logos. Since we likely don't have logo
  files, use styled text with subtle glass card backgrounds.

**Data source**: `data/education.ts`, `data/certificates.ts`, plus i18n for
text strings.

### 12.3 Experience App

**Purpose**: Career timeline with detailed achievements per role.

**Layout**:

```
┌──────────────────────────────────────┐
│ ● CME - Sr. Fullstack Engineer       │
│   01/2025 - Present | Beirut, LB     │
│   [Click to expand achievements]     │
│   ├ Highlight 1...                   │
│   ├ Highlight 2...                   │
│   └ Highlight 3...                   │
│                                      │
│ ○ CME - Sr. FrontEnd Engineer        │
│   07/2022 - 01/2025 | Beirut, LB     │
│   [Collapsed]                        │
│                                      │
│ ○ CME - Full-Stack Engineer          │
│   06/2021 - 07/2022 | Remote         │
│                                      │
│ ○ areeba - Jr. Full-Stack Engineer   │
│   06/2020 - 06/2021 | Beirut, LB     │
│                                      │
│ ○ TecFrac - Intern/Part-time        │
│   06/2019 - 11/2019 | Beirut, LB     │
│                                      │
│ ○ NAR Technologies - Intern         │
│   12/2018 - 01/2019 | Beirut, LB     │
└──────────────────────────────────────┘
```

**Sub-components**:

- `ExperienceTimeline`: Renders vertical line + maps `Experience[]` to cards.
- `ExperienceCard`: Company, position, date range, location. Expandable
  highlights list (collapsed by default). Current role has accent indicator.
  Uses `AnimatePresence` for smooth expand/collapse.

**Data source**: `data/experience.ts` (6 entries from JSON resume).

### 12.4 Skills App

**Purpose**: Technical skills organized by category.

**Layout**:

```
┌──────────────────────────────────────┐
│ Frontend Development                 │
│ [React] [TypeScript] [Next.js] ...  │
│                                      │
│ Backend Development                  │
│ [Node.js] [NestJS] [Express.js] ... │
│                                      │
│ DevOps & Cloud                       │
│ [Docker] [Kubernetes] [Azure] ...   │
│                                      │
│ Databases & Storage                  │
│ [MongoDB] [PostgreSQL] [MySQL] ...  │
│                                      │
│ Testing                              │
│ [Jest] [Cypress] [Cucumber] ...     │
│                                      │
│ Languages                            │
│ [JavaScript] [TypeScript] [Java] ...│
└──────────────────────────────────────┘
```

**Sub-components**:

- `SkillCategory`: Category heading + row of `SkillBadge` components.
- `SkillBadge`: Pill-shaped badge with subtle glass background. Hover effect:
  slight lift + accent border glow.

**Data source**: `data/skills.ts` (7 categories from JSON resume).

Note: "Other Tools & Libraries" (LaunchDarkly, Keycloak, etc.) is omitted from
the skills display. These are niche tools that are better mentioned in
experience context. Skills section shows broadly recognized technologies only.

### 12.5 Contact App

**Purpose**: Professional contact information with easy copy/link actions.

**Layout**:

```
┌──────────────────────────────────────┐
│ Let's Connect                        │
│ Brief availability message           │
├──────────────────────────────────────┤
│ ✉  jalkhurfan@gmail.com    [Copy]   │
│ 📱  +961 76 380 589        [Copy]   │
│ 🔗  LinkedIn: jalkhurfan   [Open]   │
│ 🐙  GitHub: jKh98          [Open]   │
├──────────────────────────────────────┤
│ Beirut, Lebanon                      │
└──────────────────────────────────────┘
```

**Sub-components**:

- `ContactInfo`: Heading + availability message.
- `ContactLink`: Icon + label + value + action button (copy or external link).
  Uses `useCopyToClipboard` hook for email/phone. Shows "Copied!" feedback.

**Data source**: `constants/social.ts` + i18n strings.

---

## 13. Theme System

### 13.1 Implementation

Theme is managed via CSS variables on the `<html>` element. The `ThemeProvider`
adds/removes a `dark` class.

```css
/* index.css */
:root {
  /* Light theme variables */
  --bg-primary: #f8fafc;
  --bg-surface: #ffffff;
  /* ... */
}

:root.dark {
  /* Dark theme variables */
  --bg-primary: #0a0e1a;
  --bg-surface: #111827;
  /* ... */
}
```

Tailwind classes reference these variables via the theme config.

### 13.2 ThemeProvider

```ts
// Reads initial theme from:
// 1. localStorage ("theme") if previously set
// 2. prefers-color-scheme media query
// 3. Falls back to "dark"
//
// On toggle:
// 1. Updates state
// 2. Sets className on document.documentElement
// 3. Persists to localStorage
```

### 13.3 3D Scene Adaptation

The `Scene3D` component reads theme from context and adjusts:

- Dark: Ambient intensity 0.3, point light intensity 0.5, shape opacity 0.1
- Light: Ambient intensity 0.1, point light intensity 0.2, shape opacity 0.05

---

## 14. Internationalization

### 14.1 Setup

```ts
// i18n/index.ts
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import en from "./locales/en";
import ar from "./locales/ar";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: { en: { translation: en }, ar: { translation: ar } },
    fallbackLng: "en",
    interpolation: { escapeValue: false },
  });
```

### 14.2 RTL Support

- The `useDirection` hook returns `"rtl"` or `"ltr"` based on current language
- `App.tsx` sets `dir` attribute on `<html>`
- Tailwind RTL utilities (`rtl:` prefix) handle layout mirroring
- Dock and TopBar mirror positions in RTL
- Window drag constraints respect RTL
- All text alignment uses `text-start` / `text-end` instead of
  `text-left` / `text-right`

### 14.3 Locale Structure

Locales use a flat-ish key structure organized by section:

```ts
// en.ts
export default {
  // Top bar
  topbar: { ... },

  // Apps
  apps: {
    profile: {
      title: "Profile",
      // ...nested keys for this section
    },
    experience: { ... },
    skills: { ... },
    contact: { ... },
  },

  // Common
  common: {
    close: "Close",
    minimize: "Minimize",
    // ...
  },
};
```

### 14.4 Data vs. i18n Separation

- **Structural data** (dates, URLs, skill lists) lives in `data/` files.
  These do NOT change with language.
- **Display strings** (headings, descriptions, labels) live in locale files.
  These change per language.
- **Experience highlights** are in locale files (since they're translatable
  text), keyed by experience `id`:
  ```ts
  experience: {
    "cme-senior-fullstack": {
      position: "Senior Fullstack Software Engineer",
      highlights: ["...", "...", "..."],
    },
  }
  ```
- **Data files** contain the language-agnostic skeleton:
  ```ts
  { id: "cme-senior-fullstack", company: "CME", startDate: "2025-01-02", ... }
  ```

---

## 15. Animation Strategy

### 15.1 Animation Library Roles

| Animation Type             | Tool           | Reason                              |
| -------------------------- | -------------- | ----------------------------------- |
| Window open/close/drag     | Framer Motion  | `AnimatePresence`, layout, drag     |
| Dock hover magnification   | Framer Motion  | `useSpring`, `useMotionValue`       |
| Boot sequence              | Framer Motion  | Orchestrated timeline               |
| Experience expand/collapse | Framer Motion  | `AnimatePresence` for smooth height |
| 3D shapes rotation         | R3F `useFrame` | Per-frame 3D transform              |
| Tooltip fade               | CSS transition | Simple, no JS overhead              |
| Theme transition           | CSS transition | `transition: background 300ms`      |

### 15.2 Animation Tokens

Consistent spring/timing values across the app:

```ts
export const ANIMATION = {
  spring: {
    gentle: { type: "spring", stiffness: 200, damping: 20 },
    snappy: { type: "spring", stiffness: 300, damping: 25 },
    bouncy: { type: "spring", stiffness: 400, damping: 15 },
  },
  duration: {
    fast: 0.15,
    normal: 0.3,
    slow: 0.5,
  },
  ease: {
    easeOut: [0.0, 0.0, 0.2, 1],
    easeInOut: [0.4, 0.0, 0.2, 1],
  },
} as const;
```

### 15.3 Reduced Motion

All animated components check `useReducedMotion()`:

- If true: `animate` props are bypassed (instant transitions)
- 3D scene is not rendered
- Boot sequence is skipped (just auto-open profile)
- Dock icons don't magnify

---

## 16. Responsive Design

### 16.1 Breakpoints

| Breakpoint | Width    | Behavior                          |
| ---------- | -------- | --------------------------------- |
| Mobile     | < 768px  | Full-screen windows, compact dock |
| Tablet     | 768-1024 | 90% width windows, centered       |
| Desktop    | > 1024px | Draggable windows, full dock      |

### 16.2 Mobile Adaptations

- **Windows**: Full-screen (100vw x 100vh minus TopBar and Dock). No drag.
  One window visible at a time.
- **Dock**: Compact bottom bar. Icons 36px instead of 48px. No magnification
  (tap only).
- **TopBar**: Simplified - name + hamburger with theme/lang in dropdown. Or
  keep minimal with smaller text.
- **3D Background**: Hidden. Pure CSS gradient background instead. Saves GPU
  and battery.
- **Boot sequence**: Shortened (skip typing effect, just fade in).

### 16.3 Touch Interactions

- Tap dock icon to open window
- Swipe down on window header to minimize (optional nice-to-have)
- Tap outside window to unfocus (but don't close)

---

## 17. Performance

### 17.1 Code Splitting

```ts
// Each app is lazy-loaded
const ProfileApp = lazy(() => import("./apps/profile/ProfileApp"));
const ExperienceApp = lazy(() => import("./apps/experience/ExperienceApp"));
// etc.

// 3D scene is lazy-loaded
const Scene3D = lazy(() => import("./background/Scene3D"));
```

### 17.2 Bundle Strategy

Vite manual chunks in `vite.config.ts`:

```ts
manualChunks: {
  "vendor-react": ["react", "react-dom"],
  "vendor-three": ["three", "@react-three/fiber", "@react-three/drei"],
  "vendor-motion": ["framer-motion"],
  "vendor-i18n": ["i18next", "react-i18next"],
}
```

This ensures the large Three.js bundle is only loaded when the 3D scene renders
(lazy), and doesn't block initial paint.

### 17.3 Asset Optimization

- Profile image: Serve as WebP with JPEG fallback. Compress to < 100KB.
- Fonts: Load via `@font-face` with `font-display: swap`. Subset if possible.
- Resume PDFs: Served from `public/assets/` (no bundling).

### 17.4 Targets

| Metric                   | Target                           |
| ------------------------ | -------------------------------- |
| First Contentful Paint   | < 1.5s                           |
| Largest Contentful Paint | < 2.5s                           |
| Time to Interactive      | < 3s                             |
| Bundle (initial)         | < 150KB gzipped (excl. Three.js) |
| Lighthouse Score         | 90+ all categories               |

---

## 18. Accessibility

### 18.1 Semantic Structure

```html
<body>
  <header><!-- TopBar --></header>
  <main><!-- Desktop area with windows --></main>
  <nav><!-- Dock --></nav>
</body>
```

Each window content area uses appropriate sectioning elements (`<section>`,
`<article>`, `<h2>`, `<ul>`, etc.).

### 18.2 Keyboard Navigation

- `Tab` cycles through dock icons
- `Enter` / `Space` opens/focuses window from dock
- `Escape` closes the focused window
- `Tab` within a window cycles through interactive elements
- Focus trap within open windows (focus doesn't escape to background)
- Skip link: "Skip to main content" (hidden, shown on focus)

### 18.3 ARIA

- Dock icons: `role="button"`, `aria-label="Open Profile"`,
  `aria-pressed={isOpen}`
- Windows: `role="dialog"`, `aria-labelledby` pointing to title,
  `aria-modal="true"`
- Close button: `aria-label="Close window"`
- Theme toggle: `aria-label="Switch to light/dark mode"`
- Language switcher: `aria-label="Switch language"`
- 3D canvas: `aria-hidden="true"` (purely decorative)

### 18.4 Color Contrast

- Text on glass surfaces: Ensure WCAG AA contrast ratio (4.5:1 for normal text)
- If glass transparency reduces contrast, add a slightly opaque backdrop or
  text shadow
- Accent color (cyan) on dark: 4.5:1 ratio verified
- Never rely on color alone for information (pair with icons/text)

---

## 19. Data Layer

### 19.1 Experience Data (`data/experience.ts`)

Contains 6 entries from the JSON resume, in reverse chronological order:

1. CME - Senior Fullstack Software Engineer (01/2025 - Present)
2. CME - Senior FrontEnd Software Engineer (07/2022 - 01/2025)
3. CME - Full-Stack Software Engineer (06/2021 - 07/2022)
4. areeba - Junior Full-Stack Software Engineer (06/2020 - 06/2021)
5. TecFrac - Intern/Part-time Software Developer (06/2019 - 11/2019)
6. NAR Technologies - Software Developer Intern (12/2018 - 01/2019)

Each entry has: `id`, `company`, `companyUrl`, `position`, `location`,
`startDate`, `endDate`, `highlights[]`, `tags[]`.

### 19.2 Education Data (`data/education.ts`)

1. Arizona State University - MSE Software Engineering (08/2021 - 06/2023)
2. American University of Beirut - BE Computer & Comm. Eng. (08/2016 - 06/2020)

### 19.3 Skills Data (`data/skills.ts`)

6 categories (dropping "Other Tools & Libraries"):

1. Frontend Development: React, TypeScript, Next.js, Redux Toolkit, MUI,
   Tailwind CSS, Styled Components, Ant Design, Storybook, React Native, Expo,
   Webpack
2. Backend Development: Node.js, NestJS, Express.js, Spring Boot, Spring MVC,
   GraphQL, .NET Core
3. DevOps & Cloud: Docker, Kubernetes, GitHub Actions, GitLab CI, Jenkins,
   Azure, AWS, NGINX
4. Databases & Storage: MongoDB, PostgreSQL, MySQL, SQL Server, Hazelcast,
   Azure Blob Storage
5. Testing: Jest, Cypress, Cucumber, WebDriverIO, JUnit, Chai, Istanbul
6. Languages: JavaScript, TypeScript, Java, Python, C#, C++

### 19.4 Certificates Data (`data/certificates.ts`)

1. Microsoft Certified: Azure Fundamentals (2023)

### 19.5 Social Links (`constants/social.ts`)

| Platform | URL                                | Icon     | Display              | Copyable |
| -------- | ---------------------------------- | -------- | -------------------- | -------- |
| Email    | mailto:jalkhurfan@gmail.com        | Mail     | jalkhurfan@gmail.com | Yes      |
| Phone    | tel:+96176380589                   | Phone    | +961 76 380 589      | Yes      |
| LinkedIn | https://linkedin.com/in/jalkhurfan | Linkedin | jalkhurfan           | No       |
| GitHub   | https://github.com/jKh98           | Github   | jKh98                | No       |

---

## 20. Configuration

### 20.1 Vite Config

```ts
// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
    },
  },
  base: "/", // Custom domain, no subpath
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          "vendor-react": ["react", "react-dom"],
          "vendor-three": ["three", "@react-three/fiber", "@react-three/drei"],
          "vendor-motion": ["framer-motion"],
          "vendor-i18n": ["i18next", "react-i18next"],
        },
      },
    },
  },
});
```

### 20.2 TypeScript Config

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "moduleResolution": "bundler",
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["src"]
}
```

### 20.3 Tailwind Config

Tailwind v4 uses CSS-first configuration. Custom values defined in `index.css`
using `@theme` directive. Minimal `tailwind.config.ts` only if needed for
plugins.

---

## 21. Build & Deploy

### 21.1 Scripts

```json
{
  "scripts": {
    "dev": "vite",
    "build": "tsc -b && vite build",
    "preview": "vite preview",
    "lint": "eslint .",
    "deploy": "yarn build && gh-pages -d dist"
  }
}
```

### 21.2 GitHub Pages

- Deploy to `gh-pages` branch using `gh-pages` package
- `public/CNAME` file contains `jalkhurfan.com`
- `base: "/"` in Vite config (custom domain, not repo subpath)
- 404.html: Copy of index.html for SPA routing (though we don't use routes,
  it's a safety net)

### 21.3 Assets Retained from Old Repo

- `public/assets/documents/jihad_alkhurfan_resume_2025.pdf`
- `public/assets/documents/jihad_alkhurfan_resume_2025_detailed.pdf`
- `public/assets/images/profile.jpeg` (renamed from `profile_full.jpeg`)
- `public/CNAME`
- `public/favicon.ico` (reuse or regenerate)

---

## 22. Cleanup Checklist

Files and directories to **remove** when scaffolding v3:

### Root Files

- [ ] `config-overrides.js` (CRA webpack alias override)
- [ ] `gulpfile.js` (Ant Design LESS compilation)
- [ ] `yarn.lock` (regenerated with new deps)

### src/ (entire old source)

- [ ] `src/App.tsx` (old CRA app)
- [ ] `src/App.css`
- [ ] `src/App.test.tsx`
- [ ] `src/index.tsx`
- [ ] `src/index.css`
- [ ] `src/react-app-env.d.ts`
- [ ] `src/reportWebVitals.ts`
- [ ] `src/setupTests.ts`
- [ ] `src/assets/` (entire directory - old images, SVGs, old resume)
- [ ] `src/components/` (entire directory - all old sections)
- [ ] `src/config/` (old meta, color, i18n config)
- [ ] `src/hooks/` (old useWindowSize)
- [ ] `src/locales/` (old EN/AR translations)
- [ ] `src/themes/` (LESS theme files)
- [ ] `src/utils/` (old scroll utility)

### public/ (selective removal)

- [ ] `public/index.html` (Vite uses root `index.html`)
- [ ] `public/dark-theme.css` (compiled LESS, no longer needed)
- [ ] `public/light-theme.css`
- [ ] `public/manifest.json` (PWA manifest, not needed unless we want PWA)
- [ ] `public/robots.txt` (recreate if needed)
- [ ] `public/logo192.png` (CRA default)
- [ ] `public/logo512.png` (CRA default)
- [ ] `public/apple-touch-icon.png` (keep or regenerate)
- [ ] `public/favicon-16x16.png` (keep or regenerate)
- [ ] `public/favicon-32x32.png` (keep or regenerate)
- [ ] `public/assets/images/profile.png` (replaced by profile.jpeg)
- [ ] `public/assets/images/profile_full.jpeg` (renamed to profile.jpeg)

### Other

- [ ] `dist/` directory (old build output)
- [ ] Remove CRA dependencies from package.json: `react-scripts`,
      `react-app-rewired`, `customize-cra`, `antd`, `@ant-design/*`,
      `react-css-theme-switcher`, `rc-scroll-anim`, `rc-texty`,
      `react-scrollama`, `react-router-dom`, `react-router-hash-link`,
      `react-ga`, `react-google-recaptcha`, `@formspree/react`,
      `react-github-calendar`, `react-pdf`, `less`, `gulp`, `gulp-less`,
      all gulp plugins

---

## 23. Implementation Phases

### Phase 1: Scaffold & Cleanup

1. Create `v3` branch from master
2. Remove all files listed in Cleanup Checklist
3. Initialize Vite + React 19 + TypeScript project
4. Install all dependencies
5. Configure Vite (aliases, build), TypeScript, Tailwind v4, ESLint
6. Create folder structure (empty files are fine)
7. Verify `yarn dev` runs with blank page

### Phase 2: Foundation

1. CSS variables and theme setup (`index.css`)
2. `cn()` utility
3. `ThemeProvider` context
4. `WindowProvider` context with reducer
5. Type definitions (`types/`)
6. i18n initialization with basic EN/AR strings
7. `App.tsx` basic layout with providers

### Phase 3: Desktop Shell

1. `TopBar` component
2. `Dock` component with `DockIcon`
3. `Desktop` component (layout composition)
4. Dock magnification animation
5. Theme toggle + language switcher wiring

### Phase 4: Window System

1. `Window` component with glass/shadow styling
2. `WindowHeader` with traffic-light buttons
3. `WindowContent` scrollable area
4. Framer Motion open/close/minimize animations
5. Drag behavior (desktop only)
6. Focus/z-index management
7. Keyboard shortcuts (Escape to close)

### Phase 5: 3D Background

1. `Scene3D` canvas setup
2. `Lighting` component
3. `FloatingShapes` with rotation animation
4. `ParticleField`
5. Theme adaptation
6. Reduced motion / mobile disabling

### Phase 6: App Content

1. Data files (`experience.ts`, `education.ts`, `skills.ts`, etc.)
2. Locale files with full EN/AR content
3. `ProfileApp` + sub-components
4. `ExperienceApp` + sub-components
5. `SkillsApp` + sub-components
6. `ContactApp` + sub-components
7. App registry + lazy loading

### Phase 7: Boot Sequence

1. `BootSequence` component
2. Typing animation
3. Session storage check
4. Auto-open profile on completion

### Phase 8: Polish & Responsive

1. Mobile layout adaptations
2. Touch interactions
3. RTL layout testing and fixes
4. Reduced motion fallbacks
5. Accessibility audit (ARIA, keyboard, contrast)
6. Performance profiling and optimization

### Phase 9: Deploy

1. Build verification (`yarn build`)
2. GitHub Pages configuration
3. CNAME setup
4. Deploy to gh-pages branch
5. Verify live site

---

## Appendix A: Resume JSON (Source of Truth)

The complete JSON resume provided by the owner is the authoritative source for
all career data. All `data/` files and experience-related i18n keys are derived
from it. If there's a conflict between the JSON resume and old locale files,
the JSON resume wins.

## Appendix B: Design References

- **Neo-skeuomorphism**: Soft shadows, glass morphism, tactile depth
- **macOS Dock**: Magnification on hover, bounce on open, indicator dots
- **Window chrome**: Traffic light buttons, frosted glass, title bar drag
- **Color inspiration**: Terminal aesthetics (dark bg + cyan/green accent)
