import { Icon } from "@/components/ui/icons";

type ErrorStateProps = {
  message: string;
  onRetry: () => void;
};

export function ErrorState({ message, onRetry }: ErrorStateProps) {
  return (
    <section aria-live="polite" className="card alert" role="alert">
      <span className="alert-icon">
        <Icon name="alert" size={18} />
      </span>
      <div className="alert-body">
        <p className="alert-text">{message}</p>
        <button type="button" className="button" onClick={onRetry}>
          <Icon name="refresh" size={15} />
          Retry
        </button>
      </div>
    </section>
  );
}
