const stats = [
  { value: "247", label: "Notes in your KB" },
  { value: "6", label: "Tools you've built" },
  { value: "1.2k", label: "People using your KB" },
  { value: "91%", label: "Outcome rate" },
];

const recentActivity = [
  { text: "ATS scanner used", time: "2 min ago" },
  { text: 'New note added — "Razorpay interview prep"', time: "1 hr" },
  { text: "Priya used your KB to build a tool", time: "3 hr ago" },
  { text: "Outcome reported — interview callback", time: "Yesterday" },
];

const patterns = [
  {
    title: "You consistently apply on Mondays",
    description:
      "Your last 8 applications were submitted Monday morning. Response rates on Thursday applications are 2x higher based on your history.",
    color: "border-accent-orange bg-accent-orange/5",
  },
  {
    title: "Your fintech framing is working.",
    description:
      "Since updating your resume to lead with payments experience, your ATS scores have averaged 82 vs 64 before. Keep the framing.",
    color: "border-accent-green bg-accent-green/5",
  },
];

export default function HomePage() {
  return (
    <>
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-foreground">Home</h2>
        <span className="rounded-full border border-border px-3 py-1 text-xs text-muted">
          Personal workspace
        </span>
      </div>

      {/* Stat Cards */}
      <div className="mb-10 grid grid-cols-2 gap-4">
        {stats.map((stat) => (
          <div key={stat.label} className="rounded-lg bg-card p-5">
            <p className="text-3xl font-bold text-foreground">{stat.value}</p>
            <p className="mt-1 text-sm text-muted">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="mb-10">
        <h3 className="mb-4 text-[11px] font-semibold uppercase tracking-widest text-muted">
          Recent Activity
        </h3>
        <div className="rounded-lg border border-border">
          {recentActivity.map((item, i) => (
            <div
              key={i}
              className={`flex items-center justify-between px-5 py-3 ${
                i !== recentActivity.length - 1 ? "border-b border-border" : ""
              }`}
            >
              <span className="text-sm text-foreground">{item.text}</span>
              <span className="ml-4 shrink-0 text-xs text-muted">
                {item.time}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Patterns */}
      <div>
        <h3 className="mb-4 text-[11px] font-semibold uppercase tracking-widest text-muted">
          Pattern the system noticed
        </h3>
        <div className="space-y-3">
          {patterns.map((pattern) => (
            <div
              key={pattern.title}
              className={`rounded-lg border-l-2 p-4 ${pattern.color}`}
            >
              <p className="text-sm font-medium text-foreground">
                {pattern.title}
              </p>
              <p className="mt-1 text-sm leading-relaxed text-muted">
                {pattern.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
