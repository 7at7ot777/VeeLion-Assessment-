"use client";

import Link from "next/link";
import { useActivity } from "@/hooks/useActivity";
import { ActivitySearch } from "@/components/activity/ActivitySearch";
import { ActivityList } from "@/components/activity/ActivityList";

export default function ActivityPage() {
  const { visibleActivity, total, loading, error, query, setQuery, fetchActivity } =
    useActivity();

  return (
    <main className="stack">
      <nav className="backnav">
        <Link href="/" className="button">
          Back
        </Link>
      </nav>

      <header className="page-header card">
        <h1>Activity Feed</h1>
        <ActivitySearch value={query} onChange={setQuery} />
        <small className="countline">
          Total: {total} | Showing: {visibleActivity.length}
        </small>
      </header>

      {loading ? (
        <section className="card empty-state">
          <p className="empty-title">Loading activity...</p>
        </section>
      ) : null}

      {error ? (
        <section className="card alert">
          <p className="alert-text">{error}</p>
          <button type="button" className="button" onClick={fetchActivity}>
            Retry
          </button>
        </section>
      ) : null}

      {!loading && !error ? <ActivityList activity={visibleActivity} total={total} /> : null}
    </main>
  );
}
