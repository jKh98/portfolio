# Portfolio V3 - Session Prompts

Copy-paste the appropriate prompt to start each session. Each prompt is
self-contained and tells the agent exactly what to do.

---

## Session 1: Scaffold + Cleanup + Foundation

```
I'm building a portfolio v3. Read SPEC.md and the rules in .opencode/rules/ before doing anything.

This is Session 1: Scaffold + Cleanup + Foundation.

Tasks (in order):

1. Create a `v3` branch from `master`
2. Remove ALL files listed in SPEC.md Section 22 (Cleanup Checklist). Keep only:
   - public/CNAME
   - public/favicon.ico
   - public/assets/documents/jihad_alkhurfan_resume_2025.pdf
   - public/assets/documents/jihad_alkhurfan_resume_2025_detailed.pdf
   - public/assets/images/profile_full.jpeg (rename to profile.jpeg)
   - .gitignore (will be updated)
   - SPEC.md
   - SESSIONS.md
   - .opencode/rules/*
3. Scaffold a fresh Vite + React 19 + TypeScript project in the repo root (not in a subdirectory)
4. Install dependencies: react, react-dom, three, @react-three/fiber, @react-three/drei, framer-motion, i18next, react-i18next, i18next-browser-languagedetector, lucide-react, clsx, tailwind-merge, @types/three, @types/react, @types/react-dom, tailwindcss @tailwindcss/vite
5. Install dev dependencies: typescript, vite, @vitejs/plugin-react, eslint, @eslint/js, typescript-eslint, eslint-plugin-react-hooks, eslint-plugin-react-refresh, gh-pages, globals
6. Configure:
   - vite.config.ts with `@/` path alias and manual chunks per SPEC.md Section 20.1
   - tsconfig.json with strict mode and `@/*` path per SPEC.md Section 20.2
   - ESLint 9 flat config
   - Tailwind v4 via CSS (using @tailwindcss/vite plugin) with theme tokens per SPEC.md Section 2.2 (dark/light CSS variables, fonts)
   - .gitignore updated for Vite (dist/, node_modules/, .env)
7. Create the full folder structure from SPEC.md Section 5 with placeholder files:
   - src/types/index.ts, window.ts, resume.ts, theme.ts (full type definitions from SPEC.md Section 6)
   - src/utils/cn.ts (clsx + tailwind-merge utility)
   - src/utils/format.ts (date formatting)
   - src/hooks/index.ts, useReducedMotion.ts, useCopyToClipboard.ts, useIsMobile.ts
   - src/context/index.ts, ThemeProvider.tsx, WindowProvider.tsx (full implementations per SPEC.md Sections 8 and 13)
   - src/i18n/index.ts (i18next init), locales/en.ts and ar.ts (skeleton structure with nav, common, apps keys - content will be filled in Session 4), useDirection.ts
   - src/constants/index.ts, apps.ts (app registry with lazy imports), social.ts (social links data)
   - src/data/index.ts, experience.ts, education.ts, skills.ts, certificates.ts (empty typed arrays for now)
   - src/components/ directories: ui/, background/, desktop/, window/, apps/ (with subdirs) - create index.ts barrel files
   - src/main.tsx (providers wrapping App)
   - src/App.tsx (basic shell: ThemeProvider > WindowProvider > placeholder div)
   - src/index.css (Tailwind directives, CSS variables for both themes, font imports)
   - index.html (Vite entry with meta tags, font preloads, lang attribute)
8. Verify `yarn dev` starts without errors and shows a blank styled page
9. Verify `yarn build` passes with zero type errors
10. Commit everything to the v3 branch

Follow all rules in .opencode/rules/portfolio-v3.md strictly. No shortcuts.
```

---

## Session 2: Desktop Shell + Window System

```
I'm building a portfolio v3. Read SPEC.md and the rules in .opencode/rules/ before doing anything.

This is Session 2: Desktop Shell + Window System.

Session 1 is complete: the project is scaffolded on the `v3` branch with Vite, React 19, TypeScript, Tailwind, all types, contexts (ThemeProvider, WindowProvider), i18n skeleton, and folder structure.

Tasks (in order):

1. Build `src/components/ui/` primitives first:
   - GlassCard.tsx - frosted glass container (backdrop-blur, semi-transparent bg, border, shadow per SPEC.md Section 2.2)
   - Badge.tsx - small pill/tag component
   - IconButton.tsx - icon-only button with hover states
   - Tooltip.tsx - hover tooltip (positioned above element, fade in/out via CSS transition)
   - SkeletonLoader.tsx - loading placeholder with pulse animation
   - Update ui/index.ts barrel export

2. Build `src/components/window/` system:
   - WindowHeader.tsx - title bar with traffic-light buttons (close=red, minimize=yellow), title text, drag handle area. Per SPEC.md Section 10.2
   - WindowContent.tsx - scrollable content wrapper with styled scrollbar. Per SPEC.md Section 10.3
   - Window.tsx - the main window component. Reads its own state from WindowContext via appId. Glass background, multi-layer shadow, focused/unfocused states. Framer Motion animations: open (scale 0.9→1 + fade), close (scale→0.95 + fade out), minimize (scale down). Draggable via title bar on desktop. Click to focus. Per SPEC.md Section 10.1
   - Update window/index.ts barrel export

3. Build `src/components/desktop/` shell:
   - TopBar.tsx - fixed top bar (32px height), glass bg. Left: owner name. Center: live clock (HH:MM). Right: theme toggle (sun/moon icon) + language switcher (EN/AR button). Per SPEC.md Section 11.2
   - DockIcon.tsx - single dock icon (48px). Lucide icon, hover magnification (scale 1→1.4x with spring), active dot indicator, tooltip on hover, bounce on window open. Per SPEC.md Section 11.3
   - Dock.tsx - fixed bottom bar, centered, glass bg, rounded-2xl. Renders DockIcon for each app in APP_DEFINITIONS. Per SPEC.md Section 11.3
   - Desktop.tsx - main layout component. Renders TopBar + main area (where windows appear) + Dock. Handles click-on-desktop-to-unfocus. Per SPEC.md Section 11.1
   - Update desktop/index.ts barrel export

4. Wire it all together in App.tsx:
   - Render Desktop component
   - Windows render inside the Desktop main area, driven by WindowContext state
   - Clicking dock icons opens/focuses/restores windows
   - Clicking close button closes windows
   - Clicking minimize button minimizes windows
   - Z-index management works (clicking a window brings it to front)
   - Escape key closes focused window

5. Verify:
   - `yarn dev` shows the desktop with TopBar and Dock
   - Clicking dock icons opens empty windows with glass effect
   - Windows can be dragged, closed, minimized, focused
   - Theme toggle switches dark/light and CSS variables update
   - Language toggle switches EN/AR and direction flips
   - `yarn build` passes clean

6. Commit to v3 branch.

Follow all rules in .opencode/rules/portfolio-v3.md strictly. Respect component size limits. Keep presentational components free of business logic.
```

---

## Session 3: 3D Background + Boot Sequence

```
I'm building a portfolio v3. Read SPEC.md and the rules in .opencode/rules/ before doing anything.

This is Session 3: 3D Background + Boot Sequence.

Sessions 1-2 are complete: the project has a working desktop shell with TopBar, Dock, and Window system on the `v3` branch. Windows open/close/minimize/focus/drag correctly. Theme and language toggles work.

Tasks (in order):

1. Build `src/components/background/` system:
   - Lighting.tsx - ambient light (low intensity) + one point light with accent color. Reads theme from context and adjusts intensity (dark: ambient 0.3, point 0.5 / light: ambient 0.1, point 0.2). Per SPEC.md Section 9.2
   - FloatingShapes.tsx - 5-8 semi-transparent polyhedra (icosahedrons, octahedrons, dodecahedrons). Randomized positions. Slow rotation via useFrame. Sine wave drift. MeshStandardMaterial with low opacity (0.08-0.15), accent color tint. Per SPEC.md Section 9.2
   - ParticleField.tsx - 50-100 small dots using drei Points. Very slow drift. Near-invisible (opacity 0.1-0.2). Per SPEC.md Section 9.2
   - Scene3D.tsx - R3F Canvas wrapper. Fixed full-viewport behind desktop (z-index -10). Sets camera, dpr [1, 1.5], frameloop. Suspense fallback null. Renders nothing if useReducedMotion() returns true. Hidden on mobile (< 768px via useIsMobile). Wraps Lighting + FloatingShapes + ParticleField. Per SPEC.md Section 9.1 and 9.3
   - Update background/index.ts barrel export

2. Integrate Scene3D into App.tsx:
   - Render as a fixed background layer behind Desktop
   - Wrap in React.lazy + Suspense so it doesn't block initial paint
   - Verify it adapts to theme changes (dimmer in light mode)

3. Build `src/components/desktop/BootSequence.tsx`:
   - Full-screen overlay (fixed, z-index above everything)
   - Sequence per SPEC.md Section 11.4:
     a. Black screen (200ms)
     b. Fade in monospace text "> jalkhurfan.com" with typing effect (800ms)
     c. Subtle loading dots (600ms)
     d. Fade out overlay (400ms)
     e. After complete: dispatch OPEN for "profile" window
   - Check sessionStorage("booted") - skip if already played
   - Set sessionStorage("booted", "true") after completion
   - Respect prefers-reduced-motion: skip animation, just auto-open profile
   - Use Framer Motion for all animation orchestration
   - Total duration ~2 seconds

4. Integrate BootSequence into Desktop.tsx:
   - Render conditionally based on boot state
   - Profile window auto-opens after boot completes

5. Verify:
   - `yarn dev` shows boot sequence on first load
   - Refreshing same tab skips boot (sessionStorage)
   - 3D shapes float and rotate in background
   - Theme switch adjusts 3D scene brightness
   - Resizing to mobile width hides 3D scene
   - `yarn build` passes clean
   - Performance: 3D scene doesn't cause jank or high CPU

6. Commit to v3 branch.

Follow all rules in .opencode/rules/portfolio-v3.md strictly. Keep triangle count under 2000. 3D scene is ambient decoration, not the focus.
```

---

## Session 4: App Content + Data + Locales

```
I'm building a portfolio v3. Read SPEC.md and the rules in .opencode/rules/ before doing anything.

This is Session 4: App Content + Data + Full Locale Content.

Sessions 1-3 are complete on the `v3` branch: scaffolding, desktop shell, window system, 3D background, boot sequence all working.

Tasks (in order):

1. Populate `src/data/` files with real content from the JSON resume (SPEC.md Section 19):
   - experience.ts: 6 entries (CME x3, areeba, TecFrac, NAR) with ids, company, companyUrl, position, location, startDate, endDate, tags
   - education.ts: 2 entries (ASU, AUB)
   - skills.ts: 6 categories (Frontend, Backend, DevOps, Databases, Testing, Languages) - drop "Other Tools & Libraries"
   - certificates.ts: 1 entry (Azure Fundamentals)
   - Update data/index.ts barrel

2. Populate `src/i18n/locales/en.ts` with full English content:
   - topbar keys
   - apps.profile: title, summary, stats labels, education section heading, certificates heading, trustedBy heading, downloadResume label
   - apps.experience: title, and for EACH experience id: position, company display name, all highlights (from JSON resume)
   - apps.skills: title, category names
   - apps.contact: title, subtitle, availability message, copy feedback
   - common: close, minimize, present, copied, open link labels

3. Populate `src/i18n/locales/ar.ts` with full Arabic translation (mirror the exact same key structure as en.ts). Use the v2 branch Arabic locale as reference where applicable (`git show v2:src/i18n/locales/ar.ts`). Translate all experience highlights to Arabic.

4. Build `src/components/apps/profile/`:
   - ProfileHeader.tsx - circular photo (profile.jpeg) with accent ring + glow, name (h2), title, summary paragraph. Per SPEC.md Section 12.2
   - StatsRow.tsx - three stat cards: "6+ Years Experience", "30+ Projects Delivered", "20+ Technologies". GlassCard for each.
   - EducationList.tsx - maps education data to styled entries (institution, degree, field, dates)
   - CertificateList.tsx - maps certificates to badge entries with external link icon
   - TrustedBy.tsx - "Trusted By" heading + row of company names (Deloitte, Revinate, Klareo, DGA Saudi Arabia) in styled glass pills
   - ProfileApp.tsx - container that composes all above sub-components. Imports data from @/data, text from useTranslation. Scrollable layout within window.
   - Update profile/index.ts barrel (only export ProfileApp)

5. Build `src/components/apps/experience/`:
   - ExperienceCard.tsx - single role: company, position, date range, location, "current" accent indicator. Expandable highlights list (collapsed by default, AnimatePresence for smooth expand/collapse). Tags row below highlights.
   - ExperienceTimeline.tsx - vertical timeline line + maps Experience[] to ExperienceCard components. Current role expanded by default.
   - ExperienceApp.tsx - container that imports experience data, passes to ExperienceTimeline.
   - Update experience/index.ts barrel

6. Build `src/components/apps/skills/`:
   - SkillBadge.tsx - pill badge with glass bg, subtle hover effect (lift + accent border glow)
   - SkillCategory.tsx - category heading + flex-wrap row of SkillBadge components
   - SkillsApp.tsx - container that imports skills data, maps categories to SkillCategory
   - Update skills/index.ts barrel

7. Build `src/components/apps/contact/`:
   - ContactInfo.tsx - heading + availability message
   - ContactLink.tsx - icon + label + value + action button. For email/phone: copy-to-clipboard (useCopyToClipboard hook) with "Copied!" feedback. For LinkedIn/GitHub: external link (opens in new tab).
   - ContactApp.tsx - container that composes ContactInfo + list of ContactLink using SOCIAL_LINKS data
   - Update contact/index.ts barrel

8. Update `src/components/apps/registry.ts` - ensure lazy imports point to the correct app components.

9. Verify:
   - All 4 windows open from dock and show real content
   - Profile shows photo, bio, stats, education, certificates, trusted-by, download resume link
   - Experience shows timeline with 6 roles, expandable highlights
   - Skills shows 6 categories with all skill badges
   - Contact shows 4 links (email, phone, LinkedIn, GitHub) with working copy/open actions
   - Switch to Arabic: all text translates, layout mirrors RTL
   - Both themes look correct
   - `yarn build` passes clean

10. Commit to v3 branch.

Follow all rules in .opencode/rules/portfolio-v3.md strictly. Every sub-component must be under 150 lines. All user-visible text must come from i18n, not hardcoded. Data files contain structural data only (dates, URLs, ids), not translatable strings.
```

---

## Session 5: Responsive + Performance + Accessibility + Polish

```
I'm building a portfolio v3. Read SPEC.md and the rules in .opencode/rules/ before doing anything.

This is Session 5: Responsive + Performance + Accessibility + Polish.

Sessions 1-4 are complete on the `v3` branch: full desktop OS portfolio with all 4 app windows (Profile, Experience, Skills, Contact), 3D background, boot sequence, i18n (EN/AR), theme toggle.

Tasks:

1. **Mobile Responsive (SPEC.md Section 16)**:
   - Windows: full-screen on mobile (< 768px). No drag. One window at a time (opening a new one closes the previous).
   - Dock: compact bottom bar, icons 36px, no magnification hover effect (tap only). Ensure it doesn't overlap window content.
   - TopBar: smaller text, compact layout. Theme and language toggles still accessible.
   - Boot sequence: shortened on mobile (skip typing effect, just fade in + auto-open profile).
   - 3D scene: hidden on mobile, show CSS gradient background instead (matching --bg-primary).
   - Test at 375px (iPhone SE), 390px (iPhone 14), 768px (iPad), and 1024px+ (desktop).

2. **Tablet Responsive**:
   - Windows take ~90% width, centered, not draggable.
   - Dock at full size but no magnification.
   - 3D scene can render on tablet if performant.

3. **RTL Polish**:
   - Switch to Arabic and verify every component mirrors correctly.
   - TopBar: name moves to right, toggles to left.
   - Dock: order doesn't change (centered, symmetric).
   - Windows: traffic-light buttons move to top-right, content aligns right.
   - Experience timeline: line on right side, cards align right.
   - Contact links: icons on right, text aligns right.
   - Fix any `text-left`/`text-right` that should be `text-start`/`text-end`.
   - Fix any `ml-`/`mr-` that should be `ms-`/`me-`.

4. **Accessibility (SPEC.md Section 18)**:
   - Add skip link ("Skip to main content") hidden until focused.
   - Dock icons: verify `role="button"`, `aria-label`, `aria-pressed`, `tabIndex`.
   - Windows: verify `role="dialog"`, `aria-labelledby`, `aria-modal`.
   - Close/minimize buttons: `aria-label`.
   - Theme toggle: `aria-label` that reflects current state.
   - Language switcher: `aria-label`.
   - 3D canvas: `aria-hidden="true"`.
   - Tab order: Dock icons → open window content → window controls.
   - Escape key closes focused window (should already work from Session 2).
   - Focus trap within open windows.
   - Verify color contrast on glass surfaces meets WCAG AA (4.5:1). If glass transparency reduces contrast, increase backdrop opacity or add text-shadow.

5. **Performance (SPEC.md Section 17)**:
   - Verify all app components are lazy-loaded (check network tab - separate chunks).
   - Verify Three.js is in its own chunk (vendor-three).
   - Profile image: ensure it's reasonably compressed. Add `loading="lazy"` if not in initial viewport.
   - Verify 3D scene doesn't cause high CPU when idle (frameloop should reduce when no animation).
   - Test with Chrome DevTools Performance tab - no jank on window open/close.
   - Reduced motion: verify `prefers-reduced-motion` disables 3D, simplifies animations.

6. **Visual Polish**:
   - Consistent spacing across all windows.
   - Hover states on all interactive elements.
   - Smooth transitions on theme change (background, text, borders should transition ~300ms).
   - Window shadow looks correct in both themes.
   - Dock magnification feels fluid (spring animation, not linear).
   - Boot sequence typing effect looks natural.
   - No layout shift on window open/close.
   - Scrollbar styling consistent in all windows.

7. Verify:
   - `yarn build` passes clean.
   - Test at all breakpoints (375px, 768px, 1024px, 1440px).
   - Test both themes at all breakpoints.
   - Test Arabic RTL at all breakpoints.
   - Test with keyboard only (no mouse).
   - Test with `prefers-reduced-motion: reduce` (in Chrome DevTools > Rendering).

8. Commit to v3 branch.

Follow all rules in .opencode/rules/portfolio-v3.md strictly. This session is about quality, not new features.
```

---

## Session 6a: Window System Overhaul

```
I'm building a portfolio v3. Read SPEC.md (especially the new Section 24) and the rules in .opencode/rules/ before doing anything.

This is Session 6a: Window System Overhaul.

Sessions 1-5 are complete on the `v3` branch: fully built, responsive, accessible, performant portfolio with 4 app windows. This session focuses on making the window system feel like a real OS.

Refer to SPEC.md Sections 24.1 and 24.9 for full details.

Tasks (in order):

1. **Update types** (`types/window.ts`):
   - Expand `AppId` union to include: "terminal", "projects", "notepad", "settings", "finder" (apps built in later sessions, but types need to be ready)
   - Add `isMaximized: boolean` to `WindowState`
   - Add `size?: { width: number; height: number }` to `WindowState`
   - Add actions: `MAXIMIZE`, `UNMAXIMIZE`, `UPDATE_SIZE`
   - Add convenience methods: `maximizeWindow`, `unmaximizeWindow`, `toggleMaximize` to `WindowManagerContextValue`

2. **Update WindowProvider** (`context/WindowProvider.tsx`):
   - Update `ALL_APP_IDS` to include all 9 app IDs
   - Implement `MAXIMIZE` action: sets `isMaximized=true`, stores pre-maximize position/size for restore
   - Implement `UNMAXIMIZE` action: restores previous position/size, sets `isMaximized=false`
   - Implement `UPDATE_SIZE` action: updates window dimensions
   - Update `OPEN` action: calculate cascade position (30px offset per open window, wrap when off-screen)
   - Add `maximizeWindow`, `unmaximizeWindow`, `toggleMaximize` convenience methods

3. **Fix drag constraints** (`components/window/Window.tsx`):
   - Replace static `dragConstraints={{ top: 0, left: -400, right: 400, bottom: 200 }}` with dynamic constraints
   - Top: window cannot go above 32px (TopBar height)
   - Left/Right/Bottom: title bar must remain at least 50% visible
   - Use a container ref or calculate constraints based on viewport + window dimensions
   - When maximized, disable dragging entirely

4. **Green button maximize** (`components/window/WindowHeader.tsx`):
   - Convert green `<div>` from decorative to functional `<button>`
   - Add `onMaximize` prop
   - On click: toggle between maximized and normal state
   - Add hover state: show expand/collapse icon (like macOS)
   - Add `aria-label` for accessibility
   - Double-click title bar also toggles maximize

5. **Window maximize styles** (`components/window/Window.tsx`):
   - When maximized: `inset-0 top-[32px] rounded-none` (fills viewport below TopBar)
   - Smooth Framer Motion transition between normal and maximized states
   - When maximized: no drag, no resize handles

6. **Window resize** (new `components/window/ResizeHandle.tsx` + hook `hooks/useWindowResize.ts`):
   - Create `ResizeHandle` component: renders 8 invisible hit areas around window edges
   - Create `useWindowResize` hook: tracks pointer events on handles, calculates new size
   - Min size: 400x300px. Max size: viewport minus safe areas
   - Correct cursor for each handle direction
   - Desktop only (hidden on mobile/tablet)
   - Hidden when maximized

7. **Cascade offset**:
   - Update the `OPEN` reducer to compute initial position based on number of currently open windows
   - First window: centered. Each subsequent: +30px down and +30px right
   - If offset would push window off-screen, wrap back to starting position
   - Apply position as initial drag offset

8. **Verify**:
   - `yarn dev`: windows open with cascade offset
   - Green button toggles fullscreen smoothly
   - Windows can be resized from all edges/corners
   - Drag constraints prevent losing windows
   - Title bar double-click toggles maximize
   - Mobile: no resize handles, no maximize, full-screen behavior unchanged
   - `yarn build` passes clean

9. **Commit** to v3 branch.

Follow all rules in .opencode/rules/portfolio-v3.md strictly. This is a complex session - break into small, testable increments. Types first, then reducer, then UI.
```

---

## Session 6b: Interactions + UI Polish

```
I'm building a portfolio v3. Read SPEC.md (especially Sections 24.3, 24.4, 24.8) and the rules in .opencode/rules/ before doing anything.

This is Session 6b: Interactions + UI Polish.

Session 6a is complete: window system now supports maximize, resize, cascade positioning, and proper drag constraints.

Refer to SPEC.md Sections 24.3, 24.4, and 24.8 for full details.

Tasks (in order):

1. **Click target expansion** (Section 24.3.1):
   - ExperienceCard: move `onClick` to the outermost card container so clicking padding triggers expand/collapse. Add `cursor-pointer` to full card area.
   - ContactLink: make the entire card row clickable (not just the small button). Clicking anywhere on the card triggers copy (email/phone) or open (LinkedIn/GitHub).
   - Audit all interactive components for dead click zones on padding.

2. **Cursor management audit** (Section 24.3.2):
   - Verify and fix cursors on: window title bar, traffic light buttons, dock icons, accordion headers, contact links, external links, copy buttons, TopBar buttons, desktop background.
   - Add `cursor-pointer` where missing on clickable elements.
   - Ensure drag handles show `cursor-grab`/`cursor-grabbing`.

3. **Hover state enhancements** (Section 24.3.3):
   - Traffic light buttons: show small icons on hover (X for close, - for minimize, expand arrows for maximize) like macOS. Use lucide icons (X, Minus, Maximize2) at 8px size, hidden by default, visible on hover.
   - ExperienceCard: add background shift + subtle border glow on hover.
   - ContactLink cards: add border accent + slight translateY lift on hover.
   - GlassCard hoverable: add translateY(-1px) lift.
   - All interactive elements: ensure smooth transition (200ms).

4. **Right-click context menus** (Section 24.3.5):
   - Create `<ContextMenu>` component in `components/ui/`: glass card, positioned at pointer, renders a list of menu items. Click-away to dismiss. Portal rendering for z-index safety.
   - Create `useContextMenu` hook: handles `contextmenu` event, returns position + visibility state.
   - Desktop context menu (right-click empty area): Change Wallpaper, Toggle Theme, Switch Language, About This Portfolio.
   - Window context menu (right-click title bar): Close, Minimize, Maximize/Restore, Bring to Front, Send to Back.

5. **Long press on dock icons** (Section 24.3.4):
   - Create `useLongPress` hook (500ms threshold).
   - On long press of dock icon: show context popover above icon.
   - If window open: Close, Minimize, Bring to Front.
   - If window closed: Open.
   - Desktop only.

6. **Toolbars** (Section 24.4):
   - Create `<WindowToolbar>` reusable component: sits between WindowHeader and WindowContent, glass bg, 36px height, border-bottom.
   - Experience App toolbar: company filter pills (All, CME, areeba, TecFrac, NAR), Expand All / Collapse All toggle.
   - Skills App toolbar: category filter pills, search input to filter skills by name.
   - Wire toolbars into their respective apps.

7. **App-level UI polish** (Section 24.8):
   - Profile: staggered entrance animation for sections, stats counting up from 0, subtle photo breathing animation.
   - Experience: "Current" badge with subtle pulse on active role, tags staggered entrance, smoother accordion transition (overflow-hidden during animation).
   - Skills: staggered badge entrance (wave effect), skill count summary text.
   - Contact: staggered link entrance, gradient text on heading, copy success flash, live timezone indicator.
   - General: subtle section dividers, scroll shadow at top of WindowContent when scrolled, micro-interaction press feedback on all buttons.

8. **Verify**:
   - Click targets work correctly (no dead zones)
   - Cursors are correct everywhere
   - Hover states provide clear visual feedback
   - Context menus work on desktop (right-click)
   - Long press works on dock icons (desktop)
   - Toolbars filter and toggle correctly
   - Animations are smooth, not janky
   - Reduced motion respects all new animations
   - Mobile: context menus and long press disabled gracefully
   - `yarn build` passes clean

9. **Commit** to v3 branch.

Follow all rules in .opencode/rules/portfolio-v3.md strictly. This session is dense - prioritize correctness over completeness. Better to do 80% polished than 100% rushed.
```

---

## Session 6c: TopBar + Keyboard + Spotlight

```
I'm building a portfolio v3. Read SPEC.md (especially Sections 24.6, 24.7) and the rules in .opencode/rules/ before doing anything.

This is Session 6c: TopBar + Keyboard + Spotlight.

Sessions 6a-6b are complete: window system overhaul and interaction polish done.

Refer to SPEC.md Sections 24.6 and 24.7 for full details.

Tasks (in order):

1. **Branding menu** (Section 24.6.1):
   - Replace the owner name text in TopBar left section with a clickable monogram/logo.
   - Clicking opens a dropdown menu (glass card, positioned below trigger).
   - Items: "About Jihad Al-Khurfan" (opens Profile), separator, "Restart..." (replays boot sequence by clearing sessionStorage), "Shut Down..." (fun fade-to-black animation, then restores), separator, "View Source" (opens GitHub repo in new tab).
   - Click-away to dismiss.

2. **App menu system** (Section 24.6.2):
   - Add a dynamic menu bar in TopBar (after branding menu, before center clock).
   - Always show "File" menu: Close Window, Close All Windows.
   - Per-app menus change based on focused window. Each app can optionally export `menuConfig` in its app definition.
   - Experience: View menu with Expand All / Collapse All.
   - Terminal: Edit menu with Clear Terminal.
   - Other apps: only default File menu.
   - Implementation: extend `AppDefinition` type with optional `menuConfig`. TopBar reads focused window's config.
   - On mobile: hide app menus (not enough space).

3. **Status tray icons** (Section 24.6.4):
   - Add decorative WiFi, Battery, and optionally Bell icons to the right side of TopBar.
   - Positioned before the existing theme/language toggles.
   - Tooltips on hover showing decorative status messages.
   - Mobile: hide or show only 1-2 icons.

4. **Spotlight search** (Section 24.6.3):
   - Create `<Spotlight>` component: modal overlay with search input + results list.
   - Glass background, centered, max-width 600px.
   - Trigger: Cmd+K (or Ctrl+K) keyboard shortcut, or clicking search icon in TopBar (add a small search icon if space permits).
   - Searchable items: app names, skills, actions (toggle theme, switch language, download resume), company names.
   - Filter on input change. Enter selects first result. Arrow keys navigate results. Escape closes.
   - Results show icon + label + category hint.
   - Build a flat searchable index in a `data/spotlight-index.ts` or compute from existing data.

5. **Keyboard shortcuts** (Section 24.7):
   - Create `useKeyboardShortcuts` hook.
   - Register in Desktop.tsx:
     - Cmd+1 through Cmd+9: open/focus app by dock position
     - Cmd+W: close focused window
     - Cmd+M: minimize focused window
     - Cmd+K: open Spotlight
     - Cmd+`: cycle focus to next open window
     - Escape: close focused window (already exists, ensure it still works)
   - Arrow keys: navigate dock when dock is focused.
   - Use `e.metaKey || e.ctrlKey` for cross-platform support.
   - `e.preventDefault()` on captured shortcuts.
   - NOTE: Be careful with Cmd+W -- it closes browser tabs. Consider showing a hint overlay instead of intercepting, or only intercept if a window is focused.

6. **Keyboard shortcut cheat sheet**:
   - Pressing `?` (when no input is focused) shows a modal overlay listing all shortcuts.
   - Can also be accessed from Settings app or branding menu.

7. **Update i18n** for all new menu items, Spotlight labels, and shortcut descriptions.

8. **Verify**:
   - Branding menu opens/closes correctly
   - App menus change based on focused window
   - Status tray icons are decorative and have tooltips
   - Cmd+K opens Spotlight, searching works, results navigate correctly
   - All keyboard shortcuts work as expected
   - Shortcuts don't interfere with browser defaults when no window is focused
   - Mobile: menus condensed or hidden, Spotlight accessible via icon
   - RTL: menus and Spotlight mirror correctly
   - `yarn build` passes clean

9. **Commit** to v3 branch.

Follow all rules in .opencode/rules/portfolio-v3.md strictly.
```

---

## Session 6d: New Apps (Part 1 - Terminal, Projects, Settings)

```
I'm building a portfolio v3. Read SPEC.md (especially Sections 24.5.1, 24.5.2, 24.5.4) and the rules in .opencode/rules/ before doing anything.

This is Session 6d: New Apps (Part 1).

Sessions 6a-6c are complete: window system overhauled, interactions polished, TopBar enhanced, keyboard shortcuts and Spotlight working.

Refer to SPEC.md Sections 24.5.1, 24.5.2, and 24.5.4 for full details.

Tasks (in order):

1. **Preferences context** (prerequisite for Settings app):
   - Create `types/preferences.ts` with all preference types (accent color, wallpaper, dock settings, animation speed, font size, reduce motion override).
   - Create `context/PreferencesProvider.tsx` with `useReducer`, `localStorage` persistence, and sensible defaults.
   - Wire into provider hierarchy in `main.tsx` (outside ThemeProvider so preferences can control theme).
   - Create `hooks/usePreferences.ts` for consuming.

2. **Settings app** (Section 24.5.4):
   - Create `components/apps/settings/` directory.
   - `SettingsApp.tsx`: main container with section navigation.
   - Sections:
     a. Appearance: theme toggle with preview, accent color picker (cyan, purple, green, amber, rose), wallpaper thumbnail selector.
     b. Dock: magnification toggle, icon size (small/medium/large).
     c. Windows: animation speed (normal/fast/off), auto-cascade toggle.
     d. Language: EN/AR toggle with direction preview.
     e. Accessibility: reduce motion toggle, font size (small/normal/large).
   - Changes take effect immediately (live preview).
   - Persist all settings to localStorage.

3. **Accent color system**:
   - Define 5 accent color presets in `constants/colors.ts`:
     - Cyan (#06b6d4) - default
     - Purple (#8b5cf6)
     - Green (#22c55e)
     - Amber (#f59e0b)
     - Rose (#f43f5e)
   - Each preset includes: `value`, `hover`, `glow` variants.
   - When accent changes, update all `--accent-*` CSS variables on `:root`.
   - All existing components already use `var(--accent)` so they'll update automatically.

4. **Terminal app** (Section 24.5.1):
   - Create `components/apps/terminal/` directory.
   - Create `data/terminal-commands.ts`: command registry mapping command names to handler functions.
   - `TerminalApp.tsx`: terminal UI with monospace font, dark opaque background, blinking cursor, prompt display, input field.
   - Functional commands: `help`, `about`, `skills`, `experience`, `contact`, `open <app>`, `close <app>`, `theme <dark|light>`, `clear`, `ls`, `cat resume`, `whoami`.
   - Fun commands: `sudo hire me`, `rm -rf /`, `ping google.com`, `neofetch`, `matrix`.
   - Unknown commands: "command not found" message.
   - Command history: arrow up/down cycles previous commands (session-scoped).
   - Auto-scroll output to bottom.
   - Welcome banner with ASCII art on open.
   - Toolbar: Clear button, font size toggle.

5. **Projects app** (Section 24.5.2):
   - Create `components/apps/projects/` directory.
   - Create `data/projects.ts` with Project interface and 3-5 placeholder entries.
   - `ProjectsApp.tsx`: grid of project cards (2 col desktop, 1 col mobile).
   - `ProjectCard.tsx`: name, description, tech tags, demo + GitHub links.
   - Featured projects: accent border + slightly larger.
   - Toolbar: filter by technology tag.

6. **Register new apps**:
   - Add `terminal`, `projects`, `settings` to `APP_DEFINITIONS` in `constants/apps.ts`.
   - Add dock icons: Terminal (Terminal icon), Projects (FolderGit2 icon), Settings (Settings icon).
   - Consider dock grouping: primary apps left, utility apps right with a subtle divider gap.

7. **Update i18n** for all new app content (en.ts and ar.ts):
   - Terminal: command outputs, welcome message, help text.
   - Projects: project names, descriptions.
   - Settings: section labels, option labels, descriptions.

8. **Verify**:
   - Settings app opens, all preferences work and persist across refresh.
   - Accent color changes are reflected across entire UI immediately.
   - Terminal accepts input, commands work, history works, auto-scrolls.
   - Projects shows card grid with placeholder data.
   - All new apps work in both themes, both languages, RTL.
   - Dock accommodates new icons without breaking layout.
   - `yarn build` passes clean.

9. **Commit** to v3 branch.

Follow all rules in .opencode/rules/portfolio-v3.md strictly. Each app should be self-contained. Keep component files under 150 lines.
```

---

## Session 6e: New Apps (Part 2) + Visual Enhancement

````
I'm building a portfolio v3. Read SPEC.md (especially Sections 24.5.3, 24.5.5, 24.2) and the rules in .opencode/rules/ before doing anything.

This is Session 6e: New Apps (Part 2) + Visual Enhancement.

Sessions 6a-6d are complete: window system overhauled, interactions polished, TopBar enhanced, keyboard shortcuts, Spotlight, Terminal, Projects, and Settings apps working.

Refer to SPEC.md Sections 24.5.3, 24.5.5, 24.2 for full details.

Tasks (in order):

1. **Finder app** (Section 24.5.5):
   - Create `data/filesystem.ts`: define virtual file tree structure.
     ```
     ~/
     ├── Documents/
     │   ├── Resume.pdf → downloads resume
     │   ├── Resume_Detailed.pdf → downloads detailed resume
     │   └── Azure_AZ-900.pdf → links to cert
     ├── Projects/
     │   └── (entries from projects data)
     ├── About.txt → opens Profile app
     └── Contact.txt → opens Contact app
     ```
   - Create `components/apps/finder/` directory.
   - `FinderApp.tsx`: main layout with sidebar + content pane.
   - Sidebar: collapsible folder tree (macOS Finder-like).
   - Content pane: file list for selected folder (icon + name + type + date).
   - Toolbar: breadcrumb path, back/forward navigation.
   - Double-click: triggers action (download PDF, open app window, open URL).
   - Single-click: highlight/select.

2. **Notepad/Guestbook app** (Section 24.5.3):
   - Create `components/apps/notepad/` directory.
   - `NotepadApp.tsx`: split into input area + messages list.
   - Input: text area (max 500 chars), optional name field, submit button.
   - Backend: use Formspree (free tier) for submissions. If API key not configured, fallback to localStorage-only mode with a "Guestbook coming soon" message.
   - Messages list: scrollable, shows name + message + timestamp.
   - Rate limiting: one submission per session (sessionStorage).
   - Styling: notepad-like appearance (subtle lined texture or clean glass).

3. **Register remaining apps**:
   - Add `finder` and `notepad` to `APP_DEFINITIONS`.
   - Dock icons: Finder (Folder icon), Notepad (StickyNote icon).
   - Final dock layout: Profile, Experience, Skills, Projects, Contact | (gap) | Terminal, Finder, Notepad, Settings.

4. **Enhanced glass aesthetic** (Section 24.2.1):
   - Add subtle gradient overlay on glass surfaces (top-left light source simulation):
     `linear-gradient(135deg, rgba(255,255,255,0.05) 0%, transparent 50%)`.
   - Add animated accent glow on focused windows: slow CSS pulse on border color.
   - Add subtle noise texture overlay on glass (SVG filter or CSS, opacity 0.02-0.04).
   - Add inner highlight: `inset` box shadow for bevel/reflection effect.
   - Deeper unfocused window treatment: stronger blur + darker overlay.

5. **Technology logos in skills** (Section 24.2.2):
   - Choose approach: inline SVGs from devicon or simple-icons.
   - Create `constants/skill-icons.ts` mapping skill names to SVG components or icon identifiers.
   - Update `SkillBadge` to render icon (16px) + text side by side.
   - Fallback: skills without icon show text only.

6. **Company logos in experience** (Section 24.2.3):
   - Source or create small logos for CME, areeba, TecFrac, NAR Technologies.
   - Store in `public/assets/images/logos/` or as inline SVGs.
   - Update `ExperienceCard` to show logo (24-32px) next to company name.
   - Fallback: company initial in colored circle.

7. **Wallpaper system** (Section 24.2.4):
   - Implement wallpaper options: 3D Shapes (default), Gradient, Solid Dark, Solid Light, Subtle Pattern.
   - `App.tsx` conditionally renders selected background.
   - 3D scene only loaded/rendered when "3D Shapes" wallpaper is selected.
   - Controlled via Settings app wallpaper selector.
   - Persist selection in PreferencesContext.

8. **Dock layout update**:
   - With 9 apps, add a subtle divider gap between primary apps (Profile through Contact) and utility apps (Terminal through Settings).
   - Ensure dock doesn't overflow on smaller screens. On mobile: show only primary apps, add a "more" indicator or scrollable dock.

9. **Update i18n** for Finder and Notepad content (en.ts and ar.ts).

10. **Verify**:
    - Finder navigates virtual filesystem, actions work (download, open app).
    - Notepad accepts input, submits (or falls back to localStorage).
    - Glass enhancement is subtle and premium-feeling.
    - Tech logos appear on skill badges.
    - Company logos appear on experience cards.
    - Wallpaper changes from Settings app.
    - Dock handles 9 icons gracefully at all breakpoints.
    - All new features work in both themes, both languages, RTL.
    - `yarn build` passes clean.

11. **Commit** to v3 branch.

Follow all rules in .opencode/rules/portfolio-v3.md strictly. This is the final feature session before deployment.
````

---

## Session 7: Deploy + Final QA

```
I'm building a portfolio v3. Read SPEC.md and the rules in .opencode/rules/ before doing anything.

This is Session 7: Deploy + Final QA.

Sessions 1-5 (core build) and 6a-6e (enhancements) are complete on the `v3` branch: fully built, enhanced portfolio with 9 app windows, overhauled window system, rich interactions, and visual polish.

Tasks:

1. **Pre-deploy checks**:
   - Run `yarn build` - must pass clean with zero warnings
   - Run `yarn preview` - verify the production build works locally
   - Check all 9 windows render correctly in preview
   - Check both themes in preview
   - Check Arabic/RTL in preview
   - Check mobile viewport in preview
   - Check all keyboard shortcuts work
   - Check Spotlight search works
   - Check right-click context menus work
   - Check window maximize, resize, and cascade work

2. **GitHub Pages setup**:
   - Verify `public/CNAME` contains `jalkhurfan.com`
   - Verify `base: "/"` in vite.config.ts (custom domain)
   - Add 404.html handling: after build, copy dist/index.html to dist/404.html (add to build script or deploy script)
   - Update package.json deploy script: `"deploy": "yarn build && cp dist/index.html dist/404.html && gh-pages -d dist"`
   - Verify gh-pages is in devDependencies

3. **Final cleanup**:
   - Remove any console.log statements
   - Remove any TODO/FIXME comments (or resolve them)
   - Verify no unused imports across all files
   - Verify no unused dependencies in package.json
   - Verify .gitignore covers: node_modules/, dist/, .env, .DS_Store
   - Ensure SPEC.md, SESSIONS.md, and .opencode/rules/ are committed

4. **Meta tags & SEO**:
   - Verify index.html has proper meta tags:
     - title: "Jihad Al-Khurfan | Senior Software Engineer"
     - description: summary from resume
     - og:title, og:description, og:type (website), og:url (jalkhurfan.com)
     - twitter:card (summary)
     - viewport meta tag
     - theme-color meta tag
   - Verify favicon.ico is present

5. **Performance audit**:
   - Check bundle sizes: initial load should be reasonable (lazy loading keeps it manageable)
   - Verify all 9 apps are code-split (separate chunks)
   - Verify Three.js only loads when 3D wallpaper is selected
   - Run Lighthouse and address any critical issues
   - Check for memory leaks (open/close windows rapidly)

6. **Accessibility audit**:
   - Keyboard-only navigation through all 9 apps
   - Screen reader testing on key flows
   - Color contrast check for all accent color options
   - Focus management with new context menus and Spotlight

7. **Deploy**:
   - Run `yarn deploy`
   - Verify gh-pages branch is updated
   - If the DNS/custom domain is already configured, verify https://jalkhurfan.com loads
   - If not, note that DNS configuration is needed

8. **Final commit** to v3 branch with any last adjustments.

9. **Optionally**: merge v3 into master (ask the user first).

Follow all rules in .opencode/rules/portfolio-v3.md strictly. This is the final session - ship it clean.
```
