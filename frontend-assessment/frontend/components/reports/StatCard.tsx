import { Icon, type IconName } from "@/components/ui/icons";

type StatCardProps = {
  label: string;
  value: number | string;
  icon: IconName;
  tone: "brand" | "amber" | "blue" | "green" | "violet";
  hint?: string;
};

const TONE_CLASS: Record<StatCardProps["tone"], string> = {
  brand: "icon-chip sm",
  amber: "icon-chip sm tone-amber",
  blue: "icon-chip sm tone-blue",
  green: "icon-chip sm tone-green",
  violet: "icon-chip sm tone-violet",
};

export function StatCard({ label, value, hint, icon, tone }: StatCardProps) {
  return (
    <section aria-label={label} className="card stat">
      <div className="stat-head">
        <span className="stat-label">{label}</span>
        <span className={TONE_CLASS[tone]}>
          <Icon name={icon} size={16} />
        </span>
      </div>
      <div className="stat-value">{value}</div>
      {hint ? <small className="stat-hint">{hint}</small> : null}
    </section>
  );
}
