import type { ActivityLog } from "@/types/api";
import { EmptyState } from "@/components/ui/EmptyState";
import { ActivityItem } from "@/components/activity/ActivityItem";

type ActivityListProps = {
  activity: ActivityLog[];
  total: number;
};

export function ActivityList({ activity, total }: ActivityListProps) {
  if (activity.length === 0) {
    return total === 0 ? (
      <EmptyState
        icon="inbox"
        title="No activity recorded yet"
        hint="Actions performed on tasks will show up here."
      />
    ) : (
      <EmptyState
        icon="search"
        title="Nothing matches your search"
        hint="Try a different keyword or clear the search field."
      />
    );
  }

  return (
    <section aria-label="Activity feed">
      <ul className="timeline">
        {activity.map((item) => (
          <ActivityItem key={item.id} activity={item} />
        ))}
      </ul>
    </section>
  );
}
