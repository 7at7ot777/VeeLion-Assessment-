import Link from "next/link";

export default function HomePage() {
  return (
    <main>
      <header className="page-header card">
        <h1>VeeLion Frontend Assessment</h1>
        <p className="description">Task Dashboard, Activity Feed, and Reports — built against the provided backend.</p>
      </header>

      <section className="grid-auto">
        <Link href="/tasks" className="card card-hover tile">
          <h2>Task Dashboard</h2>
          <p className="description">Browse tasks and switch their status.</p>
        </Link>

        <Link href="/activity" className="card card-hover tile">
          <h2>Activity Feed</h2>
          <p className="description">Search everything that has happened.</p>
        </Link>

        <Link href="/reports" className="card card-hover tile">
          <h2>Reports</h2>
          <p className="description">Summary of tasks and recent activity.</p>
        </Link>
      </section>
    </main>
  );
}
