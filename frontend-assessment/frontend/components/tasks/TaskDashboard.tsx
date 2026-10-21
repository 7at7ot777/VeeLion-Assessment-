"use client";

import { useTasks } from "@/hooks/useTasks";
import type { Task } from "@/types/api";
import { StatusFilter } from "@/components/tasks/StatusFilter";
import { TaskList } from "@/components/tasks/TaskList";
import { ErrorState } from "@/components/ui/ErrorState";
import { SkeletonRows } from "@/components/ui/Skeleton";
import { Icon } from "@/components/ui/icons";

export function TaskDashboard() {
  const {
    tasks,
    filteredTasks,
    counts,
    filter,
    loading,
    error,
    updatingTaskId,
    setFilter,
    fetchTasks,
    updateTaskStatus,
  } = useTasks();

  const handleToggle = (task: Task) => {
    updateTaskStatus(task.id, !task.completed);
  };

  const donePercent = counts.all === 0 ? 0 : Math.round((counts.completed / counts.all) * 100);

  return (
    <section className="stack">
      <header className="page-header card">
        <div className="page-title-row">
          <span className="icon-chip">
            <Icon name="tasks" size={20} />
          </span>
          <div>
            <h1>Task dashboard</h1>
            <p className="description">Track every task and flip its status in one click.</p>
          </div>
        </div>

        {!loading && !error && counts.all > 0 ? (
          <div className="summary-row">
            <div className="progress slim" aria-hidden="true">
              <div className="progress-fill" style={{ width: `${donePercent}%` }} />
            </div>
            <span className="summary-text">
              {counts.completed} of {counts.all} complete · {donePercent}%
            </span>
          </div>
        ) : null}
      </header>

      <StatusFilter value={filter} counts={loading ? null : counts} onChange={setFilter} />

      {loading ? <SkeletonRows rows={3} /> : null}

      {error ? <ErrorState message={error} onRetry={fetchTasks} /> : null}

      {!loading && !error ? (
        <TaskList tasks={filteredTasks} updatingTaskId={updatingTaskId} onToggle={handleToggle} />
      ) : null}
    </section>
  );
}
