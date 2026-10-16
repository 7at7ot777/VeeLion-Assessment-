import Link from "next/link";
import { ReportsSummary } from "@/components/reports/ReportsSummary";

export default function ReportsPage() {
  return (
    <main className="stack">
      <nav className="backnav">
        <Link href="/" className="button">
          Back
        </Link>
      </nav>

      <header className="page-header card">
        <h1 style={{ margin: 0 }}>Reports</h1>
        <p className="description">Summary of tasks and recent activity.</p>
      </header>

      <ReportsSummary />
    </main>
  );
}
