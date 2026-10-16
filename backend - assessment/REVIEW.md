# Code Review Report

## Overview
Review of the Task Management System backend (Express.js) with two modules: Tasks API and Activity Log API.

## Findings

### Bugs
- **Tasks Service (updateTask)**: Allows empty string titles after trimming. Validation checks `if (typeof updates.title === 'string' && updates.title.length < 2)`; empty string passes (length 0 ≥ 2). Should reject empty titles.
- **Activity Controller**: Missing error handling. Routes do not use `asyncHandler` or try/catch, causing unhandled promise rejections if service throws (though current service is synchronous, future async changes would break).
- **Activity Service**: Non-unique ID generation. Uses `String(Date.now())` which can collide if multiple requests occur in the same millisecond.

### Performance
- **Activity Service**: Uses synchronous file operations (`fs.readFileSync`, `fs.writeFileSync`). Blocks the event loop under concurrent requests.
- **Both Services**: Read/write entire JSON file for every operation. Inefficient for large datasets; acceptable for small scale but not scalable.

### Maintainability
- **Activity Service**: Code duplication. `loadDataA` and `loadDataB` are identical functions serving no purpose.
- **Tasks Module**: Validation duplication. Controller and service both validate input (e.g., title type, completed type). Increases maintenance burden.
- **Inconsistent Error Handling**: Tasks module uses `asyncHandler` wrapper; activity module does not, leading to different error handling patterns.

### Security
- **Input Validation Gaps**: 
  - Activity service validates no input (action, info). Could store malicious data if used in unsafe contexts (low risk as data is only JSON-encoded and returned).
  - Tasks service `updateTask` does not validate `updates.title` is a string when present ( relies on controller validation; defense-in-depth missing).
- **No Authentication/Authorization**: Endpoints are publicly accessible. Not required per spec but notable for production.

### Code Quality
- **Path Resolution**: Uses `process.cwd()` for file paths. Fragile if working directory changes. Prefer `__dirname` or config-based paths.
- **Magic Numbers/Tokens**: 
  - Tasks service title length check (`< 2`) lacks explanation.
  - Activity service ID generation uses `Date.now()` without justification.
- **Inconsistent Status Codes**: 
  - Activity controller `get_activity` uses `res.json()` (defaults to 200) – acceptable but explicit status improves clarity.
  - Tasks controller explicitly sets statuses (200, 201, 204) – good practice.
- **Error Message Consistency**: 
  - Tasks service uses `HttpError` with consistent formatting.
  - Activity service throws raw errors (e.g., JSON.parse errors) without HTTP wrapping.

## Recommendations

### Bugs
1. **Tasks Service**: Update `updateTask` validation to reject empty/whitespace-only titles.
2. **Activity Controller**: Wrap route handlers in `asyncHandler` or add try/catch for error handling.
3. **Activity Service**: Replace `Date.now()` ID generation with `randomUUID` or similar unique generator.

### Performance
1. **Activity Service**: Migrate to asynchronous file operations (use `fs/promises` like tasks module).
2. **Both Services**: Consider caching or lightweight database (e.g., lowdb) for scale. For JSON files, accept current approach if data remains small.

### Maintainability
1. **Activity Service**: Remove duplicate `loadDataA`/`loadDataB`; consolidate into single `loadData` function.
2. **Tasks Module**: Extract validation into shared service functions or middleware to eliminate controller/service duplication.
3. **Standardize Error Handling**: Apply `asyncHandler` to all route handlers (including activity) for uniform error propagation.

### Security
1. **Input Validation**: 
   - Add validation in activity service for `action` (required string) and `info` (optional string).
   - Add defense-in-depth validation in tasks service (validate input types even if controller validates).
2. **Authentication**: Consider adding JWT middleware for protected routes (out of scope for current spec but note for future).

### Code Quality
1. **Path Resolution**: Replace `process.cwd()` with `__dirname`-based paths (e.g., `path.join(__dirname, '..', '..', 'data', 'filename.json')`).
2. **Magic Numbers**: Replace title length check with named constant (e.g., `MIN_TITLE_LENGTH = 1`).
3. **Status Codes**: Make activity controller explicit with `res.status(200).json(...)`.
4. **Error Wrapping**: Wrap synchronous errors in activity service in `HttpError` for consistent error handling.

## Refactoring Approach
- **Tasks Module**: Refactor validation into service layer, keep controller thin. Maintain existing async file operations.
- **Activity Module**: 
  - Convert to asynchronous file operations using `fs/promises`.
  - Add input validation and proper ID generation.
  - Apply `asyncHandler` to routes.
  - Remove code duplication.
- **New Module**: Reports API (see implementation plan below).
