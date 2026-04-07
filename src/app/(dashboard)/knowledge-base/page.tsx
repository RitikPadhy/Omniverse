const topics = [
  { name: "Fintech", notes: 84 },
  { name: "System Design", notes: 61 },
  { name: "Behavioral", notes: 47 },
  { name: "Resume Versions", notes: 32 },
  { name: "Company Research", notes: 23 },
];

export default function KnowledgeBasePage() {
  return (
    <>
      <div className="mb-8 flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-foreground">
          Knowledge base
        </h2>
        <div className="flex items-center gap-3">
          <span className="text-xs text-muted">Public</span>
          <div className="h-5 w-9 rounded-full bg-accent-green/30 p-0.5">
            <div className="h-4 w-4 translate-x-4 rounded-full bg-accent-green transition-transform" />
          </div>
        </div>
      </div>

      <div className="mb-6 grid grid-cols-3 gap-4">
        <div className="rounded-lg bg-card p-4">
          <p className="text-2xl font-bold text-foreground">247</p>
          <p className="text-xs text-muted">Total notes</p>
        </div>
        <div className="rounded-lg bg-card p-4">
          <p className="text-2xl font-bold text-foreground">5</p>
          <p className="text-xs text-muted">Topics</p>
        </div>
        <div className="rounded-lg bg-card p-4">
          <p className="text-2xl font-bold text-foreground">91%</p>
          <p className="text-xs text-muted">Outcome rate</p>
        </div>
      </div>

      <div>
        <h3 className="mb-4 text-[11px] font-semibold uppercase tracking-widest text-muted">
          By Topic
        </h3>
        <div className="space-y-2">
          {topics.map((topic) => (
            <div
              key={topic.name}
              className="flex items-center justify-between rounded-lg bg-card px-5 py-3 transition-colors hover:bg-card-hover"
            >
              <span className="text-sm text-foreground">{topic.name}</span>
              <span className="text-xs text-muted">{topic.notes} notes</span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
