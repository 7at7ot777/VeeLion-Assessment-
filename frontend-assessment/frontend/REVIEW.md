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

