import type { Metadata } from "next";
import "./globals.css";
import { AppNav } from "@/components/layout/AppNav";

export const metadata: Metadata = {
  title: "VeeLion Task Manager",
  description: "Task dashboard, activity feed, and reports — built on the provided backend.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div className="app-shell">
          <AppNav />
          {children}
          <footer className="app-footer">
            <p>VeeLion Task Manager · Next.js App Router · data served by the local Express API</p>
          </footer>
        </div>
      </body>
    </html>
  );
}
