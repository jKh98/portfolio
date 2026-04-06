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
24. [Enhancement Spec (Post-Session 5)](#24-enhancement-spec-post-session-5)
25. [Implementation Sessions (Post-Session 5)](#25-implementation-sessions-post-session-5)

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
| Animation   | framer-motion                                  | ^11     |
| i18n        | i18next + react-i18next                        | latest  |
| Icons       | lucide-react + simple-icons                    | latest  |
| Utilities   | clsx + tailwind-merge                          | latest  |
| Backend     | Firebase (Firestore + Analytics)               | ^12     |
| Testing     | Playwright                                     | latest  |
| Linting     | ESLint (flat config)                           | ^9      |
| Package Mgr | Yarn                                           | ^1      |
| Deploy      | gh-pages                                       | latest  |

### 3.1 Dependency Justification

Every dependency must earn its place:

- **framer-motion**: Window open/close/drag animations, dock hover effects,
  boot sequence. The most ergonomic animation library for React.
- **firebase**: Firestore for real-time guestbook, Analytics (GA4) for
  event tracking and user property segmentation.
- **i18next**: Proven i18n solution, supports RTL detection, interpolation,
  namespaces.
- **lucide-react**: Tree-shakeable, consistent icon set. One import per icon.
- **simple-icons**: SVG technology logos for skill badges.
- **clsx + tailwind-merge**: Conditional class composition without conflicts.
  `cn()` utility pattern.
- **playwright**: E2E browser tests for visual/interaction regressions.
- **gh-pages**: One-command deploy to GitHub Pages. Already proven in this repo.

### 3.2 What We Are NOT Using

| Excluded         | Reason                                         |
| ---------------- | ---------------------------------------------- |
| Ant Design       | Heavy, opinionated. We're building custom UI.  |
| Radix UI         | No complex form/modal primitives needed.       |
| Redux            | Overkill. React Context + useReducer suffices. |
| react-router     | Single "page" with window-based navigation.    |
| Formspree        | Replaced by Firebase Firestore for guestbook.  |
| reCAPTCHA        | No form, no need.                              |
| LESS/SASS        | Tailwind handles all styling.                  |
| Gulp             | No CSS preprocessing needed.                   |
| ~~Google Analytics~~ | Now using Firebase Analytics (GA4 under the hood). |
| Firebase Hosting | GitHub Pages suffices for static SPA.          |

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
│           ├── profile-nobg.webp
│           └── projects/
│               ├── denworld-*.webp
│               └── portfolio-*.webp
│
└── src/
    ├── main.tsx                         # React root mount + providers
    ├── App.tsx                          # Root layout: wallpaper bg + Desktop shell
    ├── index.css                        # Tailwind directives + CSS vars + fonts
    ├── vite-env.d.ts                    # Vite type reference
    │
    ├── lib/                             # Firebase & external service wrappers
    │   ├── firebase.ts                  # Firebase app init + Firestore + Analytics
    │   ├── analytics.ts                 # trackEvent / setUserProps helpers
    │   └── guestbook.ts                 # Firestore guestbook CRUD + real-time sub
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
    │   ├── colors.ts                    # Accent color presets + applicator
    │   ├── company-logos.ts             # Inline SVG company logos
    │   ├── skill-icons.ts              # Skill → simple-icons SVG mapping
    │   ├── wallpapers.ts               # Wallpaper catalog + pair helpers
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
        │   ├── ContextMenu.tsx          # Right-click context menu
        │   ├── ImageCarousel.tsx        # Multi-image carousel with nav
        │   ├── ToggleSwitch.tsx         # Styled on/off toggle
        │   ├── CopyButton.tsx           # Copy-to-clipboard button
        │   └── SkeletonLoader.tsx       # Loading placeholder
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

## 9. Wallpaper System (Replaced 3D Background)

The original 3D background system (R3F Canvas with FloatingShapes,
ParticleField, Lighting) was **removed** in favor of a lightweight
image-based wallpaper system. This dramatically reduces bundle size
(Three.js no longer bundled) and improves performance on all devices.

### 9.1 Architecture

Wallpapers are static `.webp` images served from `public/wallpapers/`.
The system supports CSS-only wallpapers (gradients, solid colors) as
a fallback for the "minimal" category.

```
public/wallpapers/
├── abstract-dark-1.webp ... abstract-light-3.webp  (6 files)
├── nature-dark-1.webp   ... nature-light-3.webp    (6 files)
├── city-dark-1.webp     ... city-light-3.webp      (6 files)
└── thumbnails/           (smaller previews for Settings picker)
```

### 9.2 Wallpaper Pairs (Light/Dark)

Every wallpaper has a strict 1:1 light/dark pair. When the user
toggles the theme, the wallpaper automatically swaps to its paired
counterpart via `getPairedWallpaper()` in `ThemeProvider`.

| #  | Category | Light ID                | Dark ID               |
| -- | -------- | ----------------------- | --------------------- |
| 1  | abstract | `abstract-light-1`      | `abstract-dark-2`     |
| 2  | abstract | `abstract-light-2`      | `abstract-dark-1`     |
| 3  | abstract | `abstract-light-3`      | `abstract-dark-3`     |
| 4  | nature   | `nature-light-1`        | `nature-dark-1`       |
| 5  | nature   | `nature-light-2`        | `nature-dark-2`       |
| 6  | nature   | `nature-light-3`        | `nature-dark-3`       |
| 7  | city     | `city-light-1`          | `city-dark-1`         |
| 8  | city     | `city-light-2`          | `city-dark-2`         |
| 9  | city     | `city-light-3`          | `city-dark-3`         |
| 10 | minimal  | `minimal-solid-light`   | `minimal-solid-dark`  |
| 11 | minimal  | `minimal-gradient-light`| `minimal-gradient-dark`|
| 12 | minimal  | `minimal-accent-light`  | `minimal-accent-dark` |

Total: 24 wallpapers (12 pairs). Minimal wallpapers are CSS-only
(no image files required).

### 9.3 Types & Constants

- `WallpaperEntry` interface in `constants/wallpapers.ts` (id, category,
  src, thumbnail, css, theme, pairId)
- `WallpaperCategory`: `"abstract" | "nature" | "city" | "minimal"`
- `WallpaperTheme`: `"light" | "dark"`
- The old `WallpaperType` enum was removed from `types/preferences.ts`
  and replaced with a plain `string` wallpaper ID.

### 9.4 Rendering

`App.tsx` reads the wallpaper ID from preferences, resolves it via
`getWallpaper()`, and renders either:
- A CSS `background` div (for minimal wallpapers with `css` field), or
- A `background-image: url(...)` div (for image wallpapers with `src`)

No lazy loading or dynamic imports needed. The wallpaper layer sits
at `z-0` behind the Desktop shell at `z-10`.

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
│ [Full-body Photo]  Name              │
│                    Title             │
│                    Location          │
│                    Social icons row  │
│                    Download Resume   │
├──────────────────────────────────────┤
│ [6+ Years] [30+ Projects] [20+ Tech]│
├──────────────────────────────────────┤
│ Trusted By                           │
│ [Deloitte] [Revinate] [Klareo] [DGA]│
├──────────────────────────────────────┤
│ Education                            │
│  - ASU: MSE Software Engineering     │
│  - AUB: BE Computer & Comm. Eng.    │
├──────────────────────────────────────┤
│ Certifications                       │
│  - Azure Fundamentals               │
└──────────────────────────────────────┘
```

**Sub-components**:

- `ProfileHeader`: Full-body transparent photo (`profile-nobg.webp`) on
  desktop with accent glow; circular headshot crop on mobile. Name, title,
  location with MapPin icon. Social icon row (Email, LinkedIn, GitHub).
  Two download buttons (Resume, Detailed Resume). The `minWidth: 600` on
  the Profile AppDefinition ensures the side-by-side layout works.
- `StatsRow`: Three stat cards in a row. Each has a number + label.
  Numbers animate counting up from 0 on entrance.
- `TrustedBy`: Row of company names/logos in styled glass pills. Moved
  above Education for better visual flow.
- `EducationList`: Maps `education` data to styled entries with institution
  link, degree, field, dates. Each entry is a clickable GlassCard.
- `CertificateList`: Maps `certificates` data to badge-style entries with
  external link icon. Each entry is a clickable GlassCard.

**Data source**: `data/education.ts`, `data/certificates.ts`, plus i18n for
text strings. Section order: Header → Stats → TrustedBy → Education → Certs.

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

### 13.3 Wallpaper Auto-Swap on Theme Change

The `ThemeProvider` detects theme changes and automatically swaps the
active wallpaper to its light/dark pair using `getPairedWallpaper()`.
This ensures the wallpaper always matches the current theme without
manual intervention. See Section 9.2 for the pair table.

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
```

### 17.2 Bundle Strategy

Vite manual chunks in `vite.config.ts`:

```ts
manualChunks: {
  "vendor-react": ["react", "react-dom"],
  "vendor-motion": ["framer-motion"],
  "vendor-i18n": ["i18next", "react-i18next"],
}
```

Note: The `vendor-three` chunk was removed when the 3D background system
was replaced with the image-based wallpaper system. This significantly
reduces the initial download size.

### 17.3 Asset Optimization

- Profile image: Served as WebP with transparent background (`profile-nobg.webp`).
  Full-body cutout on desktop, circular headshot crop on mobile.
- Wallpaper images: All `.webp` format. Thumbnails provided for Settings picker.
- Fonts: Load via `@font-face` with `font-display: swap`. Subset if possible.
- Resume PDFs: Served from `public/assets/` (no bundling).
- Project screenshots: `.webp` in `public/assets/images/projects/`.

### 17.4 Targets

| Metric                   | Target                                   |
| ------------------------ | ---------------------------------------- |
| First Contentful Paint   | < 1.5s                                   |
| Largest Contentful Paint | < 2.5s                                   |
| Time to Interactive      | < 3s                                     |
| Bundle (initial)         | < 150KB gzipped (Three.js no longer used)|
| Lighthouse Score         | 90+ all categories                       |

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
- `public/assets/images/profile-nobg.webp` (transparent background cutout,
  replaces old `profile.jpeg`)
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

### Phase 5: Wallpaper System (Replaced 3D Background)

1. ~~`Scene3D` canvas setup~~ → Removed
2. ~~`Lighting` component~~ → Removed
3. ~~`FloatingShapes` with rotation animation~~ → Removed
4. ~~`ParticleField`~~ → Removed
5. Image-based wallpaper system with light/dark pairs
6. CSS-only minimal wallpapers (gradients, solids, accent)
7. Wallpaper auto-swap on theme change

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

### Phase 9: Window System Overhaul (Session 6a)

1. Dynamic drag constraints (top bar ceiling, partial off-screen)
2. Green button maximize/fullscreen toggle
3. Window resize from edges/corners
4. Cascade offset for new windows
5. Updated types and reducer

### Phase 10: Interactions + UI Polish (Session 6b)

1. Click target expansion
2. Cursor management audit
3. Hover state enhancements (traffic light icons, card lifts)
4. Right-click context menus
5. Long press on dock icons
6. Window toolbars
7. App-level micro-interactions and polish

### Phase 11: TopBar + Keyboard + Spotlight (Session 6c)

1. Branding menu
2. Dynamic app menu system
3. Status tray icons
4. Spotlight search (Cmd+K)
5. Keyboard shortcuts
6. Shortcut cheat sheet

### Phase 12: New Apps Part 1 (Session 6d)

1. PreferencesContext
2. Settings app (appearance, dock, windows, language, accessibility)
3. Accent color system
4. Terminal app (commands, Easter eggs, history)
5. Projects app (card grid, placeholders)

### Phase 13: New Apps Part 2 + Visual Enhancement (Session 6e)

1. Finder app (virtual filesystem)
2. Notepad/Guestbook app
3. Enhanced glass aesthetic
4. Technology logos in skills
5. Company logos in experience
6. Wallpaper system
7. Dock layout update

### Phase 14: Deploy + Final QA (Session 7)

1. Build verification
2. GitHub Pages configuration
3. Full regression test (9 apps)
4. Performance and accessibility audit
5. Deploy to gh-pages branch
6. Verify live site

---

## 24. Enhancement Spec (Post-Session 5)

This section specifies all enhancements planned after the initial build
(sessions 1-5). These are organized by feature area and will be implemented
across sessions 6a through 6e.

### 24.1 Window System Enhancements

#### 24.1.1 Drag Constraints (Fix)

The current drag constraints use arbitrary pixel values
(`top: 0, left: -400, right: 400, bottom: 200`). Replace with dynamic
viewport-aware constraints:

- **Top**: Window cannot be dragged above the TopBar (32px). The TopBar is the
  absolute ceiling.
- **Left/Right/Bottom**: The window's title bar must remain at least 50%
  visible so the user can always grab it back. Calculate based on actual window
  width and viewport dimensions.
- Implementation: Replace static `dragConstraints` with a ref-based
  `dragConstraints` that reads from a parent container ref, or compute
  constraints dynamically in a `useMemo` based on `window.innerWidth`,
  `window.innerHeight`, and window dimensions.

#### 24.1.2 Green Button - Maximize/Fullscreen Toggle

Convert the decorative green dot into a functional maximize button:

- **Normal state**: Window at default size/position (centered, max-width 900px)
- **Maximized state**: Window fills viewport minus TopBar height (32px) and
  Dock area (~72px bottom padding). Full width, full height, no rounded
  corners, positioned at `top: 32px, left: 0, right: 0, bottom: 0`.
- **Toggle**: Clicking green button toggles between normal and maximized.
- **State**: Add `isMaximized: boolean` to `WindowState`. Add `MAXIMIZE` and
  `UNMAXIMIZE` actions to `WindowAction`.
- **Animation**: Smooth Framer Motion transition between states.
- **Keyboard**: Double-clicking the title bar also toggles maximize.
- **Constraints**: When maximized, dragging is disabled. Clicking green button
  or double-clicking title bar restores to normal size.

#### 24.1.3 Window Resize

Windows should be freely resizable from edges and corners:

- **Resize handles**: 8 handles (N, S, E, W, NE, NW, SE, SW) rendered as
  invisible hit areas (8px wide) around the window border.
- **Cursor**: `cursor-ew-resize`, `cursor-ns-resize`, `cursor-nesw-resize`,
  `cursor-nwse-resize` on respective handles.
- **Min size**: 400px width, 300px height.
- **Max size**: Viewport width - 32px, viewport height - 104px (top bar + dock
  area).
- **State**: Add `size?: { width: number; height: number }` to `WindowState`.
  Add `UPDATE_SIZE` action to `WindowAction`.
- **Desktop only**: Resize handles hidden on mobile/tablet.
- **Maximized**: When maximized, resize handles are hidden.
- **Implementation**: Custom `useWindowResize` hook that tracks pointer events
  on resize handles and updates width/height. Not Framer Motion drag -- use
  raw pointer events for precision.

#### 24.1.4 Cascade Offset for New Windows

When multiple windows are open, each new window should offset ~30px down and
~30px right from the previous window's position:

- **Offset**: 30px down, 30px right per open window.
- **Wrap**: If the offset would push the window off-screen, reset to the
  starting position (centered).
- **Implementation**: In the `OPEN` reducer action, calculate position based
  on `windowOrder.length`. Store computed position in `WindowState.position`.
- **Starting position**: First window centered. Second window at
  center + 30px/30px. Third at center + 60px/60px. Etc.

#### 24.1.5 Window Arrange (Right-Click Context Menu)

Right-clicking a window title bar shows a context menu with:

- Close
- Minimize
- Maximize / Restore
- Bring to Front
- Send to Back

Implementation details in Section 24.6 (Context Menus).

### 24.2 Visual Enhancements ("Wow Factor")

#### 24.2.1 Enhanced Glass Aesthetic

Upgrade the current glass effect to feel more premium:

- **Richer gradients**: Add subtle linear gradients on glass surfaces
  (top-left light source). Example:
  `background: linear-gradient(135deg, rgba(255,255,255,0.05) 0%, transparent 50%)`
  overlaid on the glass fill.
- **Animated accent glow**: Focused windows get a subtle animated border glow
  using CSS `@keyframes` -- a slow pulse on the accent border color.
- **Noise texture**: Add a very subtle noise SVG filter or CSS grain overlay
  on glass surfaces for material depth. Keep it nearly invisible
  (`opacity: 0.02-0.04`).
- **Inner highlight**: Add an `inset` box shadow
  (`0 1px 0 rgba(255,255,255,0.05) inset`) to glass surfaces for a bevel
  effect simulating light reflection.
- **Depth layers**: Unfocused windows get a stronger blur + darker overlay
  to create more visual separation between layers.

#### 24.2.2 Technology Logos in Skills

Replace plain text skill badges with logo + text badges:

- Use `devicon` or `simple-icons` SVGs for recognizable technology logos
  (React, TypeScript, Node.js, Docker, etc.).
- **Implementation**: Install `simple-icons` or import individual SVGs.
  Alternatively, use a CDN-based icon sprite from devicon.
- **Recommended approach**: Create a `SKILL_ICONS` constant mapping skill
  names to their corresponding SVG icon components or URLs. Use inline SVGs
  for tree-shaking.
- **Badge layout**: Icon (16px) + text side by side in the existing SkillBadge
  component.
- **Fallback**: Skills without a recognized logo show just text (graceful).

#### 24.2.3 Company Logos in Experience

Add company logos to experience cards:

- Source small logo images or SVGs for: CME, areeba, TecFrac, NAR Technologies.
- Store in `public/assets/images/logos/` or as inline SVGs.
- Display as a small (24-32px) logo next to the company name in
  ExperienceCard.
- **Fallback**: Company initial in a colored circle if no logo available.

#### 24.2.4 Wallpaper System

Offer 24 selectable wallpapers (12 light/dark pairs across 4 categories)
managed through the Settings app:

| Category | Count | Description                              |
| -------- | ----- | ---------------------------------------- |
| Abstract | 6     | Gradients, nebula, watercolor, mesh      |
| Nature   | 6     | Mountains, meadows, forests, coasts      |
| City     | 6     | New York, Tokyo, London (day/night)      |
| Minimal  | 6     | CSS-only: solid, gradient, accent-tinted |

- **Pairs**: Every wallpaper has a strict 1:1 light/dark counterpart.
  Theme changes auto-swap the wallpaper via `ThemeProvider`.
- **State**: `wallpaper` in `PreferencesContext` stores the wallpaper ID
  (plain string). Persist to `localStorage`.
- **Implementation**: `App.tsx` renders the selected background as either
  a CSS `background` div or a `background-image: url(...)` div.
  The old 3D scene is no longer an option (Three.js removed).
- **Assets**: Full wallpapers in `public/wallpapers/*.webp`, thumbnails
  in `public/wallpapers/thumbnails/*.webp`.

### 24.3 Interaction Improvements

#### 24.3.1 Click Target Expansion

Fix areas where clicking on padding/margins of interactive elements doesn't
trigger the action:

- **ExperienceCard accordion**: The entire GlassCard area should be clickable,
  not just the inner content. Move the `onClick` handler to the outermost
  container div. Add `cursor-pointer` to the entire card.
- **ContactLink copy/open**: The entire ContactLink card should be clickable
  (not just the small copy/open button). Wrap the card in a `<button>` or add
  `onClick` to the outer container. Keep the explicit button as a visual
  indicator but make the whole row actionable.
- **General rule**: Any element that has a clickable child action should have
  `cursor-pointer` on the full interactive area and handle clicks on the
  parent container.

#### 24.3.2 Cursor Management

Audit and fix cursors across all interactive elements:

| Element               | Cursor                                                          |
| --------------------- | --------------------------------------------------------------- |
| Window title bar      | `cursor-grab` / `cursor-grabbing`                               |
| Resize handles        | `cursor-{direction}-resize`                                     |
| Dock icons            | `cursor-pointer`                                                |
| Traffic light buttons | `cursor-pointer`                                                |
| Accordion headers     | `cursor-pointer`                                                |
| Skill badges          | `cursor-default` (not interactive) unless we add tooltip/detail |
| Contact link cards    | `cursor-pointer`                                                |
| External links        | `cursor-pointer`                                                |
| Copy buttons          | `cursor-pointer`                                                |
| TopBar buttons        | `cursor-pointer`                                                |
| Desktop background    | `cursor-default`                                                |
| Text content          | `cursor-text` (browser default)                                 |
| Disabled elements     | `cursor-not-allowed`                                            |

#### 24.3.3 Hover State Enhancements

Add clear hover visual feedback to all clickable elements that currently
lack it:

- **ExperienceCard**: Add background color shift + subtle border glow on
  hover to indicate it's expandable.
- **Traffic light buttons**: Show small icons on hover (X for close,
  - for minimize, expand arrows for maximize) matching macOS behavior.
- **GlassCard hoverable**: Ensure hover effect is visually distinct --
  add a slight `translateY(-1px)` lift in addition to background change.
- **ContactLink cards**: Add border accent color + slight lift on hover.

#### 24.3.4 Long Press on Dock Icons

Long-pressing (500ms) a dock icon shows a small context popover:

- **If window is open**: Show "Close", "Minimize", "Bring to Front"
- **If window is closed**: Show "Open"
- **Implementation**: Custom `useLongPress` hook that detects pointer down
  duration. Render a small `<ContextMenu>` component positioned above the
  dock icon.
- **Desktop only**: On mobile, long press is often system-reserved. Use
  regular tap behavior.

#### 24.3.5 Right-Click Context Menus

##### Desktop Context Menu

Right-clicking empty desktop area shows:

- Change Wallpaper (opens Settings app)
- Toggle Theme
- Switch Language
- About This Portfolio

##### Window Context Menu

Right-clicking a window title bar shows:

- Close
- Minimize
- Maximize / Restore
- Bring to Front
- Send to Back

##### Implementation

- Create a `<ContextMenu>` UI component (glass card, positioned at pointer).
- Create a `useContextMenu` hook that handles `contextmenu` event,
  positioning, and click-away dismissal.
- Render via portal to avoid z-index issues.

### 24.4 Toolbars

Add window-specific toolbars below the title bar where they add value:

#### 24.4.1 Experience App Toolbar

- Filter by company (pills: All, CME, areeba, TecFrac, NAR)
- Expand All / Collapse All toggle

#### 24.4.2 Skills App Toolbar

- Filter by category (pills matching category names)
- Search input to filter skills by name

#### 24.4.3 Terminal App Toolbar

- Clear button
- Font size toggle (small/medium/large)

#### 24.4.4 Finder App Toolbar

- Breadcrumb navigation (current path)
- Back/Forward buttons
- View toggle (list/grid) -- optional

#### Toolbar Component

Create a reusable `<WindowToolbar>` component:

- Sits between `WindowHeader` and `WindowContent`
- Glass background matching the window, slightly different shade
- Horizontal layout with gap-2, items-center
- Height: 36px
- Border-bottom matching window border

### 24.5 New Apps

#### 24.5.1 Terminal App

An interactive terminal emulator window:

- **App ID**: `"terminal"`
- **Icon**: `Terminal` (lucide)
- **UI**: Monospace font, dark terminal background (slightly different from
  window glass -- more opaque, greenish/cyan tinted), blinking cursor,
  command prompt `visitor@jalkhurfan.com ~ $`.
- **Input**: Text input at bottom, styled as terminal prompt.
- **Commands** (functional):
  - `help` - List available commands
  - `about` - Print short bio
  - `skills` - Print skill categories
  - `experience` - Print career summary
  - `contact` - Print contact info
  - `open <app>` - Open a window (profile, experience, skills, contact, etc.)
  - `close <app>` - Close a window
  - `theme <dark|light>` - Switch theme
  - `clear` - Clear terminal output
  - `ls` - List "files" (apps, documents)
  - `cat resume` - Show resume summary / trigger download
  - `whoami` - Print visitor info joke
- **Commands** (fun/Easter eggs):
  - `sudo hire me` - Fun response
  - `rm -rf /` - Fun "nice try" response
  - `ping google.com` - Simulated output
  - `neofetch` - ASCII art system info
  - `matrix` - Brief matrix rain animation
  - Unknown command: `command not found: <cmd>. Type 'help' for available commands.`
- **History**: Arrow up/down cycles through command history (session-scoped).
- **Auto-scroll**: Terminal output auto-scrolls to bottom.
- **Welcome message**: On open, prints a welcome banner with ASCII art.

#### 24.5.2 Projects App

Showcase portfolio projects:

- **App ID**: `"projects"`
- **Icon**: `FolderGit2` (lucide)
- **Data**: Create `data/projects.ts` with project entries:
  ```ts
  interface Project {
    id: string;
    name: string;
    descriptionKey: string; // i18n key
    tags: string[];
    url?: string;
    githubUrl?: string;
    imageUrl?: string;
    featured?: boolean;
  }
  ```
- **Layout**: Grid of project cards (2 columns on desktop, 1 on mobile).
  Each card shows: project name, short description, tech tags, links
  (demo + GitHub).
- **Featured projects**: Highlighted with accent border/larger card.
- **Toolbar**: Filter by technology tag.
- **Note**: The owner will need to provide actual project data. Include 3-5
  placeholder entries for now that can be filled in later.

#### 24.5.3 Notepad / Guestbook App

Visitors can leave a note:

- **App ID**: `"notepad"`
- **Icon**: `StickyNote` (lucide)
- **Backend**: Firebase Firestore (`guestbook` collection). Real-time
  subscription via `onSnapshot` -- new entries appear instantly for all
  connected visitors. No server infrastructure; client SDK connects directly.
- **Analytics**: `guestbook_submit` event tracked via Firebase Analytics.
- **Security rules**: Firestore rules enforce:
  - Anyone can read entries
  - Anyone can create entries with exactly `name` (string, 1-50 chars),
    `message` (string, 1-500 chars), and `createdAt` (server timestamp)
  - No client-side updates or deletes
- **UI**:
  - Text area for writing a message (max 500 chars)
  - Name field (optional, defaults to "Anonymous")
  - Submit button
  - Below: scrollable real-time list of previous notes
  - Loading spinner while fetching initial entries
  - Error banner on Firestore connection failure
- **Rate limiting**: One submission per session (sessionStorage check).
- **Files**: `src/lib/firebase.ts`, `src/lib/guestbook.ts`,
  `src/lib/analytics.ts`, `src/components/apps/notepad/`.

Control visual and behavioral preferences:

- **App ID**: `"settings"`
- **Icon**: `Settings` (lucide)
- **Sections**:
  1. **Appearance**
     - Theme toggle (dark/light) with preview
     - Accent color picker (cyan, purple, green, amber, rose) -- changes
       `--accent` and related CSS variables
     - Wallpaper selector (thumbnail grid of options from Section 24.2.4)
  2. **Dock**
     - Position: bottom (default). Future: left/right. (Start with bottom-only)
     - Magnification on/off toggle
     - Icon size slider (small/medium/large)
  3. **Windows**
     - Animation speed (normal/fast/off)
     - Auto-arrange (cascade on open) toggle
  4. **Language**
     - English / Arabic toggle
     - Shows preview of direction change
  5. **Accessibility**
     - Reduce motion toggle (mirrors system preference but allows override)
     - Font size (small/normal/large) -- adjusts base rem
- **State**: Create a `PreferencesContext` with `useReducer`. Persist all
  preferences to `localStorage`. On mount, load from storage with sensible
  defaults.
- **Implementation note**: Settings changes should take effect immediately
  (live preview) without needing to close the settings window.

#### 24.5.5 Finder / File Browser App

Browse a virtual file system:

- **App ID**: `"finder"`
- **Icon**: `Folder` (lucide)
- **Virtual file tree**:
  ```
  ~/
  ├── Documents/
  │   ├── Resume.pdf          → opens/downloads resume PDF
  │   ├── Resume_Detailed.pdf → opens/downloads detailed resume
  │   └── Azure_AZ-900.pdf    → link to cert (or placeholder)
  ├── Projects/
  │   ├── portfolio-v3/       → opens Projects app or links to GitHub
  │   └── ... (matches projects data)
  ├── About.txt               → opens Profile app
  └── Contact.txt             → opens Contact app
  ```
- **UI**:
  - Left sidebar: folder tree (collapsible, macOS Finder-like)
  - Right pane: file list for selected folder (icon + name + type + date)
  - Toolbar: breadcrumb path, back/forward buttons
  - Double-click file: triggers action (open PDF, open app, open URL)
  - Single-click: select / highlight
- **Data**: Define the virtual file system as a typed tree structure in
  `data/filesystem.ts`.
- **No real filesystem access**: Everything is a static data tree that maps
  to actions (download, open window, open URL).

#### 24.5.6 App Registry Updates

Update `AppId` type and `APP_DEFINITIONS` to include all new apps:

```ts
export type AppId =
  | "profile"
  | "experience"
  | "skills"
  | "contact"
  | "terminal"
  | "projects"
  | "notepad"
  | "settings"
  | "finder";
```

Update `ALL_APP_IDS` in `WindowProvider.tsx` accordingly.

Each new app gets a dock icon. The dock will have 9 icons. Consider grouping
or adjusting dock layout:

- Primary apps (left): Profile, Experience, Skills, Projects, Contact
- Utility apps (right, separated by a subtle divider): Terminal, Finder,
  Notepad, Settings

### 24.6 TopBar Enhancements

#### 24.6.1 Apple Logo / Branding Menu

Replace the owner name text on the left with a dropdown menu:

- **Trigger**: Small logo/avatar or stylized "J" monogram. Clicking opens a
  dropdown.
- **Dropdown items**:
  - "About Jihad Al-Khurfan" → opens Profile window
  - Separator
  - "Restart..." → replays boot sequence (clear sessionStorage "booted")
  - "Shut Down..." → fun animation (screen fades to black, then returns)
  - Separator
  - "View Source" → opens GitHub repo in new tab
- **Implementation**: Dropdown component rendered in the TopBar. Click-away
  to dismiss.

#### 24.6.2 App Menu (File, Edit, View)

Dynamic menu bar that changes based on the focused window:

- **Always visible**: `File` menu with generic actions (Close Window,
  Close All Windows)
- **Per-app menus**:
  - **Experience**: View → Expand All / Collapse All, Filter by Company
  - **Skills**: View → Group by Category (default) / Show All
  - **Contact**: File → Export vCard (stretch goal)
  - **Terminal**: Edit → Clear Terminal, View → Font Size
  - **Finder**: File → Open, Go → folder shortcuts
  - **Settings**: (no extra menus)
- **Implementation**: Each app can export a `menuItems` config. The TopBar
  reads the focused window's app definition and renders the appropriate menus.
- **Note**: Menus are optional per app. Apps without menu config get only the
  default File menu.

#### 24.6.3 Spotlight / Search (Cmd+K)

A command-palette / search overlay:

- **Trigger**: Cmd+K (or Ctrl+K on Windows), or clicking a search icon in
  the TopBar.
- **UI**: Centered modal overlay with search input + results list. Glass
  background. Similar to macOS Spotlight or VS Code command palette.
- **Searchable items**:
  - App names ("Profile", "Terminal", etc.) → opens the app
  - Skills ("React", "TypeScript") → opens Skills app with that skill
    highlighted
  - Actions ("Toggle Theme", "Switch Language", "Download Resume")
  - Experience companies ("CME", "areeba") → opens Experience with that
    company filtered
- **Implementation**: Create a `<Spotlight>` component. Index all searchable
  items in a flat array. Filter on input change. Enter selects first result.
  Arrow keys navigate. Escape closes.

#### 24.6.4 Status Icons Tray

Decorative status icons on the right side of the TopBar (before the existing
theme/language toggles):

- **WiFi icon**: Always "connected" (decorative). Tooltip: "Connected to the
  internet"
- **Battery icon**: Shows a random charge level or always full (decorative).
  Tooltip: "Battery: 100%"
- **Notification bell**: Optional. Could show a dot indicator. Clicking could
  show a small panel with "Notifications" like "New guestbook entry!" or
  "Portfolio updated" -- mostly decorative.
- **Purpose**: Strengthens the OS metaphor. These are decorative only.

### 24.7 Keyboard Shortcuts

Implement a comprehensive keyboard shortcut system:

| Shortcut          | Action                             |
| ----------------- | ---------------------------------- |
| `Cmd+1` - `Cmd+9` | Open/focus app by dock position    |
| `Cmd+W`           | Close focused window               |
| `Cmd+M`           | Minimize focused window            |
| `Cmd+K`           | Open Spotlight search              |
| `Cmd+\``          | Cycle focus to next open window    |
| `Escape`          | Close focused window (existing)    |
| Arrow keys        | Navigate dock when dock is focused |
| `Enter`/`Space`   | Activate focused dock icon         |

#### Implementation

- Create a `useKeyboardShortcuts` hook in `hooks/`.
- Register all shortcuts in `Desktop.tsx` (or a dedicated
  `<KeyboardShortcutHandler>` component).
- Use `e.metaKey` (Mac) / `e.ctrlKey` (Windows) detection. Since this is a
  portfolio, optimize for Mac but support both.
- **Prevent default** for shortcuts that conflict with browser defaults
  (e.g., Cmd+W normally closes the browser tab -- consider using
  `Ctrl+W` only or showing a hint instead of overriding).
- **Visual hint**: Show available shortcuts in the Settings app or via a
  `?` keyboard shortcut that opens a shortcuts cheat sheet overlay.

### 24.8 App-Level UI Polish

#### 24.8.1 Profile App

- Add subtle staggered entrance animation for each section (stats, education,
  certs slide in one after another).
- Profile photo: add a subtle floating/breathing animation (slow scale
  oscillation).
- Stats row: animate numbers counting up from 0 on first view.
- Download resume button: add a subtle download icon animation on hover.

#### 24.8.2 Experience App

- Add color-coded company indicators (each company gets a subtle color).
- Transition between expanded/collapsed states should feel smoother -- add
  `overflow-hidden` during animation to prevent content flash.
- Add "Current" badge to the active role that pulses subtly.
- Tags in expanded cards: stagger entrance.

#### 24.8.3 Skills App

- Add staggered entrance for skill badges (wave effect per category).
- Consider grouping by proficiency level visually (e.g., primary skills
  slightly larger or with accent border, secondary skills normal).
- Add a total skill count or a visual summary (pie chart, bar, or just text
  like "46 technologies across 6 categories").

#### 24.8.4 Contact App

- Add entrance animations for each contact link (staggered slide-in).
- The "Let's Connect" heading could have a subtle gradient text effect.
- Copy success state: flash the card border green briefly.
- Add a "timezone" indicator: "Currently X:XX PM in Beirut" (live).

#### 24.8.5 General Polish (All Apps)

- Add subtle section dividers between content blocks (thin gradient lines).
- Ensure consistent padding/margins across all apps (audit spacing).
- Add micro-interactions: buttons should have satisfying press feedback
  (scale down + back).
- Window content scroll: add a subtle top shadow when scrolled down to
  indicate more content above.
- Loading states: ensure skeleton loaders match the actual content layout.

### 24.9 Updated Type Definitions

The following types need updating to support new features:

```ts
// types/window.ts updates
export type AppId =
  | "profile"
  | "experience"
  | "skills"
  | "contact"
  | "terminal"
  | "projects"
  | "notepad"
  | "settings"
  | "finder";

export interface WindowState {
  id: AppId;
  isOpen: boolean;
  isMinimized: boolean;
  isMaximized: boolean; // NEW
  isFocused: boolean;
  zIndex: number;
  position?: { x: number; y: number };
  size?: { width: number; height: number }; // NEW
}

export type WindowAction =
  | { type: "OPEN"; id: AppId }
  | { type: "OPEN_EXCLUSIVE"; id: AppId }
  | { type: "CLOSE"; id: AppId }
  | { type: "MINIMIZE"; id: AppId }
  | { type: "RESTORE"; id: AppId }
  | { type: "MAXIMIZE"; id: AppId } // NEW
  | { type: "UNMAXIMIZE"; id: AppId } // NEW
  | { type: "FOCUS"; id: AppId }
  | { type: "UPDATE_POSITION"; id: AppId; position: { x: number; y: number } }
  | { type: "UPDATE_SIZE"; id: AppId; size: { width: number; height: number } } // NEW
  | { type: "CLOSE_ALL" };

// New convenience methods on WindowManagerContextValue
export interface WindowManagerContextValue {
  // ... existing ...
  maximizeWindow: (id: AppId) => void; // NEW
  unmaximizeWindow: (id: AppId) => void; // NEW
  toggleMaximize: (id: AppId) => void; // NEW
}
```

```ts
// NEW: types/preferences.ts
export interface AccentColor {
  name: string;
  value: string; // CSS color value
  glow: string; // Glow variant
}

export type WallpaperOption = "3d" | "gradient" | "solid" | "pattern";
export type DockPosition = "bottom"; // Expandable later
export type AnimationSpeed = "normal" | "fast" | "off";
export type FontSize = "small" | "normal" | "large";

export interface Preferences {
  accentColor: string;
  wallpaper: WallpaperOption;
  dockMagnification: boolean;
  dockIconSize: "small" | "medium" | "large";
  animationSpeed: AnimationSpeed;
  autoCascade: boolean;
  fontSize: FontSize;
  reduceMotionOverride: boolean | null; // null = follow system
}
```

### 24.10 New Data Files

#### `data/projects.ts`

Project entries for the Projects app. Includes real project data with
screenshots (stored in `public/assets/images/projects/`), tech tags,
demo/GitHub URLs, and image carousel support.

#### `data/filesystem.ts`

Virtual file system tree for the Finder app. Maps folder/file nodes to
actions (download, open-app, open-url).

#### `data/terminal-commands.ts`

Command registry for the Terminal app. Maps command names to handler
functions that return output strings.

### 24.11 New Hooks

| Hook                   | Purpose                                      |
| ---------------------- | -------------------------------------------- |
| `useWindowResize`      | Handles edge/corner resize drag for windows  |
| `useLongPress`         | Detects long press (500ms) for context menus |
| `useContextMenu`       | Manages right-click context menu state       |
| `useKeyboardShortcuts` | Registers global keyboard shortcuts          |
| `usePreferences`       | Reads/writes to PreferencesContext           |

### 24.12 New Components

| Component        | Location                    | Purpose                           |
| ---------------- | --------------------------- | --------------------------------- |
| `ContextMenu`    | `components/ui/`            | Positioned dropdown menu          |
| `ImageCarousel`  | `components/ui/`            | Multi-image carousel with nav     |
| `ToggleSwitch`   | `components/ui/`            | Styled on/off toggle switch       |
| `WindowToolbar`  | `components/window/`        | Toolbar below title bar           |
| `ResizeHandle`   | `components/window/`        | Edge/corner resize grip           |
| `Spotlight`      | `components/desktop/`       | Cmd+K search overlay              |
| `BrandingMenu`   | `components/desktop/`       | Apple logo dropdown in TopBar     |
| `AppMenu`        | `components/desktop/`       | Dynamic File/Edit/View menus      |
| `StatusTray`     | `components/desktop/`       | WiFi/battery/bell icons           |
| `TerminalApp`    | `components/apps/terminal/` | Terminal emulator                 |
| `ProjectsApp`    | `components/apps/projects/` | Project showcase grid             |
| `NotepadApp`     | `components/apps/notepad/`  | Guestbook / notes (Firebase)      |
| `SettingsApp`    | `components/apps/settings/` | Preferences UI                    |
| `FinderApp`      | `components/apps/finder/`   | Virtual file browser              |

---

## 25. Implementation Sessions (Post-Session 5)

These sessions replace the original Session 6 (Deploy). Deployment moves to
after all enhancements are complete.

### Session 6a: Window System Overhaul

- Fix drag constraints (top bar ceiling, partial off-screen)
- Green button maximize/fullscreen toggle
- Window resize from edges/corners
- Cascade offset for new windows
- Update types, reducer, and WindowProvider

### Session 6b: Interactions + Polish

- Click target expansion (accordion, contact links)
- Cursor management audit
- Hover state enhancements (traffic light icons, card lifts)
- Right-click context menus (desktop + window)
- Long press on dock icons
- Toolbars for Experience, Skills apps
- App-level UI polish (animations, micro-interactions, spacing)

### Session 6c: TopBar + Keyboard + Spotlight

- Branding menu (Apple logo dropdown)
- App menu system (File, Edit, View)
- Status tray icons
- Spotlight search (Cmd+K)
- Full keyboard shortcuts system
- Keyboard shortcut cheat sheet

### Session 6d: New Apps (Part 1)

- Terminal app (commands, Easter eggs, history)
- Projects app (cards, grid, placeholders)
- Settings app (preferences context, accent colors, wallpaper, dock config,
  animation speed, font size)
- Preferences context + persistence

### Session 6e: New Apps (Part 2) + Visual Enhancement

- Finder app (virtual filesystem, sidebar, breadcrumbs)
- Notepad/Guestbook app (with Firebase Firestore real-time backend)
- Enhanced glass aesthetic (gradients, noise, glow)
- Technology logos in skills (simple-icons)
- Company logos in experience (inline SVGs)
- Wallpaper system integration (image-based, light/dark pairs)
- Update dock layout (grouping with divider)

### Session 7: Deploy + Final QA

(Replaces original Session 6)

- All original Session 6 tasks (pre-deploy checks, GitHub Pages, meta tags,
  cleanup, deploy)
- Full regression test across all 9 apps
- Mobile/tablet testing for new apps
- RTL testing for new apps
- Accessibility audit for new components
- Performance profiling with expanded app count

### Session 6f: Wallpaper Overhaul + Firebase + Profile Redesign + Polish

(Post-6e incremental work, before deploy)

- **3D background fully removed**: Deleted `components/background/` (Scene3D,
  FloatingShapes, ParticleField, Lighting), removed `vendor-three` manual
  chunk from vite config, removed Three.js lazy import from App.tsx
- **Image-based wallpaper system**: 24 wallpapers (12 light/dark pairs) across
  4 categories (abstract, nature, city, minimal). CSS-only minimal wallpapers.
  New `constants/wallpapers.ts` with `WallpaperEntry` type, pair helpers,
  category/theme filtering. Old `WallpaperType` enum replaced with string ID.
- **Theme-wallpaper auto-swap**: ThemeProvider now detects theme changes and
  swaps wallpaper to its paired counterpart via `getPairedWallpaper()`.
- **Firebase integration**: Added `firebase` dependency. Created `src/lib/`
  with `firebase.ts` (app init + Firestore + Analytics), `analytics.ts`
  (trackEvent/setUserProps helpers), `guestbook.ts` (Firestore CRUD +
  real-time subscription). Firebase initialized in `main.tsx`.
- **Analytics tracking**: Added `trackEvent` calls for: theme toggle, accent
  color change, wallpaper change, app open, app close. User properties set
  for theme and accent color.
- **Notepad/Guestbook upgraded**: Now uses Firebase Firestore real-time
  backend instead of localStorage-only mode. Real-time `onSnapshot`
  subscription for live updates across all visitors.
- **Profile app redesign**: Full-body transparent photo (`profile-nobg.webp`)
  with accent glow on desktop; circular headshot crop on mobile. Social links
  (Email, LinkedIn, GitHub) moved into header. Two resume download buttons
  (standard + detailed). Section order changed: TrustedBy moved above
  Education/Certificates. Removed standalone download button at bottom.
- **New UI components**: `ImageCarousel.tsx` (multi-image carousel with
  navigation dots, arrow buttons, framer-motion transitions) and
  `ToggleSwitch.tsx` (styled on/off switch for Settings).
- **Accent color system update**: Added `subtle` variant to all 11 color
  presets (`--accent-subtle` CSS variable). Used for hover backgrounds.
- **AppDefinition extended**: Added optional `minWidth` property. Profile app
  uses `minWidth: 600` to ensure side-by-side layout.
- **Window provider fix**: UNMAXIMIZE action now computes fallback size when
  no pre-maximize size was stored (window was never manually resized).
- **Projects app updates**: Real project screenshots added to
  `public/assets/images/projects/`. Image carousel support in project cards.
- **Settings AppearanceSection**: Updated wallpaper picker to show categorized
  image thumbnails with theme-filtered display.
- **Company logos expanded**: Significantly expanded inline SVG logos in
  `constants/company-logos.ts`.
- **Skill icons updated**: Refined skill-to-icon mappings in
  `constants/skill-icons.ts`.
- **E2E testing infrastructure**: Added Playwright with `playwright.config.ts`
  and `e2e/dock-magnification.spec.ts`.
- **Screenshot scripts**: Added `scripts/` directory with automated
  screenshot generation for project images.
- **Various component polish**: Refinements across all apps (BootSequence,
  BrandingMenu, Dock, DockIcon, TopBar, GlassCard, ContextMenu, Tooltip,
  Window, terminal components, finder components, notepad components, skills
  components, settings sections). RTL improvements, animation tweaks,
  hover state enhancements, spacing/layout consistency.
- **i18n updates**: New locale keys for wallpaper categories, Firebase
  guestbook states, updated profile section strings.
- **CSS updates**: New CSS variables (`--accent-subtle`), updated wallpaper
  layer z-indexing, refined glass effects and scrollbar styles.

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
