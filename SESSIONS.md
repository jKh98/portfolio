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

## Session 6: Deploy + Final QA

```
I'm building a portfolio v3. Read SPEC.md and the rules in .opencode/rules/ before doing anything.

This is Session 6: Deploy + Final QA.

Sessions 1-5 are complete on the `v3` branch: fully built, responsive, accessible, performant portfolio.

Tasks:

1. **Pre-deploy checks**:
   - Run `yarn build` - must pass clean with zero warnings
   - Run `yarn preview` - verify the production build works locally
   - Check all 4 windows render correctly in preview
   - Check both themes in preview
   - Check Arabic/RTL in preview
   - Check mobile viewport in preview

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
   - Ensure SPEC.md, SESSIONS.md, and .opencode/rules/ are committed (they're documentation, fine to keep)

4. **Meta tags & SEO**:
   - Verify index.html has proper meta tags:
     - title: "Jihad Al-Khurfan | Senior Software Engineer"
     - description: summary from resume
     - og:title, og:description, og:type (website), og:url (jalkhurfan.com)
     - twitter:card (summary)
     - viewport meta tag
     - theme-color meta tag
   - Verify favicon.ico is present

5. **Deploy**:
   - Run `yarn deploy`
   - Verify gh-pages branch is updated
   - If the DNS/custom domain is already configured, verify https://jalkhurfan.com loads
   - If not, note that DNS configuration is needed (GitHub Pages settings + domain registrar)

6. **Final commit** to v3 branch with any last adjustments.

7. **Optionally**: merge v3 into master (ask the user first - they may want to review before merging).

Follow all rules in .opencode/rules/portfolio-v3.md strictly. This is the final session - ship it clean.
```
