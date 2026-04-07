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

export default function Sidebar({
  open,
  onToggle,
}: {
  open: boolean;
  onToggle: () => void;
}) {
  const pathname = usePathname();

  return (
    <>
      <button
        onClick={onToggle}
        className="fixed top-5 left-4 z-40 flex h-8 w-8 items-center justify-center rounded-md text-muted hover:text-foreground hover:bg-card transition-colors"
        aria-label={open ? "Close sidebar" : "Open sidebar"}
      >
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {open ? (
            <>
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </>
          ) : (
            <>
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </>
          )}
        </svg>
      </button>

      <aside
        className={`fixed inset-y-0 left-0 z-30 flex w-56 flex-col bg-sidebar border-r border-border transition-transform duration-300 ease-in-out ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
      <div className="px-5 py-6 pl-14">
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
    </>
  );
}
