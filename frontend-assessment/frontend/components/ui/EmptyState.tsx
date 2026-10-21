import { Icon, type IconName } from "@/components/ui/icons";

type EmptyStateProps = {
  icon: IconName;
  title: string;
  hint?: string;
};

export function EmptyState({ icon, title, hint }: EmptyStateProps) {
  return (
    <section className="card empty-state">
      <span className="empty-icon">
        <Icon name={icon} size={22} />
      </span>
      <p className="empty-title">{title}</p>
      {hint ? <p className="empty-hint">{hint}</p> : null}
    </section>
  );
}
