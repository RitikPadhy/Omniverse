export default function ToolsPage() {
  return (
    <>
      <div className="mb-8 flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-foreground">My tools</h2>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {/* Example tool card */}
        <div className="rounded-lg border border-border bg-card p-5 transition-colors hover:bg-card-hover">
          <h3 className="text-sm font-medium text-foreground">ATS Scanner</h3>
          <p className="mt-1 text-xs text-muted">
            Scan resumes against job descriptions for ATS compatibility scoring.
          </p>
          <div className="mt-4 flex items-center gap-2">
            <span className="rounded bg-accent-green/10 px-2 py-0.5 text-[10px] font-medium text-accent-green">
              Active
            </span>
            <span className="text-[10px] text-muted">Used 2 min ago</span>
          </div>
        </div>

        {/* Empty state */}
        <div className="flex items-center justify-center rounded-lg border border-dashed border-border p-8">
          <p className="text-sm text-muted">
            Build a new tool &rarr;
          </p>
        </div>
      </div>
    </>
  );
}
