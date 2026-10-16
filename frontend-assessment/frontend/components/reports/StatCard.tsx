type StatCardProps = {
  label: string;
  value: number | string;
  hint?: string;
};

export function StatCard({ label, value, hint }: StatCardProps) {
  return (
    <section aria-label={label} className="card stat">
      <small className="stat-label">{label}</small>
      <div className="stat-value">{value}</div>
      {hint ? <small className="stat-hint">{hint}</small> : null}
    </section>
  );
}
