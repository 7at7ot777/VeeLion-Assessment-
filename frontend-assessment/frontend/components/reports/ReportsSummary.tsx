"use client";

import { useReports } from "@/hooks/useReports";
import { StatCard } from "@/components/reports/StatCard";

export function ReportsSummary() {
  const { summary, loading, error, fetchSummary } = useReports();

  if (loading) {
    return (
      <section className="card empty-state">
        <p className="empty-title">Loading reports...</p>
      </section>
    );
  }

  if (error) {
    return (
      <section className="card alert">
        <p className="alert-text">{error}</p>
        <button type="button" className="button" onClick={fetchSummary}>
          Retry
        </button>
      </section>
    );
  }

  if (!summary) {
    return null;
  }

  return (
    <section className="grid-stat">
      <StatCard label="Total tasks" value={summary.total} />
      <StatCard label="Todo" value={summary.byStatus.todo} />
      <StatCard label="In progress" value={summary.byStatus["in-progress"]} />
      <StatCard label="Done" value={summary.byStatus.done} />
      <StatCard
        label="Recent activity"
        value={summary.recentActivityCount}
        hint="Last 7 days"
      />
    </section>
  );
}
