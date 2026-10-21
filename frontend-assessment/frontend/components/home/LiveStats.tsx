"use client";

import { useEffect, useState } from "react";
import type { TasksSummary } from "@/types/api";
import { requestJson } from "@/lib/http";
import { Skeleton } from "@/components/ui/Skeleton";

/**
 * Small live snapshot on the landing page. Fails silently — the hero keeps
 * working on its own if the backend is unreachable.
 */
export function LiveStats() {
  const [summary, setSummary] = useState<TasksSummary | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let cancelled = false;

    requestJson<TasksSummary>("/api/reports/tasks-summary", { method: "GET" })
      .then((body) => {
        if (!cancelled) {
          setSummary(body);
        }
      })
      .catch(() => {
        if (!cancelled) {
          setFailed(true);
        }
      });

    return () => {
      cancelled = true;
    };
  }, []);

  if (failed) {
    return null;
  }

  if (!summary) {
    return (
      <dl className="hero-stats" aria-hidden="true">
        {["Total tasks", "Completed", "Events"].map((label) => (
          <div className="hero-stat" key={label}>
            <dt>{label}</dt>
            <dd>
              <Skeleton />
            </dd>
          </div>
        ))}
      </dl>
    );
  }

  return (
    <dl className="hero-stats">
      <div className="hero-stat">
        <dt>Total tasks</dt>
        <dd>{summary.total}</dd>
      </div>
      <div className="hero-stat">
        <dt>Completed</dt>
        <dd>{summary.byStatus.done}</dd>
      </div>
      <div className="hero-stat">
        <dt>Events</dt>
        <dd>{summary.recentActivityCount}</dd>
      </div>
    </dl>
  );
}
