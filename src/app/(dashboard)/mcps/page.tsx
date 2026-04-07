"use client";

import { useState } from "react";

const categories = [
  { name: "Document", mcps: 2 },
  { name: "Data", mcps: 1 },
  { name: "Communication", mcps: 2 },
  { name: "Productivity", mcps: 1 },
  { name: "Developer", mcps: 1 },
];

interface McpTool {
  name: string;
  description: string;
  kind: "api" | "code";
  params: { name: string; type: string }[];
  method?: "GET" | "POST" | "PUT" | "DELETE";
  endpoint?: string;
  body?: string;
  code?: string;
}

interface McpData {
  name: string;
  description: string;
  baseUrl: string;
  authMethod: "api_key" | "oauth" | "bearer" | "none";
  authValue: string;
  category: string;
  tools: McpTool[];
}

const mockMcps: Record<string, McpData> = {
  "pdf-reader": {
    name: "PDF Reader",
    description: "Extract and parse content from PDF documents for your agents.",
    baseUrl: "https://api.pdfservices.io/v1",
    authMethod: "api_key",
    authValue: "sk-pdf-••••••••••••",
    category: "Document",
    tools: [
      {
        name: "extract_text",
        description: "Extract all text content from a PDF file",
        kind: "api",
        method: "POST",
        endpoint: "/extract/text",
        body: `{
  "file_url": "{{file_url}}",
  "pages": {{pages}}
}`,
        params: [
          { name: "file_url", type: "string" },
          { name: "pages", type: "number[]" },
        ],
      },
      {
        name: "extract_tables",
        description: "Extract tabular data from a PDF",
        kind: "code",
        code: `async function extract_tables({ file_url, format }) {
  const response = await fetch(baseUrl + "/extract/tables", {
    method: "POST",
    headers: { "Content-Type": "application/json", ...authHeaders },
    body: JSON.stringify({ file_url, format }),
  });
  const data = await response.json();

  // Post-process: flatten nested tables
  return data.tables.map(table => ({
    headers: table[0],
    rows: table.slice(1),
    format,
  }));
}`,
        params: [
          { name: "file_url", type: "string" },
          { name: "format", type: "string" },
        ],
      },
    ],
  },
  "web-scraper": {
    name: "Web Scraper",
    description: "Crawl and extract structured data from any public webpage.",
    baseUrl: "https://api.scraper.dev/v2",
    authMethod: "api_key",
    authValue: "sk-scrape-••••••••••••",
    category: "Data",
    tools: [
      {
        name: "scrape_page",
        description: "Extract content from a single URL",
        kind: "api",
        method: "POST",
        endpoint: "/scrape",
        body: `{
  "url": "{{url}}",
  "selectors": {{selectors}}
}`,
        params: [
          { name: "url", type: "string" },
          { name: "selectors", type: "object" },
        ],
      },
      {
        name: "crawl_site",
        description: "Crawl multiple pages from a root URL",
        kind: "code",
        code: `async function crawl_site({ root_url, max_depth, max_pages }) {
  const visited = new Set();
  const queue = [{ url: root_url, depth: 0 }];
  const results = [];

  while (queue.length > 0 && results.length < max_pages) {
    const { url, depth } = queue.shift();
    if (visited.has(url) || depth > max_depth) continue;
    visited.add(url);

    const page = await scrape_page({ url, selectors: {} });
    results.push(page);

    for (const link of page.links) {
      queue.push({ url: link, depth: depth + 1 });
    }
  }
  return { pages: results, sitemap: [...visited] };
}`,
        params: [
          { name: "root_url", type: "string" },
          { name: "max_depth", type: "number" },
          { name: "max_pages", type: "number" },
        ],
      },
    ],
  },
};

const userMcpList = [
  { id: "pdf-reader", name: "PDF Reader", tools: 2 },
  { id: "web-scraper", name: "Web Scraper", tools: 2 },
];

const authOptions = [
  { value: "api_key", label: "API Key" },
  { value: "oauth", label: "OAuth 2.0" },
  { value: "bearer", label: "Bearer Token" },
  { value: "none", label: "None" },
];

