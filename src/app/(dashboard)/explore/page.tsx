"use client";

import { useState } from "react";

const creators = [
  {
    name: "Priya M.",
    domain: "Product Management",
    notes: 312,
    outcome: "88%",
    users: 420,
  },
  {
    name: "Rahul S.",
    domain: "Backend Engineering",
    notes: 189,
    outcome: "93%",
    users: 215,
  },
  {
    name: "Sneha T.",
    domain: "Data Science",
    notes: 274,
    outcome: "79%",
    users: 380,
  },
];

const mcps = [
  {
    name: "PDF Reader",
    description: "Extract and parse content from PDF documents for your agents.",
    category: "Document",
  },
  {
    name: "Web Scraper",
    description: "Crawl and extract structured data from any public webpage.",
    category: "Data",
  },
  {
    name: "Slack API",
    description: "Send messages, read channels, and manage Slack workflows.",
    category: "Communication",
  },
  {
    name: "Google Sheets",
    description: "Read, write, and manage spreadsheet data programmatically.",
    category: "Productivity",
  },
  {
    name: "GitHub API",
    description: "Access repositories, issues, PRs, and automate Git workflows.",
    category: "Developer",
  },
];

export default function ExplorePage() {
  const [activeTab, setActiveTab] = useState<"skills" | "mcps">("skills");

  return (
    <>
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-foreground">Explore</h2>
        <p className="mt-1 text-sm text-muted">
          Browse community skills and MCP connectors for your agents.
        </p>
      </div>

      {/* Tabs */}
      <div className="mb-6 flex gap-1 rounded-lg bg-card p-1 w-fit">
        <button
          onClick={() => setActiveTab("skills")}
          className={`rounded-md px-4 py-1.5 text-sm font-medium transition-colors ${
            activeTab === "skills"
              ? "bg-background text-foreground shadow-sm"
              : "text-muted hover:text-foreground"
          }`}
        >
          Skills
        </button>
        <button
          onClick={() => setActiveTab("mcps")}
          className={`rounded-md px-4 py-1.5 text-sm font-medium transition-colors ${
            activeTab === "mcps"
              ? "bg-background text-foreground shadow-sm"
              : "text-muted hover:text-foreground"
          }`}
        >
          MCPs
        </button>
      </div>

      {activeTab === "skills" && (
        <div className="space-y-3">
          {creators.map((creator) => (
            <div
              key={creator.name}
              className="flex items-center justify-between rounded-lg border border-border bg-card p-5 transition-colors hover:bg-card-hover"
            >
              <div className="flex items-center gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-border text-xs font-medium text-muted">
                  {creator.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">
                    {creator.name}
                  </p>
                  <p className="text-xs text-muted">{creator.domain}</p>
                </div>
              </div>
              <div className="flex items-center gap-6 text-xs text-muted">
                <span>{creator.notes} notes</span>
                <span>{creator.outcome} outcome</span>
                <span>{creator.users} users</span>
                <button className="rounded-md border border-border px-3 py-1 text-foreground transition-colors hover:bg-card-hover">
                  Add
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === "mcps" && (
        <div className="space-y-3">
          {mcps.map((mcp) => (
            <div
              key={mcp.name}
              className="flex items-center justify-between rounded-lg border border-border bg-card p-5 transition-colors hover:bg-card-hover"
            >
              <div className="flex items-center gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent-purple/10 text-xs font-semibold text-accent-purple">
                  {mcp.name.split(" ").map((n) => n[0]).join("")}
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">
                    {mcp.name}
                  </p>
                  <p className="mt-0.5 text-xs text-muted">{mcp.description}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className="rounded bg-card px-2 py-0.5 text-[10px] font-medium text-muted border border-border">
                  {mcp.category}
                </span>
                <button className="rounded-md border border-border px-3 py-1 text-xs text-foreground transition-colors hover:bg-card-hover">
                  Add
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
