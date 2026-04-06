# Session Workflow Rules

Follow this workflow at the start of every coding session on this project.

## Session Start Checklist

1. **Read SPEC.md** - Refresh on the full specification. Pay attention to the
   section relevant to your current phase.
2. **Check existing code** - Before writing any new file, read the existing
   files in that directory. Understand what's already built.
3. **Review types/** - Always check existing type definitions before creating
   new ones. Reuse and extend, don't duplicate.
4. **Check barrel exports** - When adding a new file to a directory, update
   the `index.ts` barrel export.

## During Work

1. **Run `yarn dev`** after significant changes to verify nothing is broken.
2. **Run `yarn build`** before marking a phase complete to catch type errors.
3. **One component at a time** - Build, verify, then move on. Don't scaffold
   5 empty files and fill them all at once.
4. **Test in browser** - After building UI components, visually verify they
   render correctly.
5. **Check both themes** - Verify dark and light mode look correct.
6. **Check RTL** - Switch to Arabic and verify layout mirrors correctly.

## Code Quality Checks Before Committing

1. No TypeScript errors (`yarn build` passes)
2. No unused imports or variables
3. No files exceeding size limits (150 lines for components)
4. All new components have proper Props interface exported
5. All interactive elements have ARIA attributes
6. All text uses i18n keys (no hardcoded English strings in JSX)
7. All styling uses Tailwind classes or CSS variables (no arbitrary values
   unless truly necessary)
8. Barrel exports updated for any new files

## Phase Completion

1. Run `yarn build` - must pass clean
2. Visual check in browser (both themes, both languages if applicable)
3. Commit with descriptive message
4. Note any deferred items or known issues for next session

## Cross-Session Consistency

- The SPEC.md is the source of truth for architecture decisions
- The portfolio-v3.md rules file is the source of truth for coding standards
- If you need to deviate from the spec, document why in a comment
- Never refactor existing working code without being asked - focus on the
  current phase
- If you discover a bug in previously built code, fix it but note what you
  fixed