export default function McpsPage() {
  const [pickerOpen, setPickerOpen] = useState(false);
  const [builderOpen, setBuilderOpen] = useState(false);
  const [activeMcpId, setActiveMcpId] = useState("pdf-reader");
  const [activeSection, setActiveSection] = useState<"general" | "auth" | "tools">("general");

  const mcp = mockMcps[activeMcpId];

  function openMcp(id: string) {
    setPickerOpen(false);
    setActiveMcpId(id);
    setActiveSection("general");
    setBuilderOpen(true);
  }

  return (
    <>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-foreground">MCPs</h2>
          <p className="mt-1 text-sm text-muted">
            Build connectors to external services and data sources for your agents.
          </p>
        </div>
        <button
          onClick={() => setPickerOpen(true)}
          className="rounded-lg bg-accent-purple px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-accent-purple/80"
        >
          Open MCPs
        </button>
      </div>

      <div className="mb-6 grid grid-cols-3 gap-4">
        <div className="rounded-lg bg-card p-4">
          <p className="text-2xl font-bold text-foreground">7</p>
          <p className="text-xs text-muted">Total connectors</p>
        </div>
        <div className="rounded-lg bg-card p-4">
          <p className="text-2xl font-bold text-foreground">5</p>
          <p className="text-xs text-muted">Categories</p>
        </div>
        <div className="rounded-lg bg-card p-4">
          <p className="text-2xl font-bold text-foreground">2</p>
          <p className="text-xs text-muted">Used by agents</p>
        </div>
      </div>

      <div>
        <h3 className="mb-4 text-[11px] font-semibold uppercase tracking-widest text-muted">
          By Category
        </h3>
        <div className="space-y-2">
          {categories.map((cat) => (
            <div
              key={cat.name}
              className="flex items-center justify-between rounded-lg bg-card px-5 py-3 transition-colors hover:bg-card-hover"
            >
              <span className="text-sm text-foreground">{cat.name}</span>
              <span className="text-xs text-muted">{cat.mcps} connectors</span>
            </div>
          ))}
        </div>
      </div>

      {/* MCP picker dialog */}
      {pickerOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
          onClick={() => setPickerOpen(false)}
        >
          <div
            className="flex w-[480px] overflow-hidden rounded-xl border border-border bg-[#0e0e0e] shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex-1 border-r border-border p-5">
              <h3 className="mb-3 text-xs font-semibold uppercase tracking-widest text-muted">Open</h3>
              <div className="space-y-2">
                {userMcpList.map((m) => (
                  <button
                    key={m.id}
                    onClick={() => openMcp(m.id)}
                    className="flex w-full items-center gap-3 rounded-lg border border-border bg-card px-4 py-3 text-left transition-colors hover:bg-card-hover"
                  >
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="shrink-0 text-accent-purple">
                      <path d="M2 4c0-.6.4-1 1-1h4l2 2h4c.6 0 1 .4 1 1v6c0 .6-.4 1-1 1H3c-.6 0-1-.4-1-1V4z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <div className="flex-1">
                      <span className="text-sm font-medium text-foreground">{m.name}</span>
                    </div>
                    <span className="text-[10px] text-muted">{m.tools} tools</span>
                  </button>
                ))}
              </div>
            </div>
            <div className="flex w-44 flex-col items-center justify-center p-5">
              <button className="flex flex-col items-center gap-2 text-muted transition-colors hover:text-accent-purple">
                <svg width="28" height="28" viewBox="0 0 16 16" fill="none">
                  <path d="M8 3v10M3 8h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
                <span className="text-xs font-medium">Create new</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MCP builder dialog */}
      {builderOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="flex h-[80%] w-[80%] overflow-hidden rounded-xl border border-border bg-[#0e0e0e] shadow-2xl">
            {/* Sidebar nav */}
            <div className="flex w-52 flex-col border-r border-border bg-[#141414] rounded-l-xl">
              <div className="flex h-11 items-center border-b border-border px-4">
                <span className="text-xs font-semibold uppercase tracking-widest text-muted">
                  {mcp.name}
                </span>
              </div>
              <div className="flex-1 overflow-y-auto p-2">
                {(["general", "auth", "tools"] as const).map((section) => (
                  <button
                    key={section}
                    onClick={() => setActiveSection(section)}
                    className={`flex w-full items-center gap-2 rounded-md px-3 py-2 text-left text-sm transition-colors ${
                      activeSection === section
                        ? "bg-card text-foreground"
                        : "text-muted hover:bg-card/50 hover:text-foreground"
                    }`}
                  >
                    <span className={`h-1.5 w-1.5 rounded-full ${activeSection === section ? "bg-accent-purple" : "bg-muted/40"}`} />
                    {section === "general" && "General"}
                    {section === "auth" && "Authentication"}
                    {section === "tools" && `Tools (${mcp.tools.length})`}
                  </button>
                ))}
              </div>
              <div className="border-t border-border p-3">
                <button className="w-full rounded-md bg-accent-purple px-3 py-2 text-xs font-medium text-white transition-colors hover:bg-accent-purple/80">
                  Test Connection
                </button>
              </div>
            </div>

            {/* Form area */}
            <div className="flex flex-1 flex-col">
              <div className="flex h-11 items-center justify-between border-b border-border px-6">
                <span className="text-sm text-muted capitalize">{activeSection}</span>
                <button
                  onClick={() => setBuilderOpen(false)}
                  className="text-muted transition-colors hover:text-foreground"
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M12 4L4 12M4 4l8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-6">
                {/* General section */}
                {activeSection === "general" && (
                  <div className="max-w-lg space-y-5">
                    <div>
                      <label className="mb-1.5 block text-[11px] font-medium uppercase tracking-wider text-muted">Name</label>
                      <input
                        type="text"
                        defaultValue={mcp.name}
                        className="w-full rounded-md border border-border bg-card px-3 py-2 text-sm text-foreground focus:outline-none focus:border-accent-purple/50"
                      />
                    </div>
                    <div>
                      <label className="mb-1.5 block text-[11px] font-medium uppercase tracking-wider text-muted">Description</label>
                      <textarea
                        defaultValue={mcp.description}
                        rows={3}
                        className="w-full resize-none rounded-md border border-border bg-card px-3 py-2 text-sm text-foreground focus:outline-none focus:border-accent-purple/50"
                      />
                    </div>
                    <div>
                      <label className="mb-1.5 block text-[11px] font-medium uppercase tracking-wider text-muted">Base URL</label>
                      <input
                        type="text"
                        defaultValue={mcp.baseUrl}
                        className="w-full rounded-md border border-border bg-card px-3 py-2 text-sm font-mono text-foreground focus:outline-none focus:border-accent-purple/50"
                      />
                    </div>
                    <div>
                      <label className="mb-1.5 block text-[11px] font-medium uppercase tracking-wider text-muted">Category</label>
                      <input
                        type="text"
                        defaultValue={mcp.category}
                        className="w-full rounded-md border border-border bg-card px-3 py-2 text-sm text-foreground focus:outline-none focus:border-accent-purple/50"
                      />
                    </div>
                  </div>
                )}

                {/* Auth section */}
                {activeSection === "auth" && (
                  <div className="max-w-lg space-y-5">
                    <div>
                      <label className="mb-1.5 block text-[11px] font-medium uppercase tracking-wider text-muted">Auth Method</label>
                      <div className="grid grid-cols-2 gap-2">
                        {authOptions.map((opt) => (
                          <button
                            key={opt.value}
                            className={`rounded-md border px-3 py-2 text-sm transition-colors ${
                              mcp.authMethod === opt.value
                                ? "border-accent-purple bg-accent-purple/10 text-foreground"
                                : "border-border bg-card text-muted hover:text-foreground hover:bg-card-hover"
                            }`}
                          >
                            {opt.label}
                          </button>
                        ))}
                      </div>
                    </div>
                    {mcp.authMethod !== "none" && (
                      <div>
                        <label className="mb-1.5 block text-[11px] font-medium uppercase tracking-wider text-muted">
                          {mcp.authMethod === "api_key" && "API Key"}
                          {mcp.authMethod === "bearer" && "Bearer Token"}
                          {mcp.authMethod === "oauth" && "Client ID"}
                        </label>
                        <input
                          type="password"
                          defaultValue={mcp.authValue}
                          className="w-full rounded-md border border-border bg-card px-3 py-2 text-sm font-mono text-foreground focus:outline-none focus:border-accent-purple/50"
                        />
                      </div>
                    )}
                    <div className="rounded-md border border-border bg-card p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="h-2 w-2 rounded-full bg-accent-green" />
                        <span className="text-xs font-medium text-foreground">Connection verified</span>
                      </div>
                      <p className="text-xs text-muted">Last tested 5 min ago. Latency: 120ms.</p>
                    </div>
                  </div>
                )}

                {/* Tools section */}
                {activeSection === "tools" && (
                  <div className="space-y-4">
                    {mcp.tools.map((tool, i) => (
                      <div key={i} className="rounded-lg border border-border bg-card p-4">
                        {/* Tool header */}
                        <div className="flex items-center justify-between mb-3">
                          <div>
                            <h4 className="text-sm font-medium font-mono text-foreground">{tool.name}</h4>
                            <p className="mt-0.5 text-xs text-muted">{tool.description}</p>
                          </div>
                          <span className="rounded bg-accent-purple/10 px-2 py-0.5 text-[10px] font-medium text-accent-purple">
                            {tool.params.length} params
                          </span>
                        </div>

                        {/* Type toggle */}
                        <div className="mb-3">
                          <div className="flex gap-1 rounded-lg bg-background p-1 w-fit">
                            <span
                              className={`rounded-md px-3 py-1 text-xs font-medium transition-colors ${
                                tool.kind === "api"
                                  ? "bg-card text-foreground shadow-sm"
                                  : "text-muted"
                              }`}
                            >
                              API Route
                            </span>
                            <span
                              className={`rounded-md px-3 py-1 text-xs font-medium transition-colors ${
                                tool.kind === "code"
                                  ? "bg-card text-foreground shadow-sm"
                                  : "text-muted"
                              }`}
                            >
                              Custom Code
                            </span>
                          </div>
                        </div>

                        {/* API Route fields */}
                        {tool.kind === "api" && (
                          <div className="mb-3 space-y-2">
                            <div className="flex items-center gap-2">
                              <span className="rounded bg-accent-orange/10 px-2 py-1 text-[10px] font-bold font-mono text-accent-orange">
                                {tool.method}
                              </span>
                              <input
                                type="text"
                                defaultValue={tool.endpoint}
                                className="flex-1 rounded-md border border-border bg-background px-3 py-1.5 text-xs font-mono text-foreground focus:outline-none focus:border-accent-purple/50"
                              />
                            </div>
                            <div>
                              <p className="mb-1 text-[11px] font-medium uppercase tracking-wider text-muted">Request Body</p>
                              <textarea
                                defaultValue={tool.body}
                                rows={4}
                                spellCheck={false}
                                className="w-full resize-none rounded-md border border-border bg-background px-3 py-2 text-xs font-mono leading-relaxed text-foreground focus:outline-none focus:border-accent-purple/50"
                              />
                            </div>
                          </div>
                        )}

                        {/* Custom Code editor */}
                        {tool.kind === "code" && (
                          <div className="mb-3">
                            <p className="mb-1 text-[11px] font-medium uppercase tracking-wider text-muted">Function</p>
                            <textarea
                              defaultValue={tool.code}
                              rows={12}
                              spellCheck={false}
                              className="w-full resize-none rounded-md border border-border bg-background px-3 py-2 text-xs font-mono leading-relaxed text-foreground focus:outline-none focus:border-accent-purple/50"
                            />
                          </div>
                        )}

                        {/* Parameters */}
                        <div className="space-y-1.5">
                          <p className="text-[11px] font-medium uppercase tracking-wider text-muted">Parameters</p>
                          {tool.params.map((param, j) => (
                            <div key={j} className="flex items-center gap-3 rounded-md bg-background px-3 py-2">
                              <span className="text-xs font-mono font-medium text-foreground">{param.name}</span>
                              <span className="text-[10px] text-muted">{param.type}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                    <button className="flex w-full items-center justify-center gap-2 rounded-lg border border-dashed border-border py-3 text-sm text-muted transition-colors hover:text-foreground hover:border-foreground/20">
                      <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                        <path d="M8 3v10M3 8h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                      </svg>
                      Add tool
                    </button>
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="flex items-center justify-end gap-3 border-t border-border px-6 py-3">
                <button
                  onClick={() => setBuilderOpen(false)}
                  className="rounded-md border border-border px-4 py-1.5 text-xs text-muted transition-colors hover:text-foreground"
                >
                  Cancel
                </button>
                <button className="rounded-md bg-accent-purple px-4 py-1.5 text-xs font-medium text-white transition-colors hover:bg-accent-purple/80">
                  Save MCP
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
