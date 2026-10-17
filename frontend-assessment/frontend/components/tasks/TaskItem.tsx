import type { Task } from "@/types/api";
import { Icon } from "@/components/ui/icons";
import { formatDateTime, formatRelativeTime } from "@/lib/format";

type TaskItemProps = {
  task: Task;
  busy: boolean;
  onToggle: (task: Task) => void;
};

export function TaskItem({ task, busy, onToggle }: TaskItemProps) {
  const actionLabel = task.completed ? "Mark as pending" : "Mark as completed";

  return (
    <li className={`card item task-item${task.completed ? " is-done" : ""}`}>
      <button
        type="button"
        className={task.completed ? "check-toggle checked" : "check-toggle"}
        onClick={() => onToggle(task)}
        disabled={busy}
        aria-pressed={task.completed}
        aria-label={`${actionLabel}: ${task.title}`}
        title={actionLabel}
      >
        {busy ? (
          <span className="spinner" />
        ) : task.completed ? (
          <Icon name="check" size={13} strokeWidth={3} />
        ) : null}
      </button>

      <div className="task-body">
        <p className="item-title task-title">{task.title}</p>
        <span className="task-meta">
          <Icon name="clock" size={13} />
          <span title={formatDateTime(task.updatedAt)}>
            Updated {formatRelativeTime(task.updatedAt)}
          </span>
        </span>
      </div>

      <span className={`badge ${task.completed ? "status-done" : "status-todo"}`}>
        <span className="dot" />
        {task.completed ? "Completed" : "Pending"}
      </span>
    </li>
  );
}
