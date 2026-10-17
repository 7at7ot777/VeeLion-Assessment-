const dateTimeFormatter = new Intl.DateTimeFormat("en-GB", {
  dateStyle: "medium",
  timeStyle: "short",
});

const dateFormatter = new Intl.DateTimeFormat("en-GB", {
  dateStyle: "medium",
});

/**
 * Short, human relative time: "just now", "12m ago", "3h ago", "2d ago",
 * falling back to an absolute date for anything older than a week.
 */
export function formatRelativeTime(iso: string): string {
  const date = new Date(iso);

  if (Number.isNaN(date.getTime())) {
    return "unknown time";
  }

  const elapsedMs = Date.now() - date.getTime();

  if (elapsedMs < 45_000) {
    return "just now";
  }

  const minutes = Math.round(elapsedMs / 60_000);

  if (minutes < 60) {
    return `${minutes}m ago`;
  }

  const hours = Math.round(minutes / 60);

  if (hours < 24) {
    return `${hours}h ago`;
  }

  const days = Math.round(hours / 24);

  if (days < 7) {
    return `${days}d ago`;
  }

  return dateFormatter.format(date);
}

export function formatDateTime(iso: string): string {
  const date = new Date(iso);

  if (Number.isNaN(date.getTime())) {
    return "Unknown date";
  }

  return dateTimeFormatter.format(date);
}
