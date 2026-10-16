import type { ActivityLog } from "@/types/api";
import { ActivityItem } from "@/components/activity/ActivityItem";

type ActivityListProps = {
  activity: ActivityLog[];
  total: number;
};

export function ActivityList({ activity, total }: ActivityListProps) {
  if (activity.length === 0) {
    return (
      <section className="card" style={{ padding: "1rem" }}>
        <p style={{ margin: 0, color: "var(--muted)" }}>
          {total === 0 ? "No activity recorded yet." : "No activity matches this search."}
        </p>
      </section>
    );
  }

  return (
    <section aria-label="Activity feed">
      <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "grid", gap: "0.7rem" }}>
        {activity.map((item) => (
          <ActivityItem key={item.id} activity={item} />
        ))}
      </ul>
    </section>
  );
}
