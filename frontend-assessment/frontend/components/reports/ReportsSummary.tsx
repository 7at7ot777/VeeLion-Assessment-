"use client";

import { useReports } from "@/hooks/useReports";
import { StatCard } from "@/components/reports/StatCard";
import { ErrorState } from "@/components/ui/ErrorState";
import { SkeletonStatGrid } from "@/components/ui/Skeleton";
import { Icon } from "@/components/ui/icons";

function percentOf(part: number, total: number): number {
  return total === 0 ? 0 : Math.round((part / total) * 100);
}

export function ReportsSummary() {
  const { summary, loading, error, fetchSummary } = useReports();

  return (
    <section className="stack">
      <header className="page-header card">
        <div className="page-title-row">
          <span className="icon-chip tone-blue">
            <Icon name="chart" size={20} />
          </span>
          <div>
            <h1>Reports</h1>
            <p className="description">Task completion and recent activity at a glance.</p>
          </div>
        </div>
      </header>

      {loading ? <SkeletonStatGrid cards={5} /> : null}

      {error ? <ErrorState message={error} onRetry={fetchSummary} /> : null}

      {!loading && !error && summary ? (
        <>
          <section className="grid-stat" aria-label="Summary statistics">
            <StatCard icon="layers" tone="brand" label="Total tasks" value={summary.total} />
            <StatCard
              icon="circle"
              tone="amber"
              label="Todo"
              value={summary.byStatus.todo}
              hint="Waiting to be started"
            />
            <StatCard
              icon="hourglass"
              tone="blue"
              label="In progress"
              value={summary.byStatus["in-progress"]}
            />
            <StatCard
              icon="check-circle"
              tone="green"
              label="Done"
              value={summary.byStatus.done}
              hint="Completed tasks"
            />
            <StatCard
              icon="zap"
              tone="violet"
              label="Recent activity"
              value={summary.recentActivityCount}
              hint="Last 7 days"
            />
          </section>

          <CompletionCard
            total={summary.total}
            todo={summary.byStatus.todo}
            inProgress={summary.byStatus["in-progress"]}
            done={summary.byStatus.done}
          />
        </>
      ) : null}
    </section>
  );
}

type CompletionCardProps = {
  total: number;
  todo: number;
  inProgress: number;
  done: number;
};

function CompletionCard({ total, todo, inProgress, done }: CompletionCardProps) {
  const donePercent = percentOf(done, total);

  return (
    <section className="card progress-card" aria-label="Task distribution">
      <div className="progress-meta">
        <span>Completion</span>
        <span className="progress-strong">{donePercent}%</span>
      </div>

      <div
        className="dist-bar"
        role="img"
        aria-label={`Task distribution: ${todo} todo, ${inProgress} in progress, ${done} done`}
      >
        <div className="dist-seg todo" style={{ width: `${percentOf(todo, total)}%` }} />
        <div
          className="dist-seg in-progress"
          style={{ width: `${percentOf(inProgress, total)}%` }}
        />
        <div className="dist-seg done" style={{ width: `${percentOf(done, total)}%` }} />
      </div>

      <ul className="legend">
        <li>
          <span className="swatch todo" />
          Todo <strong>{todo}</strong>
        </li>
        <li>
          <span className="swatch in-progress" />
          In progress <strong>{inProgress}</strong>
        </li>
        <li>
          <span className="swatch done" />
          Done <strong>{done}</strong>
        </li>
      </ul>

      <p className="progress-note">
        {done} of {total} tasks completed
      </p>
    </section>
  );
}
