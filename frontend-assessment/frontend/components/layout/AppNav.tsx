"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Icon, type IconName } from "@/components/ui/icons";

const NAV_LINKS: Array<{ href: string; label: string; icon: IconName }> = [
  { href: "/tasks", label: "Tasks", icon: "tasks" },
  { href: "/activity", label: "Activity", icon: "activity" },
  { href: "/reports", label: "Reports", icon: "chart" },
];

export function AppNav() {
  const pathname = usePathname();

  return (
    <header className="topnav">
      <div className="topnav-inner">
        <Link href="/" className="brand" aria-label="VeeLion task manager — home">
          <span className="brand-mark">
            <Icon name="check" size={15} strokeWidth={2.8} />
          </span>
          <span className="brand-name">VeeLion</span>
          <span className="brand-tag">Task manager</span>
        </Link>

        <nav className="nav-links" aria-label="Primary">
          {NAV_LINKS.map((link) => {
            const active = pathname === link.href || pathname.startsWith(`${link.href}/`);

            return (
              <Link
                key={link.href}
                href={link.href}
                className={active ? "nav-link active" : "nav-link"}
                aria-current={active ? "page" : undefined}
              >
                <Icon name={link.icon} size={16} />
                <span>{link.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
