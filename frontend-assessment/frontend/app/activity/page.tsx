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
      <nav>
        <Link href="/" className="button">
          Back
        </Link>
      </nav>

      <header className="card" style={{ padding: "1rem" }}>
        <h1 style={{ marginTop: 0, marginBottom: "0.5rem" }}>Activity Feed</h1>
        <ActivitySearch value={query} onChange={setQuery} />
        <small style={{ color: "var(--muted)" }}>
          Total: {total} | Showing: {visibleActivity.length}
        </small>
      </header>

      {loading ? (
        <section className="card" style={{ padding: "1rem" }}>
          <p style={{ margin: 0 }}>Loading activity...</p>
        </section>
      ) : null}

      {error ? (
        <section
          className="card"
          style={{ padding: "1rem", borderColor: "#e3b4c0", background: "#fff8fa" }}
        >
          <p style={{ marginTop: 0, marginBottom: "0.75rem", color: "var(--danger)" }}>
            {error}
          </p>
          <button type="button" className="button" onClick={fetchActivity}>
            Retry
          </button>
        </section>
      ) : null}

      {!loading && !error ? <ActivityList activity={visibleActivity} total={total} /> : null}
    </main>
  );
}
