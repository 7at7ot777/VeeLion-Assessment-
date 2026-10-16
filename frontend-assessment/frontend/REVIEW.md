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

