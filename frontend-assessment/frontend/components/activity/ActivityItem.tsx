import type { ActivityLog } from "@/types/api";

type ActivityItemProps = {
  activity: ActivityLog;
};

export function ActivityItem({ activity }: ActivityItemProps) {
  return (
    <li
      className="card"
      style={{
        padding: "0.85rem",
        display: "grid",
        gap: "0.3rem",
      }}
    >
      <p style={{ margin: 0, fontWeight: 600 }}>{activity.action || "(no action)"}</p>
      <div>{activity.info || "(no info)"}</div>
      <small style={{ color: "var(--muted)" }}>
        {new Date(activity.when).toLocaleString()}
      </small>
    </li>
  );
}
