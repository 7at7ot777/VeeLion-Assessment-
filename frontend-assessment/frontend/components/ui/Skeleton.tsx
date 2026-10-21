/**
 * Loading placeholders shared by every module. They mirror the real layouts
 * (list rows, stat grids) so pages don't jump when data arrives.
 */

type SkeletonProps = {
  className?: string;
};

export function Skeleton({ className = "" }: SkeletonProps) {
  return <div aria-hidden="true" className={`skeleton ${className}`.trim()} />;
}

export function SkeletonRows({ rows = 3 }: { rows?: number }) {
  return (
    <section aria-hidden="true" aria-busy="true" className="stack skeleton-rows">
      {Array.from({ length: rows }).map((_, index) => (
        <div className="card item skeleton-row" key={index}>
          <Skeleton className="skeleton-circle" />
          <div className="skeleton-row-body">
            <Skeleton className="skeleton-line w-55" />
            <Skeleton className="skeleton-line w-30" />
          </div>
        </div>
      ))}
    </section>
  );
}

export function SkeletonStatGrid({ cards = 5 }: { cards?: number }) {
  return (
    <section aria-hidden="true" aria-busy="true" className="grid-stat">
      {Array.from({ length: cards }).map((_, index) => (
        <div className="card stat skeleton-card" key={index}>
          <Skeleton className="skeleton-line w-45" />
          <Skeleton className="skeleton-line skeleton-value" />
          <Skeleton className="skeleton-line w-30" />
        </div>
      ))}
    </section>
  );
}
