"use client";

import { Icon } from "@/components/ui/icons";

type ActivitySearchProps = {
  value: string;
  onChange: (value: string) => void;
};

export function ActivitySearch({ value, onChange }: ActivitySearchProps) {
  return (
    <div className="search-field">
      <span className="search-icon">
        <Icon name="search" size={16} />
      </span>
      <input
        className="input"
        type="search"
        placeholder="Search action or details…"
        aria-label="Search activity"
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
      {value ? (
        <button
          type="button"
          className="search-clear"
          onClick={() => onChange("")}
          aria-label="Clear search"
        >
          <Icon name="x" size={13} strokeWidth={2.2} />
        </button>
      ) : null}
    </div>
  );
}
