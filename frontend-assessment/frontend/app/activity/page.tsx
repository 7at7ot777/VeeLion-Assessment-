"use client";

import { useActivity } from "@/hooks/useActivity";
import { ActivitySearch } from "@/components/activity/ActivitySearch";
import { ActivityList } from "@/components/activity/ActivityList";
import { ErrorState } from "@/components/ui/ErrorState";
import { SkeletonRows } from "@/components/ui/Skeleton";
import { Icon } from "@/components/ui/icons";

export default function ActivityPage() {
  const { visibleActivity, total, loading, error, query, setQuery, fetchActivity } =
    useActivity();

  return (
    <main className="stack">
      <header className="page-header card">
        <div className="page-title-row">
          <span className="icon-chip tone-violet">
            <Icon name="activity" size={20} />
          </span>
          <div>
            <h1>Activity feed</h1>
            <p className="description">The running log of everything that has happened.</p>
          </div>
        </div>

        <ActivitySearch value={query} onChange={setQuery} />

        <div className="chip-row">
          <span className="chip">{total} events</span>
          <span className="chip">{visibleActivity.length} shown</span>
          <button
            type="button"
            className="button small"
            onClick={fetchActivity}
            disabled={loading}
          >
            <Icon name="refresh" size={14} />
            Refresh
          </button>
        </div>
      </header>

      {loading ? <SkeletonRows rows={3} /> : null}

      {error ? <ErrorState message={error} onRetry={fetchActivity} /> : null}

      {!loading && !error ? (
        <ActivityList activity={visibleActivity} total={total} />
      ) : null}
    </main>
  );
}
