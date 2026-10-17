import type { ActivityLog } from "@/types/api";
import { Icon } from "@/components/ui/icons";
import { formatDateTime, formatRelativeTime } from "@/lib/format";

type ActivityItemProps = {
  activity: ActivityLog;
};

export function ActivityItem({ activity }: ActivityItemProps) {
  return (
    <li className="timeline-item">
      <span className="timeline-dot" aria-hidden="true">
        <Icon name="zap" size={12} />
      </span>

      <article className="card item timeline-card">
        <div className="row">
          <p className="item-title">{activity.action || "(no action)"}</p>
          <span className="item-meta timeline-when" title={formatDateTime(activity.when)}>
            <Icon name="clock" size={12} />
            {formatRelativeTime(activity.when)}
          </span>
        </div>
        {activity.info ? <p className="item-info">{activity.info}</p> : null}
      </article>
    </li>
  );
}
