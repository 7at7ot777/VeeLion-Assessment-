# REVIEW

> After each change, add what has been changed below, using this template:

```md
## Change N — <what was changed>
- Status: Done
- Files changed:
- Type: Performance | Maintainability | UX issues | Code quality | React best practices
- What was wrong:
- Why it was bad:
- What was changed:
```

---

## Change 2 — Build the /reports module
- Status: Done
- Files changed: new `types/api.ts` (`TasksSummary`), new `lib/backendApi.ts` fetcher (`getReportsSummaryFromBackend`), new `app/api/reports/tasks-summary/route.ts` proxy, new `hooks/useReports.ts`, new `components/reports/StatCard.tsx`, new `components/reports/ReportsSummary.tsx`, new `app/reports/page.tsx`, `app/page.tsx` (home link)
- Type: Maintainability
- What was wrong:
  - The required `/reports` page did not exist — no types, no proxy, no fetcher, no page, and no way to navigate to it.
- Why it was bad:
  - A module the brief requires was missing from the app.
- What was changed:
  - Follows the existing module pattern end to end: `TasksSummary` type → `getReportsSummaryFromBackend()` (reads `GET /reports/tasks-summary`, raw shape) → proxy route `app/api/reports/tasks-summary` → `useReports` hook (loading/error/retry) → `ReportsSummary` renders five stat cards: Total tasks, Todo, In progress, Done, and Recent activity ("Last 7 days" hint).
  - Added a `/reports` card on the home page so the module is reachable.
  - Loading and error states: loading message while fetching; on failure an error card with the backend's message plus a working Retry button.
- Verification: `npm run build` passes; live-tested with the real backend — cards render 3 / 2 / 0 / 1 / 3 matching the API; killed the backend to confirm the error state shows ("fetch failed" + Retry), restarted it, clicked Retry, and the data returned. Home links to all three modules.

---

## Change 3 — Polish the UI and move styles into CSS classes
- Status: Done
- Files changed: `app/globals.css`, `app/page.tsx`, `app/tasks/page.tsx`, `app/activity/page.tsx`, `app/reports/page.tsx`, `components/tasks/*`, `components/activity/*`, `components/reports/*`
- Type: UX issues, Code quality
- What was wrong:
  - The stylesheet was minimal and everything was styled with inline `style={{ }}` objects; pages looked flat and the components couldn't share styles.
- Why it was bad:
  - Inline styles can't be reused or themed and repeated layout rules (cards, rows, badges) were duplicated in JSX.
- What was changed:
  - Rebuilt `globals.css` as a small design system: color tokens, typographic scale, card shadows with hover lift, button/badge variants (status-todo/status-done colors), stat-card, list, alert, empty-state, focus-visible outlines, and a mobile breakpoint.
  - Removed all inline styles from pages and components — they now use the shared classes; `grep style={{}}` returns nothing.
  - Visual result: consistent page headers, colored status badges (amber/green), stat cards grid on Reports, card grids on Home.
- Verification: `npm run build` passes; all four pages screenshot-verified with data from the live backend.

---

## Change 4 — Ignore the local .env file
- Status: Done
- Files changed: `.gitignore`
- Type: Maintainability
- What was wrong:
  - `.gitignore` covered the `.env.local*` variants but not `.env` itself, so the local backend URL file would be picked up as a committable change.
- Why it was bad:
  - `.env` is machine-specific local setup; committing it or accidentally staging it creates noisy diffs and risks leaking local config.
- What was changed:
  - Added `.env` to `.gitignore` — confirmed working with `git check-ignore`. The committed `.env.example` remains the documented template for setting `NEXT_PUBLIC_BACKEND_API_URL`.
- Verification: `git status` no longer lists `.env` as untracked; `npm run build` still passes.


---

## Change 1 — Refactor the activity feed module
- Status: Done
- Files changed: `app/activity/page.tsx`, new `hooks/useActivity.ts`, new `components/activity/ActivitySearch.tsx`, `components/activity/ActivityList.tsx`, `components/activity/ActivityItem.tsx`, new `lib/http.ts`, `hooks/useTasks.ts`
- Type: Performance, React best practices, Code quality, UX issues
- What was wrong:
  - The activity page re-rendered the whole list every 1.4 seconds on a pointless interval, and kept three state copies of the same list (`allActivity`, `shownActivity`, `forcedList`), copying arrays on every tick.
  - The same filter and timestamp helpers existed twice (A/B versions), and each row printed the same timestamp twice.
  - The fetch never checked `response.ok` and ignored the backend error shape, so failures looked like an empty feed. There was no loading, error, retry, or empty-state message.
  - The tasks hook kept its own private copy of the same fetch/error helpers.
