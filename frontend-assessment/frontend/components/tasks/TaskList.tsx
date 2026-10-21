import type { Task } from "@/types/api";
import { EmptyState } from "@/components/ui/EmptyState";
import { TaskItem } from "@/components/tasks/TaskItem";

type TaskListProps = {
  tasks: Task[];
  updatingTaskId: string;
  onToggle: (task: Task) => void;
};

export function TaskList({ tasks, updatingTaskId, onToggle }: TaskListProps) {
  if (tasks.length === 0) {
    return (
      <EmptyState
        icon="inbox"
        title="No tasks in this view"
        hint="Try a different filter, or check back once new tasks are added."
      />
    );
  }

  return (
    <section aria-label="Task list">
      <ul className="list-reset">
        {tasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            busy={updatingTaskId === task.id}
            onToggle={onToggle}
          />
        ))}
      </ul>
    </section>
  );
}
