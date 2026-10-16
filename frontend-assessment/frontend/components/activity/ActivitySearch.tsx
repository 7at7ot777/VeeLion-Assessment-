"use client";

type ActivitySearchProps = {
  value: string;
  onChange: (value: string) => void;
};

export function ActivitySearch({ value, onChange }: ActivitySearchProps) {
  return (
    <input
      className="input"
      type="search"
      placeholder="Search activity"
      aria-label="Search activity"
      value={value}
      onChange={(event) => onChange(event.target.value)}
    />
  );
}
