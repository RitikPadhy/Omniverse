"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

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
  const [profileOpen, setProfileOpen] = useState(false);
  const [apiKeyVisible, setApiKeyVisible] = useState(false);

  return (
    <>
      {!open && (
        <button
          onClick={onToggle}
          className="fixed top-5 left-4 z-40 flex h-8 w-8 cursor-pointer items-center justify-center rounded-md border border-transparent text-muted hover:text-foreground hover:bg-card hover:border-border hover:shadow-sm active:scale-95 transition-all duration-150"
          aria-label="Open sidebar"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
          >
            <rect x="3" y="3" width="18" height="18" rx="3" strokeLinejoin="round" />
            <line x1="9" y1="3" x2="9" y2="21" />
            <line x1="15" y1="10" x2="18" y2="12" strokeLinecap="round" />
            <line x1="15" y1="14" x2="18" y2="12" strokeLinecap="round" />
          </svg>
        </button>
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-30 flex w-56 flex-col bg-sidebar border-r border-border transition-transform duration-300 ease-in-out ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
      <div className="flex h-16 items-center justify-between px-5 mt-2">
        <h1 className="text-2xl font-semibold tracking-tight text-foreground leading-none">
          Omniverse
        </h1>
        <button
          onClick={onToggle}
          className="flex h-7 w-7 cursor-pointer items-center justify-center rounded-md border border-transparent text-muted hover:text-foreground hover:bg-card hover:border-border hover:shadow-sm active:scale-95 transition-all duration-150"
          aria-label={open ? "Close sidebar" : "Open sidebar"}
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
          >
            <rect x="3" y="3" width="18" height="18" rx="3" strokeLinejoin="round" />
            <line x1="9" y1="3" x2="9" y2="21" />
            <line x1="18" y1="10" x2="15" y2="12" strokeLinecap="round" />
            <line x1="18" y1="14" x2="15" y2="12" strokeLinecap="round" />
          </svg>
        </button>
      </div>

      <nav className="mt-4 flex-1 space-y-6 px-3">
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
        <button
          onClick={() => setProfileOpen(true)}
          className="flex w-full items-center gap-3 rounded-md px-1 py-1 -mx-1 hover:bg-card transition-colors cursor-pointer"
        >
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-card text-xs font-medium text-muted">
            AK
          </div>
          <div className="text-left">
            <p className="text-sm font-medium text-foreground">Aryan K.</p>
            <p className="text-xs text-muted">Trusted creator</p>
          </div>
        </button>
      </div>
    </aside>

      {profileOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
          onClick={() => setProfileOpen(false)}
        >
          <div
            className="w-80 rounded-lg border border-border bg-card p-6 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-background text-sm font-semibold text-foreground">
                AK
              </div>
              <div>
                <p className="text-base font-semibold text-foreground">Aryan K.</p>
                <p className="text-xs text-muted">Trusted creator</p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <p className="text-[11px] font-medium uppercase tracking-wider text-muted mb-1">Email</p>
                <p className="text-sm text-foreground">aryan@example.com</p>
              </div>
              <div>
                <p className="text-[11px] font-medium uppercase tracking-wider text-muted mb-1">API Key</p>
                <div className="flex items-center gap-2">
                  <p className="text-sm text-foreground font-mono tracking-wider">
                    {apiKeyVisible ? "sk-omni-a1b2c3d4e5f6g7h8" : "••••••••••••••••••"}
                  </p>
                  <button
                    onClick={() => setApiKeyVisible(!apiKeyVisible)}
                    className="text-muted hover:text-foreground transition-colors cursor-pointer"
                    aria-label={apiKeyVisible ? "Hide API key" : "Show API key"}
                  >
                    {apiKeyVisible ? (
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
                        <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
                        <line x1="1" y1="1" x2="23" y2="23" />
                      </svg>
                    ) : (
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                        <circle cx="12" cy="12" r="3" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>
            </div>

            <button
              onClick={() => setProfileOpen(false)}
              className="mt-6 w-full rounded-md bg-background py-2 text-sm text-muted hover:text-foreground border border-border hover:border-foreground/20 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}