- Why it was bad:
  - Continuous useless re-renders and array copies burned CPU for a static list, and the three copies of one list invited drift bugs.
  - Duplicate helper pairs and repeated timestamps were dead weight confusing readers.
  - Users could not tell loading, failure, or zero results apart — all looked like an empty page.
- What was changed:
  - New `hooks/useActivity.ts` holds all data logic: one fetch, loading/error state, and the visible list derived once with `useMemo` from query + data. The interval, `tick`, and the two extra state copies are gone.
  - Page decomposed like the tasks module: `ActivitySearch`, `ActivityList` (empty vs no-match messages), `ActivityItem` (single timestamp per row).
  - New shared `lib/http.ts` (typed `requestJson` + error parsing); `hooks/useTasks.ts` now imports it instead of its private copy.
  - Behavior kept identical apart from the intended improvements: search, counts, and item contents work exactly as before.
- Verification: `npm run build` passes; live-tested against the running backend (list loads 3/3, search filters 3 → 1, no-hit search shows "No activity matches this search.", clearing restores 3/3).

---

## Change 5 — Visual refresh: app shell, iconography and richer states
- Status: Done
- Files changed: `app/globals.css`, `app/layout.tsx`, `app/page.tsx`, `app/tasks/page.tsx`, `app/activity/page.tsx`, `app/reports/page.tsx`, `hooks/useTasks.ts`, `components/tasks/*`, `components/activity/*`, `components/reports/*`, new `components/layout/AppNav.tsx`, new `components/home/LiveStats.tsx`, new `components/ui/` (`icons.tsx`, `Skeleton.tsx`, `EmptyState.tsx`, `ErrorState.tsx`), new `lib/format.ts`
- Type: UX issues, Code quality
- What was wrong:
  - The app had no product shell: every page started with a bare "Back" button, and there was no navigation or branding anywhere.
  - All four screens were flat walls of white cards — no icons, no visual hierarchy, raw `toLocaleString()` timestamps, and plain-text loading states ("Loading tasks…") that did not match the layout that replaced them.
  - Empty, error and filter states were plain sentences, and filters were unstyled pills with no counts.
- Why it was bad:
  - Moving between modules meant bouncing through the home page; the flat presentation made scanning tasks / activity / stats slow, and the placeholder text states made the app look unfinished (and caused layout jumps when data arrived).
- What was changed:
  - **App shell:** sticky blurred top navigation with brand mark and Tasks / Activity / Reports links (active link highlighted via `usePathname`, `aria-current="page"`); the per-page "Back" buttons are gone; slim page footer. Updated `metadata` to "VeeLion Task Manager".
  - **Design system (`globals.css`):** rebuilt tokens (status accent set, brighter bar colors, focus ring), plus new building blocks — hero gradient, nav, segmented control, timeline, distribution bar, chips, dotted badges, shimmer skeletons, icon chips, empty/error cards, and a `prefers-reduced-motion` block.
  - **Home:** gradient hero with live counts (total / completed / events, fetched from the reports API by a small `LiveStats` component that fails silently if the backend is down) and module tiles with icon chips and hover affordances.
  - **Tasks:** module header with completion summary bar (`1 of 3 complete · 33%`); filters are now a segmented control with per-filter counts; rows use a round check control (with inline busy spinner; same "Mark as completed/pending" action, now a proper `aria-pressed` toggle), struck-through completed titles, relative "Updated 2h ago" timestamps and dotted status badges.
  - **Activity:** search field with icon and a clear button, event/summary chips, and a refresh button; rows are now a timeline (rail + node + card) with relative times.
  - **Reports:** stat cards gained tone-colored icon chips and hints; the completion card shows the percentage plus a segmented distribution bar with a legend (todo / in-progress / done) instead of a single bar.
  - Loading states are layout-matching shimmer skeletons everywhere (`SkeletonRows`, `SkeletonStatGrid`); errors use a shared `ErrorState` (icon + message + Retry); empty views use a shared `EmptyState`.
  - New shared `lib/format.ts` (`formatRelativeTime` / `formatDateTime`) replaces raw `toLocaleString()`; new dependency-free `components/ui/icons.tsx` (stroke SVG set) powers all iconography.
- Verification: `npm run build` passes (type-check + 10 routes); live-tested — task toggle flips Pending ↔ Completed and updates the progress summary back and forth; activity search filters 3 → 1 → 3 with the clear button; reports render 3 / 2 / 0 / 1 / 3 with a 33 % distribution; all four pages screenshot-verified.

