# REVIEW

> Each fix gets its own section. To add a new fix, copy the template below and paste it as `Change 2`, `Change 3`, and so on.

```md
## Change N — <short title>
- Status:
- Files changed:
- Type: Bugs | Performance | Maintainability | Security | Code quality
- What was wrong:
- Why this was bad:
- What I changed:
```

---

## Change 1 — Use one validator for creating and updating tasks
- Status: Done
- Files changed: `src/modules/tasks/controllers/tasks.controller.js`, `src/modules/tasks/services/tasks.service.js`
- Type: Maintainability, Bugs, Security, Code quality
- What was wrong:
  - The same checks were written twice: once in the controller and once in the service.
  - The ready-made checker file (`taskValidator.js`) was not used at all.
  - When updating a task, all data sent by the user was saved directly, including fields that should never change like `id`.
  - Error messages were different in each place, and the request data was changed directly (mutation).
- Why this was bad:
  - Fixing one rule meant editing two places, easy to forget one.
  - A user could send `id` or `createdAt` in an update and change the task's identity, or add junk fields that break the saved data.
  - Different error messages for the same mistake confuse anyone using the API.
- What I changed:
  - The controller now checks the data once using `validateCreateTask` / `validateUpdateTask` and sends only clean data (`title`, `completed`) to the service.
  - Extra fields are rejected with a clear error.
  - The service no longer repeats the checks. Creating a task uses only `title` and `completed`. Updating keeps the old task and only replaces the new values, plus a fresh `updatedAt`. `id` and `createdAt` stay untouched.

---

## Change 2 — Count todo as total minus done in reports
- Status: Done
- Files changed: `src/modules/reports/services/reports.service.js`
- Type: Performance, Code quality
- What was wrong:
  - The code looped through all tasks twice: once to count unfinished tasks and once to count finished ones.
- Why this was bad:
  - Two loops for one answer. With the current data (a task is either done or not done), the unfinished count is simply the total minus the finished count.
  - Note: this saves one loop but will not matter much, because reading and parsing the whole JSON file is the slow part, not the loop.
- What I changed:
  - Count finished tasks once, then get the rest by subtraction: `todo = total - done`.
