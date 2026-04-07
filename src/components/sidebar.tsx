"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const workspaceLinks = [
  { href: "/", label: "Home" },
  { href: "/tools", label: "My tools" },
  { href: "/knowledge-base", label: "Knowledge base" },
  { href: "/ask", label: "Ask anything" },
];

const communityLinks = [
  { href: "/explore", label: "Explore" },
  { href: "/build", label: "Build a tool" },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed inset-y-0 left-0 z-30 flex w-56 flex-col bg-sidebar border-r border-border">
      <div className="px-5 py-6">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          Omniverse
        </h1>
      </div>

      <nav className="flex-1 space-y-6 px-3">
        <div>
          <p className="mb-2 px-2 text-[11px] font-semibold uppercase tracking-widest text-muted">
            Workspace
          </p>
          <ul className="space-y-0.5">
            {workspaceLinks.map((link) => {
              const active = pathname === link.href;
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`flex items-center gap-2.5 rounded-md px-2 py-1.5 text-sm transition-colors ${
                      active
                        ? "text-foreground"
                        : "text-muted hover:text-foreground"
                    }`}
                  >
                    <span
                      className={`h-1.5 w-1.5 rounded-full ${
                        active ? "bg-accent-purple" : "bg-muted/40"
                      }`}
                    />
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>

        <div>
          <p className="mb-2 px-2 text-[11px] font-semibold uppercase tracking-widest text-muted">
            Community
          </p>
          <ul className="space-y-0.5">
            {communityLinks.map((link) => {
              const active = pathname === link.href;
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`flex items-center gap-2.5 rounded-md px-2 py-1.5 text-sm transition-colors ${
                      active
                        ? "text-foreground"
                        : "text-muted hover:text-foreground"
                    }`}
                  >
                    <span
                      className={`h-1.5 w-1.5 rounded-full ${
                        active ? "bg-accent-purple" : "bg-muted/40"
                      }`}
                    />
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </nav>

      <div className="border-t border-border p-4">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-card text-xs font-medium text-muted">
            AK
          </div>
          <div>
            <p className="text-sm font-medium text-foreground">Aryan K.</p>
            <p className="text-xs text-muted">Trusted creator</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
