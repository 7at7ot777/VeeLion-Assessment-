import type { ActivityLog } from "@/types/api";
import { ActivityItem } from "@/components/activity/ActivityItem";

type ActivityListProps = {
  activity: ActivityLog[];
  total: number;
};

export function ActivityList({ activity, total }: ActivityListProps) {
  if (activity.length === 0) {
    return (
      <section className="card empty-state">
        <p className="empty-title">
          {total === 0 ? "No activity recorded yet." : "No activity matches this search."}
        </p>
      </section>
    );
  }

  return (
    <section aria-label="Activity feed">
      <ul className="list-reset">
        {activity.map((item) => (
          <ActivityItem key={item.id} activity={item} />
        ))}
      </ul>
    </section>
  );
}
