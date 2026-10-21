import type { TaskFilter } from "@/types/api";

const FILTERS: Array<{ label: string; value: TaskFilter }> = [
  { label: "All", value: "all" },
  { label: "Pending", value: "pending" },
  { label: "Completed", value: "completed" },
];

type StatusFilterProps = {
  value: TaskFilter;
  counts: Record<TaskFilter, number> | null;
  onChange: (value: TaskFilter) => void;
};

export function StatusFilter({ value, counts, onChange }: StatusFilterProps) {
  return (
    <section aria-label="Filter tasks by status" className="card filter-card">
      <div className="segmented" role="group">
        {FILTERS.map((filter) => {
          const active = filter.value === value;

          return (
            <button
              key={filter.value}
              type="button"
              className={active ? "seg-item active" : "seg-item"}
              onClick={() => onChange(filter.value)}
              aria-pressed={active}
            >
              {filter.label}
              {counts ? <span className="seg-count">{counts[filter.value]}</span> : null}
            </button>
          );
        })}
      </div>
    </section>
  );
}
