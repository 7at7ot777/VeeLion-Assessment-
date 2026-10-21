import Link from "next/link";
import { LiveStats } from "@/components/home/LiveStats";
import { Icon, type IconName } from "@/components/ui/icons";

const MODULES: Array<{
  href: string;
  title: string;
  description: string;
  icon: IconName;
  tone: string;
}> = [
  {
    href: "/tasks",
    title: "Task board",
    description: "Browse every task and flip its status in one click.",
    icon: "tasks",
    tone: "icon-chip",
  },
  {
    href: "/activity",
    title: "Activity feed",
    description: "Search the running log of everything that has happened.",
    icon: "activity",
    tone: "icon-chip tone-violet",
  },
  {
    href: "/reports",
    title: "Reports",
    description: "Completion progress and recent activity, at a glance.",
    icon: "chart",
    tone: "icon-chip tone-blue",
  },
];

export default function HomePage() {
  return (
    <main className="stack">
      <section className="card hero">
        <div className="hero-copy">
          <span className="hero-eyebrow">
            <Icon name="zap" size={13} />
            Task workspace
          </span>
          <h1>Plan, track, and finish your work.</h1>
          <p className="description">
            VeeLion keeps tasks, activity, and progress in one place — a clean
            dashboard over the team&apos;s task API.
          </p>
          <div className="hero-actions">
            <Link href="/tasks" className="button on-dark">
              <Icon name="tasks" size={16} />
              Open the task board
            </Link>
            <Link href="/reports" className="button ghost-dark">
              <Icon name="chart" size={16} />
              View reports
            </Link>
          </div>
        </div>

        <LiveStats />
      </section>

      <section className="grid-auto" aria-label="Modules">
        {MODULES.map((module) => (
          <Link key={module.href} href={module.href} className="card card-hover tile">
            <div className="tile-head">
              <span className={module.tone}>
                <Icon name={module.icon} size={20} />
              </span>
              <span className="tile-arrow">
                <Icon name="arrow-right" size={18} />
              </span>
            </div>
            <h2>{module.title}</h2>
            <p>{module.description}</p>
          </Link>
        ))}
      </section>
    </main>
  );
}
