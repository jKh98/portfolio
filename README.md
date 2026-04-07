# Portfolio v3

A personal portfolio website built as an interactive **macOS-inspired desktop environment**. Visitors navigate a fully functional windowed OS interface complete with a dock, menu bar, spotlight search, window management, and nine distinct applications -- each showcasing a different aspect of the portfolio.

**Live:** [jalkhurfan.com](https://jalkhurfan.com)

---

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Scripts](#scripts)
- [Deployment](#deployment)
- [Architecture](#architecture)
- [License](#license)

---

## Features

### Desktop OS Interface

- **Window management** -- draggable, resizable windows with minimize/maximize/close, z-index stacking, and cascade positioning
- **Dock** -- bottom dock bar with icon magnification on hover, long-press context menus, and app dividers
- **Top menu bar** -- dynamic per-app menus, branding dropdown, clock, theme toggle, volume control
- **Spotlight search** -- `Cmd+K` overlay searching across apps, skills, projects, companies, certificates, education, files, and quick actions
- **Boot sequence** -- terminal-style typing animation on first visit
- **Welcome modal** -- first-visit onboarding walkthrough
- **Right-click context menus** -- desktop and window title bar
- **Keyboard shortcuts** -- `Cmd+1-9` (open apps), `Cmd+M` (minimize), `` Cmd+` `` (cycle windows), `?` (cheat sheet)

### Applications

| App | Description |
|-----|-------------|
| **Profile** | Bio, profile photo, social links, resume download, stats, education, certifications |
| **Experience** | Vertical timeline of work history with expandable cards, company filters |
| **Skills** | 7 categories with 40+ skill badges, each with technology SVG icons, search and filter |
| **Projects** | Grid of projects with image carousels, tech tag filters, demo and source links |
| **Contact** | Email, phone, LinkedIn, GitHub with copy-to-clipboard and live timezone |
| **Terminal** | Functional terminal emulator with 40+ commands, virtual filesystem, tab completion |
| **Finder** | macOS Finder-like file browser with sidebar tree, breadcrumb navigation, file actions |
| **Notepad** | Firebase-backed real-time guestbook with live updates via Firestore |
| **Settings** | Appearance (theme, 11 accent colors, 24 wallpapers), dock, windows, language, sound, accessibility |

### Other Highlights

- **Bilingual i18n** -- English and Arabic with full RTL support and browser language detection
- **Audio engine** -- Web Audio API synthesis with 30+ procedurally generated sound effects (no audio files)
- **24 wallpapers** -- 12 light/dark pairs across 4 categories (abstract, nature, city, minimal), including CSS-only options
- **11 accent color presets** -- live CSS variable updates across the entire UI
- **Responsive design** -- mobile (full-screen windows, compact dock), tablet, and desktop breakpoints
- **Accessibility** -- ARIA roles, focus trapping, keyboard navigation, screen reader labels, `prefers-reduced-motion` support
- **Analytics** -- Firebase Analytics (GA4) event tracking for user interactions
- **PWA** -- web app manifest with standalone display mode

---

## Tech Stack

| Category | Technology |
|----------|------------|
| Framework | React 19 |
| Language | TypeScript 5 |
| Build Tool | Vite 6 |
| Styling | Tailwind CSS 4 |
| Animation | Framer Motion 11 |
| i18n | i18next + react-i18next |
| Icons | Lucide React + Simple Icons |
| Backend | Firebase (Firestore + Analytics) |
| Testing | Playwright |
| Linting | ESLint 9 (flat config) + typescript-eslint |
| Deployment | GitHub Pages |

---

## Project Structure

```
src/
├── main.tsx                    # App entry point (StrictMode > Providers > App)
├── App.tsx                     # Wallpaper layer + Desktop shell
├── index.css                   # Tailwind imports, CSS variables, glass effects
│
├── components/
│   ├── ui/                     # Reusable primitives (GlassCard, Badge, Tooltip, etc.)
│   ├── desktop/                # Desktop shell (TopBar, Dock, Spotlight, BootSequence)
│   ├── window/                 # Window system (Window, WindowHeader, ResizeHandle)
│   └── apps/                   # 9 app windows (profile, experience, skills, etc.)
│
├── context/                    # React Context providers
│   ├── PreferencesProvider     # Settings state (localStorage-persisted)
│   ├── ThemeProvider           # Dark/light theme + wallpaper auto-swap
│   └── WindowProvider          # Window manager (open/close/minimize/focus)
│
├── hooks/                      # Custom hooks (keyboard shortcuts, audio, resize, etc.)
├── lib/                        # External service wrappers (Firebase, analytics, audio engine)
├── types/                      # TypeScript type definitions
├── constants/                  # Static configuration (apps, colors, wallpapers, audio)
├── data/                       # Content data (experience, education, skills, projects)
├── i18n/                       # i18next config + English/Arabic locale files
└── utils/                      # Utility functions (cn, date formatting)
```

---

## Getting Started

### Prerequisites

- **Node.js** >= 18
- **Yarn** (v1)

### Installation

```bash
# Clone the repository
git clone https://github.com/jKh98/portfolio.git
cd portfolio

# Install dependencies
yarn install

# Start the development server
yarn dev
```

The app will be available at `http://localhost:5173`.

### Firebase Setup (Optional)

Firebase is used for the guestbook (Firestore) and analytics features. Without it, the rest of the app works normally.

1. Create a Firebase project at [console.firebase.google.com](https://console.firebase.google.com)
2. Enable Firestore Database and Analytics
3. Copy your Firebase config values into a `.env` file (see [Environment Variables](#environment-variables))

---

## Environment Variables

Create a `.env` file in the project root based on `.env.example`:

```env
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
VITE_FIREBASE_MEASUREMENT_ID=
```

All variables are prefixed with `VITE_` and exposed to the client at build time.

---

## Scripts

| Command | Description |
|---------|-------------|
| `yarn dev` | Start Vite development server |
| `yarn build` | Type-check with `tsc` and build for production |
| `yarn preview` | Preview the production build locally |
| `yarn lint` | Run ESLint across the project |
| `yarn deploy` | Build, create `404.html` for SPA routing, and deploy to GitHub Pages |

---

## Deployment

The site is deployed to **GitHub Pages** with a custom domain.

```bash
yarn deploy
```

This runs the production build, copies `index.html` to `404.html` (for client-side SPA routing on GitHub Pages), and pushes the `dist/` directory to the `gh-pages` branch using the `gh-pages` package.

The custom domain `jalkhurfan.com` is configured via the `public/CNAME` file.

---

## Architecture

### State Management

React Context + `useReducer` with three providers:

- **PreferencesProvider** -- accent color, wallpaper, dock settings, animation speed, language, sound, accessibility (persisted to `localStorage`)
- **ThemeProvider** -- dark/light mode with automatic wallpaper swapping
- **WindowProvider** -- window lifecycle (open, close, minimize, maximize, focus, cascade)

### Code Splitting

Each of the 9 apps is lazy-loaded via `React.lazy`. Vite manual chunks split vendor code into:

- `vendor-react` (React + ReactDOM)
- `vendor-motion` (Framer Motion)
- `vendor-i18n` (i18next)
- `vendor-firebase` (Firebase)

### Audio Engine

All sound effects are synthesized at runtime using the Web Audio API (oscillators, gain nodes, filters) -- no external audio files are shipped. 30+ effects across 6 categories.

### Typography

- **Inter** -- headings and body text
- **JetBrains Mono** -- terminal and code
- **IBM Plex Sans Arabic** -- Arabic text

---

## License

This is a personal project. All rights reserved.
