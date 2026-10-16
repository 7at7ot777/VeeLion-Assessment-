import Link from "next/link";
import { TaskDashboard } from "@/components/tasks/TaskDashboard";

export default function TasksPage() {
  return (
    <main className="stack">
      <nav className="backnav">
        <Link href="/" className="button">
          Back
        </Link>
      </nav>
      <TaskDashboard />
    </main>
  );
}
