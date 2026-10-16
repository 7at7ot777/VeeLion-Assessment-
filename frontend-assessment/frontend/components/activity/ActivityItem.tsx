import type { ActivityLog } from "@/types/api";

type ActivityItemProps = {
  activity: ActivityLog;
};

export function ActivityItem({ activity }: ActivityItemProps) {
  return (
    <li className="card item">
      <p className="item-title">{activity.action || "(no action)"}</p>
      <div>{activity.info || "(no info)"}</div>
      <small className="item-meta">{new Date(activity.when).toLocaleString()}</small>
    </li>
  );
}
